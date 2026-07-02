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
      mapHint: "Toca o pasa el cursor sobre un punto del mapa",
      howToGetThere: "Cómo llegar a pie",
      placeSingular: "lugar",
      placePlural: "lugares",
      radarPoints: [
        {
          name: "Iglesia de San Juan",
          time: 2,
          angle: -90,
          desc: "A la vuelta de la esquina de MAJMA.",
        },
        {
          name: "Plaza Mayor",
          time: 6,
          angle: -45,
          desc: "El salón de la ciudad, animado a cualquier hora del día.",
        },
        {
          name: "Plaza de San Jorge",
          time: 6,
          angle: 0,
          desc: "Escalinata escondida a los pies de la muralla.",
        },
        {
          name: "Museo de Cáceres",
          time: 5,
          angle: 40,
          desc: "Palacio del siglo XVI construido sobre un aljibe árabe.",
        },
        {
          name: "Torre de Bujaco",
          time: 6,
          angle: 90,
          desc: "La atalaya que vigila la Plaza Mayor desde lo alto.",
        },
        {
          name: "Foro de los Balbos",
          time: 8,
          angle: 140,
          desc: "Uno de los mejores miradores sobre la muralla.",
        },
        {
          name: "Arco de la Estrella",
          time: 7,
          angle: 180,
          desc: "La puerta monumental de entrada al casco antiguo.",
        },
        {
          name: "Barrio judío",
          time: 4,
          angle: -135,
          desc: "Calles estrechas del trazado medieval cacereño.",
        },
      ],
      groups: [
        {
          label: "Logística",
          items: [
            {
              name: "¿Se puede entrar en coche?",
              time: "Acceso restringido",
              text: "La Ciudad Monumental está vigilada por cámaras de la Policía Local: solo entran residentes y taxis. Para descargar maletas avísanos con antelación y gestionamos un permiso temporal con tu matrícula.",
              skipDirections: true,
            },
            {
              name: "Parking Obispo Galarza",
              time: "12,45 € / día",
              text: "La opción más cómoda: su ascensor público te deja en la Plaza Mayor en un par de minutos.",
              badge: "RECOMENDADO",
            },
            {
              name: "Barrio de San Blas",
              time: "5-8 min a pie · gratis",
              text: "Calle Trujillo y los alrededores de la Plaza de las Canterías: fácil encontrar hueco entre semana.",
            },
            {
              name: "Plaza de Italia",
              time: "Gratis",
              text: "Junto a la entrada superior del parking Galarza: bajas a la Plaza Mayor en su ascensor.",
            },
            {
              name: "Parque de Cánovas",
              time: "10 min a pie",
              text: "Zona azul entre semana (menos de 0,60 €/hora); gratis sábados, domingos y festivos.",
            },
          ],
        },
        {
          label: "Patrimonio",
          items: [
            {
              name: "Concatedral de Santa María",
              time: "7 min a pie",
              text: "En la Plaza de Santa María, junto al Palacio de Mayoralgo. Sube a la torre para ver la ciudad «a vista de cigüeña».",
              aside:
                "Toca los pies de la estatua de San Pedro de Alcántara: dicen que trae suerte.",
            },
            {
              name: "Plaza de San Jorge",
              time: "6 min a pie",
              text: "Las torres blancas de San Francisco Javier y el Palacio de los Golfines de Abajo, donde se alojaron los Reyes Católicos.",
            },
            {
              name: "Aljibe árabe · Museo de Cáceres",
              time: "5 min a pie",
              text: "Uno de los mejor conservados del mundo. Sus arcos de herradura reflejados en el agua son la foto más bella de la ciudad.",
            },
            {
              name: "Judería Vieja",
              time: "4 min a pie",
              text: "Casitas blancas y calles con desnivel que contrastan con la sobriedad de piedra del resto del casco.",
            },
          ],
        },
        {
          label: "Sabores",
          items: [
            {
              name: "La Minerva",
              time: "Plaza Mayor",
              text: "Desde jamón ibérico hasta un canelón de pato.",
              badge: "SOLETE REPSOL",
            },
            {
              name: "Tapería Boss",
              time: "Plaza Mayor",
              text: "Su bizcocho de migas extremeñas con huevo de codorniz es toda una firma.",
            },
            {
              name: "Torre de Sande",
              time: "Casco histórico",
              text: "Cocina moderna dentro de una torre del siglo XV.",
              badge: "1 SOL REPSOL",
            },
            {
              name: "El Figón de Eustaquio",
              time: "Plaza de San Juan",
              text: "Cocina tradicional cacereña. Una institución desde 1947.",
            },
            {
              name: "Atrio",
              time: "Plaza de San Mateo",
              text: "Alta vanguardia gastronómica mundial.",
              badge: "3 SOLES REPSOL · 2★ MICHELIN",
            },
            {
              name: "Zeris Coffee",
              time: "Café de especialidad",
              text: "Prueba también las yemas de San Pablo o los dulces de las monjas Jerónimas.",
            },
          ],
        },
        {
          label: "Planes",
          items: [
            {
              name: "Cáceres de noche",
              time: "Visita guiada",
              text: "Recorridos de leyendas y misterios por rincones como la Casa del Mono o el Cristo Negro.",
            },
            {
              name: "Museo Helga de Alvear",
              time: "5-7 min desde Plaza Mayor",
              text: "Una de las colecciones privadas de arte contemporáneo más completas de Europa.",
            },
            {
              name: "Santuario de la Virgen de la Montaña",
              time: "621 m de altitud",
              text: "El mejor balcón sobre la ciudad. Se llega en coche o andando por la ruta del Portanchito.",
            },
            {
              name: "Cáceres al Fresco",
              time: "Verano 2026",
              text: "Agenda cultural de verano, con visitas gratuitas por el 40 aniversario de la ciudad como Patrimonio de la Humanidad.",
            },
          ],
        },
      ],
      plazaMayorNote: "Distancias aproximadas a pie desde la Plaza Mayor, el corazón de la ciudad:",
      plazaMayorDistances: [
        { name: "Arco de la Estrella", time: "1 min" },
        { name: "Museo Helga de Alvear", time: "5-7 min" },
        { name: "Calle Pintores", time: "2 min" },
        { name: "Parque del Príncipe", time: "15 min" },
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
          a: "La Ciudad Monumental es peatonal y de acceso restringido. La opción más cómoda es el Parking Obispo Galarza (12,45 €/día), con ascensor directo a la Plaza Mayor. También hay aparcamiento gratuito en el Barrio de San Blas o en el Parque de Cánovas (zona azul entre semana, gratis fines de semana y festivos).",
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
      calendar: {
        checkin: "Entrada",
        checkout: "Salida",
        night: "noche",
        nights: "noches",
        selectPrompt: "Elige tu entrada y tu salida",
        selectCheckout: "Ahora elige la salida",
        reset: "Reiniciar",
        cta: "Ver disponibilidad en Booking",
        hint: "Elige tus fechas: te llevamos directo a la disponibilidad real en Booking, sin compromiso.",
        directTitle: "¿Prefieres reservar directo con nosotros?",
        directHint: "Sin intermediarios. Te confirmamos la disponibilidad real por WhatsApp.",
        namePlaceholder: "Tu nombre",
        guestsLabel: "Huéspedes",
        directCta: "Solicitar por WhatsApp",
      },
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
    chatbot: {
      label: "Asistente MAJMA",
      title: "Asistente MAJMA",
      subtitle: "Busca en las preguntas frecuentes",
      greeting: "Hola, soy el asistente de MAJMA. Elige una pregunta o escribe la tuya.",
      placeholder: "Escribe tu pregunta...",
      send: "Enviar",
      noMatch:
        "No he encontrado una respuesta exacta a eso. Escríbenos por WhatsApp y te ayudamos enseguida.",
      whatsappCta: "Escribir por WhatsApp",
      close: "Cerrar",
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
      mapHint: "Tap or hover a point on the map",
      howToGetThere: "Walking directions",
      placeSingular: "place",
      placePlural: "places",
      radarPoints: [
        {
          name: "Iglesia de San Juan",
          time: 2,
          angle: -90,
          desc: "Right around the corner from MAJMA.",
        },
        {
          name: "Plaza Mayor",
          time: 6,
          angle: -45,
          desc: "The city's living room, lively any time of day.",
        },
        {
          name: "Plaza de San Jorge",
          time: 6,
          angle: 0,
          desc: "A hidden staircase at the foot of the wall.",
        },
        {
          name: "Museo de Cáceres",
          time: 5,
          angle: 40,
          desc: "A 16th-century palace built over an Arab cistern.",
        },
        {
          name: "Torre de Bujaco",
          time: 6,
          angle: 90,
          desc: "The watchtower keeping guard over Plaza Mayor.",
        },
        {
          name: "Foro de los Balbos",
          time: 8,
          angle: 140,
          desc: "One of the best viewpoints over the city wall.",
        },
        {
          name: "Arco de la Estrella",
          time: 7,
          angle: 180,
          desc: "The monumental gate into the old town.",
        },
        {
          name: "Barrio judío",
          time: 4,
          angle: -135,
          desc: "Narrow streets tracing the medieval quarter.",
        },
      ],
      groups: [
        {
          label: "Getting here",
          items: [
            {
              name: "Can I drive in?",
              time: "Restricted access",
              text: "The Monumental City is monitored by Local Police cameras: only residents and taxis get through. To unload luggage, let us know in advance and we'll arrange a temporary permit for your plate.",
              skipDirections: true,
            },
            {
              name: "Obispo Galarza car park",
              time: "€12.45 / day",
              text: "The easiest option: its public lift drops you at Plaza Mayor in a couple of minutes.",
              badge: "RECOMMENDED",
            },
            {
              name: "San Blas neighbourhood",
              time: "5-8 min walk · free",
              text: "Calle Trujillo and around Plaza de las Canterías: easy to find a spot on weekdays.",
            },
            {
              name: "Plaza de Italia",
              time: "Free",
              text: "Right by the upper entrance of the Galarza car park: take its lift down to Plaza Mayor.",
            },
            {
              name: "Parque de Cánovas",
              time: "10 min walk",
              text: "Metered parking on weekdays (under €0.60/hour); free on Saturdays, Sundays and holidays.",
            },
          ],
        },
        {
          label: "Heritage",
          items: [
            {
              name: "Concatedral de Santa María",
              time: "7 min walk",
              text: "On Plaza de Santa María, next to Palacio de Mayoralgo. Climb the tower for a stork's-eye view of the city.",
              aside:
                "Touch the feet of the San Pedro de Alcántara statue — it's said to bring luck.",
            },
            {
              name: "Plaza de San Jorge",
              time: "6 min walk",
              text: "The white towers of San Francisco Javier and the Palacio de los Golfines de Abajo, where the Catholic Monarchs once stayed.",
            },
            {
              name: "Arab cistern · Museo de Cáceres",
              time: "5 min walk",
              text: "One of the best preserved in the world. Its horseshoe arches reflected in the water make the city's most beautiful photo.",
            },
            {
              name: "Judería Vieja",
              time: "4 min walk",
              text: "Whitewashed houses and sloping streets that contrast with the stone sobriety of the rest of the old town.",
            },
          ],
        },
        {
          label: "Flavors",
          items: [
            {
              name: "La Minerva",
              time: "Plaza Mayor",
              text: "From Iberian ham to a duck cannelloni.",
              badge: "SOLETE REPSOL",
            },
            {
              name: "Tapería Boss",
              time: "Plaza Mayor",
              text: "Its Extremaduran migas sponge cake with quail egg is a signature dish.",
            },
            {
              name: "Torre de Sande",
              time: "Old town",
              text: "Modern cooking inside a 15th-century tower.",
              badge: "1 SOL REPSOL",
            },
            {
              name: "El Figón de Eustaquio",
              time: "Plaza de San Juan",
              text: "Traditional Cáceres cooking. An institution since 1947.",
            },
            {
              name: "Atrio",
              time: "Plaza de San Mateo",
              text: "World-class culinary avant-garde.",
              badge: "3 SOLES REPSOL · 2★ MICHELIN",
            },
            {
              name: "Zeris Coffee",
              time: "Specialty coffee",
              text: "Also try the yemas de San Pablo or the sweets from the Jerónimas nuns.",
            },
          ],
        },
        {
          label: "Plans",
          items: [
            {
              name: "Cáceres by night",
              time: "Guided tour",
              text: "Legend and mystery tours through spots like the Casa del Mono or the Cristo Negro.",
            },
            {
              name: "Museo Helga de Alvear",
              time: "5-7 min from Plaza Mayor",
              text: "One of the most complete private contemporary art collections in Europe.",
            },
            {
              name: "Santuario de la Virgen de la Montaña",
              time: "621 m altitude",
              text: "The best balcony over the city. Reachable by car or on foot via the Portanchito trail.",
            },
            {
              name: "Cáceres al Fresco",
              time: "Summer 2026",
              text: "The summer cultural programme, with free tours for the city's 40th anniversary as a World Heritage Site.",
            },
          ],
        },
      ],
      plazaMayorNote: "Approximate walking distances from Plaza Mayor, the city's heart:",
      plazaMayorDistances: [
        { name: "Arco de la Estrella", time: "1 min" },
        { name: "Museo Helga de Alvear", time: "5-7 min" },
        { name: "Calle Pintores", time: "2 min" },
        { name: "Parque del Príncipe", time: "15 min" },
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
          a: "The Monumental City is pedestrian-only with restricted access. The easiest option is the Obispo Galarza car park (€12.45/day), with a lift straight to Plaza Mayor. There's also free parking in the San Blas neighbourhood or at Parque de Cánovas (metered on weekdays, free on weekends and holidays).",
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
      calendar: {
        checkin: "Check-in",
        checkout: "Check-out",
        night: "night",
        nights: "nights",
        selectPrompt: "Choose your check-in and check-out",
        selectCheckout: "Now choose check-out",
        reset: "Reset",
        cta: "Check availability on Booking.com",
        hint: "Pick your dates: we'll take you straight to real availability on Booking.com, no commitment.",
        directTitle: "Prefer to book directly with us?",
        directHint: "No middleman. We'll confirm real availability over WhatsApp.",
        namePlaceholder: "Your name",
        guestsLabel: "Guests",
        directCta: "Request via WhatsApp",
      },
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
    chatbot: {
      label: "MAJMA Assistant",
      title: "MAJMA Assistant",
      subtitle: "Search our frequently asked questions",
      greeting: "Hi, I'm the MAJMA assistant. Pick a question or type your own.",
      placeholder: "Type your question...",
      send: "Send",
      noMatch:
        "I couldn't find an exact answer to that. Message us on WhatsApp and we'll help right away.",
      whatsappCta: "Message on WhatsApp",
      close: "Close",
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
