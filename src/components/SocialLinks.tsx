import { Facebook, Instagram, Youtube } from "lucide-react";
import { siteContact } from "@/lib/site";

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3v10.2a3.8 3.8 0 1 1-2.8-3.67" />
      <path d="M14 4c1.15 2.1 2.95 3.4 5 3.6" />
    </svg>
  );
}

const socialItems = [
  {
    key: "instagram",
    label: "Instagram",
    href: siteContact.socialLinks.instagram,
    Icon: Instagram,
  },
  {
    key: "facebook",
    label: "Facebook",
    href: siteContact.socialLinks.facebook,
    Icon: Facebook,
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: siteContact.socialLinks.tiktok,
    Icon: TikTokIcon,
  },
  {
    key: "youtube",
    label: "YouTube",
    href: siteContact.socialLinks.youtube,
    Icon: Youtube,
  },
];

type SocialLinksProps = {
  variant?: "light" | "dark";
  className?: string;
};

export default function SocialLinks({
  variant = "light",
  className = "",
}: SocialLinksProps) {
  const linkClassName =
    variant === "dark"
      ? "border-white/12 bg-white/6 text-white/78 hover:border-white/22 hover:bg-white/10 hover:text-white"
      : "border-black/8 bg-white text-foreground/75 hover:border-black/14 hover:bg-[#f5f5f7] hover:text-foreground";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`.trim()}>
      {socialItems.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 ${linkClassName}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}
