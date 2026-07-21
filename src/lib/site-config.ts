// Configuración central de la marca.
// Todo lo que lleva TODO acá es un placeholder: cuando se confirmen los
// datos reales de contacto y logística, se actualiza solo en este archivo
// y se propaga a todo el sitio.
export const siteConfig = {
  brandName: "Lulucha",
  tagline: "Streetwear y championes originales en Uruguay",
  description:
    "Ropa y championes traídos directo desde Chile: buzos, camperas, accesorios y sneakers, con envíos a todo Uruguay.",
  // TODO: reemplazar por el número real de WhatsApp del negocio (formato internacional, sin '+' ni espacios).
  whatsappNumber: "59899123456",
  // TODO: reemplazar por el usuario real de Instagram.
  instagramHandle: "lulucha",
  city: "Montevideo, Uruguay",
  currency: "UYU",
  locale: "es-UY",
  // TODO: reemplazar por el dominio real una vez que esté comprado y conectado.
  siteUrl: "https://tu-dominio.com",
  // TODO: reemplazar por el email real de contacto del negocio.
  contactEmail: "hola@tu-dominio.com",
  // TODO: confirmar si esto es real (local de retiro) o solo un dato de prueba.
  hasLocalPickup: false,
  pickupLocation: "Pocitos, Montevideo",
  // Mensajes del banner superior. Se muestran en loop.
  announcements: [
    "Envíos a todo Uruguay en 3-7 días hábiles",
    "Ropa y championes traídos directo desde Chile",
    "Cambios dentro de los 7 días con etiqueta puesta",
  ],
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
