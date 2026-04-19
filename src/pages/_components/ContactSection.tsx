import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteContact } from "@/lib/site";

const contactItems = [
  { icon: Phone, label: "Mobile", value: siteContact.mobile },
  { icon: Phone, label: "Fixe", value: siteContact.landline },
  { icon: Mail, label: "Email", value: siteContact.email },
  { icon: MapPin, label: "Adresse", value: siteContact.address },
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
          className="mx-auto max-w-[900px] rounded-[32px] border border-border/70 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-5">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <Icon className="mt-0.5 h-5 w-5 text-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 text-base font-medium leading-7 text-foreground">
                      {value}
                    </p>
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

              <div className="flex flex-col gap-3 sm:flex-row">
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
