import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import { siteContact } from "@/lib/site";

const contactItems = [
  {
    icon: Phone,
    label: "Mobile",
    value: siteContact.mobile,
    href: `tel:${siteContact.mobile}`,
  },
  {
    icon: Phone,
    label: "Fixe",
    value: siteContact.landline,
    href: `tel:${siteContact.landline}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteContact.email,
    href: `mailto:${siteContact.email}`,
  },
  { icon: MapPin, label: "Adresse", value: siteContact.address, href: siteContact.mapsUrl },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#f5f5f7] py-24">
      <div className="mx-auto max-w-[980px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Contact
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Un atelier Apple a votre ecoute.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-light text-muted-foreground">
            Appelez-nous, ouvrez l&apos;emplacement ou passez directement a
            l&apos;atelier pour une prise en charge rapide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[1120px] rounded-[32px] border border-border/70 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col gap-6">
              <div className="space-y-5 rounded-[28px] bg-[#f5f5f7] p-6">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <Icon className="mt-0.5 h-5 w-5 text-foreground" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {label}
                      </p>
                      <a
                        href={href}
                        target={label === "Adresse" ? "_blank" : undefined}
                        rel={label === "Adresse" ? "noreferrer" : undefined}
                        className="mt-1 inline-block text-base font-medium leading-7 text-foreground transition-colors hover:text-foreground/70"
                      >
                        {value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex min-h-[260px] flex-col justify-between rounded-[28px] bg-[#f5f5f7] p-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Horaires
                  </p>
                  <p className="mt-3 text-base leading-8 text-foreground">
                    Samedi a Jeudi: 08:30 - 18:00
                    <br />
                    Vendredi: ferme
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={`tel:${siteContact.mobile}`}
                    className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/85"
                  >
                    Appeler l&apos;atelier
                  </a>
                  <a
                    href={`mailto:${siteContact.email}`}
                    className="inline-flex items-center justify-center rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/70"
                  >
                    Envoyer un email
                  </a>
                  <a
                    href={siteContact.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/70"
                  >
                    Ouvrir Maps
                  </a>
                </div>

                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Suivez iFreedy
                  </p>
                  <SocialLinks />
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-[#f5f5f7]">
              <iframe
                title={`Carte ${siteContact.storeName}`}
                src={siteContact.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0 md:h-full md:min-h-[360px]"
              />

              <div className="pointer-events-none absolute left-4 top-4 rounded-2xl bg-white/92 px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {siteContact.storeName}
                    </p>
                    <p className="mt-1 max-w-[220px] text-xs leading-5 text-muted-foreground">
                      {siteContact.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
