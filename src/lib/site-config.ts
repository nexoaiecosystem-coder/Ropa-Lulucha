// Configuración central de la marca.
// Todo lo que lleva TODO acá es un placeholder: cuando se defina el nombre,
// el logo y los datos reales de contacto, se actualiza solo en este archivo
// y se propaga a todo el sitio.
export const siteConfig = {
  // TODO: reemplazar por el nombre definitivo de la marca.
  brandName: "Nombre de Marca",
  tagline: "Ropa y sneakers originales en Uruguay",
  description:
    "Vendemos ropa y calzado originales de marcas como Nike, Adidas y Jordan, con envíos a todo Uruguay.",
  // TODO: reemplazar por el número real de WhatsApp del negocio (formato internacional, sin '+' ni espacios).
  whatsappNumber: "59899123456",
  // TODO: reemplazar por el usuario real de Instagram.
  instagramHandle: "nombredemarca",
  city: "Montevideo, Uruguay",
  currency: "UYU",
  locale: "es-UY",
};

export function formatPrice(amount: number) {
  return new Intl.NumberFormat(siteConfig.locale, {
    style: "currency",
    currency: siteConfig.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function buildInstagramLink() {
  return `https://instagram.com/${siteConfig.instagramHandle}`;
}
