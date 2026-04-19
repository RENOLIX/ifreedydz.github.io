import { motion } from "motion/react";
import { Award, HeadphonesIcon, ShieldCheck, Zap } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Techniciens experimentes",
    description:
      "Une equipe habituee aux appareils Apple, aux pannes courantes comme aux interventions plus techniques en atelier.",
  },
  {
    icon: Zap,
    title: "Prise en charge rapide",
    description:
      "Diagnostic clair, delai annonce des le depart et reparations effectuees rapidement selon la panne et la piece.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie atelier",
    description:
      "Chaque intervention est controlee avant restitution avec un suivi serieux et une garantie adaptee a la reparation.",
  },
  {
    icon: HeadphonesIcon,
    title: "Accompagnement client",
    description:
      "Explications simples, conseils utiles et disponibilite apres intervention si vous avez besoin d'un suivi.",
  },
];

const figures = [
  { value: "10 000+", label: "appareils pris en charge" },
  { value: "24h", label: "delai moyen atelier" },
  { value: "6 mois", label: "garantie sur reparations" },
];

export default function WhyUs() {
  return (
    <section id="pourquoi" className="bg-[#f5f5f7] py-28">
      <div className="mx-auto max-w-[980px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Pourquoi nous choisir
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Un service plus clair, plus precis, plus rassurant.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-light text-muted-foreground">
            Une experience atelier pensee pour inspirer confiance avant, pendant
            et apres la reparation.
          </p>
        </motion.div>

        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between p-8 md:p-10"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Atelier iFreedy
                </p>
                <h3 className="mt-4 max-w-md text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  Une methode de travail premium inspiree de l&apos;univers Apple.
                </h3>
                <p className="mt-5 max-w-lg text-base leading-8 text-muted-foreground">
                  Chaque appareil est pris en charge avec une logique simple:
                  accueil, diagnostic, intervention, controle et restitution
                  propre. Le bloc carte mere parle de la technique. Ici, on met
                  en avant la qualite globale du service.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {figures.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-[#f5f5f7] px-5 py-6 text-center"
                  >
                    <div className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                      {item.value}
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="border-t border-border/70 bg-[linear-gradient(180deg,#fcfcfd_0%,#f7f7f9_100%)] p-8 md:p-10 lg:border-t-0 lg:border-l"
            >
              <div className="space-y-6">
                {reasons.map((reason, index) => {
                  const Icon = reason.icon;

                  return (
                    <div
                      key={reason.title}
                      className={`flex gap-4 ${
                        index !== reasons.length - 1
                          ? "border-b border-border/70 pb-6"
                          : ""
                      }`}
                    >
                      <div className="pt-1 text-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-[17px] font-semibold text-foreground">
                          {reason.title}
                        </h4>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative h-72 border-t border-border/70 md:h-96"
          >
            <img
              src="https://images.unsplash.com/photo-1746005718013-b24074afb701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              alt="Atelier iFreedy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
              <p className="mb-2 text-xs uppercase tracking-[0.26em] text-white/75">
                Notre atelier
              </p>
              <h3 className="max-w-xl text-2xl font-semibold tracking-tight md:text-3xl">
                Un environnement soigne, des gestes precis et une restitution a
                la hauteur de vos appareils.
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
