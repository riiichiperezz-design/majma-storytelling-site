// Blog de la Guía de Cáceres — pensado para captar tráfico de búsquedas
// informativas ("qué hacer en Cáceres", "dónde aparcar en Cáceres", "mejores
// miradores de Cáceres"...) y convertir a esos lectores en reservas directas
// vía el CTA de cada artículo.
//
// Todo el contenido reutiliza hechos ya verificados en content.ts (guia.groups,
// guia.radarPoints, territorio.facts) — no se ha inventado ningún dato nuevo.
// Cada artículo está estructurado para SEO: título y meta description con la
// keyword objetivo, H2 que responden preguntas reales de búsqueda, un bloque
// de preguntas frecuentes (alimenta también el schema FAQPage de la página)
// y enlaces internos a otros artículos y a la reserva. Las imágenes de
// portada reutilizan fotos reales ya disponibles del proyecto; el
// propietario puede sustituirlas por fotos específicas de cada tema más
// adelante.

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "tip"; text: string }
  | { type: "faq"; items: { q: string; a: string }[] }
  | { type: "link"; text: string; slug: string };

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  coverImage: "hero" | "skyline" | "map" | "vistas" | "mirador" | "torreBujaco" | "postre";
  coverAlt: string;
  publishedDate: string; // ISO
  updatedDate?: string; // ISO — para señalar contenido revisado/actualizado
  readTime: number; // minutos
  tag: string;
  /** 3-4 datos clave, verificados, para el bloque "En resumen" al inicio del artículo. */
  quickFacts: string[];
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "que-hacer-en-caceres-en-un-fin-de-semana",
    title: "Qué hacer en Cáceres en un fin de semana: itinerario completo a pie",
    metaDescription:
      "Qué hacer en Cáceres en un fin de semana: itinerario hora a hora por la Plaza Mayor, la Torre de Bujaco, el aljibe árabe y el Barrio Judío, todo a pie por el casco histórico.",
    excerpt:
      "Todo lo esencial del casco histórico se recorre a pie en un fin de semana. Este es el itinerario, hora a hora, con horarios y precios reales.",
    coverImage: "torreBujaco",
    coverAlt: "Torre de Bujaco y Plaza Mayor de Cáceres al atardecer",
    publishedDate: "2026-06-01",
    updatedDate: "2026-07-01",
    readTime: 7,
    tag: "Itinerarios",
    quickFacts: [
      "Ciudad Patrimonio de la Humanidad desde 1986",
      "3.º conjunto monumental medieval mejor conservado de Europa, tras Praga y Tallin",
      "Todo el casco histórico se recorre a pie en un fin de semana, sin coche",
    ],
    body: [
      {
        type: "p",
        text: "Si te preguntas qué hacer en Cáceres en un fin de semana, la buena noticia es que la ciudad entera se recorre a pie. No hace falta coche ni transporte público: desde el casco histórico, prácticamente todo lo esencial está a menos de diez minutos caminando. Este itinerario reparte lo imprescindible en dos días, sin prisas y con los horarios y precios reales de cada monumento.",
      },
      { type: "h2", text: "¿Cuántos días se necesitan para visitar Cáceres?" },
      {
        type: "p",
        text: "Con un fin de semana —dos días completos— ves lo esencial del casco histórico sin agobios: la Plaza Mayor y su entrada monumental, el aljibe árabe del Museo de Cáceres, el Barrio Judío y los principales templos y miradores. Cáceres es el 3.º conjunto monumental medieval mejor conservado de Europa, solo por detrás de Praga y Tallin, así que si dispones de más tiempo, merece la pena alargar la visita con calma.",
      },
      { type: "h2", text: "Día 1, mañana: Plaza Mayor y Torre de Bujaco" },
      {
        type: "p",
        text: "Empieza en la Plaza Mayor, el salón de la ciudad, animado a cualquier hora del día y de acceso libre y gratuito. Desde ahí, el Arco de la Estrella —la puerta monumental de entrada al casco antiguo, también de acceso libre— te lleva directo a la Torre de Bujaco, la atalaya que vigila la plaza desde lo alto (2,50 €, de 10:00 a 14:00 y por la tarde; cerrada los martes).",
      },
      { type: "h2", text: "Día 1, mediodía: el aljibe árabe del Museo de Cáceres" },
      {
        type: "p",
        text: "El Museo de Cáceres ocupa un palacio del siglo XVI construido sobre un aljibe árabe —uno de los mejor conservados del mundo, con sus arcos de herradura reflejados en el agua—. Entrada a 1,20 €, gratis los domingos y para menores de 18 años; abierto de martes a domingo, cerrado los lunes.",
      },
      { type: "h2", text: "Día 1, tarde: Barrio Judío" },
      {
        type: "p",
        text: "Las calles estrechas del trazado medieval del Barrio Judío —la Judería Vieja— contrastan con la sobriedad de piedra del resto del casco: casitas blancas y callejones con desnivel, de acceso libre todo el día.",
      },
      {
        type: "tip",
        text: "Si quieres profundizar en las leyendas del barrio y del resto del casco histórico, tienes un artículo dedicado a los rincones secretos de Cáceres más abajo.",
      },
      { type: "h2", text: "Día 2, mañana: Concatedral de Santa María y Plaza de San Jorge" },
      {
        type: "p",
        text: "La Concatedral de Santa María, en su plaza homónima junto al Palacio de Mayoralgo, merece la subida a la torre para ver la ciudad «a vista de cigüeña». De camino, la Plaza de San Jorge —una escalinata escondida a los pies de la muralla— y el Foro de los Balbos, uno de los mejores miradores sobre la muralla, cierran la mañana.",
      },
      { type: "h2", text: "Día 2, tarde: de vuelta a la Plaza Mayor" },
      {
        type: "p",
        text: "Cierra el fin de semana con calma en la Plaza Mayor: es el punto de referencia de toda la ciudad y desde ahí, en un minuto a pie, tienes de nuevo el Arco de la Estrella; en 5-7 minutos, el Museo Helga de Alvear, si te interesa el arte contemporáneo.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿Cáceres es Patrimonio de la Humanidad?",
            a: "Sí. La UNESCO declaró Cáceres Patrimonio de la Humanidad en 1986, y en 2026 la ciudad celebra su 40 aniversario con esa distinción.",
          },
          {
            q: "¿Se puede visitar Cáceres en un solo día?",
            a: "Se puede hacer una versión exprés del casco histórico en un día (Plaza Mayor, Torre de Bujaco, aljibe árabe y Barrio Judío), pero con un fin de semana completo se disfruta sin prisas y da tiempo también a la Concatedral y los miradores.",
          },
          {
            q: "¿Es necesario coche para visitar Cáceres?",
            a: "No. El casco histórico se recorre entero a pie y el acceso en coche a la Ciudad Monumental está restringido a residentes y taxis.",
          },
        ],
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
      {
        type: "link",
        text: "¿Dónde comer después de la ruta? Guía de restaurantes en Cáceres →",
        slug: "donde-comer-en-caceres",
      },
    ],
  },
  {
    slug: "donde-comer-en-caceres",
    title: "Dónde comer en Cáceres: de las tapas a las 2 estrellas Michelin",
    metaDescription:
      "Dónde comer en Cáceres: guía de restaurantes para todos los presupuestos, desde el tapeo en la Plaza Mayor hasta Atrio, con 3 Soles Repsol y 2 estrellas Michelin.",
    excerpt:
      "Desde el bizcocho de migas de la Plaza Mayor hasta las 2 estrellas Michelin de Atrio: así se come en Cáceres.",
    coverImage: "postre",
    coverAlt: "Postre de torrija con helado en un restaurante de Cáceres",
    publishedDate: "2026-06-08",
    updatedDate: "2026-07-01",
    readTime: 6,
    tag: "Gastronomía",
    quickFacts: [
      "Atrio: 3 Soles Repsol y 2 estrellas Michelin",
      "El Figón de Eustaquio, cocina tradicional cacereña desde 1947",
      "La mayoría de los restaurantes están a menos de 10 min a pie de MAJMA",
    ],
    body: [
      {
        type: "p",
        text: "Si buscas dónde comer en Cáceres, la ciudad tiene una escena gastronómica que va del tapeo de toda la vida a una de las mesas más reconocidas de España. Esta es una selección honesta, para cualquier presupuesto, a poca distancia a pie del casco histórico.",
      },
      { type: "h2", text: "Tapeo en la Plaza Mayor" },
      {
        type: "p",
        text: "La Minerva, con Solete Repsol, ofrece desde jamón ibérico hasta un canelón de pato. A pocos pasos, Tapería Boss ha hecho de su bizcocho de migas extremeñas con huevo de codorniz una firma propia.",
      },
      { type: "h2", text: "Cocina tradicional con historia" },
      {
        type: "p",
        text: "El Figón de Eustaquio, en la Plaza de San Juan, es una institución de cocina tradicional cacereña desde 1947 — a un paso de MAJMA.",
      },
      { type: "h2", text: "Alta cocina: Torre de Sande y Atrio" },
      {
        type: "p",
        text: "Torre de Sande propone cocina moderna dentro de una torre del siglo XV, con 1 Sol Repsol. Y Atrio, en la Plaza de San Mateo, es alta vanguardia gastronómica mundial: 3 Soles Repsol y 2 estrellas Michelin, uno de los grandes referentes de la gastronomía española.",
      },
      {
        type: "tip",
        text: "En temporada alta y fines de semana, los restaurantes con distinción suelen llenarse pronto. Si tienes un sitio en mente, resérvalo con antelación desde MAJMA.",
      },
      { type: "h2", text: "Para el café y el dulce" },
      {
        type: "p",
        text: "Zeris Coffee es la parada de café de especialidad del casco histórico — buen momento para probar también las yemas de San Pablo o los dulces de las monjas Jerónimas, dos clásicos de la repostería conventual cacereña.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿Cuál es el restaurante con estrella Michelin en Cáceres?",
            a: "Atrio, en la Plaza de San Mateo, tiene 3 Soles Repsol y 2 estrellas Michelin.",
          },
          {
            q: "¿Dónde tapear en la Plaza Mayor de Cáceres?",
            a: "La Minerva (Solete Repsol) y Tapería Boss, conocida por su bizcocho de migas extremeñas, son dos referencias de tapeo en la propia Plaza Mayor.",
          },
        ],
      },
      {
        type: "link",
        text: "Ver el itinerario completo de un fin de semana en Cáceres →",
        slug: "que-hacer-en-caceres-en-un-fin-de-semana",
      },
    ],
  },
  {
    slug: "caceres-patrimonio-de-la-humanidad",
    title: "Cáceres Patrimonio de la Humanidad: por qué esta ciudad amurallada merece un viaje",
    metaDescription:
      "Cáceres es Patrimonio de la Humanidad desde 1986. Descubre por qué su ciudad monumental amurallada, su aljibe árabe y su Judería Vieja son de visita obligada en 2026.",
    excerpt:
      "Declarada Patrimonio de la Humanidad en 1986, Cáceres conserva uno de los cascos históricos amurallados mejor preservados de Europa. En 2026 celebra sus 40 años con esa distinción.",
    coverImage: "hero",
    coverAlt: "Torres y murallas del casco histórico de Cáceres",
    publishedDate: "2026-06-15",
    updatedDate: "2026-07-01",
    readTime: 5,
    tag: "Historia",
    quickFacts: [
      "Declarada Patrimonio de la Humanidad por la UNESCO en 1986",
      "3.º conjunto monumental mejor conservado de Europa, tras Praga y Tallin",
      "En 2026, Cáceres celebra su 40 aniversario como Patrimonio de la Humanidad",
    ],
    body: [
      {
        type: "p",
        text: "La UNESCO declaró Cáceres Patrimonio de la Humanidad en 1986, reconociendo un casco histórico amurallado que mezcla huellas romanas, islámicas, góticas y renacentistas sin apenas alteraciones desde la Edad Media. Es, además, el 3.º conjunto monumental medieval mejor conservado de Europa, solo por detrás de Praga y Tallin.",
      },
      { type: "h2", text: "2026: 40 años de Cáceres como Patrimonio de la Humanidad" },
      {
        type: "p",
        text: "Este año la ciudad celebra su 40 aniversario con esa distinción a través de Cáceres al Fresco, la agenda cultural de verano de 2026, que incluye visitas guiadas gratuitas por el casco histórico. Un buen motivo de más para planear la visita en estas fechas.",
      },
      { type: "h2", text: "Una muralla que sigue en pie" },
      {
        type: "p",
        text: "El Arco de la Estrella y la Torre de Bujaco flanquean la entrada monumental a la Plaza Mayor — la puerta de acceso a un recinto amurallado que se camina entero en minutos.",
      },
      { type: "h2", text: "El aljibe árabe mejor conservado" },
      {
        type: "p",
        text: "Bajo el Museo de Cáceres, el aljibe árabe conserva sus arcos de herradura casi intactos, reflejados en el agua — uno de los mejor conservados del mundo, y una de las fotografías más repetidas de la ciudad.",
      },
      { type: "h2", text: "La Judería Vieja" },
      {
        type: "p",
        text: "El Barrio Judío conserva el trazado medieval de calles estrechas y casitas blancas, en marcado contraste con la piedra noble del resto del casco.",
      },
      {
        type: "tip",
        text: "Detrás de cada rincón del casco histórico hay una historia o una leyenda: desde el palacio donde durmieron los Reyes Católicos hasta el ritual de la suerte en la Concatedral. Tienes un artículo dedicado a ello más abajo.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿Cuándo declararon Cáceres Patrimonio de la Humanidad?",
            a: "La UNESCO declaró Cáceres Patrimonio de la Humanidad en 1986. En 2026 la ciudad celebra su 40 aniversario con esta distinción.",
          },
          {
            q: "¿Qué museo de Cáceres tiene un aljibe árabe?",
            a: "El Museo de Cáceres, instalado en un palacio del siglo XVI, conserva bajo su edificio uno de los aljibes árabes mejor preservados del mundo.",
          },
          {
            q: "¿Es Cáceres la ciudad medieval mejor conservada de Europa?",
            a: "Es el 3.º conjunto monumental medieval mejor conservado de Europa, solo por detrás de Praga y Tallin.",
          },
        ],
      },
      {
        type: "p",
        text: "Todo esto —murallas, aljibe, judería— se ve a pie, sin prisa, en un fin de semana. MAJMA está a dos minutos andando de la Iglesia de San Juan, dentro del propio recinto amurallado.",
      },
      {
        type: "link",
        text: "Descubre los rincones secretos y las leyendas de Cáceres →",
        slug: "rincones-secretos-y-leyendas-de-caceres",
      },
    ],
  },
  {
    slug: "como-aparcar-en-el-casco-historico-de-caceres",
    title: "Cómo aparcar en el casco histórico de Cáceres: guía práctica 2026",
    metaDescription:
      "Cómo aparcar en Cáceres: el casco histórico tiene acceso restringido a residentes y taxis. Guía práctica con parkings de pago y opciones gratuitas cerca del centro.",
    excerpt:
      "La Ciudad Monumental de Cáceres es de acceso restringido. Estas son las opciones reales para dejar el coche cerca, de pago y gratuitas.",
    coverImage: "map",
    coverAlt: "Plano del casco histórico de Cáceres",
    publishedDate: "2026-06-22",
    updatedDate: "2026-07-01",
    readTime: 5,
    tag: "Información práctica",
    quickFacts: [
      "Acceso restringido dentro de la muralla: solo residentes y taxis",
      "Parking Obispo Galarza: 12,45 €/día, con ascensor directo a la Plaza Mayor",
      "Zona azul de Parque de Cánovas: gratis sábados, domingos y festivos",
    ],
    body: [
      {
        type: "p",
        text: "Si vienes en coche, esto es lo que necesitas saber antes de llegar: la Ciudad Monumental de Cáceres está vigilada por cámaras de la Policía Local, y solo pueden entrar residentes y taxis. Aparcar cerca del casco histórico es sencillo si conoces las opciones.",
      },
      { type: "h2", text: "¿Se puede entrar en coche al casco histórico de Cáceres?" },
      {
        type: "p",
        text: "No, salvo residentes y taxis: el acceso está restringido y vigilado por cámaras. Para descargar equipaje dentro del recinto, hay que avisar con antelación y se gestiona un permiso temporal con la matrícula del vehículo para entrar unos minutos, cargar o descargar, y salir.",
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
      {
        type: "tip",
        text: "Avísanos con antelación tu hora de llegada y matrícula si necesitas entrar unos minutos a descargar maletas dentro del recinto amurallado.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿Se puede aparcar gratis en Cáceres?",
            a: "Sí: el barrio de San Blas, la Plaza de Italia y la zona azul del Parque de Cánovas (gratis en fin de semana y festivos) son alternativas gratuitas o económicas a pocos minutos a pie del casco histórico.",
          },
          {
            q: "¿Cuánto cuesta el parking del centro de Cáceres?",
            a: "El Parking Obispo Galarza, el más cómodo por su ascensor directo a la Plaza Mayor, cuesta 12,45 € al día.",
          },
        ],
      },
      {
        type: "link",
        text: "Ver el itinerario de un fin de semana en Cáceres →",
        slug: "que-hacer-en-caceres-en-un-fin-de-semana",
      },
    ],
  },
  {
    slug: "rincones-secretos-y-leyendas-de-caceres",
    title: "Rincones secretos y leyendas de Cáceres que no aparecen en las guías",
    metaDescription:
      "Rincones secretos de Cáceres: la leyenda del Cristo Negro, el palacio donde durmieron los Reyes Católicos y el ritual de la suerte en la Concatedral de Santa María.",
    excerpt:
      "Más allá de la Plaza Mayor: el palacio de los Reyes Católicos, un ritual de la suerte centenario y las leyendas que se cuentan en las visitas nocturnas de Cáceres.",
    coverImage: "hero",
    coverAlt: "Callejones del casco histórico de Cáceres al anochecer",
    publishedDate: "2026-07-06",
    readTime: 6,
    tag: "Historia",
    quickFacts: [
      "La Judería Vieja conserva el trazado medieval original de Cáceres",
      "El Palacio de los Golfines de Abajo alojó a los Reyes Católicos",
      '"Cáceres de noche": visita guiada de leyendas y misterios por el casco histórico',
    ],
    body: [
      {
        type: "p",
        text: "La Plaza Mayor y la Torre de Bujaco son la puerta de entrada, pero el casco histórico de Cáceres esconde rincones y leyendas que pocos turistas encuentran por su cuenta. Esta es una selección de los más singulares, todos a pocos minutos a pie de MAJMA.",
      },
      { type: "h2", text: "Cáceres de noche: la ruta de leyendas y misterios" },
      {
        type: "p",
        text: "Cáceres organiza recorridos guiados nocturnos por las leyendas y misterios de la ciudad, que pasan por rincones como la Casa del Mono o el Cristo Negro — dos de las historias que más se repiten entre quienes conocen bien el casco histórico. Es una forma distinta de ver de noche las mismas calles que has recorrido de día.",
      },
      { type: "h2", text: "El palacio donde durmieron los Reyes Católicos" },
      {
        type: "p",
        text: "En la Plaza de San Jorge, junto a las torres blancas de la iglesia de San Francisco Javier, se levanta el Palacio de los Golfines de Abajo, donde se alojaron los Reyes Católicos. La plaza en sí es una escalinata escondida a los pies de la muralla, a solo 6 minutos a pie de MAJMA.",
      },
      { type: "h2", text: "El ritual de la suerte en la Concatedral" },
      {
        type: "p",
        text: "En la Concatedral de Santa María, junto al Palacio de Mayoralgo, hay una estatua de San Pedro de Alcántara. La tradición local dice que tocar sus pies trae suerte — un gesto sencillo antes de subir a la torre, desde donde se ve la ciudad «a vista de cigüeña».",
      },
      { type: "h2", text: "La Judería Vieja, el barrio que el tiempo no ha tocado" },
      {
        type: "p",
        text: "A 4 minutos a pie de MAJMA, el Barrio Judío conserva el trazado medieval original de Cáceres: calles estrechas, casitas blancas y desniveles que contrastan con la piedra noble del resto del casco. Es, probablemente, el rincón donde mejor se siente el paso de los siglos.",
      },
      {
        type: "tip",
        text: "Si te gustan las historias con más profundidad, pregúntanos por la próxima fecha de la visita guiada nocturna de leyendas y misterios.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿Qué leyendas se cuentan en Cáceres?",
            a: "Cáceres organiza rutas guiadas nocturnas de leyendas y misterios que recorren rincones como la Casa del Mono o el Cristo Negro, entre otras historias del casco histórico.",
          },
          {
            q: "¿Dónde se alojaron los Reyes Católicos en Cáceres?",
            a: "En el Palacio de los Golfines de Abajo, en la Plaza de San Jorge, junto a las torres de la iglesia de San Francisco Javier.",
          },
          {
            q: "¿Qué es la Judería Vieja de Cáceres?",
            a: "Es el barrio judío histórico de la ciudad, que conserva su trazado medieval original de calles estrechas y casitas blancas, a 4 minutos a pie de MAJMA.",
          },
        ],
      },
      {
        type: "link",
        text: "Por qué Cáceres es Patrimonio de la Humanidad →",
        slug: "caceres-patrimonio-de-la-humanidad",
      },
    ],
  },
  {
    slug: "mejores-miradores-de-caceres",
    title: "Los mejores miradores de Cáceres para ver la ciudad desde lo alto",
    metaDescription:
      "Los mejores miradores de Cáceres: el Foro de los Balbos, la torre de la Concatedral de Santa María y el Santuario de la Virgen de la Montaña, a 621 metros de altitud.",
    excerpt:
      "Desde la muralla hasta el Santuario de la Virgen de la Montaña, a 621 metros de altitud: los mejores balcones sobre el casco histórico de Cáceres.",
    coverImage: "mirador",
    coverAlt: "Vista panorámica del casco histórico de Cáceres desde un mirador en altura",
    publishedDate: "2026-07-06",
    readTime: 5,
    tag: "Itinerarios",
    quickFacts: [
      "El Santuario de la Virgen de la Montaña está a 621 m de altitud",
      "El Foro de los Balbos es uno de los mejores miradores sobre la muralla",
      "El aljibe árabe del Museo de Cáceres es de acceso libre y gratuito los domingos",
    ],
    body: [
      {
        type: "p",
        text: "Cáceres se disfruta caminando por sus calles, pero también desde lo alto. Estos son los mejores miradores del casco histórico y sus alrededores, de más cercano a más panorámico.",
      },
      { type: "h2", text: "El Foro de los Balbos, el mirador más cercano a la muralla" },
      {
        type: "p",
        text: "A 8 minutos a pie de MAJMA, el Foro de los Balbos es uno de los mejores miradores sobre la muralla — acceso libre y gratuito todo el día, y parada obligada al final de cualquier paseo por el casco histórico.",
      },
      { type: "h2", text: "Sube a la torre de la Concatedral de Santa María" },
      {
        type: "p",
        text: "La Concatedral de Santa María, junto al Palacio de Mayoralgo, tiene una torre que se puede subir para ver la ciudad «a vista de cigüeña» — una perspectiva distinta del casco histórico amurallado, a solo 7 minutos a pie de MAJMA.",
      },
      { type: "h2", text: "El Santuario de la Virgen de la Montaña, el mejor balcón sobre Cáceres" },
      {
        type: "p",
        text: "A 621 metros de altitud, el Santuario de la Virgen de la Montaña ofrece el mejor balcón panorámico sobre toda la ciudad. Se llega en coche o caminando por la ruta del Portanchito, para quien prefiera hacerlo a pie.",
      },
      { type: "h2", text: "La foto más bonita del casco: el aljibe árabe del Museo de Cáceres" },
      {
        type: "p",
        text: "No es un mirador exterior, pero merece estar en esta lista: el aljibe árabe del Museo de Cáceres, con sus arcos de herradura reflejados en el agua, es una de las estampas más repetidas —y más bellas— de la ciudad. Entrada a 1,20 €, gratis los domingos.",
      },
      {
        type: "tip",
        text: "El atardecer es el mejor momento para fotografiar la muralla desde el Foro de los Balbos, con la luz baja iluminando la piedra.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿Cuál es el mejor mirador de Cáceres?",
            a: "El Santuario de la Virgen de la Montaña, a 621 metros de altitud, ofrece la vista más panorámica sobre toda la ciudad. Para un mirador más cercano al casco histórico, el Foro de los Balbos es la mejor opción.",
          },
          {
            q: "¿Cómo se llega al Santuario de la Virgen de la Montaña?",
            a: "Se puede llegar en coche o a pie por la ruta del Portanchito.",
          },
          {
            q: "¿Dónde hacer la mejor foto de Cáceres?",
            a: "El aljibe árabe del Museo de Cáceres, con sus arcos de herradura reflejados en el agua, es una de las imágenes más repetidas de la ciudad, además de los miradores del Foro de los Balbos y la torre de la Concatedral.",
          },
        ],
      },
      {
        type: "link",
        text: "Ver el itinerario completo de un fin de semana en Cáceres →",
        slug: "que-hacer-en-caceres-en-un-fin-de-semana",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
