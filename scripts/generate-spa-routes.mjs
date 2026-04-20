import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const distPath = path.join(root, "dist");
const repairSourcePath = path.join(root, "src", "data", "repair.ts");
const siteUrl = "https://ifreedy.com";

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

async function ensureStaticRoute(routePath, html) {
  const normalized = routePath.replace(/^\/+/, "");
  const outputDir = path.join(distPath, normalized);
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, "index.html"), html, "utf8");
}

async function writeSitemap(routePaths) {
  const pages = [
    "",
    ...[...routePaths].filter(
      (routePath) => routePath !== "auth" && routePath !== "reparation" && routePath !== "reparation/formulaire",
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((routePath) => {
      const normalizedPath = routePath ? `/${routePath.replace(/^\/+/, "")}` : "/";
      return `  <url>\n    <loc>${siteUrl}${normalizedPath}</loc>\n  </url>`;
    })
    .join("\n")}\n</urlset>\n`;

  await fs.writeFile(path.join(distPath, "sitemap.xml"), xml, "utf8");
}

async function main() {
  const [indexHtml, categories] = await Promise.all([
    fs.readFile(path.join(distPath, "index.html"), "utf8"),
    loadRepairCategories(),
  ]);

  const routes = new Set(["auth", "reparation", "reparation/formulaire"]);

  for (const category of categories) {
    routes.add(`reparation/${category.slug}`);

    for (const brand of category.brands) {
      routes.add(`reparation/${category.slug}/${brand.slug}`);

      for (const model of brand.models) {
        routes.add(`reparation/${category.slug}/${brand.slug}/${model.slug}`);
      }
    }
  }

  await Promise.all([...routes].map((routePath) => ensureStaticRoute(routePath, indexHtml)));
  await writeSitemap(routes);
  console.log(`Generated ${routes.size} static SPA route entries.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
