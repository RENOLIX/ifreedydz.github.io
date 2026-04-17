import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie M.",
    role: "iPhone 15 Pro",
    quote:
      "Ecran remplace dans la journee, accueil tres propre et explications claires. Le site donne exactement l'image de la boutique.",
  },
  {
    name: "Karim B.",
    role: "MacBook Pro",
    quote:
      "Ils ont recupere mes donnees alors que mon Mac ne demarrait plus. Travail serieux, rapide et tres rassurant.",
  },
  {
    name: "Claire D.",
    role: "iPad Air",
    quote:
      "Prise en charge fluide, devis rapide et resultat nickel. On sent un vrai positionnement premium du debut a la fin.",
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
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {item.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
