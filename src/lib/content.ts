/* Contenido bilingüe de la landing. Los nombres propios (Plaza Mayor, Iglesia de San
   Juan, MAJMA, Cáceres...) se mantienen igual en ambos idiomas a propósito: es lo que
   el huésped verá en las señales de la calle y en Google Maps. */

export type Lang = "es" | "en";

export const content = {
  es: {
    nav: {
      links: [
        { href: "#territorio", label: "Cáceres" },
        { href: "#apartamento", label: "Apartamento" },
        { href: "#distribucion", label: "Estancias" },
        { href: "#ubicacion", label: "Ubicación" },
        { href: "#guia", label: "Guía" },
        { href: "#testimonios", label: "Huéspedes" },
        { href: "#faq", label: "FAQ" },
      ],
      reservar: "Reservar",
      menuLabel: "Menú",
      langLabel: "Idioma",
    },
    wordmarkSubtitle: "Cáceres · Patrimonio",
    hero: {
      eyebrow: "Cáceres · UNESCO 1986",
      titleLine1: "Dormir dentro",
      titleLine2: "de la Historia.",
      subtitle:
        "A dos minutos de la Iglesia de San Juan, en el corazón amurallado de Cáceres. Tres apartamentos. Una ciudad Patrimonio de la Humanidad a tus pies.",
      ctaBooking: "Reservar en Booking",
      ctaDiscover: "Descubre los apartamentos",
      scrollHint: "Baja para entrar",
      heroAlt: "Casco histórico amurallado de Cáceres al atardecer",
      ratingBadge: "9.7/10 en Booking.com · 826 opiniones",
      ctaWhatsappHint: "¿Prefieres WhatsApp? Escríbenos directamente",
    },
    territorio: {
      sectionLabel: "El territorio",
      titlePre: "Una ciudad escrita",
      titleMid: "en",
      titleEm: "piedra",
      p1: "Cáceres no se visita: se recorre despacio, como quien lee un libro escrito en piedra. Calles que huelen a siglos, plazas que han visto pasar romanos, árabes y renacentistas, y una muralla que todavía vigila la ciudad desde lo alto.",
      p2: "MAJMA está ahí, a dos pasos de la Iglesia de San Juan, para que cada noche termine — y cada mañana empiece — dentro de esa historia.",
      facadeAlt: "Fachada de piedra en el casco histórico de Cáceres",
      facts: [
        {
          k: 1986,
          kSuffix: "",
          label: "Ciudad Patrimonio de la Humanidad declarada por la UNESCO.",
        },
        {
          k: null as number | null,
          raw: "3.º",
          label: "Conjunto monumental medieval mejor conservado de Europa, tras Praga y Tallin.",
        },
        { k: 2, kSuffix: " min", label: "A pie desde MAJMA hasta la Iglesia de San Juan." },
      ],
    },
    apartamento: {
      sectionLabel: "El apartamento",
      titlePre: "Fuera, la historia.",
      titleEm: "Dentro, el descanso.",
      p1: "MAJMA son tres apartamentos independientes en el mismo edificio del casco histórico, cada uno con su propio salón, cocina, baño y terraza o balcón donde el atardecer cacereño se sirve solo. Perfectos para dos — y también para una familia con un pequeño — con todo lo necesario para sentirte en casa, aunque estés a un paso de un Patrimonio Mundial.",
      stats: [
        { k: 3, v: "Apartamentos" },
        { k: 2, v: "Camas por apto." },
        { k: 4, v: "Huéspedes máx." },
      ],
      salonAlt: "Salón del apartamento MAJMA",
    },
    galeria: {
      sectionLabel: "Galería",
      titlePre: "Cada rincón,",
      titleEm: "una postal",
      p1: "Interior sereno y luminoso, muralla al otro lado de la ventana. Toca cualquier imagen para verla en grande.",
      alts: {
        terraza: "Vistas desde la terraza de MAJMA",
        dormitorio: "Dormitorio",
        bano: "Baño con ducha",
        cocina: "Cocina equipada",
        fachada: "Fachada del edificio",
      },
    },
    distribucion: {
      sectionLabel: "Distribución",
      titlePre: "Cinco estancias.",
      titleEm: "Un mismo silencio.",
      hint: "Descubre cada estancia — toca para ver más",
      disclaimer:
        "Estancias de uno de nuestros tres apartamentos, a modo de ejemplo: cada uno tiene su propia distribución y personalidad.",
      verDetalles: "Ver detalles",
      rooms: [
        {
          title: "Salón",
          details: [
            "Sofá cama para dos huéspedes adicionales",
            "TV de pantalla plana con streaming",
            "Zona de comedor integrada",
            "Luz natural durante todo el día",
          ],
        },
        {
          title: "Dormitorio",
          details: [
            "Cama doble con ropa de cama de calidad",
            "Habitación independiente y silenciosa",
            "Aire acondicionado y calefacción",
            "Armario para el equipaje",
          ],
        },
        {
          title: "Cocina",
          details: [
            "Nevera, microondas y fogones",
            "Menaje completo para cocinar",
            "Cafetera",
            "Todo listo para desayunar en casa",
          ],
        },
        {
          title: "Baño",
          details: [
            "Ducha amplia",
            "Toallas y amenities incluidos",
            "WiFi de alta velocidad en toda la vivienda",
            "Luz natural",
          ],
        },
        {
          title: "Terraza",
          details: [
            "Vistas al casco histórico",
            "Mesa exterior para dos",
            "Ideal al atardecer",
            "Extensión natural del salón",
          ],
        },
      ],
    },
    equipamiento: {
      titlePre: "Todo lo necesario.",
      titleEm: "Nada de más.",
      items: [
        "WiFi gratis",
        "Aire acondicionado",
        "Calefacción",
        "TV con streaming",
        "Cafetera",
        "Terraza o balcón",
        "Ruta de bares en la puerta",
        "Apto para niños",
        "No fumadores",
      ],
    },
    ubicacion: {
      sectionLabel: "Ubicación",
      titlePre: "A dos pasos",
      titleMid: "de",
      titleEm: "todo",
      p1: "En Cáceres no hace falta coche. Desde MAJMA, cada monumento del casco histórico está a unos minutos caminando por calles empedradas.",
      spots: [
        { name: "Iglesia de San Juan", time: "2 min" },
        { name: "Museo de Cáceres", time: "5 min" },
        { name: "Plaza de San Jorge", time: "6 min" },
        { name: "Plaza Mayor", time: "6 min" },
        { name: "Arco de la Estrella", time: "7 min" },
      ],
      footnote: "Estacionamiento y traslado al aeropuerto disponibles bajo consulta.",
      mapTitle: "Ubicación de MAJMA en Cáceres",
      mapBadge: "MAJMA · Cáceres",
      mapErrorText: "No hemos podido cargar el mapa. Ábrelo directamente en Google Maps.",
      mapOpenLink: "Abrir en Google Maps",
    },
    weather: {
      now: "Ahora mismo en Cáceres:",
      sunset: "Hoy el sol se pone a las {time} — hora perfecta para la terraza",
    },
    guia: {
      sectionLabel: "Guía",
      titlePre: "Cáceres,",
      titleEm: "a un paseo de casa",
      p1: "No hace falta agenda ni coche: todo lo esencial de la ciudad está a menos de diez minutos andando desde MAJMA. Una pequeña guía para aprovechar cada hora.",
      proximityMapLabel:
        "Mapa de cercanía: distancias a pie desde MAJMA a los puntos de interés de Cáceres",
      minWalk: "MIN A PIE",
      groups: [
        {
          label: "Patrimonio",
          items: [
            {
              name: "Plaza Mayor",
              time: "6 min a pie",
              text: "El salón de la ciudad, con la Torre de Bujaco vigilando desde lo alto. Punto de partida perfecto para perderse por el casco.",
            },
            {
              name: "Concatedral de Santa María",
              time: "7 min a pie",
              text: "El templo gótico-renacentista donde antaño se juraba fidelidad a los Reyes Católicos. Sube al campanario para las mejores vistas de la ciudad.",
            },
            {
              name: "Museo de Cáceres · Casa de las Veletas",
              time: "5 min a pie",
              text: "Un palacio del siglo XVI construido sobre un aljibe árabe casi intacto. Entrada gratuita para ciudadanos de la Unión Europea.",
            },
            {
              name: "Barrio judío · Adarve del Padre Rocha",
              time: "4 min a pie",
              text: "Calles estrechas y silenciosas que conservan el trazado medieval de la antigua judería cacereña.",
            },
          ],
        },
        {
          label: "Sabores",
          items: [
            {
              name: "Terrazas de la Plaza Mayor",
              time: "6 min a pie",
              text: "Tapa y caña con la muralla de testigo, a cualquier hora del día.",
            },
            {
              name: "Tabernas de la judería",
              time: "6 min a pie",
              text: "Cocina extremeña tradicional: jamón ibérico, torta del Casar y buen vino de pitarra en bodegas centenarias.",
            },
            {
              name: "Mercado y tiendas gourmet",
              time: "5 min a pie",
              text: "Ideal para llevarte un trozo de Extremadura en la maleta: quesos, embutidos y aceite de la tierra.",
            },
          ],
        },
        {
          label: "Planes",
          items: [
            {
              name: "Atardecer en el Foro de los Balbos",
              time: "8 min a pie",
              text: "Uno de los mejores miradores sobre la muralla y la ciudad vieja. Imprescindible al caer el sol.",
            },
            {
              name: "Ruta de las torres medievales",
              time: "A tu ritmo",
              text: "Cáceres conserva buena parte de sus treinta torres originales. Recorrerlas es una forma distinta de ver la ciudad, mirando siempre hacia arriba.",
            },
            {
              name: "Semana Santa y WOMAD",
              time: "Marzo/abril · mayo",
              text: "Dos citas imprescindibles del calendario cacereño, si tu estancia coincide con ellas.",
            },
          ],
        },
      ],
    },
    testimonios: {
      sectionLabel: "Huéspedes",
      titlePre: "Palabras de quienes",
      titleEm: "ya se han alojado",
      ratingBadge: "9.7 / 10 · 826 opiniones en Booking.com",
      verifiedBadge: "Reseña verificada en Booking.com",
    },
    faq: {
      sectionLabel: "Preguntas frecuentes",
      titlePre: "Todo lo que",
      titleEm: "quieras saber",
      helpPre: "¿No encuentras respuesta a tu pregunta?",
      helpLink: "Escríbenos por WhatsApp",
      helpPost: "y te respondemos enseguida.",
      items: [
        {
          q: "¿A qué hora son el check-in y el check-out?",
          a: "El check-in es de 15:00h a 22:00h y el check-out de 11:00h a 12:00h. Si necesitas un horario distinto, avísanos con antelación por WhatsApp.",
        },
        {
          q: "¿Cómo funciona la llegada? ¿Hay alguien esperando?",
          a: "El check-in es autónomo mediante caja de llaves segura. Antes de tu llegada te enviamos instrucciones detalladas y un contacto directo por si necesitas ayuda en cualquier momento.",
        },
        {
          q: "¿Dónde se puede aparcar?",
          a: "El casco histórico es peatonal, pero hay opciones de aparcamiento gratuito cerca según nos comentan otros huéspedes. Te indicamos la opción más cómoda al confirmar tu reserva.",
        },
        {
          q: "¿Se admiten niños?",
          a: "Sí, se admiten niños de cualquier edad. Ten en cuenta que no disponemos de cunas ni camas adicionales para bebés.",
        },
        {
          q: "¿Se admiten mascotas?",
          a: "No, actualmente los apartamentos no admiten mascotas.",
        },
        {
          q: "¿Se permiten despedidas de soltero/a u otro tipo de fiestas?",
          a: "No, los apartamentos no están pensados para despedidas de soltero/a ni eventos similares.",
        },
        {
          q: "¿Cuántos huéspedes caben como máximo?",
          a: "MAJMA son 3 apartamentos independientes: dos de 40 m² para hasta 4 huéspedes y uno de 27 m² para hasta 3, todos con cama doble y sofá cama.",
        },
        {
          q: "¿Cuál es la política de cancelación?",
          a: "Depende de la tarifa elegida en el momento de la reserva. Puedes consultar las condiciones exactas antes de confirmar en la propia página de Booking.",
        },
        {
          q: "¿Hay wifi y climatización?",
          a: "Sí, wifi de alta velocidad gratuito y aire acondicionado/calefacción en todas las estancias del apartamento.",
        },
      ],
    },
    reserva: {
      sectionLabel: "Reserva",
      titlePre: "Tu atalaya",
      titleEm: "te espera.",
      p1: "Reserva directa en Booking o escríbenos por WhatsApp y resolvemos cualquier duda al momento.",
      ctaBooking: "Reservar en Booking",
      ctaWhatsapp: "WhatsApp directo",
    },
    footer: {
      tagline:
        "Apartamentos turísticos en el casco histórico de Cáceres. Piedra centenaria, confort contemporáneo.",
      contacto: "Contacto",
      whatsapp: "WhatsApp",
      direccion: "Casco histórico de Cáceres",
      legal: "Legal",
      avisoLegal: "Aviso legal",
      privacidad: "Política de privacidad",
    },
    whatsappFab: {
      ariaLabel: "Contactar por WhatsApp",
      tag: "¿Dudas? Escríbenos",
    },
    mobileSticky: {
      ctaBooking: "Reservar en Booking",
      ariaCall: "Llamar",
    },
    lightbox: {
      close: "Cerrar",
      prev: "Anterior",
      next: "Siguiente",
    },
    cookieConsent: {
      text: "Usamos cookies propias y de análisis para mejorar tu experiencia en esta web. Puedes aceptarlas o rechazarlas — consulta nuestra",
      link: "política de privacidad",
      accept: "Aceptar",
      reject: "Rechazar",
    },
    notFound: {
      title: "Página no encontrada",
      body: "La página que buscas no existe o se ha movido.",
      cta: "Volver al inicio",
    },
    errorPage: {
      title: "Esta página no ha cargado",
      body: "Algo ha fallado por nuestra parte. Puedes intentarlo de nuevo o volver al inicio.",
      retry: "Reintentar",
      home: "Volver al inicio",
    },
  },
  en: {
    nav: {
      links: [
        { href: "#territorio", label: "Cáceres" },
        { href: "#apartamento", label: "Apartments" },
        { href: "#distribucion", label: "Rooms" },
        { href: "#ubicacion", label: "Location" },
        { href: "#guia", label: "Guide" },
        { href: "#testimonios", label: "Guests" },
        { href: "#faq", label: "FAQ" },
      ],
      reservar: "Book now",
      menuLabel: "Menu",
      langLabel: "Language",
    },
    wordmarkSubtitle: "Cáceres · Heritage",
    hero: {
      eyebrow: "Cáceres · UNESCO 1986",
      titleLine1: "Sleep inside",
      titleLine2: "History.",
      subtitle:
        "Two minutes from the Iglesia de San Juan, in the walled heart of Cáceres. Three apartments. A World Heritage city at your feet.",
      ctaBooking: "Book on Booking.com",
      ctaDiscover: "Discover the apartments",
      scrollHint: "Scroll to enter",
      heroAlt: "Walled old town of Cáceres at sunset",
      ratingBadge: "9.7/10 on Booking.com · 826 reviews",
      ctaWhatsappHint: "Prefer WhatsApp? Message us directly",
    },
    territorio: {
      sectionLabel: "The setting",
      titlePre: "A city written",
      titleMid: "in",
      titleEm: "stone",
      p1: "Cáceres isn't visited: it's walked slowly, like reading a book written in stone. Streets that smell of centuries, squares that have seen Romans, Moors and Renaissance nobles pass through, and a city wall that still watches over the town from above.",
      p2: "MAJMA sits right there, two steps from the Iglesia de San Juan, so every night ends — and every morning begins — inside that history.",
      facadeAlt: "Stone façade in the old town of Cáceres",
      facts: [
        { k: 1986, kSuffix: "", label: "Declared a UNESCO World Heritage City." },
        {
          k: null as number | null,
          raw: "3rd",
          label: "Best-preserved medieval old town in Europe, after Prague and Tallinn.",
        },
        { k: 2, kSuffix: " min", label: "On foot from MAJMA to the Iglesia de San Juan." },
      ],
    },
    apartamento: {
      sectionLabel: "The apartments",
      titlePre: "History outside.",
      titleEm: "Rest inside.",
      p1: "MAJMA is three independent apartments in the same building in the old town, each with its own living room, kitchen, bathroom and terrace or balcony where the Cáceres sunset serves itself. Perfect for two — and just as great for a family with a little one — with everything you need to feel at home, a step away from a World Heritage Site.",
      stats: [
        { k: 3, v: "Apartments" },
        { k: 2, v: "Beds per apt." },
        { k: 4, v: "Guests max." },
      ],
      salonAlt: "Living room of a MAJMA apartment",
    },
    galeria: {
      sectionLabel: "Gallery",
      titlePre: "Every corner,",
      titleEm: "a postcard",
      p1: "A calm, bright interior, with the city wall right outside the window. Tap any photo to see it full-size.",
      alts: {
        terraza: "Views from the MAJMA terrace",
        dormitorio: "Bedroom",
        bano: "Bathroom with shower",
        cocina: "Fully equipped kitchen",
        fachada: "Building façade",
      },
    },
    distribucion: {
      sectionLabel: "Layout",
      titlePre: "Five rooms.",
      titleEm: "One quiet.",
      hint: "Explore each room — tap to see more",
      disclaimer:
        "Rooms shown from one of our three apartments, as an example: each one has its own layout and personality.",
      verDetalles: "See details",
      rooms: [
        {
          title: "Living room",
          details: [
            "Sofa bed for two extra guests",
            "Flat-screen TV with streaming",
            "Integrated dining area",
            "Natural light all day long",
          ],
        },
        {
          title: "Bedroom",
          details: [
            "Double bed with quality linens",
            "Independent, quiet room",
            "Air conditioning and heating",
            "Wardrobe for your luggage",
          ],
        },
        {
          title: "Kitchen",
          details: [
            "Fridge, microwave and hob",
            "Full cookware set",
            "Coffee machine",
            "Everything ready for breakfast at home",
          ],
        },
        {
          title: "Bathroom",
          details: [
            "Spacious shower",
            "Towels and amenities included",
            "High-speed WiFi throughout the apartment",
            "Natural light",
          ],
        },
        {
          title: "Terrace",
          details: [
            "Views over the old town",
            "Outdoor table for two",
            "Perfect at sunset",
            "A natural extension of the living room",
          ],
        },
      ],
    },
    equipamiento: {
      titlePre: "Everything you need.",
      titleEm: "Nothing you don't.",
      items: [
        "Free WiFi",
        "Air conditioning",
        "Heating",
        "TV with streaming",
        "Coffee machine",
        "Terrace or balcony",
        "Tapas bars at the doorstep",
        "Child-friendly",
        "No smoking",
      ],
    },
    ubicacion: {
      sectionLabel: "Location",
      titlePre: "Two steps",
      titleMid: "from",
      titleEm: "everything",
      p1: "You don't need a car in Cáceres. From MAJMA, every landmark in the old town is just a few minutes away on foot, along cobbled streets.",
      spots: [
        { name: "Iglesia de San Juan", time: "2 min" },
        { name: "Museo de Cáceres", time: "5 min" },
        { name: "Plaza de San Jorge", time: "6 min" },
        { name: "Plaza Mayor", time: "6 min" },
        { name: "Arco de la Estrella", time: "7 min" },
      ],
      footnote: "Parking and airport transfers available on request.",
      mapTitle: "MAJMA location in Cáceres",
      mapBadge: "MAJMA · Cáceres",
      mapErrorText: "We couldn't load the map. Open it directly in Google Maps.",
      mapOpenLink: "Open in Google Maps",
    },
    weather: {
      now: "Right now in Cáceres:",
      sunset: "Today the sun sets at {time} — perfect time for the terrace",
    },
    guia: {
      sectionLabel: "Guide",
      titlePre: "Cáceres,",
      titleEm: "a walk from home",
      p1: "No planning, no car needed: everything essential in the city is less than ten minutes' walk from MAJMA. A small guide to make the most of every hour.",
      proximityMapLabel:
        "Proximity map: walking distances from MAJMA to Cáceres' points of interest",
      minWalk: "MIN WALK",
      groups: [
        {
          label: "Heritage",
          items: [
            {
              name: "Plaza Mayor",
              time: "6 min walk",
              text: "The city's living room, with the Torre de Bujaco watching from above. The perfect starting point to get lost in the old town.",
            },
            {
              name: "Concatedral de Santa María",
              time: "7 min walk",
              text: "The Gothic-Renaissance church where the Catholic Monarchs were once sworn allegiance. Climb the bell tower for the best views of the city.",
            },
            {
              name: "Museo de Cáceres · Casa de las Veletas",
              time: "5 min walk",
              text: "A 16th-century palace built over an almost intact Arab cistern. Free entry for EU citizens.",
            },
            {
              name: "Barrio judío · Adarve del Padre Rocha",
              time: "4 min walk",
              text: "Narrow, quiet streets that still trace the medieval layout of the old Jewish quarter.",
            },
          ],
        },
        {
          label: "Flavors",
          items: [
            {
              name: "Terrazas de la Plaza Mayor",
              time: "6 min walk",
              text: "Tapas and a cold beer with the city wall as your backdrop, any time of day.",
            },
            {
              name: "Tabernas de la judería",
              time: "6 min walk",
              text: "Traditional Extremaduran cooking: Iberian ham, torta del Casar cheese and good local wine in century-old cellars.",
            },
            {
              name: "Mercado y tiendas gourmet",
              time: "5 min walk",
              text: "Ideal for taking a piece of Extremadura home: cheeses, cured meats and local olive oil.",
            },
          ],
        },
        {
          label: "Plans",
          items: [
            {
              name: "Atardecer en el Foro de los Balbos",
              time: "8 min walk",
              text: "One of the best viewpoints over the city wall and the old town. A must at sunset.",
            },
            {
              name: "Ruta de las torres medievales",
              time: "At your own pace",
              text: "Cáceres still holds a good number of its thirty original towers. Tracing them is a different way to see the city — always looking up.",
            },
            {
              name: "Semana Santa y WOMAD",
              time: "March/April · May",
              text: "Two unmissable dates on the Cáceres calendar, if your stay lines up with them.",
            },
          ],
        },
      ],
    },
    testimonios: {
      sectionLabel: "Guests",
      titlePre: "In the words of those",
      titleEm: "who've already stayed",
      ratingBadge: "9.7 / 10 · 826 reviews on Booking.com",
      verifiedBadge: "Verified review on Booking.com",
    },
    faq: {
      sectionLabel: "FAQ",
      titlePre: "Everything you",
      titleEm: "want to know",
      helpPre: "Can't find the answer to your question?",
      helpLink: "Message us on WhatsApp",
      helpPost: "and we'll get back to you right away.",
      items: [
        {
          q: "What time are check-in and check-out?",
          a: "Check-in is from 3:00 PM to 10:00 PM, and check-out is from 11:00 AM to 12:00 PM. If you need a different time, let us know in advance via WhatsApp.",
        },
        {
          q: "How does arrival work? Is someone waiting for us?",
          a: "Check-in is self-service via a secure key box. Before you arrive we'll send you detailed instructions and a direct contact in case you need help at any point.",
        },
        {
          q: "Where can I park?",
          a: "The old town is pedestrian-only, but other guests tell us there are free parking options nearby. We'll point you to the easiest option once your booking is confirmed.",
        },
        {
          q: "Are children allowed?",
          a: "Yes, children of any age are welcome. Please note we don't have cribs or extra beds for babies.",
        },
        {
          q: "Are pets allowed?",
          a: "No, the apartments don't currently allow pets.",
        },
        {
          q: "Are bachelor/bachelorette parties or other events allowed?",
          a: "No, the apartments aren't set up for bachelor/bachelorette parties or similar events.",
        },
        {
          q: "What's the maximum number of guests?",
          a: "MAJMA is 3 independent apartments: two of 40 m² for up to 4 guests, and one of 27 m² for up to 3, all with a double bed and a sofa bed.",
        },
        {
          q: "What's the cancellation policy?",
          a: "It depends on the rate you choose when booking. You can check the exact conditions before confirming on the Booking.com page itself.",
        },
        {
          q: "Is there wifi and air conditioning?",
          a: "Yes, free high-speed wifi and air conditioning/heating throughout the apartment.",
        },
      ],
    },
    reserva: {
      sectionLabel: "Book",
      titlePre: "Your watchtower",
      titleEm: "awaits.",
      p1: "Book directly on Booking.com or message us on WhatsApp and we'll answer any question right away.",
      ctaBooking: "Book on Booking.com",
      ctaWhatsapp: "WhatsApp us directly",
    },
    footer: {
      tagline:
        "Tourist apartments in the old town of Cáceres. Centuries-old stone, contemporary comfort.",
      contacto: "Contact",
      whatsapp: "WhatsApp",
      direccion: "Old town of Cáceres",
      legal: "Legal",
      avisoLegal: "Legal notice",
      privacidad: "Privacy policy",
    },
    whatsappFab: {
      ariaLabel: "Contact us on WhatsApp",
      tag: "Questions? Message us",
    },
    mobileSticky: {
      ctaBooking: "Book on Booking.com",
      ariaCall: "Call",
    },
    lightbox: {
      close: "Close",
      prev: "Previous",
      next: "Next",
    },
    cookieConsent: {
      text: "We use our own and analytics cookies to improve your experience on this site. You can accept or decline them — see our",
      link: "privacy policy",
      accept: "Accept",
      reject: "Decline",
    },
    notFound: {
      title: "Page not found",
      body: "The page you're looking for doesn't exist or has been moved.",
      cta: "Back home",
    },
    errorPage: {
      title: "This page didn't load",
      body: "Something went wrong on our end. You can try again or head back home.",
      retry: "Try again",
      home: "Back home",
    },
  },
};

export type Content = typeof content.es;
