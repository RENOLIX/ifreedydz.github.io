const GITHUB_PROJECT_BASE = "/ifreedydz.github.io/";

export function getSiteBasePath() {
  if (
    typeof window !== "undefined" &&
    window.location.hostname.endsWith("github.io")
  ) {
    return GITHUB_PROJECT_BASE;
  }

  return "/";
}

export function getRouterBasename() {
  const basePath = getSiteBasePath();
  return basePath === "/" ? "" : basePath.replace(/\/$/, "");
}

export function withSiteBase(path = "") {
  const basePath = getSiteBasePath();
  const normalizedPath = path.replace(/^\/+/, "");

  if (!normalizedPath) return basePath;
  return `${basePath}${normalizedPath}`;
}
