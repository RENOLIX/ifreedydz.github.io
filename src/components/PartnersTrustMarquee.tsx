import { motion } from "motion/react";
import { withSiteBase } from "@/lib/routing";

const partnerLogos = [
  {
    name: "Novo Nordisk",
    src: withSiteBase("images/partners/novo-nordisk.png"),
  },
  {
    name: "Yahiaoui Photogravure",
    src: withSiteBase("images/partners/yahiaoui-photogravure.png"),
  },
  {
    name: "Hydrapharm Group",
    src: withSiteBase("images/partners/hydrapharm-group.png"),
  },
  {
    name: "Icosnet",
    src: withSiteBase("images/partners/icosnet.png"),
  },
  {
    name: "Allegorie Group",
    src: withSiteBase("images/partners/allegorie-group.png"),
  },
  {
    name: "GE",
    src: withSiteBase("images/partners/ge.png"),
  },
];

const repeatedLogos = [...partnerLogos, ...partnerLogos];

export default function PartnersTrustMarquee() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Qui nous font confiance
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Des groupes, des industriels et des acteurs exigeants nous confient
            deja leurs besoins.
          </h2>
        </motion.div>

        <div className="partners-marquee relative overflow-hidden rounded-[34px] border border-border bg-[#f5f5f7] px-0 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.05)]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#f5f5f7] to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#f5f5f7] to-transparent md:w-24" />

          <div className="partners-marquee__track flex w-max items-center gap-5 px-5 md:gap-6 md:px-6">
            {repeatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                tabIndex={0}
                className="partners-marquee__item flex h-[106px] w-[220px] flex-none items-center justify-center rounded-[28px] border border-black/8 bg-white px-5 py-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)] outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 md:h-[118px] md:w-[250px]"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  decoding="async"
                  className="partners-marquee__image max-h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
