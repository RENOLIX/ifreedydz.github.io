import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, MapPin, Phone } from "lucide-react";
import Navbar from "@/pages/_components/Navbar";
import Footer from "@/pages/_components/Footer";
import { getBrand, getCategory, getModel } from "@/data/repair";
import { siteContact } from "@/lib/site";

export default function RepairFormPage() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("categorie") ?? "";
  const brandSlug = searchParams.get("marque") ?? "";
  const modelSlug = searchParams.get("modele") ?? "";
  const issueSlugs = (searchParams.get("issues") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const category = getCategory(categorySlug);
  const brand = getBrand(categorySlug, brandSlug);
  const model = getModel(categorySlug, brandSlug, modelSlug);

  const issues = useMemo(() => {
    if (!category) return [];
    return category.issues.filter((issue) => issueSlugs.includes(issue.slug));
  }, [category, issueSlugs]);

  if (!category || !brand || !model) return null;
  const displayImage = model.largeImage ?? brand.largeImage ?? model.image;

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-[1120px]">
            <Link
              to={`/reparation/${category.slug}/${brand.slug}/${model.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Retour au choix des pannes
            </Link>

            <div className="mt-6 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="rounded-[32px] bg-[#f5f5f7] p-8">
                <img
                  src={displayImage}
                  alt={model.name}
                  loading="eager"
                  decoding="async"
                  className="mx-auto h-auto w-full max-w-[500px] object-contain"
                />

                <div className="mt-8 space-y-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      Appareil
                    </p>
                    <p className="mt-2 text-lg font-semibold">{model.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      Service
                    </p>
                    <p className="mt-2 text-lg font-semibold">{category.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      Pannes selectionnees
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {issues.map((issue) => (
                        <span
                          key={issue.slug}
                          className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground"
                        >
                          {issue.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[24px] bg-white p-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-foreground" />
                    <p className="text-sm leading-7 text-muted-foreground">
                      {siteContact.address}
                    </p>
                  </div>
                  <div className="mt-3 flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-foreground" />
                    <p className="text-sm leading-7 text-muted-foreground">
                      {siteContact.landline} / {siteContact.mobile}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-border bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Formulaire
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Finalisez votre demande de reparation.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                  Renseignez vos coordonnees et ajoutez un detail complementaire
                  si besoin. Le recapitulatif de l&apos;appareil et des pannes
                  est deja prepare.
                </p>

                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="mt-10 grid gap-4 md:grid-cols-2"
                >
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Telephone
                    </label>
                    <input
                      type="text"
                      placeholder="Votre numero"
                      className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Resume de la demande
                    </label>
                    <textarea
                      rows={4}
                      defaultValue={`Service: ${category.name}\nMarque: ${brand.name}\nModele: ${model.name}\nPannes: ${issues.map((issue) => issue.label).join(", ")}`}
                      className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Message complementaire
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Ajoutez un detail utile: urgence, panne apres chute, appareil qui chauffe, piece deja changee..."
                      className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/85"
                    >
                      Envoyer la demande
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
