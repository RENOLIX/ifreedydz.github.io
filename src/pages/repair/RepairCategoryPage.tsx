import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/pages/_components/Navbar";
import Footer from "@/pages/_components/Footer";
import { getCategory } from "@/data/repair";
import { getBrandAsset, getCategoryAsset } from "@/lib/repair-assets";
import { NotFoundPage } from "@/pages/NotFound";

export default function RepairCategoryPage() {
  const { categorySlug = "" } = useParams();
  const category = getCategory(categorySlug);
  const [query, setQuery] = useState("");

  const brands = useMemo(() => {
    if (!category) return [];
    const normalized = query.trim().toLowerCase();
    if (!normalized) return category.brands;

    return category.brands.filter(
      (brand) =>
        brand.name.toLowerCase().includes(normalized) ||
        brand.models.some((model) => model.name.toLowerCase().includes(normalized)),
    );
  }, [category, query]);

  if (!category) return <NotFoundPage />;

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="relative overflow-hidden px-6 py-18 md:py-24">
          <img
            src={getCategoryAsset(category.slug)}
            alt={category.name}
            className="absolute inset-0 h-full w-full object-cover opacity-12"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/94 to-white" />

          <div className="relative mx-auto max-w-[1120px]">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Reparation
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              {category.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Choisissez d&apos;abord la marque de votre appareil pour acceder a
              la liste des modeles et preparer votre demande de prise en charge.
            </p>

            <div className="relative mt-8 max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Recherchez votre appareil ici"
                className="w-full rounded-full border border-border bg-[#f5f5f7] py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-foreground/20"
              />
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-4 md:grid-cols-4">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                to={`/reparation/${category.slug}/${brand.slug}`}
                className="group overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden bg-[#f8f8fa] p-5">
                  <img
                    src={getBrandAsset(category.slug, brand.slug)}
                    alt={brand.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="border-t border-border/70 px-4 py-4 text-center">
                  <h2 className="text-base font-semibold md:text-lg">{brand.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
