import { useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/pages/_components/Navbar";
import Footer from "@/pages/_components/Footer";
import {
  getAvailableIssues,
  getBrand,
  getCategory,
  getModel,
} from "@/data/repair";
import { getModelAsset } from "@/lib/repair-assets";
import { buildWhatsAppUrl, siteContact } from "@/lib/site";
import { NotFoundPage } from "@/pages/NotFound";

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
  const availableIssues = useMemo(
    () => getAvailableIssues(categorySlug, modelSlug),
    [categorySlug, modelSlug],
  );

  const issues = useMemo(() => {
    return availableIssues.filter((issue) => issueSlugs.includes(issue.slug));
  }, [availableIssues, issueSlugs]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  if (!category || !brand || !model) return <NotFoundPage />;

  const selectedCategory = category;
  const selectedBrand = brand;
  const selectedModel = model;
  const summaryText = `Service: ${selectedCategory.name}\nMarque: ${selectedBrand.name}\nModele: ${selectedModel.name}\nPannes: ${issues.map((issue) => issue.label).join(", ")}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setFormFeedback(null);

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const resume = String(formData.get("resume") ?? summaryText).trim();
    const message = String(formData.get("message") ?? "").trim();
    const issueLabels = issues.map((issue) => issue.label).join(", ");

    const whatsappMessage = [
      `Bonjour ${siteContact.storeName},`,
      "",
      "Nouvelle demande de reparation:",
      `Prenom: ${firstName}`,
      `Nom: ${lastName}`,
      `Telephone: ${phone}`,
      `Email: ${email}`,
      `Service: ${selectedCategory.name}`,
      `Marque: ${selectedBrand.name}`,
      `Modele: ${selectedModel.name}`,
      `Pannes: ${issueLabels || "Non precisees"}`,
      "",
      "Resume:",
      resume,
      "",
      "Message complementaire:",
      message || "Aucun message complementaire.",
    ].join("\n");

    const whatsappUrl = buildWhatsAppUrl(whatsappMessage);
    const whatsappWindow = window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );

    if (!whatsappWindow) {
      window.location.href = whatsappUrl;
      return;
    }

    setFormFeedback({
      type: "success",
      message:
        "Redirection vers WhatsApp effectuee. Envoyez le message pour finaliser votre demande.",
    });
    setIsSubmitting(false);
  }

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
                  src={getModelAsset(category.slug, brand.slug, model.slug)}
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
                    <div className="text-sm leading-7 text-muted-foreground">
                      <a
                        href={`tel:${siteContact.landline}`}
                        className="transition-colors hover:text-foreground"
                      >
                        {siteContact.landline}
                      </a>
                      {" / "}
                      <a
                        href={`tel:${siteContact.mobile}`}
                        className="transition-colors hover:text-foreground"
                      >
                        {siteContact.mobile}
                      </a>
                    </div>
                  </div>
                  <div className="mt-3 flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-foreground" />
                    <a
                      href={`mailto:${siteContact.email}`}
                      className="text-sm leading-7 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {siteContact.email}
                    </a>
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

                <form onSubmit={handleSubmit} className="mt-10 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Prenom
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Votre prenom"
                      required
                      className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Nom
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Votre nom"
                      required
                      className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Telephone
                    </label>
                    <input
                      name="phone"
                      type="text"
                      placeholder="Votre numero"
                      required
                      className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Votre email"
                      required
                      className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Resume de la demande
                    </label>
                    <textarea
                      name="resume"
                      rows={4}
                      defaultValue={summaryText}
                      className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Message complementaire
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Ajoutez un detail utile: urgence, panne apres chute, appareil qui chauffe, piece deja changee..."
                      className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Ouverture..." : "Envoyer sur WhatsApp"}
                    </button>
                    <p className="mt-3 text-xs leading-6 text-muted-foreground">
                      Le formulaire ouvre directement WhatsApp avec un message
                      detaille pret a envoyer a l&apos;atelier.
                    </p>
                    {formFeedback ? (
                      <p
                        className={`mt-3 text-sm ${
                          formFeedback.type === "success"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {formFeedback.message}
                      </p>
                    ) : null}
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
