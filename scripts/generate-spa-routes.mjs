import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const distPath = path.join(root, "dist");
const repairSourcePath = path.join(root, "src", "data", "repair.ts");

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
  console.log(`Generated ${routes.size} static SPA route entries.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
