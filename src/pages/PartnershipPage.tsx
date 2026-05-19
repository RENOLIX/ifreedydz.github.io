import { type FormEvent, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  BadgePercent,
  Building2,
  CheckCircle2,
  Globe,
  Laptop,
  Mail,
  MapPin,
  Monitor,
  Phone,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Tablet,
  Truck,
  Users,
} from "lucide-react";
import Navbar from "@/pages/_components/Navbar";
import Footer from "@/pages/_components/Footer";
import SocialLinks from "@/components/SocialLinks";
import { withSiteBase } from "@/lib/routing";
import { siteContact } from "@/lib/site";

type FeedbackState = {
  type: "success" | "error";
  message: string;
} | null;

const advantages = [
  {
    icon: BadgePercent,
    title: "Jusqu'a -15% sur les reparations*",
    description:
      "Profitez de tarifs preferentiels sur une large partie des interventions atelier selon votre volume et votre compte pro.",
  },
  {
    icon: Sparkles,
    title: "-15% sur les accessoires",
    description:
      "Cables, chargeurs, protections et equipements utiles a vos equipes peuvent beneficier d'une remise dediee.",
  },
  {
    icon: Truck,
    title: "Collecte planifiee",
    description:
      "Selon votre zone et votre besoin, nous organisons la recuperation de vos appareils pour fluidifier vos operations.",
  },
  {
    icon: ShieldCheck,
    title: "Sans engagement ni abonnement",
    description:
      "L'ouverture d'un espace pro iFreedy est simple, gratuite et accessible a vos collaborateurs autorises.",
  },
  {
    icon: PhoneCall,
    title: "Reparation prioritaire",
    description:
      "Vos demandes beneficient d'une prise en charge plus rapide afin de limiter l'impact sur votre activite.",
  },
  {
    icon: Phone,
    title: "Ligne dediee Partenariat",
    description:
      "Un contact direct pour vos devis, vos suivis de flotte et vos besoins urgents au quotidien.",
  },
];

const repairScopes = [
  "Smartphones professionnels",
  "Tablettes et iPad",
  "MacBook et postes Apple",
  "PC portables et fixes",
  "Objets connectes et accessoires",
  "Reprises, transferts et renouvellement de parc",
];

function isWeb3FormsConfigured() {
  return !siteContact.web3formsAccessKey.startsWith("REMPLACEZ_");
}

async function submitToWeb3Forms(payload: Record<string, string>) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Envoi impossible pour le moment.");
  }
}

export default function PartnershipPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<FeedbackState>(null);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterFeedback, setNewsletterFeedback] = useState<FeedbackState>(null);

  const lineItems = useMemo(
    () => [
      {
        icon: Building2,
        label: "Compte pro",
        value: "Ouverture gratuite pour votre structure et vos collaborateurs.",
      },
      {
        icon: Phone,
        label: "Ligne directe",
        value: `${siteContact.landline} / ${siteContact.mobile}`,
      },
      {
        icon: MapPin,
        label: "Atelier",
        value: siteContact.address,
      },
    ],
    [],
  );

  async function handleProSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormFeedback(null);

    if (!isWeb3FormsConfigured()) {
      setFormFeedback({
        type: "error",
        message:
          "Ajoutez d'abord votre cle Web3Forms dans C:/Users/USER/Documents/New project/apple/src/lib/site.ts pour activer ce formulaire.",
      });
      return;
    }

    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const companyName = String(formData.get("companyName") || "").trim();
    const email = String(formData.get("email") || "").trim();

    const payload = {
      access_key: siteContact.web3formsAccessKey,
      subject: `Nouvelle demande Partenariat Entreprise - ${companyName}`,
      from_name: `Site ${siteContact.storeName}`,
      replyto: email,
      botcheck: "",
      page_source: `${siteContact.siteUrl}/partenariat`,
      raison_sociale: companyName,
      numero_siret: String(formData.get("siret") || "").trim(),
      adresse: String(formData.get("address") || "").trim(),
      ville: String(formData.get("city") || "").trim(),
      code_postal: String(formData.get("postalCode") || "").trim(),
      site_web: String(formData.get("website") || "").trim(),
      telephone: String(formData.get("phone") || "").trim(),
      email,
      materiels_possedes:
        (formData.getAll("materials") as string[]).join(", ") ||
        "Non precise",
      nombre_appareils: String(formData.get("deviceCount") || "").trim(),
      logiciel_diagnostic: String(formData.get("softwareHelp") || "").trim(),
      systemes_exploitation:
        (formData.getAll("systems") as string[]).join(", ") || "Non precise",
      commentaire: String(formData.get("comment") || "").trim(),
    };

    try {
      await submitToWeb3Forms(payload);
      form.reset();
      setFormFeedback({
        type: "success",
        message:
          "Votre demande Partenariat Entreprise a bien ete envoyee. Nous revenons vers vous rapidement.",
      });
    } catch (error) {
      setFormFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue pendant l'envoi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterFeedback(null);

    if (!isWeb3FormsConfigured()) {
      setNewsletterFeedback({
        type: "error",
        message:
          "Ajoutez d'abord votre cle Web3Forms dans C:/Users/USER/Documents/New project/apple/src/lib/site.ts pour activer la newsletter.",
      });
      return;
    }

    setIsNewsletterSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("newsletterEmail") || "").trim();

    try {
      await submitToWeb3Forms({
        access_key: siteContact.web3formsAccessKey,
        subject: "Nouvelle inscription newsletter iFreedy Pro",
        from_name: `Site ${siteContact.storeName}`,
        replyto: email,
        botcheck: "",
        page_source: `${siteContact.siteUrl}/partenariat#newsletter`,
        newsletter_email: email,
      });
      form.reset();
      setNewsletterFeedback({
        type: "success",
        message:
          "Merci, votre inscription newsletter a bien ete prise en compte.",
      });
    } catch (error) {
      setNewsletterFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Impossible d'enregistrer l'inscription pour le moment.",
      });
    } finally {
      setIsNewsletterSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navbar />
      <main className="overflow-x-hidden pt-14">
        <section className="relative overflow-hidden bg-[#f5f5f7] px-6 py-20 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.06),transparent_34%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          <div className="relative mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Partenariat Entreprise
              </span>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl md:leading-[1.02]">
                La reparation de votre flotte d'appareils par des specialistes.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                Smartphones, tablettes, ordinateurs et objets connectes sont au
                coeur de votre activite. Une panne, une casse ou une perte peut
                ralentir toute votre organisation. Avec{" "}
                {siteContact.storeName}, vous choisissez un partenaire atelier
                capable d'accompagner vos equipes, vos dirigeants et vos parcs
                multi-appareils avec une logique claire : rapidite, qualite,
                priorite et suivi.
              </p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
                Independants, PME, groupes, boutiques premium ou structures
                exigeantes : notre formule pro vous ouvre un cadre simple, sans
                abonnement, avec des avantages concrets et un interlocuteur
                dedie.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#compte-pro"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/85"
                >
                  Ouvrir un compte Pro
                </a>
                <a
                  href={`tel:${siteContact.mobile}`}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/70"
                >
                  Parler a un conseiller
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="rounded-[34px] border border-border bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Ce que gagne votre entreprise
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Jusqu'a -15% sur certaines reparations",
                  "Accessoires pro a tarif preferentiel",
                  "Intervention prioritaire atelier",
                  "Organisation logistique simplifiee",
                ].map((item) => (
                  <div key={item} className="rounded-[24px] bg-[#f5f5f7] p-4">
                    <CheckCircle2 className="h-5 w-5 text-foreground" />
                    <p className="mt-3 text-sm font-medium leading-6 text-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[28px] bg-[#111214] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                  Ligne dediee
                </p>
                <a
                  href={`tel:${siteContact.landline}`}
                  className="mt-3 inline-flex text-2xl font-semibold tracking-tight transition-colors hover:text-white/80"
                >
                  {siteContact.landline}
                </a>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  Devis, arbitrage de flotte, priorisation des urgences et
                  coordination atelier en un seul canal.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="avantages" className="px-6 py-24">
          <div className="mx-auto max-w-[1120px]">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Avantages dedies aux pros
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Un cadre premium, souple et utile pour vos equipes.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {[advantages.slice(0, 3), advantages.slice(3, 6)].map(
                (column, columnIndex) => (
                  <div key={columnIndex} className="space-y-5">
                    {column.map(({ icon: Icon, title, description }, itemIndex) => {
                      const isDarkCard = (columnIndex + itemIndex) % 2 === 0;

                      return (
                        <motion.div
                          key={title}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45 }}
                          className={`rounded-[32px] border p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ${
                            isDarkCard
                              ? "border-[#111214] bg-[#111214] text-white"
                              : "border-border bg-[#f5f5f7] text-foreground"
                          }`}
                        >
                          <div className="flex items-start gap-5">
                            <div
                              className={`flex h-[52px] w-[52px] flex-none items-center justify-center rounded-2xl ${
                                isDarkCard
                                  ? "bg-white/10 text-white"
                                  : "bg-white text-foreground shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold tracking-tight">
                                {title}
                              </h3>
                              <p
                                className={`mt-3 text-sm leading-7 ${
                                  isDarkCard
                                    ? "text-white/70"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-[1120px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[36px] border border-black/10"
            >
              <div
                className="absolute inset-0 bg-cover bg-center md:bg-fixed"
                style={{
                  backgroundImage: `url(${withSiteBase("images/atelier/atelier-ifreedy.jpeg")})`,
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.68),rgba(0,0,0,0.34),rgba(0,0,0,0.18))]" />
              <div className="relative flex min-h-[230px] items-end p-8 md:min-h-[280px] md:p-10">
                <div className="max-w-2xl">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-white backdrop-blur-sm">
                    <Users className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                    Les entreprises de toutes les tailles !
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
                    Il n'y a aucune difference. Profitez des memes services.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#f5f5f7] px-6 py-24">
          <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[34px] border border-border/70 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Nous reparons tout. Absolument tout.
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-[2.8rem]">
                Un atelier capable de suivre l'ensemble de votre parc.
              </h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {repairScopes.map((scope) => (
                  <div
                    key={scope}
                    className="rounded-[22px] bg-[#f5f5f7] px-4 py-4 text-sm font-medium text-foreground"
                  >
                    {scope}
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-4">
                {[
                  { icon: Smartphone, label: "Mobile" },
                  { icon: Tablet, label: "Tablette" },
                  { icon: Laptop, label: "PC / Mac" },
                  { icon: Monitor, label: "Postes de travail" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-[22px] bg-[#111214] px-4 py-5 text-center text-white"
                  >
                    <Icon className="mx-auto h-5 w-5 text-white/92" />
                    <p className="mt-3 text-sm font-medium text-white/88">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[34px] border border-border/70 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.06)]">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Nos reparations
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight">
                  Reparation, maintenance, installation et transfert de donnees.
                </h3>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">
                  Nous traitons les pannes materielles, les remplacements de
                  pieces, les problemes de charge, les casses ecran, la
                  maintenance logicielle, la reprise de configuration et la
                  remise en service rapide.
                </p>
              </div>

              <div className="rounded-[34px] border border-border/70 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.06)]">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Rachat et renouvellement de flotte
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight">
                  Optimisez vos couts, recyclez et restez equipe avec du
                  materiel performant.
                </h3>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">
                  Le poste equipement pese lourd dans le budget des entreprises.
                  Un materiel use ou obsolete a un cout reel : baisse de
                  productivite, depannage repetitif et impact environnemental.{" "}
                  {siteContact.storeName} peut reprendre vos appareils,
                  organiser leur recyclage, proposer des terminaux adaptes et
                  gerer l'installation ainsi que le transfert de donnees.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    "Rachat de flotte",
                    "Recyclage responsable",
                    "Installation poste a poste",
                    "Transfert de donnees",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="compte-pro" className="px-6 py-24">
          <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[0.84fr_1.16fr]">
            <div className="rounded-[34px] bg-[#111214] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] md:p-9">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/58">
                Ouvrir un compte Pro chez {siteContact.storeName}
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Une demande claire, un contact rapide, un suivi fluide.
              </h2>
              <p className="mt-5 text-sm leading-8 text-white/70">
                Remplissez ce formulaire pour nous presenter votre entreprise,
                votre flotte et vos besoins techniques. Nous revenons vers vous
                avec une proposition adaptee a votre organisation.
              </p>

              <div className="mt-8 space-y-4">
                {lineItems.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 text-white/82" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                          {label}
                        </p>
                        <p className="mt-1 text-sm leading-7 text-white/80">
                          {value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[26px] bg-white/6 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/48">
                  Activation Web3Forms
                </p>
                <p className="mt-3 text-sm leading-7 text-white/74">
                  Votre cle est deja branchee dans{" "}
                  <span className="font-semibold">
                    C:/Users/USER/Documents/New project/apple/src/lib/site.ts
                  </span>
                  . Si vous voulez la changer plus tard, remplacez simplement la
                  valeur de{" "}
                  <span className="font-semibold">web3formsAccessKey</span>.
                </p>
              </div>
            </div>

            <div className="rounded-[34px] border border-border bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-10">
              <form onSubmit={handleProSubmit} className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Raison sociale (obligatoire)
                  </label>
                  <input
                    name="companyName"
                    required
                    className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Numero de SIRET (obligatoire)
                  </label>
                  <input
                    name="siret"
                    required
                    className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Telephone (obligatoire)
                  </label>
                  <input
                    name="phone"
                    required
                    className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Adresse (obligatoire)
                  </label>
                  <input
                    name="address"
                    required
                    className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Ville (obligatoire)
                  </label>
                  <input
                    name="city"
                    required
                    className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Code postal (obligatoire)
                  </label>
                  <input
                    name="postalCode"
                    required
                    className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Site web
                  </label>
                  <input
                    name="website"
                    type="url"
                    placeholder="https://"
                    className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Email (obligatoire)
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                  />
                </div>

                <div className="md:col-span-2 rounded-[26px] bg-[#f5f5f7] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Types de materiels possedes
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Mobile", "mobile"],
                      ["Tablette", "tablette"],
                      ["PC", "pc"],
                      ["Mac", "mac"],
                    ].map(([label, value]) => (
                      <label
                        key={value}
                        className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-foreground"
                      >
                        <input
                          type="checkbox"
                          name="materials"
                          value={value}
                          className="h-4 w-4 accent-black"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Nombre d'appareils
                  </label>
                  <select
                    name="deviceCount"
                    required
                    className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                  >
                    <option value="">Selectionnez</option>
                    <option>1-10</option>
                    <option>11-25</option>
                    <option>26-50</option>
                    <option>51 et plus</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Diagnostic logiciel
                  </label>
                  <select
                    name="softwareHelp"
                    required
                    className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                  >
                    <option value="">Selectionnez</option>
                    <option>Oui</option>
                    <option>Non</option>
                    <option>Ne sais pas</option>
                  </select>
                </div>

                <div className="md:col-span-2 rounded-[26px] bg-[#f5f5f7] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Systemes d'exploitation traites
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Windows", "windows"],
                      ["Mac", "mac"],
                      ["Linux", "linux"],
                    ].map(([label, value]) => (
                      <label
                        key={value}
                        className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-foreground"
                      >
                        <input
                          type="checkbox"
                          name="systems"
                          value={value}
                          className="h-4 w-4 accent-black"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Commentaire
                  </label>
                  <textarea
                    name="comment"
                    rows={6}
                    placeholder="Expliquez votre contexte, vos priorites, vos types de pannes frequentes ou votre volume moyen d'interventions."
                    className="w-full rounded-2xl bg-[#f5f5f7] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Envoi en cours..."
                      : "Envoyer la demande Partenariat"}
                  </button>
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    *Les conditions commerciales peuvent varier selon le volume,
                    les references, la disponibilite et le type de prestation.
                  </p>
                  {formFeedback ? (
                    <p
                      className={`mt-4 text-sm ${
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
        </section>

        <section className="bg-[#f5f5f7] px-6 py-24">
          <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[34px] border border-border/70 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Notre newsletter
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-[2.6rem]">
                Abonnez-vous pour recevoir nos offres speciales et nos
                actualites.
              </h2>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">
                Recevez les nouveautes de l'atelier, les avantages pro et les
                mises a jour utiles pour la gestion de votre parc.
              </p>

              <form
                id="newsletter"
                onSubmit={handleNewsletterSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  name="newsletterEmail"
                  type="email"
                  required
                  placeholder="Votre email"
                  className="min-w-0 flex-1 rounded-full bg-[#f5f5f7] px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-foreground/15"
                />
                <button
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isNewsletterSubmitting ? "Envoi..." : "S'abonner"}
                </button>
              </form>

              {newsletterFeedback ? (
                <p
                  className={`mt-4 text-sm ${
                    newsletterFeedback.type === "success"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {newsletterFeedback.message}
                </p>
              ) : null}
            </div>

            <div className="grid gap-6">
              <div className="rounded-[34px] border border-border/70 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.06)]">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      Nos boutiques
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                      Un atelier local, une reponse claire, un suivi fiable.
                    </h2>
                    <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <Store className="mt-1 h-4 w-4 text-foreground" />
                        <div>
                          <p className="font-medium text-foreground">
                            {siteContact.storeName} Solutions
                          </p>
                          <p>{siteContact.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="mt-1 h-4 w-4 text-foreground" />
                        <div>
                          <a
                            href={`tel:${siteContact.landline}`}
                            className="transition-colors hover:text-foreground"
                          >
                            {siteContact.landline}
                          </a>
                          <span>{" / "}</span>
                          <a
                            href={`tel:${siteContact.mobile}`}
                            className="transition-colors hover:text-foreground"
                          >
                            {siteContact.mobile}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="mt-1 h-4 w-4 text-foreground" />
                        <a
                          href={`mailto:${siteContact.email}`}
                          className="transition-colors hover:text-foreground"
                        >
                          {siteContact.emailLabel}
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="mt-1 h-4 w-4 text-foreground" />
                        <a
                          href={siteContact.siteUrl}
                          className="transition-colors hover:text-foreground"
                        >
                          {siteContact.siteUrl}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] bg-[#f5f5f7] p-5 lg:min-w-[280px]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Restons connectes
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Suivez nos actualites, nos arrivages et nos conseils
                      atelier sur nos reseaux.
                    </p>
                    <div className="mt-5">
                      <SocialLinks />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
