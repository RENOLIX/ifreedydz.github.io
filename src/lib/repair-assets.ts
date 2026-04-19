function withBase(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export function getCategoryAsset(categorySlug: string) {
  return withBase(`images/repair/categories/${categorySlug}.webp`);
}

export function getBrandAsset(categorySlug: string, brandSlug: string) {
  return withBase(`images/repair/brands/${categorySlug}-${brandSlug}.webp`);
}

export function getModelAsset(
  categorySlug: string,
  brandSlug: string,
  modelSlug: string,
) {
  return withBase(`images/repair/models/${categorySlug}-${brandSlug}-${modelSlug}.webp`);
}

export function getHeroBackgroundAsset(viewport: "mobile" | "desktop") {
  return withBase(`images/hero/${viewport}.webp`);
}
