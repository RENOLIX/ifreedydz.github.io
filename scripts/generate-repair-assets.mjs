import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import ts from "typescript";

const root = process.cwd();
const repairSourcePath = path.join(root, "src", "data", "repair.ts");

const heroBackgrounds = [
  {
    name: "mobile",
    url: "https://i.ibb.co/zWQjTdcJ/Chat-GPT-Image-19-avr-2026-19-18-23.png",
    width: 1440,
    height: 2200,
  },
  {
    name: "desktop",
    url: "https://i.ibb.co/7tnF64dS/Chat-GPT-Image-19-avr-2026-19-23-11.png",
    width: 2400,
    height: 1600,
  },
];

const requestCache = new Map();

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function sanitizeGsmaBase(baseName) {
  return unique([
    baseName,
    baseName.replace(/-+$/g, ""),
    baseName.replace(/-new\d*$/i, ""),
    baseName.replace(/-new$/i, ""),
    baseName.replace(/-plus-$/i, "-plus"),
    baseName.replace(/-pro-max-$/i, "-pro-max"),
    baseName.replace(/-pro-$/i, "-pro"),
  ]);
}

function buildGsmaCandidates(url) {
  if (!url.includes("fdn2.gsmarena.com/vv/bigpic/")) return [url];

  const parsed = new URL(url);
  const fileName = path.basename(parsed.pathname);
  const ext = path.extname(fileName) || ".jpg";
  const baseName = fileName.slice(0, -ext.length);
  const folder = baseName.split("-")[0];

  const galleryCandidates = sanitizeGsmaBase(baseName).flatMap((candidate) => [
    `https://fdn2.gsmarena.com/vv/pics/${folder}/${candidate}-1.jpg`,
    `https://fdn2.gsmarena.com/vv/pics/${folder}/${candidate}-1.png`,
  ]);

  return unique([url, ...galleryCandidates]);
}

async function loadRepairCategories() {
  const source = await fs.readFile(repairSourcePath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;

  const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`;
  const module = await import(moduleUrl);
  return module.repairCategories;
}

async function fetchImage(url) {
  if (requestCache.has(url)) return requestCache.get(url);

  const request = (async () => {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("text/html")) {
      const html = await response.text();
      const match =
        html.match(/property="og:image"\s+content="([^"]+)"/i) ??
        html.match(/name="twitter:image(?::src)?"\s+content="([^"]+)"/i) ??
        html.match(/https:\/\/cdsassets\.apple\.com[^"'\\\s>]+/i) ??
        html.match(/https:\/\/assets\.xboxservices\.com[^"'\\\s>]+(?:png|jpg|jpeg|webp)/i) ??
        html.match(/https:\/\/gmedia\.playstation\.com\/is\/image\/[^"'\\\s>]+/i);

      const imageUrl = match?.[1] ?? match?.[0];

      if (!imageUrl) {
        throw new Error(`No og:image found for ${url}`);
      }

      return fetchImage(imageUrl.replace(/&amp;/g, "&"));
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const metadata = await sharp(buffer, { animated: false }).metadata();

    return {
      url,
      buffer,
      width: metadata.width ?? 0,
      height: metadata.height ?? 0,
      format: metadata.format ?? "unknown",
    };
  })();

  requestCache.set(url, request);
  return request;
}

async function pickBestImage(url) {
  const candidates = buildGsmaCandidates(url);
  const results = [];

  for (const candidate of candidates) {
    try {
      const image = await fetchImage(candidate);
      if (image.width && image.height) {
        results.push(image);
      }
    } catch {
      // Ignore failed candidates and keep looking for a better source.
    }
  }

  if (!results.length) {
    throw new Error(`Unable to fetch image for ${url}`);
  }

  results.sort((left, right) => {
    const leftArea = left.width * left.height;
    const rightArea = right.width * right.height;
    return rightArea - leftArea;
  });

  return results[0];
}

async function ensureDirectory(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function createPosterAsset(buffer, outputPath) {
  const prepared = sharp(buffer, { animated: false })
    .flatten({ background: "#ffffff" })
    .trim({ threshold: 8 });

  const sourceMeta = await prepared.metadata();
  const sourceWidth = sourceMeta.width ?? 860;
  const sourceHeight = sourceMeta.height ?? 1080;
  const maxScale = 3.25;
  const targetWidth = Math.min(860, Math.round(sourceWidth * maxScale));
  const targetHeight = Math.min(1080, Math.round(sourceHeight * maxScale));

  const resized = await prepared
    .resize({
      width: targetWidth,
      height: targetHeight,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer({ resolveWithObject: true });

  const shadowWidth = Math.max(180, resized.info.width - 88);
  const shadow = await sharp({
    create: {
      width: shadowWidth,
      height: 46,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0.16 },
    },
  })
    .blur(20)
    .png()
    .toBuffer();

  const left = Math.round((1080 - resized.info.width) / 2);
  const top = Math.round((1350 - resized.info.height) / 2 - 10);
  const shadowLeft = Math.round((1080 - shadowWidth) / 2);
  const shadowTop = Math.min(1290, top + resized.info.height - 6);

  await ensureDirectory(outputPath);
  await sharp({
    create: {
      width: 1080,
      height: 1350,
      channels: 4,
      background: "#f6f6f8",
    },
  })
    .composite([
      { input: shadow, left: shadowLeft, top: shadowTop, blend: "multiply" },
      { input: resized.data, left, top },
    ])
    .webp({ quality: 96 })
    .toFile(outputPath);
}

async function createBackgroundAsset(buffer, outputPath, width, height) {
  await ensureDirectory(outputPath);
  await sharp(buffer, { animated: false })
    .resize({
      width,
      height,
      fit: "cover",
      position: "centre",
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .sharpen({ sigma: 1.25, m1: 0.4, m2: 0.8 })
    .webp({ quality: 94 })
    .toFile(outputPath);
}

async function main() {
  const repairCategories = await loadRepairCategories();

  const jobs = [];

  for (const category of repairCategories) {
    jobs.push({
      label: `category:${category.slug}`,
      url: category.heroImage,
      outputPath: path.join(root, "public", "images", "repair", "categories", `${category.slug}.webp`),
      mode: "poster",
    });

    for (const brand of category.brands) {
      jobs.push({
        label: `brand:${category.slug}/${brand.slug}`,
        url: brand.largeImage ?? brand.image,
        outputPath: path.join(
          root,
          "public",
          "images",
          "repair",
          "brands",
          `${category.slug}-${brand.slug}.webp`,
        ),
        mode: "poster",
      });

      for (const model of brand.models) {
        jobs.push({
          label: `model:${category.slug}/${brand.slug}/${model.slug}`,
          url: model.largeImage ?? brand.largeImage ?? model.image,
          outputPath: path.join(
            root,
            "public",
            "images",
            "repair",
            "models",
            `${category.slug}-${brand.slug}-${model.slug}.webp`,
          ),
          mode: "poster",
        });
      }
    }
  }

  for (const hero of heroBackgrounds) {
    jobs.push({
      label: `hero:${hero.name}`,
      url: hero.url,
      outputPath: path.join(root, "public", "images", "hero", `${hero.name}.webp`),
      mode: "background",
      width: hero.width,
      height: hero.height,
    });
  }

  for (const job of jobs) {
    const best = await pickBestImage(job.url);
    if (job.mode === "background") {
      await createBackgroundAsset(best.buffer, job.outputPath, job.width, job.height);
    } else {
      await createPosterAsset(best.buffer, job.outputPath);
    }

    console.log(
      `${job.label} -> ${path.relative(root, job.outputPath)} (${best.width}x${best.height} from ${best.url})`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
