export type RepairCategorySlug =
  | "telephone"
  | "tablette"
  | "apple-watch"
  | "ordinateur"
  | "mac"
  | "console";

export type RepairIssue = {
  slug: string;
  label: string;
  icon: string;
};

export type RepairModel = {
  slug: string;
  name: string;
  image: string;
  largeImage?: string;
};

export type RepairBrand = {
  slug: string;
  name: string;
  image: string;
  largeImage?: string;
  models: RepairModel[];
};

export type RepairCategory = {
  slug: RepairCategorySlug;
  name: string;
  title: string;
  heroImage: string;
  brands: RepairBrand[];
  issues: RepairIssue[];
};

const phoneIssues: RepairIssue[] = [
  { slug: "ecran-casse", label: "Ecran casse", icon: "smartphone" },
  { slug: "batterie-morte", label: "Batterie morte", icon: "battery" },
  { slug: "dos-casse", label: "Dos casse", icon: "shield-alert" },
  { slug: "lentille-camera", label: "Lentille camera", icon: "camera" },
  { slug: "probleme-charge", label: "Probleme de charge", icon: "plug-zap" },
  { slug: "ne-sallume-plus", label: "Ne s'allume plus", icon: "power" },
  { slug: "surchauffe", label: "Surchauffe", icon: "flame" },
  { slug: "reseau-wifi", label: "Reseau ou Wi-Fi", icon: "wifi" },
  { slug: "micro-hautparleur", label: "Micro / haut-parleur", icon: "volume-2" },
  { slug: "degat-liquide", label: "Degat liquide", icon: "droplets" },
  { slug: "autre", label: "Autre panne", icon: "circle-ellipsis" },
];

const tabletIssues: RepairIssue[] = [
  { slug: "vitre-ecran", label: "Vitre ou ecran", icon: "tablet" },
  { slug: "batterie", label: "Batterie", icon: "battery" },
  { slug: "connecteur", label: "Connecteur de charge", icon: "plug-zap" },
  { slug: "tactile", label: "Tactile defectueux", icon: "hand" },
  { slug: "camera", label: "Camera", icon: "camera" },
  { slug: "ne-sallume-plus", label: "Ne s'allume plus", icon: "power" },
  { slug: "blocage", label: "Tablette bloquee", icon: "lock" },
  { slug: "hautparleur", label: "Audio / haut-parleur", icon: "volume-2" },
  { slug: "degat-liquide", label: "Degat liquide", icon: "droplets" },
  { slug: "carte-mere", label: "Carte mere", icon: "cpu" },
  { slug: "autre", label: "Autre panne", icon: "circle-ellipsis" },
];

const watchIssues: RepairIssue[] = [
  { slug: "ecran", label: "Ecran fissure", icon: "watch" },
  { slug: "batterie", label: "Batterie faible", icon: "battery" },
  { slug: "charge", label: "Ne charge plus", icon: "plug-zap" },
  { slug: "couronne", label: "Couronne / bouton", icon: "rotate-cw" },
  { slug: "capteurs", label: "Capteurs", icon: "heart-pulse" },
  { slug: "micro-hautparleur", label: "Micro / son", icon: "volume-2" },
  { slug: "ne-sallume-plus", label: "Ne s'allume plus", icon: "power" },
  { slug: "reseau", label: "Bluetooth / reseau", icon: "wifi" },
  { slug: "degat-liquide", label: "Degat liquide", icon: "droplets" },
  { slug: "boitier", label: "Boitier abime", icon: "shield-alert" },
  { slug: "autre", label: "Autre panne", icon: "circle-ellipsis" },
];

const computerIssues: RepairIssue[] = [
  { slug: "ecran", label: "Ecran casse", icon: "monitor" },
  { slug: "clavier", label: "Clavier defectueux", icon: "keyboard" },
  { slug: "batterie", label: "Batterie / alimentation", icon: "battery" },
  { slug: "charge", label: "Probleme de charge", icon: "plug-zap" },
  { slug: "lent", label: "Ordinateur lent", icon: "gauge" },
  { slug: "ssd", label: "SSD / disque", icon: "hard-drive" },
  { slug: "carte-mere", label: "Carte mere", icon: "cpu" },
  { slug: "charniere", label: "Charniere / coque", icon: "wrench" },
  { slug: "degat-liquide", label: "Degat liquide", icon: "droplets" },
  { slug: "donnees", label: "Recuperation de donnees", icon: "database" },
  { slug: "autre", label: "Autre panne", icon: "circle-ellipsis" },
];

const macIssues: RepairIssue[] = [
  { slug: "ecran", label: "Ecran Retina", icon: "monitor" },
  { slug: "clavier-trackpad", label: "Clavier / trackpad", icon: "keyboard" },
  { slug: "batterie", label: "Batterie", icon: "battery" },
  { slug: "charge", label: "Charge / MagSafe / USB-C", icon: "plug-zap" },
  { slug: "ssd", label: "SSD / stockage", icon: "hard-drive" },
  { slug: "carte-mere", label: "Carte mere", icon: "cpu" },
  { slug: "degat-liquide", label: "Degat liquide", icon: "droplets" },
  { slug: "wifi-bluetooth", label: "Wi-Fi / Bluetooth", icon: "wifi" },
  { slug: "ventilation", label: "Ventilation / chauffe", icon: "fan" },
  { slug: "donnees", label: "Recuperation de donnees", icon: "database" },
  { slug: "autre", label: "Autre panne", icon: "circle-ellipsis" },
];

const consoleIssues: RepairIssue[] = [
  { slug: "hdmi-video", label: "Port HDMI / image", icon: "monitor" },
  { slug: "ne-sallume-plus", label: "Ne s'allume plus", icon: "power" },
  { slug: "surchauffe", label: "Surchauffe / ventilation", icon: "fan" },
  { slug: "lecteur-disque", label: "Lecteur disque", icon: "hard-drive" },
  { slug: "stockage", label: "Stockage / SSD", icon: "database" },
  { slug: "manette", label: "Connexion manette", icon: "wifi" },
  { slug: "reseau", label: "Reseau / Wi-Fi", icon: "wifi" },
  { slug: "mise-a-jour", label: "Blocage logiciel", icon: "lock" },
  { slug: "degat-liquide", label: "Degat liquide", icon: "droplets" },
  { slug: "autre", label: "Autre panne", icon: "circle-ellipsis" },
];

const applePhoneModels: RepairModel[] = [
  { slug: "iphone-8", name: "iPhone 8", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-8-new.jpg" },
  { slug: "iphone-8-plus", name: "iPhone 8 Plus", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-8-plus-new.jpg" },
  { slug: "iphone-x", name: "iPhone X", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-x.jpg" },
  { slug: "iphone-xr", name: "iPhone XR", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xr-new.jpg" },
  { slug: "iphone-xs", name: "iPhone XS", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xs-new.jpg" },
  { slug: "iphone-xs-max", name: "iPhone XS Max", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xs-max-new1.jpg" },
  { slug: "iphone-11", name: "iPhone 11", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg" },
  { slug: "iphone-11-pro", name: "iPhone 11 Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg" },
  { slug: "iphone-11-pro-max", name: "iPhone 11 Pro Max", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro-max-.jpg" },
  { slug: "iphone-se-2020", name: "iPhone SE 2020", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-se-2020.jpg" },
  { slug: "iphone-12-mini", name: "iPhone 12 mini", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-mini.jpg" },
  { slug: "iphone-12", name: "iPhone 12", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg" },
  { slug: "iphone-12-pro", name: "iPhone 12 Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro.jpg" },
  { slug: "iphone-12-pro-max", name: "iPhone 12 Pro Max", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro-max-.jpg" },
  { slug: "iphone-13-mini", name: "iPhone 13 mini", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg" },
  { slug: "iphone-13", name: "iPhone 13", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg" },
  { slug: "iphone-13-pro", name: "iPhone 13 Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg" },
  { slug: "iphone-13-pro-max", name: "iPhone 13 Pro Max", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg" },
  { slug: "iphone-se-2022", name: "iPhone SE 2022", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-se-2022.jpg" },
  { slug: "iphone-14", name: "iPhone 14", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14.jpg" },
  { slug: "iphone-14-plus", name: "iPhone 14 Plus", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-plus.jpg" },
  { slug: "iphone-14-pro", name: "iPhone 14 Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg" },
  { slug: "iphone-14-pro-max", name: "iPhone 14 Pro Max", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg" },
  { slug: "iphone-15", name: "iPhone 15", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg" },
  { slug: "iphone-15-plus", name: "iPhone 15 Plus", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-plus-.jpg" },
  { slug: "iphone-15-pro", name: "iPhone 15 Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg" },
  { slug: "iphone-15-pro-max", name: "iPhone 15 Pro Max", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg" },
  { slug: "iphone-16", name: "iPhone 16", image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-16.png" },
  { slug: "iphone-16-plus", name: "iPhone 16 Plus", image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121030-iphone-16-plus.png" },
  { slug: "iphone-16-pro", name: "iPhone 16 Pro", image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121031-iphone-16-pro.png" },
  { slug: "iphone-16-pro-max", name: "iPhone 16 Pro Max", image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121032-iphone-16-pro-max.png" },
  { slug: "iphone-17", name: "iPhone 17", image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-17-hero.png" },
  { slug: "iphone-17-pro", name: "iPhone 17 Pro", image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-17-pro-17-pro-max-hero.png" },
  { slug: "iphone-17-pro-max", name: "iPhone 17 Pro Max", image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-17-pro-17-pro-max-hero.png" },
];

const appleTabletModels: RepairModel[] = [
  { slug: "ipad-air-2", name: "iPad Air 2 (2014)", image: "https://support.apple.com/kb/sp708" },
  { slug: "ipad-mini-4", name: "iPad mini 4 (2015)", image: "https://support.apple.com/es-us/112002" },
  { slug: "ipad-pro-12-9-2015", name: "iPad Pro 12.9 (2015)", image: "https://support.apple.com/kb/SP723?locale=en_US" },
  { slug: "ipad-pro-9-7-2016", name: "iPad Pro 9.7 (2016)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-97.jpg" },
  { slug: "ipad-5-2017", name: "iPad 5 (2017)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-97-2017.jpg" },
  { slug: "ipad-pro-10-5-2017", name: "iPad Pro 10.5 (2017)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-105-2017.jpg" },
  { slug: "ipad-pro-12-9-2017", name: "iPad Pro 12.9 (2017)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-129-2017.jpg" },
  { slug: "ipad-6-2018", name: "iPad 6 (2018)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-97-2018.jpg" },
  { slug: "ipad-pro-11-2018", name: "iPad Pro 11 (2018)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-11-2018.jpg" },
  { slug: "ipad-pro-12-9-2018", name: "iPad Pro 12.9 (2018)", image: "https://support.apple.com/kb/SP785?locale=en_US" },
  { slug: "ipad-mini-5", name: "iPad mini 5 (2019)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-mini-2019.jpg" },
  { slug: "ipad-air-3", name: "iPad Air 3 (2019)", image: "https://support.apple.com/en-us/111939" },
  { slug: "ipad-7-2019", name: "iPad 7 (2019)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad7-102-inches.jpg" },
  { slug: "ipad-air-4", name: "iPad Air 4 (2020)", image: "https://support.apple.com/en-la/111905" },
  { slug: "ipad-8-2020", name: "iPad 8 (2020)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad8-102-inches-2020.jpg" },
  { slug: "ipad-pro-11-2021", name: "iPad Pro 11 (2021)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-11-2021.jpg" },
  { slug: "ipad-pro-12-9-2021", name: "iPad Pro 12.9 (2021)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-129-2021.jpg" },
  { slug: "ipad-9", name: "iPad 9 (2021)", image: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111898_sp849-ipad-9gen-480.png" },
  { slug: "ipad-mini-6", name: "iPad mini 6 (2021)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-mini-2021.jpg" },
  { slug: "ipad-air-5", name: "iPad Air 5 (2022)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air-2022-new.jpg" },
  { slug: "ipad-10", name: "iPad 10 (2022)", image: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111840_sp884-ipad-10gen-960.png" },
  { slug: "ipad-pro-11-2022", name: "iPad Pro 11 (2022)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-11-2022.jpg" },
  { slug: "ipad-pro-12-9-2022", name: "iPad Pro 12.9 (2022)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-129-2022.jpg" },
  { slug: "ipad-mini-a17-pro", name: "iPad mini (A17 Pro) (2024)", image: "https://support.apple.com/en-euro/121456" },
  { slug: "ipad-air-11-m2", name: "iPad Air 11 M2 (2024)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air-11-2024.jpg" },
  { slug: "ipad-air-13-m2", name: "iPad Air 13 M2 (2024)", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air-13-2024.jpg" },
  { slug: "ipad-pro-11-m4", name: "iPad Pro 11 M4 (2024)", image: "https://support.apple.com/en-us/119892" },
  { slug: "ipad-pro-13-m4", name: "iPad Pro 13 M4 (2024)", image: "https://support.apple.com/en-us/119892" },
  { slug: "ipad-a16", name: "iPad (A16) (2025)", image: "https://support.apple.com/en-us/122240" },
  { slug: "ipad-air-11-m3", name: "iPad Air 11 M3 (2025)", image: "https://support.apple.com/en-us/122241" },
  { slug: "ipad-air-13-m3", name: "iPad Air 13 M3 (2025)", image: "https://support.apple.com/122242" },
  { slug: "ipad-air-11-m4", name: "iPad Air 11 M4 (2026)", image: "https://support.apple.com/en-us/126471" },
  { slug: "ipad-air-13-m4", name: "iPad Air 13 M4 (2026)", image: "https://support.apple.com/en-us/126472" },
];

const macModels: RepairModel[] = [
  { slug: "macbook-12", name: "MacBook", image: "https://support.apple.com/es-us/111986" },
  { slug: "macbook-air", name: "MacBook Air", image: "https://support.apple.com/en-lamr/122210" },
  { slug: "macbook-pro", name: "MacBook Pro", image: "https://support.apple.com/en-lamr/121552" },
  { slug: "imac", name: "iMac", image: "https://www.apple.com/imac/" },
  { slug: "mac-pro", name: "Mac Pro", image: "https://www.apple.com/mac-pro/" },
];

const playstationModels: RepairModel[] = [
  {
    slug: "ps4",
    name: "PlayStation 4",
    image:
      "https://gmedia.playstation.com/is/image/SIEPDC/ps4-slim-image-block-01-en-24jul20?$1600px--t$",
  },
  {
    slug: "ps5",
    name: "PlayStation 5",
    image:
      "https://gmedia.playstation.com/is/image/SIEPDC/PS5-Slim-Beauty-image-block-01-en-27jan26?$1600px$",
  },
];

const xboxModels: RepairModel[] = [
  {
    slug: "xbox-series-x",
    name: "Xbox Series X",
    image:
      "https://assets.xboxservices.com/assets/3c/9b/3c9bce6a-acf7-481b-b2e6-d34cc9a6b311.jpg?n=XSX_Hero_768_Backward-Compatibility_1084x1561.jpg",
  },
  {
    slug: "xbox-series-s",
    name: "Xbox Series S",
    image:
      "https://assets.xboxservices.com/assets/b5/94/b59425a6-0ae3-46fb-b2f9-65e290a67eff.jpg?n=Xbox-Series-S_Bubbles-Super-Hero-768_1084x1300_02.jpg",
  },
  {
    slug: "xbox-one-x",
    name: "Xbox One X",
    image:
      "https://assets.xboxservices.com/assets/5f/71/5f718c07-e06f-41a4-b459-91d930f20135.jpg?n=X1X_Image_0_Console_1920x660.jpg",
  },
];

export const repairCategories: RepairCategory[] = [
  {
    slug: "telephone",
    name: "Reparation telephone",
    title: "Quel telephone souhaitez-vous faire reparer ?",
    heroImage: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-17-pro-17-pro-max-hero.png",
    issues: phoneIssues,
    brands: [
      {
        slug: "apple",
        name: "Apple",
        image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-17-pro-17-pro-max-hero.png",
        models: applePhoneModels,
      },
      {
        slug: "samsung",
        name: "Samsung",
        image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-ultra-sm-s938.jpg",
        models: [
          { slug: "galaxy-s25-ultra", name: "Galaxy S25 Ultra", image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-ultra-sm-s938.jpg" },
          { slug: "galaxy-s24-ultra", name: "Galaxy S24 Ultra", image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g-sm-s928.jpg" },
          { slug: "galaxy-s24", name: "Galaxy S24", image: "https://images.samsung.com/is/image/samsung/assets/us/smartphones/galaxy-s24/images/galaxy-s24-highlights-kv-v4.jpg?imbypass=true" },
          { slug: "galaxy-a55", name: "Galaxy A55", image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg" },
          { slug: "galaxy-z-fold6", name: "Galaxy Z Fold6", image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold6.jpg" },
          { slug: "galaxy-z-flip6", name: "Galaxy Z Flip6", image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip6.jpg" },
        ],
      },
      {
        slug: "google",
        name: "Google",
        image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-9-pro-xl-.jpg",
        largeImage:
          "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/P9P9PThumbnail_16x9_Opt2_2.width-1300.jpg",
        models: [
          {
            slug: "pixel-9-pro-xl",
            name: "Pixel 9 Pro XL",
            image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-9-pro-xl-.jpg",
            largeImage:
              "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/P9P9PThumbnail_16x9_Opt2_2.width-1300.jpg",
          },
          {
            slug: "pixel-9-pro",
            name: "Pixel 9 Pro",
            image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-9-pro-.jpg",
            largeImage:
              "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/P9P9PThumbnail_16x9_Opt2_2.width-1300.jpg",
          },
          {
            slug: "pixel-9",
            name: "Pixel 9",
            image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-9-.jpg",
            largeImage:
              "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/image_P9_2024Q2_Peony_LT_T-Shot_.width-1000.format-webp_SVFKGQ9.webp",
          },
          {
            slug: "pixel-8a",
            name: "Pixel 8a",
            image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8a.jpg",
            largeImage:
              "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/P9P9PThumbnail_16x9_Opt2_2.width-1300.jpg",
          },
        ],
      },
      {
        slug: "oppo",
        name: "Oppo",
        image: "https://fdn2.gsmarena.com/vv/bigpic/oppo-find-x8-pro.jpg",
        models: [
          { slug: "find-x8-pro", name: "Find X8 Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/oppo-find-x8-pro.jpg" },
          { slug: "reno13-pro", name: "Reno13 Pro", image: "https://www.oppo.com/content/dam/oppo/product-asset-library/reno/reno13-series/en/reno13-pro/purple-grey/v1/assets/images-design-color-2-img-s1-1.png.avif" },
          { slug: "reno12-f", name: "Reno12 F", image: "https://fdn2.gsmarena.com/vv/bigpic/oppo-reno12-f.jpg" },
          { slug: "a98", name: "Oppo A98", image: "https://fdn2.gsmarena.com/vv/bigpic/oppo-a98-5g.jpg" },
        ],
      },
      {
        slug: "huawei",
        name: "Huawei",
        image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-pura70-ultra.jpg",
        models: [
          { slug: "pura-70-ultra", name: "Pura 70 Ultra", image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-pura70-ultra.jpg" },
          { slug: "pura-70-pro", name: "Pura 70 Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-pura70-pro.jpg" },
          { slug: "mate-60-pro", name: "Mate 60 Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-60-pro.jpg" },
          { slug: "nova-12i", name: "Nova 12i", image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-nova-12i.jpg" },
        ],
      },
      {
        slug: "xiaomi",
        name: "Xiaomi",
        image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-ultra-new.jpg",
        models: [
          { slug: "xiaomi-14-ultra", name: "Xiaomi 14 Ultra", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-ultra-new.jpg" },
          { slug: "xiaomi-14", name: "Xiaomi 14", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14.jpg" },
          { slug: "xiaomi-14t-pro", name: "Xiaomi 14T Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14t-pro.jpg" },
          { slug: "xiaomi-13t-pro", name: "Xiaomi 13T Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-13t-pro.jpg" },
        ],
      },
      {
        slug: "redmi",
        name: "Redmi",
        image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-14-pro-plus-5g.jpg",
        models: [
          { slug: "redmi-note-14-pro-plus", name: "Redmi Note 14 Pro+", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-14-pro-plus-5g.jpg" },
          { slug: "redmi-note-14-pro", name: "Redmi Note 14 Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-14-pro-5g.jpg" },
          { slug: "redmi-note-13-pro-plus", name: "Redmi Note 13 Pro+", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro-plus.jpg" },
          { slug: "redmi-13c", name: "Redmi 13C", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-13c.jpg" },
        ],
      },
    ],
  },
  {
    slug: "tablette",
    name: "Reparation tablette",
    title: "Quelle tablette souhaitez-vous faire reparer ?",
    heroImage: "https://support.apple.com/en-us/122240",
    issues: tabletIssues,
    brands: [
      {
        slug: "apple",
        name: "Apple",
        image: "https://support.apple.com/en-us/122240",
        models: appleTabletModels,
      },
      {
        slug: "samsung",
        name: "Samsung",
        image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s10-ultra.jpg",
        models: [
          { slug: "galaxy-tab-s10-ultra", name: "Galaxy Tab S10 Ultra", image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s10-ultra.jpg" },
          { slug: "galaxy-tab-s9", name: "Galaxy Tab S9", image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9.jpg" },
          { slug: "galaxy-tab-s9-fe", name: "Galaxy Tab S9 FE", image: "https://images.samsung.com/is/image/samsung/assets/us/tablets/galaxy-tab-s9-fe/10052023/FT03-FeatureBenefit-FullBleed-Colors-TabS9FE-BASE-D-V3.jpg?$1440_N_JPG$" },
          { slug: "galaxy-tab-a9-plus", name: "Galaxy Tab A9+", image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-a9-plus.jpg" },
        ],
      },
      {
        slug: "huawei",
        name: "Huawei",
        image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-matepad-pro-132-2024.jpg",
        models: [
          { slug: "matepad-pro-13-2", name: "MatePad Pro 13.2", image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-matepad-pro-132-2024.jpg" },
          { slug: "matepad-11-5-s", name: "MatePad 11.5 S", image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-matepad-115-s.jpg" },
          { slug: "matepad-se-11", name: "MatePad SE 11", image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-matepad-se-11.jpg" },
        ],
      },
      {
        slug: "xiaomi",
        name: "Xiaomi",
        image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-pad-7-pro.jpg",
        models: [
          { slug: "pad-7-pro", name: "Xiaomi Pad 7 Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-pad-7-pro.jpg" },
          { slug: "pad-6s-pro", name: "Xiaomi Pad 6S Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-pad-6s-pro-124.jpg" },
          { slug: "redmi-pad-pro", name: "Redmi Pad Pro", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-pad-pro.jpg" },
        ],
      },
    ],
  },
  {
    slug: "apple-watch",
    name: "Reparation Apple Watch",
    title: "Quelle Apple Watch souhaitez-vous faire reparer ?",
    heroImage: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121202-apple-watch-series-10.png",
    issues: watchIssues,
    brands: [
      {
        slug: "apple",
        name: "Apple",
        image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121202-apple-watch-series-10.png",
        models: [
          { slug: "apple-watch-series-6", name: "Apple Watch Series 6", image: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111918_sp826-apple-watch-series6-580.png" },
          { slug: "apple-watch-series-7", name: "Apple Watch Series 7", image: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111909_series7-480.png" },
          { slug: "apple-watch-series-8", name: "Apple Watch Series 8", image: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111848_apple-watch-series8.png" },
          { slug: "apple-watch-series-9", name: "Apple Watch Series 9", image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/apple-watch-series-9.png" },
          { slug: "apple-watch-series-10", name: "Apple Watch Series 10", image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121202-apple-watch-series-10.png" },
          { slug: "apple-watch-se-2", name: "Apple Watch SE 2", image: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111853_apple-watch-se-2nd-gen.png" },
          { slug: "apple-watch-ultra", name: "Apple Watch Ultra", image: "https://fdn2.gsmarena.com/vv/bigpic/apple-watch-ultra.jpg" },
          { slug: "apple-watch-ultra-2", name: "Apple Watch Ultra 2", image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/111832-watch-ultra-2.png" },
        ],
      },
    ],
  },
  {
    slug: "ordinateur",
    name: "Reparation ordinateur",
    title: "Quel ordinateur souhaitez-vous faire reparer ?",
    heroImage: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9350/pdp/platinum/laptop-xps-13-9350-pdp-module4.psd?fmt=png-alpha&wid=5000&hei=3000",
    issues: computerIssues,
    brands: [
      {
        slug: "hp",
        name: "HP",
        image: "https://hp.widen.net/content/kc34yqpc9l/webp/kc34yqpc9l.png",
        models: [
          { slug: "spectre-x360", name: "HP Spectre x360", image: "https://hp.widen.net/content/kc34yqpc9l/webp/kc34yqpc9l.png" },
          { slug: "envy-15", name: "HP Envy 15", image: "https://hp.widen.net/content/mqcdbv52f0/webp/mqcdbv52f0.png" },
          { slug: "omen-16", name: "HP Omen 16", image: "https://hp.widen.net/content/wf0n7o2bmd/webp/wf0n7o2bmd.png" },
          { slug: "probook-450", name: "HP ProBook 450", image: "https://hp.widen.net/content/yj0jvnsres/webp/yj0jvnsres.png" },
        ],
      },
      {
        slug: "dell",
        name: "Dell",
        image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9350/pdp/platinum/laptop-xps-13-9350-pdp-module4.psd?fmt=png-alpha&wid=5000&hei=3000",
        models: [
          { slug: "xps-13", name: "Dell XPS 13", image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9350/pdp/platinum/laptop-xps-13-9350-pdp-module4.psd?fmt=png-alpha&wid=5000&hei=3000" },
          { slug: "xps-15", name: "Dell XPS 15", image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9350/pdp/platinum/laptop-xps-13-9350-pl-pdp-module1.psd?fmt=jpg&wid=5000&hei=2500" },
          { slug: "latitude-7440", name: "Dell Latitude 7440", image: "https://i.dell.com/sites/csimages/Video_Imagery/all/xps-9350-silver-thumb.png" },
          { slug: "g15", name: "Dell G15", image: "https://i.dell.com/sites/csimages/Video_Imagery/all/xps-9350-silver-thumb.png" },
        ],
      },
      {
        slug: "lenovo",
        name: "Lenovo",
        image: "https://p4-ofp.static.pub/ShareResource/na/products/thinkpad/560x450/lenovo-thinkpad-x1-carbon-g12-01.png",
        models: [
          { slug: "thinkpad-x1-carbon", name: "ThinkPad X1 Carbon", image: "https://p4-ofp.static.pub/ShareResource/na/products/thinkpad/560x450/lenovo-thinkpad-x1-carbon-g12-01.png" },
          { slug: "yoga-9i", name: "Lenovo Yoga 9i", image: "https://p2-ofp.static.pub/ShareResource/na/products/thinkpad/560x450/lenovo-thinkpad-x1-carbon-g12.png" },
          { slug: "legion-5", name: "Lenovo Legion 5", image: "https://p3-ofp.static.pub/ShareResource/na/products/thinkpad/560x450/lenovo-thinkpad-x1-carbon-g12-03.png" },
          { slug: "ideapad-5", name: "Lenovo IdeaPad 5", image: "https://p2-ofp.static.pub/ShareResource/na/products/thinkpad/560x450/lenovo-thinkpad-x1-carbon-g12-04.png" },
        ],
      },
      {
        slug: "asus",
        name: "Asus",
        image: "https://dlcdnwebimgs.asus.com/gain/282fa6b1-5d9e-4950-ab46-1da2defbe6a3/",
        models: [
          { slug: "zenbook-14", name: "Asus Zenbook 14", image: "https://press.asus.com/assets/w_1200,h_630/7395f95a-f24d-4def-83db-f2c612876ceb/Zenbook%2014%20OLED_UX3405_Scenario%20photo_03.JPG" },
          { slug: "rog-zephyrus-g14", name: "ROG Zephyrus G14", image: "https://dlcdnwebimgs.asus.com/gain/282fa6b1-5d9e-4950-ab46-1da2defbe6a3/" },
          { slug: "vivobook-15", name: "Asus VivoBook 15", image: "https://www.asus.com/media/Odin/Websites/us/ProductLine/20240409023703.png" },
          { slug: "tuf-a15", name: "Asus TUF A15", image: "https://www.asus.com/media/Odin/Websites/us/ProductLine/20240123121818.png" },
        ],
      },
      {
        slug: "acer",
        name: "Acer",
        image: "https://images.acer.com/is/image/acer/Swift%20Go%2014%20AI-3?$Series-Component-XL$",
        models: [
          { slug: "swift-5", name: "Acer Swift 5", image: "https://images.acer.com/is/image/acer/Swift%20Go%2014%20AI-3?$Series-Component-XL$" },
          { slug: "aspire-5", name: "Acer Aspire 5", image: "https://images.acer.com/is/image/acer/Acer-Aspire-14-AI?$Series-Component-XL$" },
          { slug: "nitro-5", name: "Acer Nitro 5", image: "https://images.acer.com/is/image/acer/Nitro-V-16-AI-Picanto_PTZ?$Series-Component-XL$" },
          { slug: "predator-helios-16", name: "Predator Helios 16", image: "https://images.acer.com/is/image/acer/predator-helios-16-ai-emira-arx-banner:Secondary-Hero-XL" },
        ],
      },
    ],
  },
  {
    slug: "mac",
    name: "Reparation Mac",
    title: "Quel Mac souhaitez-vous faire reparer ?",
    heroImage: "https://support.apple.com/en-lamr/122210",
    issues: macIssues,
    brands: [
      {
        slug: "apple",
        name: "Apple",
        image: "https://support.apple.com/en-lamr/122210",
        models: macModels,
      },
    ],
  },
  {
    slug: "console",
    name: "Reparation console",
    title: "Quelle console souhaitez-vous faire reparer ?",
    heroImage:
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$1600px$",
    issues: consoleIssues,
    brands: [
      {
        slug: "playstation",
        name: "PlayStation",
        image:
          "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$1600px$",
        models: playstationModels,
      },
      {
        slug: "xbox",
        name: "Xbox",
        image:
          "https://assets.xboxservices.com/assets/3c/9b/3c9bce6a-acf7-481b-b2e6-d34cc9a6b311.jpg?n=XSX_Hero_768_Backward-Compatibility_1084x1561.jpg",
        models: xboxModels,
      },
    ],
  },
];

export function getCategory(categorySlug: string) {
  return repairCategories.find((category) => category.slug === categorySlug);
}

export function getBrand(categorySlug: string, brandSlug: string) {
  return getCategory(categorySlug)?.brands.find((brand) => brand.slug === brandSlug);
}

export function getModel(categorySlug: string, brandSlug: string, modelSlug: string) {
  return getBrand(categorySlug, brandSlug)?.models.find((model) => model.slug === modelSlug);
}

