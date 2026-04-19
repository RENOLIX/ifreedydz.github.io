import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const brandLogo =
  "https://i.ibb.co/nMN7s0zm/Whats-App-Image-2026-04-16-at-18-45-45.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const homeBase = import.meta.env.BASE_URL || "/";
  const links = [
    { label: "Services", href: `${homeBase}#services` },
    { label: "Pourquoi nous", href: `${homeBase}#pourquoi` },
    { label: "Avis", href: `${homeBase}#avis` },
    { label: "Contact", href: `${homeBase}#contact` },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[980px] mx-auto px-6 h-14 flex items-center justify-between">
        <a href={homeBase} className="flex items-center select-none">
          <img
            src={brandLogo}
            alt="Logo iFreedy"
            className="h-9 w-auto object-contain"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={`${homeBase}#contact`}
          className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/80 transition-colors cursor-pointer"
        >
          Prendre RDV
        </a>

        <button
          className="md:hidden cursor-pointer p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-border"
          >
            <div className="max-w-[980px] mx-auto px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base text-foreground py-1 cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`${homeBase}#contact`}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                Prendre RDV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
