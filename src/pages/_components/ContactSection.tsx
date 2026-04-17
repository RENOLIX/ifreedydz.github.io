import { motion } from "motion/react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const locationUrl = "https://share.google/A13iUukS6ghnGd6VR";

const infos = [
  {
    icon: MapPin,
    label: "Emplacement",
    value: "Voir notre emplacement Google Maps",
  },
  { icon: Phone, label: "Telephone", value: "Numero a renseigner" },
  { icon: Mail, label: "Email", value: "Email a renseigner" },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun-Sam  9h-19h · Dim  10h-17h",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#f5f5f7] py-28">
      <div className="mx-auto max-w-[980px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Nous contacter
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Prenez rendez-vous.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-light text-muted-foreground">
            Deposez votre appareil en boutique ou envoyez-nous un message. Nous
            vous repondons dans l&apos;heure.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-white p-8"
          >
            <h3 className="mb-6 text-[17px] font-semibold">
              Envoyez un message
            </h3>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Prenom
                  </label>
                  <input
                    type="text"
                    placeholder="Jean"
                    className="w-full rounded-xl bg-[#f5f5f7] px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-foreground/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Nom
                  </label>
                  <input
                    type="text"
                    placeholder="Dupont"
                    className="w-full rounded-xl bg-[#f5f5f7] px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-foreground/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="jean@example.com"
                  className="w-full rounded-xl bg-[#f5f5f7] px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-foreground/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Appareil et probleme
                </label>
                <input
                  type="text"
                  placeholder="Ex: iPhone 15 Pro, ecran casse"
                  className="w-full rounded-xl bg-[#f5f5f7] px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-foreground/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Decrivez votre probleme..."
                  className="w-full resize-none rounded-xl bg-[#f5f5f7] px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-foreground/20"
                />
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer rounded-full bg-foreground py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
              >
                Envoyer le message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="space-y-5 rounded-2xl bg-white p-6">
              {infos.map(({ icon: Icon, label, value }) => {
                const content =
                  label === "Emplacement" ? (
                    <a
                      href={locationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:text-foreground/70"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{value}</p>
                  );

                return (
                  <div key={label} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#f5f5f7]">
                      <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs text-muted-foreground">
                        {label}
                      </p>
                      {content}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative min-h-40 flex-1 overflow-hidden rounded-2xl bg-[#e8e8ed]">
              <img
                src="https://images.unsplash.com/photo-1611433965582-de98df4da7ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600"
                alt="Boutique iFreedy"
                className="h-full w-full object-cover saturate-0 opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-white/90 px-6 py-4 text-center shadow backdrop-blur-sm transition-transform hover:scale-[1.02]"
                >
                  <MapPin className="mx-auto mb-1 h-5 w-5 text-foreground" />
                  <p className="text-sm font-semibold">iFreedy</p>
                  <p className="text-xs text-muted-foreground">
                    Ouvrir notre emplacement
                  </p>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
