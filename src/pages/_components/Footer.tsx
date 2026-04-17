const locationUrl = "https://share.google/A13iUukS6ghnGd6VR";

const footerLinks = [
  {
    title: "Services",
    links: [
      "Reparation iPhone",
      "Reparation MacBook",
      "Reparation iPad",
      "Recuperation de donnees",
      "Degat des eaux",
    ],
  },
  {
    title: "Infos pratiques",
    links: [
      "Nos garanties",
      "Delais de reparation",
      "Devis gratuit",
      "Pieces certifiees",
    ],
  },
  {
    title: "Contact",
    links: [
      "Voir notre emplacement",
      "Numero a renseigner",
      "Email a renseigner",
      "Entreprise iFreedy",
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1d1d1f] text-white">
      <div className="mx-auto max-w-[980px] px-6 py-16">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center">
              <span className="text-[17px] font-semibold">iFreedy</span>
            </div>
            <p className="text-xs leading-relaxed text-white/50">
              iFreedy accompagne vos appareils Apple avec une approche premium:
              reparations iPhone, iPad, MacBook et recuperation de donnees.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    {link === "Voir notre emplacement" ? (
                      <a
                        href={locationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    ) : (
                      <span className="cursor-pointer text-sm text-white/70 transition-colors hover:text-white">
                        {link}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/40">
            Copyright {year} iFreedy. Tous droits reserves.
          </p>
          <div className="flex gap-5 text-xs text-white/40">
            <span className="cursor-pointer transition-colors hover:text-white/70">
              Mentions legales
            </span>
            <span className="cursor-pointer transition-colors hover:text-white/70">
              Politique de confidentialite
            </span>
            <span className="cursor-pointer transition-colors hover:text-white/70">
              CGV
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
