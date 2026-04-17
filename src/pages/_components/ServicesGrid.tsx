import { motion } from "motion/react";
import {
  Battery,
  Droplets,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Reparation iPhone",
    description:
      "Ecran casse, batterie, camera, boutons, connecteur Lightning et USB-C. Tous modeles iPhone 6 a iPhone 16 Pro Max.",
    image:
      "https://images.unsplash.com/photo-1746005718007-2cc042848478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    tag: "Le + demande",
  },
  {
    icon: Monitor,
    title: "Reparation MacBook",
    description:
      "Dalle, clavier, carte mere, SSD, ventilateur. MacBook Air et Pro, iMac, Mac Mini. Diagnostic offert.",
    image:
      "https://images.unsplash.com/photo-1628251069007-b467f279337d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    icon: Tablet,
    title: "Reparation iPad",
    description:
      "Remplacement vitre et ecran OLED/LCD, connecteur, camera et batterie pour tous les modeles iPad.",
    image:
      "https://images.unsplash.com/photo-1746005514010-93d5fc20e85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    icon: HardDrive,
    title: "Recuperation de donnees",
    description:
      "Specialiste recuperation donnees Apple - iPhone noye, Mac qui ne demarre plus, SSD endommage. Taux de reussite 95%.",
    image:
      "https://images.unsplash.com/photo-1708264956639-4395da08a3c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    tag: "Expertise unique",
  },
  {
    icon: Battery,
    title: "Remplacement batterie",
    description:
      "Batterie originale Apple ou certifiee haute capacite. Autonomie retrouvee en 30 minutes, garantie 6 mois.",
  },
  {
    icon: Droplets,
    title: "Degat des eaux",
    description:
      "Nettoyage ultrasonique et reparation carte mere apres contact avec l'eau. Intervention rapide 24h.",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="bg-white py-28">
      <div className="mx-auto max-w-[980px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Nos services
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Tout pour vos appareils Apple.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-light text-muted-foreground">
            Des reparations rapides, des pieces de qualite, et une expertise
            certifiee sur toute la gamme Apple.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#f5f5f7] transition-transform duration-300 hover:scale-[1.02]"
              >
                {service.image ? (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover object-center saturate-0 transition-transform duration-500 group-hover:scale-105 group-hover:saturate-100"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  {service.tag ? (
                    <span className="mb-2 inline-block rounded-full bg-foreground px-2.5 py-0.5 text-xs font-semibold text-background">
                      {service.tag}
                    </span>
                  ) : null}
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                      <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <h3 className="text-[17px] font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
