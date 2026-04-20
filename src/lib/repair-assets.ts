import { withSiteBase } from "@/lib/routing";

export function getCategoryAsset(categorySlug: string) {
  return withSiteBase(`images/repair/categories/${categorySlug}.webp`);
}

export function getBrandAsset(categorySlug: string, brandSlug: string) {
  return withSiteBase(`images/repair/brands/${categorySlug}-${brandSlug}.webp`);
}

export function getModelAsset(
  categorySlug: string,
  brandSlug: string,
  modelSlug: string,
) {
  return withSiteBase(
    `images/repair/models/${categorySlug}-${brandSlug}-${modelSlug}.webp`,
  );
}

export function getHeroBackgroundAsset(viewport: "mobile" | "desktop") {
  return withSiteBase(`images/hero/${viewport}.webp`);
}
