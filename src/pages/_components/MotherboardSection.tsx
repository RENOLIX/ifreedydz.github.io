import { motion } from "motion/react";
import { Activity, CircuitBoard, ShieldCheck, Wrench } from "lucide-react";

const motherboardItems = [
  {
    icon: CircuitBoard,
    title: "Diagnostic carte mere",
    description:
      "Recherche de court-circuit, panne de demarrage, ligne d'alimentation et verification electronique complete.",
  },
  {
    icon: Wrench,
    title: "Microsoudure precise",
    description:
      "Intervention sur connecteurs, composants endommages, charge, tactile, affichage et problemes audio.",
  },
  {
    icon: Activity,
    title: "Degat liquide",
    description:
      "Nettoyage, stabilisation et tentative de remise en route apres oxydation ou infiltration.",
  },
  {
    icon: ShieldCheck,
    title: "Tests apres reparation",
    description:
      "Verification reseau, charge, affichage et fonctions critiques avant restitution de l'appareil.",
  },
];

export default function MotherboardSection() {
  return (
    <section id="carte-mere" className="bg-[#f5f5f7] py-28">
      <div className="mx-auto max-w-[980px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Specialite atelier
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Reparation de carte mere Apple.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-light text-muted-foreground">
            Une prise en charge adaptee aux pannes complexes sur iPhone, iPad,
            MacBook et autres appareils Apple qui demandent une intervention
            electronique avancee.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[28px] bg-white p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.04),transparent_30%)]" />
            <div className="relative flex h-full flex-col items-center justify-center gap-6 text-center">
              <img
                src="https://i.ibb.co/1frgk9xs/Chat-GPT-Image-20-avr-2026-01-26-12.png"
                alt="Carte mere Apple"
                className="h-auto w-full max-w-[260px] object-contain"
              />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Microsoudure
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  Atelier dedie aux reparations electroniques avancees.
                </h3>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {motherboardItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-2xl bg-white p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Icon className="h-5 w-5 text-foreground" />
                    <h3 className="text-[17px] font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
