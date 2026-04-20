import { MessageCircleMore } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter iFreedy sur WhatsApp"
      className="fixed bottom-5 left-5 z-[70] inline-flex items-center gap-3 rounded-full border border-white/45 bg-[linear-gradient(180deg,rgba(52,211,153,0.96),rgba(22,163,74,0.96))] px-4 py-3 text-white shadow-[0_18px_50px_rgba(22,163,74,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(22,163,74,0.38)]"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/28">
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_60%)]" />
        <MessageCircleMore className="relative h-5 w-5" />
      </span>
      <span className="hidden pr-1 text-sm font-semibold tracking-[0.02em] sm:block">
        WhatsApp
      </span>
    </a>
  );
}
