import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aimir Maouche",
    quote:
      "J'ai fais 800 km pour venir jusqu'ici depuis Tebessa il a pu regler mon probleme en seulement 30 minutes. L'equipe est professionnelle et tres sympathique encore merci a Nabil pour son travail !!!",
  },
  {
    name: "Yasmine",
    quote:
      "Je recommande a mille pour cent, son professionnalisme m'a reellement impressionnee : diagnostic clair, explications precises et travail soigne du debut a la fin. Il respecte les delais annonces, tient ses engagements et reste disponible en cas de questions. C'est rare de trouver quelqu'un de serieux, fiable et aussi competent. Je le recommande vivement a toute personne qui cherche un reparateur de confiance.",
  },
  {
    name: "Fahed Berghiche",
    quote:
      "Personne tres honnete et professionnelle. Alors que d'autres demandaient des prix exorbitants pour la reparation de mon telephone, ici tout a ete fait en une heure, avec un prix imbattable. Travail rapide, efficace et transparent. Je recommande vivement.",
  },
];

export default function Testimonials() {
  return (
    <section id="avis" className="bg-white py-28">
      <div className="mx-auto max-w-[980px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Avis clients
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Une confiance qui se voit dans chaque retour.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-light text-muted-foreground">
            Des particuliers, independants et professionnels nous confient
            leurs appareils Apple pour des reparations fines et une recuperation
            de donnees sans stress.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl bg-[#f5f5f7] p-6"
            >
              <div className="mb-4 flex gap-1 text-foreground">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={`${item.name}-${starIndex}`}
                    className="h-4 w-4 fill-current"
                  />
                ))}
              </div>
              <p className="text-sm leading-7 text-foreground/80">
                &quot;{item.quote}&quot;
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">
                  {item.name}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
