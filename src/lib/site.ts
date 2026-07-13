// Datos reales de contacto/reserva de MAJMA, compartidos entre la landing
// principal y el blog para que no puedan desincronizarse entre sí.

// Dominio real registrado por el propietario (majmacaceres.es, con
// majmacaceres.com también en cartera). Debe apuntar a este despliegue
// desde el proveedor (Arsys) para que las previews de redes sociales
// y el SEO usen la URL definitiva.
export const SITE_URL = "https://www.majmacaceres.es";

export const BOOKING_URL =
  "https://www.booking.com/hotel/es/apartamentos-turisticos-majma.es.html?aid=356980&label=gog235jc-10CAsoRkIdYXBhcnRhbWVudG9zLXR1cmlzdGljb3MtbWFqbWFIUlgDaEaIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4AoD4ktIGwAIB0gIkZWYxYTJmNDEtZDRkNy00MGU0LWE4NmYtOTc4YWU4Zjc5MDUy2AIB4AIB&sid=faf8b176b4cd575f70169e3f6ca21d42&dist=0&keep_landing=1&sb_price_type=total&type=total&";

export const PHONE_HUMAN = "722 24 74 36";
export const PHONE_TEL = "+34722247436";

/** Mensaje de WhatsApp por defecto, mostrado en el botón flotante, la barra
 * móvil, el hero y el chatbot — un único texto para que no queden mensajes
 * distintos según de dónde venga el clic. */
export const WA_DEFAULT_MESSAGE =
  "Hola, me gustaría consultar disponibilidad en MAJMA Cáceres.";
export const WA_URL = `https://wa.me/34722247436?text=${encodeURIComponent(WA_DEFAULT_MESSAGE)}`;

/** Enlace de WhatsApp con un mensaje que identifica el apartamento consultado
 * (botón "Consultar este apartamento" en Estancias). */
export function waLinkForApartment(apartmentName: string) {
  const text = `Hola, me gustaría consultar disponibilidad para el apartamento ${apartmentName}.`;
  return `https://wa.me/34722247436?text=${encodeURIComponent(text)}`;
}

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps?q=Calle+Cornudilla+3,+10003+C%C3%A1ceres,+Spain";

export const EASE = [0.22, 1, 0.36, 1] as const;
