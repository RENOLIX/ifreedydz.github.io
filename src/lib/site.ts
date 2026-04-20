export const siteContact = {
  storeName: "iFreedy",
  email: "ifreedy@hotmail.com",
  emailLabel: "Nous contacter par email",
  siteUrl: "https://ifreedy.com",
  mobile: "0554365512",
  landline: "028099148",
  whatsapp: "213554365512",
  address: "Amara, Rue Alioua Fodil, Cheraga 16014, Algerie",
  mapsUrl: "https://share.google/A13iUukS6ghnGd6VR",
  mapEmbedUrl:
    "https://www.google.com/maps?q=iFreedy%2C%20Amara%2C%20Rue%20Alioua%20Fodil%2C%20Cheraga%2016014%2C%20Algerie&z=16&output=embed",
  socialLinks: {
    instagram:
      "https://www.instagram.com/ifreedy_solutions?igsh=MXViOTBsNWJnYmRjNg==",
    tiktok:
      "https://www.tiktok.com/@ifreedysolutionsss?_r=1&_t=ZS-95aWk9TkuYr",
    facebook:
      "https://www.facebook.com/share/17vvQFzAPN/?mibextid=wwXIfr",
    youtube:
      "https://youtube.com/@ifreedysolutionss7638?si=yCZwWfBEuEet0OBi",
  },
};

export function buildWhatsAppUrl(message?: string) {
  const baseUrl = `https://wa.me/${siteContact.whatsapp}`;
  if (!message) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
