// Blog de la Guía de Cáceres — pensado para captar tráfico de búsquedas
// informativas ("qué hacer en Cáceres", "dónde aparcar en Cáceres"...) y
// convertir a esos lectores en reservas directas vía el CTA de cada artículo.
//
// Todo el contenido reutiliza hechos ya verificados en content.ts (guia.groups
// y guia.radarPoints) — no se ha inventado ningún dato nuevo. Las imágenes de
// portada reutilizan las 2 fotos reales disponibles del proyecto; el
// propietario puede sustituirlas por fotos específicas de cada tema más
// adelante.

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  coverImage: "hero" | "skyline" | "map";
  coverAlt: string;
  publishedDate: string; // ISO
  readTime: number; // minutos
  tag: string;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "que-hacer-en-caceres-en-un-fin-de-semana",
    title: "Qué hacer en Cáceres en un fin de semana: itinerario a pie",
    metaDescription:
      "Itinerario completo para ver lo esencial de Cáceres en dos días, todo a pie desde el casco histórico: Plaza Mayor, Torre de Bujaco, el aljibe árabe y el Barrio Judío.",
    excerpt:
      "Todo lo esencial del casco histórico se recorre a pie en un fin de semana. Este es el itinerario, hora a hora.",
    coverImage: "hero",
    coverAlt: "Casco histórico de Cáceres al atardecer",
    publishedDate: "2026-06-01",
    readTime: 6,
    tag: "Itinerarios",
    body: [
      {
        type: "p",
        text: "Cáceres se recorre entera a pie. No hace falta coche ni transporte público: desde el casco histórico, prácticamente todo lo esencial está a menos de diez minutos caminando. Este itinerario reparte lo imprescindible en un fin de semana, sin prisas.",
      },
      { type: "h2", text: "Sábado por la mañana: Plaza Mayor y Torre de Bujaco" },
      {
        type: "p",
        text: "Empieza en la Plaza Mayor, el salón de la ciudad, animado a cualquier hora del día. Desde ahí, el Arco de la Estrella —la puerta monumental de entrada al casco antiguo— te lleva directo a la Torre de Bujaco, la atalaya que vigila la plaza desde lo alto (2,50 €, de 10:00 a 14:00 y por la tarde; cerrada los martes).",
      },
      { type: "h2", text: "Sábado a mediodía: el Museo de Cáceres y su aljibe árabe" },
      {
        type: "p",
        text: "El Museo de Cáceres ocupa un palacio del siglo XVI construido sobre un aljibe árabe — uno de los mejor conservados que existen, con sus arcos de herradura reflejados en el agua. Entrada a 1,20 €, gratis los domingos y para menores de 18 años; cerrado los lunes.",
      },
      { type: "h2", text: "Sábado por la tarde: Barrio Judío" },
      {
        type: "p",
        text: "Las calles estrechas del trazado medieval del Barrio Judío —la Judería Vieja— contrastan con la sobriedad de piedra del resto del casco: casitas blancas y callejones con desnivel, de acceso libre todo el día.",
      },
      { type: "h2", text: "Domingo: Concatedral de Santa María y Plaza de San Jorge" },
      {
        type: "p",
        text: "La Concatedral de Santa María, en su plaza homónima junto al Palacio de Mayoralgo, merece la subida a la torre para ver la ciudad «a vista de cigüeña». De camino, la Plaza de San Jorge —una escalinata escondida a los pies de la muralla— y el Foro de los Balbos, uno de los mejores miradores sobre la muralla, cierran el fin de semana.",
      },
      {
        type: "list",
        items: [
          "Iglesia de San Juan — 2 min a pie desde MAJMA",
          "Barrio Judío — 4 min a pie",
          "Museo de Cáceres — 5 min a pie",
          "Plaza Mayor y Plaza de San Jorge — 6 min a pie",
          "Torre de Bujaco — 6 min a pie",
          "Arco de la Estrella y Concatedral de Santa María — 7 min a pie",
          "Foro de los Balbos — 8 min a pie",
        ],
      },
    ],
  },
  {
    slug: "donde-comer-en-caceres",
    title: "Dónde comer en Cáceres: de las tapas a las 2 estrellas Michelin",
    metaDescription:
      "Guía de restaurantes en Cáceres para todos los presupuestos: tapeo en la Plaza Mayor, cocina tradicional extremeña desde 1947 y alta cocina con 2 estrellas Michelin.",
    excerpt:
      "Desde el bizcocho de migas de la Plaza Mayor hasta las 2 estrellas Michelin de Atrio: así se come en Cáceres.",
    coverImage: "skyline",
    coverAlt: "Vistas panorámicas de Cáceres",
    publishedDate: "2026-06-08",
    readTime: 5,
    tag: "Gastronomía",
    body: [
      {
        type: "p",
        text: "Cáceres tiene una escena gastronómica que va del tapeo de toda la vida a una de las mesas más reconocidas de España. Esta es una selección honesta, para cualquier presupuesto.",
      },
      { type: "h2", text: "Tapeo en la Plaza Mayor" },
      {
        type: "p",
        text: "La Minerva (Solete Repsol) ofrece desde jamón ibérico hasta un canelón de pato. A pocos pasos, Tapería Boss ha hecho de su bizcocho de migas extremeñas con huevo de codorniz una firma propia.",
      },
      { type: "h2", text: "Cocina tradicional con historia" },
      {
        type: "p",
        text: "El Figón de Eustaquio, en la Plaza de San Juan, es una institución de cocina tradicional cacereña desde 1947 — a un paso de MAJMA.",
      },
      { type: "h2", text: "Alta cocina" },
      {
        type: "p",
        text: "Torre de Sande propone cocina moderna dentro de una torre del siglo XV (1 Sol Repsol). Y Atrio, en la Plaza de San Mateo, es alta vanguardia gastronómica mundial: 3 Soles Repsol y 2 estrellas Michelin.",
      },
      { type: "h2", text: "Para el café y el dulce" },
      {
        type: "p",
        text: "Zeris Coffee es la parada de café de especialidad del casco histórico — buen momento para probar también las yemas de San Pablo o los dulces de las monjas Jerónimas.",
      },
    ],
  },
  {
    slug: "caceres-patrimonio-de-la-humanidad",
    title: "Cáceres Patrimonio de la Humanidad: por qué esta ciudad amurallada merece un viaje",
    metaDescription:
      "Cáceres es Patrimonio de la Humanidad desde 1986. Descubre por qué su ciudad monumental amurallada, su aljibe árabe y su Judería Vieja son de visita obligada.",
    excerpt:
      "Declarada Patrimonio de la Humanidad en 1986, la ciudad monumental de Cáceres conserva uno de los cascos históricos amurallados mejor preservados de Europa.",
    coverImage: "hero",
    coverAlt: "Torres y murallas del casco histórico de Cáceres",
    publishedDate: "2026-06-15",
    readTime: 4,
    tag: "Historia",
    body: [
      {
        type: "p",
        text: "La UNESCO declaró Cáceres Patrimonio de la Humanidad en 1986, reconociendo un casco histórico amurallado que mezcla huellas romanas, islámicas, góticas y renacentistas sin apenas alteraciones desde la Edad Media.",
      },
      { type: "h2", text: "Una muralla que sigue en pie" },
      {
        type: "p",
        text: "El Arco de la Estrella y la Torre de Bujaco flanquean la entrada monumental a la Plaza Mayor — la puerta de acceso a un recinto amurallado que se camina entero en minutos.",
      },
      { type: "h2", text: "El aljibe árabe mejor conservado" },
      {
        type: "p",
        text: "Bajo el Museo de Cáceres, el aljibe árabe conserva sus arcos de herradura casi intactos, reflejados en el agua — uno de los mejor conservados del mundo.",
      },
      { type: "h2", text: "La Judería Vieja" },
      {
        type: "p",
        text: "El Barrio Judío conserva el trazado medieval de calles estrechas y casitas blancas, en marcado contraste con la piedra noble del resto del casco.",
      },
      {
        type: "p",
        text: "Todo esto —murallas, aljibe, judería— se ve a pie, sin prisa, en un fin de semana. MAJMA está a dos minutos andando de la Iglesia de San Juan, dentro del propio recinto amurallado.",
      },
    ],
  },
  {
    slug: "como-aparcar-en-el-casco-historico-de-caceres",
    title: "Cómo aparcar en el casco histórico de Cáceres: guía práctica",
    metaDescription:
      "Guía práctica para aparcar en Cáceres: el casco histórico tiene acceso restringido. Estas son las opciones de parking, de pago y gratuitas, más cercanas al centro.",
    excerpt:
      "La Ciudad Monumental de Cáceres es de acceso restringido. Estas son las opciones reales para dejar el coche cerca, de pago y gratuitas.",
    coverImage: "map",
    coverAlt: "Plano del casco histórico de Cáceres",
    publishedDate: "2026-06-22",
    readTime: 4,
    tag: "Información práctica",
    body: [
      {
        type: "p",
        text: "La Ciudad Monumental de Cáceres está vigilada por cámaras de la Policía Local: solo entran residentes y taxis. Si vienes en coche, esto es lo que necesitas saber antes de llegar.",
      },
      { type: "h2", text: "Parking Obispo Galarza (recomendado)" },
      {
        type: "p",
        text: "La opción más cómoda: 12,45 €/día, con un ascensor público que deja directamente en la Plaza Mayor en un par de minutos.",
      },
      { type: "h2", text: "Alternativas gratuitas o más económicas" },
      {
        type: "list",
        items: [
          "Barrio de San Blas — 5-8 min a pie, gratis. Calle Trujillo y alrededores de la Plaza de las Canterías; fácil encontrar hueco entre semana.",
          "Parque de Cánovas — 10 min a pie. Zona azul entre semana (menos de 0,60 €/hora); gratis sábados, domingos y festivos.",
          "Plaza de Italia — gratis, junto a la entrada superior del parking Galarza, con el mismo ascensor a la Plaza Mayor.",
        ],
      },
      { type: "h2", text: "Si llegas con maletas o en taxi" },
      {
        type: "p",
        text: "Para descargar equipaje dentro del recinto, avisa con antelación: se gestiona un permiso temporal con tu matrícula para entrar unos minutos, cargar o descargar, y salir.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
