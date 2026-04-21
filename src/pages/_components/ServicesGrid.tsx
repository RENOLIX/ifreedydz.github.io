import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import { repairCategories } from "@/data/repair";
import {
  getBrandAsset,
  getCategoryAsset,
  getModelAsset,
} from "@/lib/repair-assets";

type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  typeLabel: string;
  image: string;
  href: string;
  keywords: string[];
};

function getSearchScore(result: SearchResult, query: string) {
  const normalizedTitle = result.title.toLowerCase();
  const normalizedSubtitle = result.subtitle.toLowerCase();
  const normalizedKeywords = result.keywords.join(" ").toLowerCase();

  if (normalizedTitle === query) return 0;
  if (normalizedTitle.startsWith(query)) return 1;
  if (normalizedTitle.includes(query)) return 2;
  if (normalizedKeywords.includes(query)) return 3;
  if (normalizedSubtitle.includes(query)) return 4;
  return Number.POSITIVE_INFINITY;
}

export default function ServicesGrid() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const searchEntries = useMemo<SearchResult[]>(() => {
    return repairCategories.flatMap((category) => {
      const categoryEntry: SearchResult = {
        id: `category-${category.slug}`,
        title: category.name,
        subtitle: "Categorie de reparation",
        typeLabel: "Categorie",
        image: getCategoryAsset(category.slug),
        href: `/reparation/${category.slug}`,
        keywords: [category.name, category.title, category.slug],
      };

      const brandEntries = category.brands.flatMap((brand) => {
        const brandEntry: SearchResult = {
          id: `brand-${category.slug}-${brand.slug}`,
          title: brand.name,
          subtitle: category.name,
          typeLabel: "Marque",
          image: getBrandAsset(category.slug, brand.slug),
          href: `/reparation/${category.slug}/${brand.slug}`,
          keywords: [brand.name, category.name, brand.slug],
        };

        const modelEntries: SearchResult[] = brand.models.map((model) => ({
          id: `model-${category.slug}-${brand.slug}-${model.slug}`,
          title: model.name,
          subtitle: `${category.name} - ${brand.name}`,
          typeLabel: category.slug === "ordinateur" ? "Famille" : "Modele",
          image: getModelAsset(category.slug, brand.slug, model.slug),
          href: `/reparation/${category.slug}/${brand.slug}/${model.slug}`,
          keywords: [
            model.name,
            brand.name,
            category.name,
            model.slug,
            brand.slug,
          ],
        }));

        return [brandEntry, ...modelEntries];
      });

      return [categoryEntry, ...brandEntries];
    });
  }, []);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return searchEntries
      .map((entry) => ({ entry, score: getSearchScore(entry, normalized) }))
      .filter((item) => Number.isFinite(item.score))
      .sort((left, right) => {
        if (left.score !== right.score) return left.score - right.score;
        return left.entry.title.localeCompare(right.entry.title, "fr");
      })
      .slice(0, 10)
      .map((item) => item.entry);
  }, [query, searchEntries]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!searchRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <section id="services" className="bg-white py-28">
      <div className="mx-auto max-w-[1120px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Nos services
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Quel appareil souhaitez-vous faire reparer ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-light text-muted-foreground">
            Recherchez votre appareil ici puis choisissez la categorie qui
            correspond a votre besoin.
          </p>

          <div ref={searchRef} className="relative mx-auto mt-8 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsMenuOpen(true);
              }}
              onFocus={() => setIsMenuOpen(true)}
              placeholder="Recherchez votre appareil ici"
              className="w-full rounded-full border border-border bg-[#f5f5f7] py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-foreground/20"
            />

            {isMenuOpen && query.trim() ? (
              <div className="absolute inset-x-0 top-[calc(100%+0.85rem)] z-30 overflow-hidden rounded-[28px] border border-border bg-white text-left shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
                {searchResults.length ? (
                  <div className="max-h-[440px] overflow-y-auto p-2">
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        to={result.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setQuery("");
                        }}
                        className="flex items-center gap-4 rounded-[22px] px-3 py-3 transition-colors hover:bg-[#f5f5f7]"
                      >
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[18px] bg-[#f5f5f7] p-2.5">
                          <img
                            src={result.image}
                            alt={result.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold text-foreground md:text-[15px]">
                              {result.title}
                            </p>
                            <span className="rounded-full bg-[#f5f5f7] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                              {result.typeLabel}
                            </span>
                          </div>
                          <p className="mt-1 truncate text-xs text-muted-foreground md:text-sm">
                            {result.subtitle}
                          </p>
                        </div>

                        <ArrowUpRight className="h-4 w-4 flex-none text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-6 text-sm text-muted-foreground">
                    Aucun resultat pour cette recherche.
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {repairCategories.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <Link
                to={`/reparation/${service.slug}`}
                className="group block overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden bg-[#f5f5f7] p-5">
                  <img
                    src={getCategoryAsset(service.slug)}
                    alt={service.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full rounded-[22px] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="border-t border-border/70 px-4 py-4 text-center">
                  <h3 className="text-sm font-semibold leading-6 md:text-base">
                    {service.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
