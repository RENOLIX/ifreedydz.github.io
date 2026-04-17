import { motion } from "motion/react";
import { Award, HeadphonesIcon, ShieldCheck, Zap } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Techniciens certifies",
    description:
      "Notre equipe est formee et certifiee sur toute la gamme Apple. Chaque reparation est realisee avec des outils professionnels agrees.",
  },
  {
    icon: Zap,
    title: "Reparation express",
    description:
      "La majorite de nos reparations sont effectuees le jour meme, souvent en moins d'une heure. Vous attendez sur place ou nous vous rappelons.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie 6 mois",
    description:
      "Toutes nos reparations sont garanties 6 mois pieces et main d'oeuvre. Si un probleme survient, on s'en occupe sans frais supplementaires.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support apres reparation",
    description:
      "Notre equipe reste disponible apres votre passage pour repondre a vos questions et vous accompagner si necessaire.",
  },
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
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Pourquoi nous choisir
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            L&apos;excellence, a chaque reparation.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-5 rounded-2xl bg-white p-8"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#f5f5f7]">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="mb-2 text-[17px] font-semibold">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mt-6 h-72 overflow-hidden rounded-2xl md:h-96"
        >
          <img
            src="https://images.unsplash.com/photo-1746005718013-b24074afb701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            alt="Reparation professionnelle"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-8">
            <div className="text-white">
              <p className="mb-1 text-xs uppercase tracking-widest opacity-80">
                Notre atelier
              </p>
              <h3 className="text-2xl font-semibold md:text-3xl">
                Un environnement pense pour la precision.
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
