import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[108svh] flex-col items-center justify-center overflow-hidden bg-white px-0 pb-18 pt-14 md:min-h-[112svh] md:pb-24">
      <img
        src="https://i.ibb.co/zWQjTdcJ/Chat-GPT-Image-19-avr-2026-19-18-23.png"
        alt="Atelier iFreedy mobile"
        className="absolute inset-0 h-full w-full object-cover object-[center_46%] md:hidden"
      />
      <img
        src="https://i.ibb.co/7tnF64dS/Chat-GPT-Image-19-avr-2026-19-23-11.png"
        alt="Atelier iFreedy desktop"
        className="absolute inset-0 hidden h-full w-full object-cover object-[center_42%] md:block"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.36),rgba(0,0,0,0.48))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.14),transparent)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
          Service Apple a Cheraga
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-balance text-white md:text-7xl"
          style={{ textShadow: "0 0 24px rgba(255,255,255,0.22), 0 12px 30px rgba(0,0,0,0.48)" }}
        >
          Vos appareils Apple
          <br />
          <span className="font-light text-white/90">
            entre de bonnes mains.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-2xl text-xl font-light leading-relaxed text-white/92 md:text-2xl"
          style={{ textShadow: "0 8px 22px rgba(0,0,0,0.48)" }}
        >
          iFreedy prend en charge la reparation iPhone, iPad, MacBook et la
          recuperation de donnees avec une expertise dediee a l&apos;univers
          Apple.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="cursor-pointer rounded-full bg-foreground px-8 py-3.5 text-base font-medium text-background shadow-sm transition-all hover:bg-foreground/85"
          >
            Prendre rendez-vous
          </a>
          <a
            href="#services"
            className="cursor-pointer rounded-full border border-border bg-secondary px-8 py-3.5 text-base font-medium text-foreground transition-all hover:bg-border/40"
          >
            Nos services
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/85"
        >
          {[
            { value: "10 000+", label: "reparations reussies" },
            { value: "98%", label: "de satisfaction client" },
            { value: "24h", label: "delai moyen" },
            { value: "6 mois", label: "de garantie" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-semibold text-white"
                style={{ textShadow: "0 10px 24px rgba(0,0,0,0.45)" }}
              >
                {stat.value}
              </div>
              <div className="mt-0.5 text-xs uppercase tracking-wide text-white/80">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/85"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
