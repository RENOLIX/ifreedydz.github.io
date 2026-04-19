import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
import Navbar from "@/pages/_components/Navbar";
import Footer from "@/pages/_components/Footer";
import { getBrand, getCategory } from "@/data/repair";

export default function RepairBrandPage() {
  const { categorySlug = "", brandSlug = "" } = useParams();
  const category = getCategory(categorySlug);
  const brand = getBrand(categorySlug, brandSlug);
  const [query, setQuery] = useState("");

  const models = useMemo(() => {
    if (!brand) return [];
    const normalized = query.trim().toLowerCase();
    if (!normalized) return brand.models;
    return brand.models.filter((model) => model.name.toLowerCase().includes(normalized));
  }, [brand, query]);

  if (!category || !brand) return null;

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-[1120px]">
            <Link
              to={`/reparation/${category.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Retour aux marques
            </Link>

            <div className="mt-6 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="rounded-[32px] bg-[#f5f5f7] p-8">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="mx-auto h-auto w-full max-w-[320px] object-contain"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  {category.name}
                </p>
                <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                  Choisissez votre modele {brand.name}.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  Selectionnez le modele exact de votre appareil pour continuer
                  vers le choix des pannes puis le formulaire de prise en charge.
                </p>

                <div className="relative mt-8 max-w-xl">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Recherchez votre modele"
                    className="w-full rounded-full border border-border bg-[#f5f5f7] py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-foreground/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-4 md:grid-cols-4">
            {models.map((model) => (
              <Link
                key={model.slug}
                to={`/reparation/${category.slug}/${brand.slug}/${model.slug}`}
                className="group overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden bg-[#fafafa] p-5">
                  <img
                    src={model.image}
                    alt={model.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="border-t border-border/70 px-4 py-4 text-center">
                  <h2 className="text-sm font-semibold md:text-base">{model.name}</h2>
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
