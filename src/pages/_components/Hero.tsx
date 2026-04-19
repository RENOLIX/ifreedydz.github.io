import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Threads from "@/components/effects/Threads";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white pt-14">
      <div className="absolute inset-0 opacity-[0.2]">
        <Threads
          amplitude={1}
          distance={0.1}
          enableMouseInteraction={false}
          threadColor={[0.18, 0.18, 0.2]}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,0,0,0.04),transparent)]" />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1746005718007-2cc042848478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(46px) saturate(0)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
          Service Apple a Cheraga
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-7xl"
        >
          Vos appareils Apple
          <br />
          <span className="font-light text-muted-foreground">
            entre de bonnes mains.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-2xl text-xl font-light leading-relaxed text-muted-foreground md:text-2xl"
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
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          {[
            { value: "10 000+", label: "reparations reussies" },
            { value: "98%", label: "de satisfaction client" },
            { value: "24h", label: "delai moyen" },
            { value: "6 mois", label: "de garantie" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-semibold text-foreground">
                {stat.value}
              </div>
              <div className="mt-0.5 text-xs uppercase tracking-wide">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
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
