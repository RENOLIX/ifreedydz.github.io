import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Battery,
  Camera,
  ChevronLeft,
  CircleEllipsis,
  Cpu,
  Database,
  Droplets,
  Fan,
  Flame,
  Gauge,
  Hand,
  HardDrive,
  HeartPulse,
  Keyboard,
  Lock,
  Monitor,
  PlugZap,
  Power,
  RotateCw,
  ShieldAlert,
  Smartphone,
  Tablet,
  Volume2,
  Watch,
  Wifi,
  Wrench,
} from "lucide-react";
import Navbar from "@/pages/_components/Navbar";
import Footer from "@/pages/_components/Footer";
import { getBrand, getCategory, getModel } from "@/data/repair";
import { cn } from "@/lib/utils";

const iconMap = {
  battery: Battery,
  camera: Camera,
  "circle-ellipsis": CircleEllipsis,
  cpu: Cpu,
  database: Database,
  droplets: Droplets,
  fan: Fan,
  flame: Flame,
  gauge: Gauge,
  hand: Hand,
  "hard-drive": HardDrive,
  "heart-pulse": HeartPulse,
  keyboard: Keyboard,
  lock: Lock,
  monitor: Monitor,
  "plug-zap": PlugZap,
  power: Power,
  "rotate-cw": RotateCw,
  "shield-alert": ShieldAlert,
  smartphone: Smartphone,
  tablet: Tablet,
  "volume-2": Volume2,
  watch: Watch,
  wifi: Wifi,
  wrench: Wrench,
} as const;

export default function RepairModelPage() {
  const navigate = useNavigate();
  const { categorySlug = "", brandSlug = "", modelSlug = "" } = useParams();
  const category = getCategory(categorySlug);
  const brand = getBrand(categorySlug, brandSlug);
  const model = getModel(categorySlug, brandSlug, modelSlug);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  const selectedIssueLabels = useMemo(() => {
    if (!category) return [];
    return category.issues.filter((issue) => selectedIssues.includes(issue.slug));
  }, [category, selectedIssues]);

  if (!category || !brand || !model) return null;
  const currentCategory = category;
  const currentBrand = brand;
  const currentModel = model;

  function toggleIssue(issueSlug: string) {
    setSelectedIssues((current) =>
      current.includes(issueSlug)
        ? current.filter((item) => item !== issueSlug)
        : [...current, issueSlug],
    );
  }

  function goToForm() {
    const params = new URLSearchParams({
      categorie: currentCategory.slug,
      marque: currentBrand.slug,
      modele: currentModel.slug,
      issues: selectedIssues.join(","),
    });

    navigate(`/reparation/formulaire?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-[1120px]">
            <Link
              to={`/reparation/${currentCategory.slug}/${currentBrand.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Retour aux modeles
            </Link>

            <div className="mt-6 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="rounded-[32px] bg-[#f5f5f7] p-8">
                <img
                  src={currentModel.image}
                  alt={currentModel.name}
                  className="mx-auto h-auto w-full max-w-[360px] object-contain"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  {currentBrand.name}
                </p>
                <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                  {currentModel.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  Quel probleme a votre appareil ? Vous pouvez choisir plusieurs
                  pannes avant de continuer vers le formulaire.
                </p>

                {selectedIssueLabels.length ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedIssueLabels.map((issue) => (
                      <span
                        key={issue.slug}
                        className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background"
                      >
                        {issue.label}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-[1120px]">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
              {currentCategory.issues.map((issue) => {
                const Icon = iconMap[issue.icon as keyof typeof iconMap] ?? Wrench;
                const isActive = selectedIssues.includes(issue.slug);

                return (
                  <button
                    key={issue.slug}
                    type="button"
                    onClick={() => toggleIssue(issue.slug)}
                    className={cn(
                      "rounded-[26px] border p-5 text-left transition-all duration-200",
                      isActive
                        ? "border-foreground bg-foreground text-background shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                        : "border-border bg-white hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)]",
                    )}
                  >
                    <Icon className={cn("h-5 w-5", isActive ? "text-background" : "text-foreground")} />
                    <p className={cn("mt-4 text-sm font-semibold leading-6", isActive ? "text-background" : "text-foreground")}>
                      {issue.label}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[28px] bg-[#f5f5f7] px-6 py-5 md:flex-row">
              <p className="text-sm leading-7 text-muted-foreground">
                Selectionnez une ou plusieurs pannes puis continuez vers le
                formulaire pour envoyer votre demande.
              </p>
              <button
                type="button"
                disabled={!selectedIssues.length}
                onClick={goToForm}
                className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuer vers le formulaire
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
