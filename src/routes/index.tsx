import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  useInView,
} from "motion/react";
import { useRef, useState, useCallback, useEffect, type MouseEvent } from "react";
import {
  Wifi,
  Snowflake,
  Flame,
  Tv,
  Coffee,
  Baby,
  Ban,
  MapPin,
  MessageCircle,
  ArrowRight,
  Check,
  Phone,
  Menu,
  X,
  Sun,
  Star,
  Landmark,
  UtensilsCrossed,
  Compass,
  Car,
  Sunset,
  CloudSun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";
import { useT, useLang } from "@/lib/i18n";

import heroImg from "@/assets/hero-caceres.webp";
import heroVideo from "@/assets/hero-video.mp4";
import caceresSkylineImg from "@/assets/caceres-skyline.webp";
import logoFull from "@/assets/logo-full.webp";
import logoIconWhite from "@/assets/logo-icon-white.webp";
import apto1Salon from "@/assets/apto1-salon.webp";
import apto1Dormitorio from "@/assets/apto1-dormitorio.webp";
import apto1Cocina from "@/assets/apto1-cocina.webp";
import apto1Bano from "@/assets/apto1-bano.webp";
import apto1Comedor from "@/assets/apto1-comedor.webp";
import apto2Salon from "@/assets/apto2-salon.webp";
import apto2Dormitorio from "@/assets/apto2-dormitorio.webp";
import apto2Cocina from "@/assets/apto2-cocina.webp";
import apto2Bano from "@/assets/apto2-bano.webp";
import apto3Salon from "@/assets/apto3-salon.webp";
import apto3Comedor from "@/assets/apto3-salon2.webp";
import apto3Dormitorio from "@/assets/apto3-dormitorio.webp";
import apto3Terraza from "@/assets/apto3-terraza.webp";
import apto3Vistas from "@/assets/apto3-vistas.webp";

const APARTMENT_IMAGES: Record<string, Record<string, string>> = {
  apto1: {
    salon: apto1Salon,
    dormitorio: apto1Dormitorio,
    cocina: apto1Cocina,
    bano: apto1Bano,
    comedor: apto1Comedor,
  },
  apto2: {
    salon: apto2Salon,
    dormitorio: apto2Dormitorio,
    cocina: apto2Cocina,
    bano: apto2Bano,
  },
  apto3: {
    salon: apto3Salon,
    comedor: apto3Comedor,
    dormitorio: apto3Dormitorio,
    terraza: apto3Terraza,
    vistas: apto3Vistas,
  },
};

/* ─────────── Datos reales ─────────── */
// Dominio placeholder (igual que robots.txt/sitemap.xml): swap por el dominio
// real antes de publicar para que las previews de redes sociales funcionen.
const SITE_URL = "https://www.majma-caceres.com";
const BOOKING_URL =
  "https://www.booking.com/hotel/es/apartamentos-turisticos-majma.es.html?aid=356980&label=gog235jc-10CAsoRkIdYXBhcnRhbWVudG9zLXR1cmlzdGljb3MtbWFqbWFIUlgDaEaIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4AoD4ktIGwAIB0gIkZWYxYTJmNDEtZDRkNy00MGU0LWE4NmYtOTc4YWU4Zjc5MDUy2AIB4AIB&sid=faf8b176b4cd575f70169e3f6ca21d42&dist=0&keep_landing=1&sb_price_type=total&type=total&";
const PHONE_HUMAN = "722 24 74 36";
const PHONE_TEL = "+34722247436";
const WA_URL =
  "https://wa.me/34722247436?text=Hola,%20me%20interesa%20reservar%20en%20MAJMA.%20%C2%BFTen%C3%A9is%20disponibilidad%3F";
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps?q=Calle+Cornudilla+3,+10003+C%C3%A1ceres,+Spain";

// Términos de búsqueda reales por los que un huésped encontraría MAJMA:
// intención de reserva ("apartamentos turísticos Cáceres") + intención
// informativa ("qué ver en Cáceres") que ya cubre la Guía.
const KEYWORDS = [
  "apartamentos turísticos Cáceres",
  "alojamiento Cáceres centro histórico",
  "apartamentos casco antiguo Cáceres",
  "dónde dormir en Cáceres",
  "alquiler vacacional Cáceres",
  "apartamentos cerca Plaza Mayor Cáceres",
  "apartamentos Iglesia de San Juan Cáceres",
  "qué ver en Cáceres",
];

const EASE = [0.22, 1, 0.36, 1] as const;

// useReducedMotion() reads the real device preference synchronously on the
// client's first render but always returns false during SSR, so anything
// baked into the initial render (styles, text) would mismatch on hydration.
// Gate it behind a "mounted" flag so both server and first client paint agree.
function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduce;
}

/* Coordenadas reales de MAJMA — Calle Cornudilla, 3, 10003 Cáceres (ficha de Booking.com) */
const CACERES_LAT = 39.472231;
const CACERES_LON = -6.372929;
const MAJMA_ADDRESS = "Calle Cornudilla, 3, 10003 Cáceres, España";

/* Preguntas frecuentes — compartidas entre la sección y el JSON-LD de SEO */
const FAQS = [
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
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apartamentos Turísticos en Cáceres | MAJMA · Casco Histórico" },
      {
        name: "description",
        content:
          "Apartamentos turísticos en el casco histórico de Cáceres, Patrimonio de la Humanidad. 3 apartamentos independientes junto a la Iglesia de San Juan. Reserva directa.",
      },
      { name: "keywords", content: KEYWORDS.join(", ") },
      { property: "og:title", content: "MAJMA · Apartamentos Turísticos en Cáceres" },
      {
        property: "og:description",
        content:
          "Tres apartamentos turísticos en el corazón amurallado de Cáceres (Patrimonio de la Humanidad), a dos pasos de la Iglesia de San Juan.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: new URL(heroImg, SITE_URL).toString() },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: new URL(heroImg, SITE_URL).toString() },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "MAJMA Apartamentos Turísticos Cáceres",
          description:
            "Tres apartamentos turísticos independientes en el casco histórico de Cáceres, a dos minutos de la Iglesia de San Juan, Ciudad Patrimonio de la Humanidad.",
          image: new URL(heroImg, SITE_URL).toString(),
          logo: new URL(logoFull, SITE_URL).toString(),
          telephone: PHONE_TEL,
          url: SITE_URL,
          sameAs: [BOOKING_URL.split("?")[0]],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Calle Cornudilla, 3",
            postalCode: "10003",
            addressLocality: "Cáceres",
            addressRegion: "Extremadura",
            addressCountry: "ES",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: CACERES_LAT,
            longitude: CACERES_LON,
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: 9.7,
            bestRating: 10,
            reviewCount: 826,
          },
          amenityFeature: [
            "WiFi gratis",
            "Aire acondicionado",
            "Calefacción",
            "TV con streaming",
            "Cafetera",
            "Terraza o balcón",
          ].map((name) => ({ "@type": "LocationFeatureSpecification", name })),
        },
      },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: MajmaLanding,
});

/* ─────────── Marca ─────────── */

function BattlementMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <path
        d="M10 78 L10 30 L20 30 L20 18 L32 18 L32 30 L44 30 L44 18 L56 18 L56 30 L68 30 L68 18 L80 18 L80 30 L92 30 L92 18 L104 18 L104 30 L110 30 L110 78 Z"
        fill="currentColor"
      />
      <rect x="30" y="46" width="8" height="14" fill="var(--color-cream)" opacity="0.85" />
      <rect x="56" y="42" width="8" height="18" fill="var(--color-cream)" opacity="0.85" />
      <rect x="82" y="46" width="8" height="14" fill="var(--color-cream)" opacity="0.85" />
    </svg>
  );
}

/* ─────────── Remate almenado entre secciones ───────────
   En vez de una línea genérica, el borde inferior de cada tramo se recorta
   como una muralla: los merlones anticipan, en el color de la sección
   siguiente, el cambio de fondo que viene justo después. */

function BattlementSeam({
  from,
  to,
  rider = false,
}: {
  from: string;
  to: string;
  rider?: boolean;
}) {
  const teeth = 32;
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="relative flex h-5 w-full items-end overflow-hidden md:h-7"
        style={{ backgroundColor: from }}
      >
        {Array.from({ length: teeth }).map((_, i) => (
          <div
            key={i}
            className="flex-1"
            style={{ backgroundColor: to, height: i % 2 === 0 ? "45%" : "100%" }}
          />
        ))}
      </div>
      {rider && <GallopingRider />}
    </div>
  );
}

/* ─────────── Guerrero a caballo ───────────
   Un jinete que galopa una sola vez sobre la muralla, en el color dorado
   de la marca, la primera vez que el remate entra en pantalla. */

function HorseRiderMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-4 -46 155 134" className={className} aria-hidden="true">
      <g fill="currentColor">
        <path d="M35 45 L18 62 L13 66 L8 84 L2 84 L9 62 L28 42 Z" />
        <path d="M43 46 L50 62 L53 84 L47 84 L44 64 L36 47 Z" />
        <path d="M108 41 L124 58 L133 82 L127 84 L119 62 L100 44 Z" />
        <path d="M99 43 L93 58 L84 68 L88 71 L98 61 L104 45 Z" />
        <path d="M28 38 C16 40 6 48 0 62 C8 58 14 54 19 50 C13 58 8 68 6 76 C14 68 22 58 27 48 C30 44 30 40 28 38 Z" />
        <path d="M27 47 C22 40 24 30 32 25 C40 22 55 21 66 21 C78 21 88 24 95 29 C99 32 100 37 98 41 L108 41 L100 44 L92 43 C78 46 60 47 45 47 Z" />
        <path d="M95 29 C98 23 103 14 110 7 L116 11 C110 17 104 24 99 34 L98 41 C99 34 98 31 95 29 Z" />
        <path d="M110 7 L119 -4 C124 -7 131 -6 136 -2 L145 8 L138 18 L127 19 L117 16 Z" />
        <path d="M120 -3 L122 -12 L127 -3 Z" />
      </g>
      <g fill="currentColor">
        <path d="M58 26 C55 18 58 9 66 4 C73 0 82 2 85 9 C87 13 85 18 80 21 L79 27 C75 31 63 31 58 26 Z" />
        <circle cx="72" cy="-4" r="5.5" />
        <path d="M69 -10 L72 -16 L75 -10 Z" />
        <path d="M82 5 L100 -14 L103 -12 L86 8 Z" />
        <path d="M98 -11 L105 -15 L129 -40 L124 -42 Z" />
        <path d="M64 23 L59 34 L53 41 L57 43 L64 35 L69 25 Z" />
      </g>
    </svg>
  );
}

function GallopingRider() {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-4 h-10 overflow-visible md:-top-6 md:h-16"
    >
      <motion.div
        className="absolute h-full w-14 text-gold md:w-20"
        initial={{ left: "-12%" }}
        animate={{ left: reduce ? "40%" : inView ? "104%" : "-12%" }}
        transition={{ duration: reduce ? 0 : 2.8, ease: "linear" }}
      >
        <HorseRiderMark className="h-full w-auto" />
      </motion.div>
    </div>
  );
}

/* ─────────── Reveal ─────────── */

function Reveal({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotionSafe();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.4 : 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────── CountUp ─────────── */

function CountUp({
  to,
  duration = 1.6,
  suffix = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotionSafe();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setN(to);
      return;
    }
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ─────────── Tilt de galería ─────────── */

function TiltImage({
  src,
  alt,
  className = "",
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0 });

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setT({ rx: -y * 6, ry: x * 8 });
    },
    [reduce],
  );
  const reset = () => setT({ rx: 0, ry: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={`perspective-1000 group overflow-hidden ${onClick ? "cursor-zoom-in" : ""} ${className}`}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateX: t.rx, rotateY: t.ry }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ background: "var(--stone-soft)" }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>
    </div>
  );
}

/* ─────────── Flip card (distribución) ─────────── */

type Room = { title: string; img: string; details: string[] };

function FlipCard({ room }: { room: Room }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const verDetalles = useT().distribucion.verDetalles;
  return (
    <button
      type="button"
      aria-label={`${verDetalles} ${room.title}`}
      aria-pressed={flipped}
      className="perspective-1000 h-[360px] w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      onMouseEnter={() => !reduce && setFlipped(true)}
      onMouseLeave={() => !reduce && setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
      >
        <div className="backface-hidden absolute inset-0 overflow-hidden border border-border shadow-[0_10px_30px_-20px_rgba(0,0,0,0.4)]">
          <img
            src={room.img}
            alt={room.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="font-serif text-3xl text-cream">{room.title}</h3>
            <p className="mt-1 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cream/70">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gold/60 text-gold">
                +
              </span>
              {verDetalles}
            </p>
          </div>
        </div>
        <div
          className="backface-hidden absolute inset-0 flex flex-col justify-between border border-gold/40 bg-ink p-8 text-cream"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div>
            <h3 className="font-serif text-3xl">{room.title}</h3>
          </div>
          <ul className="space-y-3">
            {room.details.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-cream/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </button>
  );
}

/* ─────────── Lightbox ─────────── */

function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const t = useT().lightbox;
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, onClose, onNav]);

  if (index === null) return null;
  const img = images[index];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        aria-label={t.close}
        onClick={onClose}
        className="absolute right-6 top-6 text-cream/80 hover:text-gold"
      >
        <X className="h-8 w-8" />
      </button>
      <button
        aria-label={t.prev}
        onClick={(e) => {
          e.stopPropagation();
          onNav((index - 1 + images.length) % images.length);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-gold md:left-8"
      >
        <ArrowRight className="h-8 w-8 rotate-180" />
      </button>
      <motion.img
        key={img.src}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        src={img.src}
        alt={img.alt}
        className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        aria-label={t.next}
        onClick={(e) => {
          e.stopPropagation();
          onNav((index + 1) % images.length);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-gold md:right-8"
      >
        <ArrowRight className="h-8 w-8" />
      </button>
    </motion.div>
  );
}

/* ─────────── Página ─────────── */

function MajmaLanding() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ReadingProgress />
      <TopBar />
      <Hero />
      <BattlementSeam from="var(--color-ink)" to="var(--color-stone-soft)" rider />
      <Territorio />
      <BattlementSeam from="var(--color-stone-soft)" to="var(--color-cream)" rider />
      <Apartamento />
      <BattlementSeam from="var(--color-cream)" to="var(--color-stone-soft)" rider />
      <Galeria />
      <BattlementSeam from="var(--color-stone-soft)" to="var(--color-cream)" rider />
      <Distribucion />
      <BattlementSeam from="var(--color-cream)" to="var(--color-ink)" rider />
      <Equipamiento />
      <BattlementSeam from="var(--color-ink)" to="var(--color-stone-soft)" rider />
      <Ubicacion />
      <BattlementSeam from="var(--color-stone-soft)" to="var(--color-ink)" rider />
      <GuiaCaceres />
      <BattlementSeam from="var(--color-ink)" to="var(--color-cream)" rider />
      <Testimonios />
      <FAQ />
      <BattlementSeam from="var(--color-cream)" to="var(--color-ink)" rider />
      <Reserva />
      <BattlementSeam from="var(--color-ink)" to="var(--color-cream)" rider />
      <Footer />
      <ChatbotWidget />
      <WhatsAppFab />
      <MobileStickyCTA />
    </div>
  );
}

/* ─────────── Reading progress ─────────── */

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gold"
    />
  );
}

/* ─────────── Top bar ─────────── */

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`flex items-center text-[10px] uppercase tracking-[0.2em] text-cream/70 ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang("es")}
        className={lang === "es" ? "text-gold" : "hover:text-cream"}
      >
        ES
      </button>
      <span className="mx-1.5 text-cream/30">/</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={lang === "en" ? "text-gold" : "hover:text-cream"}
      >
        EN
      </button>
    </div>
  );
}

function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));
  const fullT = useT();
  const t = fullT.nav;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-md shadow-[0_2px_20px_-10px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-6 md:px-10 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      >
        <a
          href="#top"
          className="flex items-center gap-3 text-cream drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          <img
            src={logoIconWhite}
            alt=""
            className={`${scrolled ? "h-7" : "h-10"} w-auto transition-[height] duration-500`}
          />
          <div className="flex flex-col leading-none">
            <span
              className={`font-serif ${scrolled ? "text-xl" : "text-2xl"} tracking-[0.35em] transition-all duration-500`}
            >
              MAJMA
            </span>
            {!scrolled && (
              <span className="mt-1 text-[10px] uppercase tracking-[0.4em] text-cream/60">
                {fullT.wordmarkSubtitle}
              </span>
            )}
          </div>
        </a>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.25em] text-cream/85 md:flex lg:gap-7 lg:tracking-[0.3em]">
          {t.links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <LangToggle />
          <a
            href="#reserva"
            className="inline-flex items-center gap-2 border border-gold/60 px-5 py-2 text-xs uppercase tracking-[0.3em] text-cream transition-all hover:bg-gold hover:text-ink"
          >
            {t.reservar}
          </a>
        </div>
        <button
          aria-label={t.menuLabel}
          onClick={() => setOpen((o) => !o)}
          className="text-cream md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="overflow-hidden bg-ink/95 backdrop-blur-md md:hidden"
      >
        <nav className="flex flex-col gap-1 px-6 py-4 text-sm uppercase tracking-[0.3em] text-cream/90">
          {t.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 border-b border-cream/10 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center justify-between py-3 border-b border-cream/10">
            <span className="text-cream/60">{t.langLabel}</span>
            <LangToggle />
          </div>
          <a
            href="#reserva"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 border border-gold px-5 py-3 text-xs text-cream hover:bg-gold hover:text-ink"
          >
            {t.reservar}
          </a>
        </nav>
      </motion.div>
    </header>
  );
}

/* ─────────── Hero ─────────── */

function Hero() {
  const t = useT().hero;
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const yMark = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-45%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // El vídeo se renderiza igual en servidor y cliente (evita mismatches de hidratación);
  // el arranque/pausa según "reducir movimiento" se controla aquí, tras montar.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) v.pause();
    else v.play().catch(() => {});
  }, [reduce]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-screen w-full overflow-hidden bg-ink text-cream"
    >
      <motion.div style={{ y: yImg }} className="absolute inset-0 -top-10 -bottom-10">
        {!videoFailed ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster={heroImg}
            onError={() => setVideoFailed(true)}
            className="h-full w-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <motion.img
            src={heroImg}
            alt={t.heroAlt}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            animate={reduce ? undefined : { scale: 1.04 }}
            transition={{ duration: 20, ease: "linear" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/85" />
      </motion.div>

      <motion.div
        style={{ y: yMark }}
        className="pointer-events-none absolute inset-x-0 bottom-[-4rem] flex justify-center opacity-[0.09]"
      >
        <BattlementMark className="h-[70vh] w-auto text-cream" />
      </motion.div>

      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-cream/70"
        >
          <BattlementMark className="h-3 w-auto text-gold" />
          {t.eyebrow}
        </motion.div>
        <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-cream md:text-8xl">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="block"
          >
            {t.titleLine1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="block"
          >
            <em className="relative text-gold-soft">
              {t.titleLine2}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1, ease: EASE }}
                className="absolute -bottom-2 left-0 right-0 h-[2px] origin-left bg-gold/70"
              />
            </em>
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="mt-8 max-w-xl text-base text-cream/85 md:text-lg"
        >
          {t.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          className="mt-6 flex items-center gap-2 text-xs text-cream/80"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1} />
            ))}
          </div>
          <span className="tracking-[0.04em]">{t.ratingBadge}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_booking", { location: "hero" })}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-ink transition-all hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-[1px] active:scale-[0.98]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {t.ctaBooking}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#apartamento"
            className="inline-flex items-center gap-3 border border-cream/40 px-8 py-4 text-xs uppercase tracking-[0.3em] text-cream transition-all hover:border-gold hover:text-gold active:scale-[0.98]"
          >
            {t.ctaDiscover}
          </a>
        </motion.div>
        <motion.a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("click_whatsapp", { location: "hero" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
          className="mt-5 inline-flex items-center gap-2 text-xs text-cream/70 underline-offset-4 hover:text-gold hover:underline"
        >
          <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
          {t.ctaWhatsappHint}
        </motion.a>
      </motion.div>

      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] uppercase tracking-[0.4em] text-cream/60"
        >
          {t.scrollHint}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────── El territorio ─────────── */

function Territorio() {
  const t = useT().territorio;
  const facts = t.facts;
  return (
    <section
      id="territorio"
      className="stone-grain relative overflow-hidden bg-stone-soft py-32 md:py-48"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-5">
          <div className="sticky top-32">
            <SectionNumber n="01" label={t.sectionLabel} />
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
              {t.titlePre}
              <br />
              {t.titleMid} <em className="text-gold">{t.titleEm}</em>.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-ink/80">{t.p1}</p>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">{t.p2}</p>
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <TiltImage
              src={caceresSkylineImg}
              alt={t.facadeAlt}
              className="aspect-[16/10] w-full"
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {facts.map((f, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1}>
                <div className="border-t border-ink/20 pt-5">
                  <div className="font-serif text-4xl text-ink">
                    {f.k !== null ? <CountUp to={f.k} suffix={f.kSuffix} /> : f.raw}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{f.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Section number ─────────── */

function SectionNumber({ label, dark = false }: { n?: string; label: string; dark?: boolean }) {
  return (
    <div className="flex items-baseline">
      <span
        className={`text-[10px] uppercase tracking-[0.5em] ${dark ? "text-cream/60" : "text-stone-deep"}`}
      >
        {label}
      </span>
    </div>
  );
}

/* ─────────── Apartamento ─────────── */

function Apartamento() {
  const t = useT().apartamento;
  return (
    <section id="apartamento" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        <Reveal>
          <div>
            <SectionNumber n="02" label={t.sectionLabel} />
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
              {t.titlePre}
              <br />
              <em className="text-gold">{t.titleEm}</em>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-ink/80">{t.p1}</p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {t.stats.map(({ k, v }) => (
                <div key={v}>
                  <dt className="font-serif text-4xl text-ink">
                    <CountUp to={k} />
                  </dt>
                  <dd className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <TiltImage src={apto1Salon} alt={t.salonAlt} className="aspect-[4/5]" />
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Galería ─────────── */

function Galeria() {
  const t = useT().galeria;
  const gallery = [
    { src: apto3Terraza, alt: t.alts.apto3Terraza, span: "md:col-span-2 md:row-span-2" },
    { src: apto1Salon, alt: t.alts.apto1Salon, span: "" },
    { src: apto2Salon, alt: t.alts.apto2Salon, span: "" },
    { src: apto1Comedor, alt: t.alts.apto1Comedor, span: "" },
    { src: apto2Dormitorio, alt: t.alts.apto2Dormitorio, span: "" },
    { src: apto3Vistas, alt: t.alts.apto3Vistas, span: "" },
  ];
  const [lb, setLb] = useState<number | null>(null);
  return (
    <section className="relative bg-stone-soft py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionNumber n="03" label={t.sectionLabel} />
              <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
                {t.titlePre}
                <br />
                <em className="text-gold">{t.titleEm}</em>.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink/70">{t.p1}</p>
          </div>
        </Reveal>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={i * 0.05} className={g.span}>
              <TiltImage
                src={g.src}
                alt={g.alt}
                className="h-full w-full"
                onClick={() => setLb(i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox images={gallery} index={lb} onClose={() => setLb(null)} onNav={setLb} />
    </section>
  );
}

/* ─────────── Distribución ─────────── */

function Distribucion() {
  const t = useT().distribucion;
  const [activeApt, setActiveApt] = useState(0);
  const apt = t.apartments[activeApt];
  const rooms: Room[] = apt.rooms.map((r) => ({
    title: r.title,
    img: APARTMENT_IMAGES[apt.id][r.key],
    details: r.details,
  }));

  return (
    <section id="distribucion" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-6 max-w-2xl">
            <SectionNumber n="04" label={t.sectionLabel} />
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
              {t.titlePre}
              <br />
              <em className="text-gold">{t.titleEm}</em>
            </h2>
          </div>
        </Reveal>
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-muted-foreground">{t.hint}</p>

        <div className="mb-12 flex flex-wrap gap-3 border-b border-border">
          {t.apartments.map((a, i) => {
            const isActive = activeApt === i;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setActiveApt(i)}
                className={`group relative px-1 pb-4 pt-1 text-left transition-colors ${
                  isActive ? "text-ink" : "text-muted-foreground hover:text-ink/70"
                }`}
              >
                <span className="font-serif text-xl">{a.name}</span>
                <span className="ml-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {a.size} {t.sizeLabel} · {a.guests} {t.guestsLabel}
                </span>
                <span className="mt-1 block text-xs italic text-muted-foreground">{a.style}</span>
                {isActive && (
                  <motion.span
                    layoutId="apt-tab-underline"
                    className="absolute inset-x-0 -bottom-px h-[2px] bg-gold"
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rooms.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <FlipCard room={r} />
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────── Equipamiento ─────────── */

function Equipamiento() {
  const t = useT().equipamiento;
  const icons = [Wifi, Snowflake, Flame, Tv, Coffee, Sun, UtensilsCrossed, Baby, Ban];
  const items = t.items.map((label, i) => ({ icon: icons[i], label }));
  return (
    <section className="relative bg-ink py-24 text-cream md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-14">
            <h3 className="font-serif text-3xl text-cream md:text-4xl">
              {t.titlePre}
              <br />
              <span className="text-gold-soft">{t.titleEm}</span>
            </h3>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="flex flex-col items-start gap-4">
                <it.icon className="h-6 w-6 text-gold" strokeWidth={1.25} />
                <span className="text-sm text-cream/85">{it.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Distancias a pie (barras) ─────────── */

function DistanceBars({ spots }: { spots: { name: string; time: string }[] }) {
  const reduce = useReducedMotionSafe();
  const minutes = spots.map((s) => parseInt(s.time, 10) || 0);
  const max = Math.max(...minutes);
  const min = Math.min(...minutes);
  return (
    <div className="mt-10 space-y-6">
      {spots.map((s, i) => {
        const m = minutes[i];
        // Cuanto más cerca, más llena la barra (rango 35%-100%).
        const pct = max === min ? 100 : 100 - ((m - min) / (max - min)) * 65;
        return (
          <Reveal key={s.name} delay={i * 0.06}>
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-3 text-base text-ink">
                  <MapPin className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                  {s.name}
                </span>
                <span className="shrink-0 font-serif text-xl text-ink">{s.time}</span>
              </div>
              <div className="h-[3px] w-full bg-ink/10">
                <motion.div
                  className="h-full bg-gold"
                  initial={{ width: reduce ? `${pct}%` : 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: reduce ? 0 : 1,
                    delay: reduce ? 0 : 0.1 + i * 0.08,
                    ease: EASE,
                  }}
                />
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ─────────── Ubicación ─────────── */

function Ubicacion() {
  const t = useT().ubicacion;
  const [mapFailed, setMapFailed] = useState(false);
  return (
    <section
      id="ubicacion"
      className="stone-grain relative overflow-hidden bg-stone-soft py-32 md:py-48"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:px-10">
        <Reveal>
          <SectionNumber n="05" label={t.sectionLabel} />
          <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
            {t.titlePre}
            <br />
            {t.titleMid} <em className="text-gold">{t.titleEm}</em>.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-ink/80">{t.p1}</p>
          <DistanceBars spots={t.spots} />
          <p className="mt-8 text-sm italic leading-relaxed text-ink/60">{t.footnote}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-square overflow-hidden border border-ink/15 bg-ink">
            {!mapFailed ? (
              <iframe
                title={t.mapTitle}
                src="https://www.google.com/maps?q=Calle+Cornudilla+3,+10003+C%C3%A1ceres,+Spain&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onError={() => setMapFailed(true)}
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-stone-deep px-6 text-center text-cream">
                <BattlementMark className="h-10 w-auto text-gold" />
                <p className="text-sm text-cream/80">{t.mapErrorText}</p>
              </div>
            )}
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 bg-ink/85 px-3 py-2 text-cream backdrop-blur">
              <BattlementMark className="h-4 w-auto text-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em]">{t.mapBadge}</span>
            </div>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-cream px-4 py-2.5 text-[10px] uppercase tracking-[0.3em] text-ink shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)] transition-colors hover:bg-gold"
            >
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
              {t.mapOpenLink}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Clima en directo de Cáceres ─────────── */

type WeatherData = { temp: number; code: number; sunset: string };

function useCaceresWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${CACERES_LAT}&longitude=${CACERES_LON}` +
      `&current=temperature_2m,weather_code&daily=sunset&timezone=Europe%2FMadrid&forecast_days=1`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("weather request failed");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setData({
          temp: Math.round(json.current.temperature_2m),
          code: json.current.weather_code,
          sunset: json.daily.sunset[0],
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, error };
}

function weatherIcon(code: number) {
  if (code === 0) return Sun;
  if (code === 1 || code === 2 || code === 3) return CloudSun;
  if (code === 45 || code === 48) return CloudFog;
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return CloudRain;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return CloudSnow;
  if (code === 95 || code === 96 || code === 99) return CloudLightning;
  return Cloud;
}

function formatMadridTime(iso: string) {
  // La API ya devuelve la hora local de Madrid (timezone=Europe/Madrid) sin
  // offset; se extrae el HH:MM tal cual para no reconvertir con la zona
  // horaria del visitante (que duplicaría el desfase horario).
  const match = iso.match(/T(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : iso;
}

function LiveWeather() {
  const t = useT().weather;
  const { data, error } = useCaceresWeather();
  if (error || !data) return null;
  const Icon = weatherIcon(data.code);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 border border-cream/15 bg-cream/[0.04] px-5 py-3 text-xs text-cream/80"
    >
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
        {t.now} <strong className="font-medium text-cream">{data.temp}°C</strong>
      </span>
      <span className="hidden h-3 w-px bg-cream/20 sm:block" />
      <span className="flex items-center gap-2">
        <Sunset className="h-4 w-4 text-gold" strokeWidth={1.5} />
        {t.sunset.replace("{time}", formatMadridTime(data.sunset))}
      </span>
    </motion.div>
  );
}

/* ─────────── Mapa experiencial de cercanía ─────────── */

type LandmarkType =
  | "church"
  | "quarter"
  | "museum"
  | "plaza"
  | "steps"
  | "tower"
  | "arch"
  | "ruins";

const LANDMARK_ICON: Record<string, LandmarkType> = {
  "Iglesia de San Juan": "church",
  "Barrio judío": "quarter",
  "Museo de Cáceres": "museum",
  "Plaza Mayor": "plaza",
  "Plaza de San Jorge": "steps",
  "Torre de Bujaco": "tower",
  "Arco de la Estrella": "arch",
  "Foro de los Balbos": "ruins",
};

/* Iconos lineales trazados a mano para cada monumento — nada de pines
   genéricos, cada lugar tiene su propio glifo (24×24). */
function LandmarkGlyph({
  type,
  stroke = "currentColor",
  strokeWidth = 1.5,
}: {
  type: LandmarkType;
  stroke?: string;
  strokeWidth?: number;
}) {
  const p = {
    fill: "none",
    stroke,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "church":
      return (
        <g {...p}>
          <path d="M6 21V11l6-5 6 5v10" />
          <path d="M9 21v-6h6v6" />
          <path d="M12 6V3M10.5 4h3" />
        </g>
      );
    case "quarter":
      return (
        <g {...p}>
          <path d="M4 21V9l3-2 3 2v12" />
          <path d="M14 21V7l3-2.5L20 7v14" />
          <path d="M12 15.5v2.5" />
        </g>
      );
    case "museum":
      return (
        <g {...p}>
          <path d="M3 21h18" />
          <path d="M4 21V10M8 21V10M12 21V10M16 21V10M20 21V10" />
          <path d="M2.5 10 12 4l9.5 6" />
        </g>
      );
    case "plaza":
      return (
        <g {...p}>
          <path d="M4 21v-8.5a2.5 2.5 0 0 1 5 0V21" />
          <path d="M9.5 21v-8.5a2.5 2.5 0 0 1 5 0V21" />
          <path d="M15 21v-8.5a2.5 2.5 0 0 1 4.6-1.4" />
          <path d="M3 21h19" />
        </g>
      );
    case "steps":
      return (
        <g {...p}>
          <path d="M4 21v-4h4v-4h4v-4h4v-4h4" />
        </g>
      );
    case "tower":
      return (
        <g {...p}>
          <path d="M7 21V9h10v12" />
          <path d="M7 9V6h2V4h2v2h2V4h2v2h2v3" />
          <path d="M10 21v-5h4v5" />
        </g>
      );
    case "arch":
      return (
        <g {...p}>
          <path d="M5 21V11a7 7 0 0 1 14 0v10" />
          <path d="M5 21h14" />
          <path d="M8 21v-8M16 21v-8" />
        </g>
      );
    case "ruins":
      return (
        <g {...p}>
          <path d="M3 21h18" />
          <path d="M6 21V9M11 21V5M16 21v-9M20 21V11" />
        </g>
      );
    default:
      return null;
  }
}

/* Proyección isométrica: una maqueta de bronce del casco histórico, no un
   plano técnico. Los edificios se agrupan en tres caras (superior, derecha,
   izquierda) con distinta opacidad de dorado sobre el fondo tinta — así el
   propio color hace de sombreado, como una pieza de metal fundido bajo luz
   cenital. */
const ISO_TW = 34;
const ISO_TH = 17;

function isoProject(gx: number, gy: number, gz: number) {
  return { x: (gx - gy) * ISO_TW, y: (gx + gy) * ISO_TH - gz };
}

function isoPts(pts: { x: number; y: number }[]) {
  return pts.map((p) => `${p.x},${p.y}`).join(" ");
}

function isoBoxFaces(cx: number, cy: number, a: number, h: number) {
  const A = { x: cx - a, y: cy - a };
  const B = { x: cx + a, y: cy - a };
  const C = { x: cx + a, y: cy + a };
  const D = { x: cx - a, y: cy + a };
  const p = (pt: { x: number; y: number }, z: number) => isoProject(pt.x, pt.y, z);
  return {
    top: isoPts([p(A, h), p(B, h), p(C, h), p(D, h)]),
    right: isoPts([p(B, h), p(C, h), p(C, 0), p(B, 0)]),
    left: isoPts([p(C, h), p(D, h), p(D, 0), p(C, 0)]),
    apex: p({ x: cx, y: cy }, h),
    ground: p({ x: cx, y: cy }, 0),
  };
}

function IsoBox({
  cx,
  cy,
  a,
  h,
  opacity,
}: {
  cx: number;
  cy: number;
  a: number;
  h: number;
  opacity: number;
}) {
  const f = isoBoxFaces(cx, cy, a, h);
  return (
    <g>
      <polygon points={f.left} fill="var(--color-gold)" opacity={opacity * 0.28} />
      <polygon points={f.right} fill="var(--color-gold)" opacity={opacity * 0.5} />
      <polygon points={f.top} fill="var(--color-gold)" opacity={opacity} />
    </g>
  );
}

/* Escala de la "huella" de cada edificio: cx/cy/a se definen con números
   cómodos de leer (en píxeles-ish) y aquí se reducen a la unidad de
   rejilla real que espera isoProject/isoBoxFaces. La altura (h) no se
   escala: ya se resta directamente en píxeles dentro de la proyección. */
const FOOT = 1 / 30;

function IsoBuilding({ type, opacity }: { type: LandmarkType; opacity: number }) {
  const line = { stroke: "var(--color-ink)", strokeWidth: 1, opacity: opacity * 0.5 };
  const box = (cx: number, cy: number, a: number, h: number) => (
    <IsoBox cx={cx * FOOT} cy={cy * FOOT} a={a * FOOT} h={h} opacity={opacity} />
  );
  switch (type) {
    case "tower": {
      const capH = 64 + 8;
      const a = 15 * FOOT;
      const edgeB = isoProject(a, -a, capH);
      const edgeC = isoProject(a, a, capH);
      const merlons = [0.12, 0.38, 0.62, 0.88].map((frac) => ({
        x: edgeB.x + (edgeC.x - edgeB.x) * frac,
        y: edgeB.y + (edgeC.y - edgeB.y) * frac,
      }));
      return (
        <g>
          {box(0, 0, 13, 64)}
          {box(0, 0, 15, 8)}
          {merlons.map((m, i) => (
            <rect
              key={i}
              x={m.x - 3}
              y={m.y - 10}
              width={6}
              height={10}
              fill="var(--color-gold)"
              opacity={opacity}
            />
          ))}
        </g>
      );
    }
    case "church": {
      const apex = isoProject(0, 0, 58);
      const l = isoProject(-13 * FOOT, -13 * FOOT, 40);
      const r = isoProject(13 * FOOT, -13 * FOOT, 40);
      return (
        <g>
          {box(0, 0, 13, 40)}
          <polygon
            points={isoPts([{ x: l.x, y: l.y }, apex, { x: r.x, y: r.y }])}
            fill="var(--color-gold)"
            opacity={opacity * 0.85}
          />
          <line x1={apex.x} y1={apex.y} x2={apex.x} y2={apex.y - 14} {...line} />
        </g>
      );
    }
    case "museum": {
      const apex = isoProject(0, -2 * FOOT, 46);
      const l = isoProject(-18 * FOOT, -8 * FOOT, 34);
      const r = isoProject(18 * FOOT, -8 * FOOT, 34);
      return (
        <g>
          {box(0, 0, 18, 34)}
          <polygon
            points={isoPts([{ x: l.x, y: l.y }, apex, { x: r.x, y: r.y }])}
            fill="var(--color-gold)"
            opacity={opacity * 0.85}
          />
        </g>
      );
    }
    case "plaza":
      return (
        <g>
          {box(0, 0, 22, 4)}
          {box(0, 0, 3, 16)}
        </g>
      );
    case "steps":
      return (
        <g>
          {box(0, 0, 20, 5)}
          {box(-2, -2, 12, 12)}
        </g>
      );
    case "arch":
      return (
        <g>
          {box(0, 0, 16, 13)}
          {box(-11, -1, 5, 32)}
          {box(11, -1, 5, 32)}
        </g>
      );
    case "ruins":
      return (
        <g>
          {box(-11, -6, 3, 14)}
          {box(7, -10, 3, 24)}
          {box(10, 7, 3, 17)}
          {box(-6, 9, 3, 9)}
        </g>
      );
    case "quarter":
      return (
        <g>
          {box(-9, 4, 8, 24)}
          {box(9, -4, 7, 19)}
        </g>
      );
    default:
      return null;
  }
}

function ExperienceMap() {
  const t = useT().guia;
  const reduce = useReducedMotionSafe();
  const [active, setActive] = useState<string | null>(null);
  const toGridR = (min: number) => 1.4 + min * 0.62;

  const items = t.radarPoints.map((p) => {
    const rad = (p.angle * Math.PI) / 180;
    const r = toGridR(p.time);
    const gx = r * Math.cos(rad);
    const gy = r * Math.sin(rad);
    return { ...p, gx, gy, glyph: LANDMARK_ICON[p.name], depth: gx + gy };
  });
  const byTime = [...items].sort((a, b) => a.time - b.time);
  const numByName = new Map(byTime.map((it, i) => [it.name, i + 1]));
  const sorted = [...items].sort((a, b) => a.depth - b.depth);
  const activeItem = items.find((it) => it.name === active) ?? null;
  const majmaGround = isoProject(0, 0, 0);
  const mapsHref = activeItem
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        MAJMA_ADDRESS,
      )}&destination=${encodeURIComponent(`${activeItem.name}, Cáceres`)}&travelmode=walking`
    : null;

  return (
    <div className="stone-grain-dark relative border border-cream/10 bg-ink/70 p-4 md:p-8">
      <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-cream/40 md:hidden">
        {t.mapTapHint}
      </p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px] md:items-center md:gap-12">
        <div className="relative mx-auto aspect-[5/3] w-full max-w-xl">
          <svg
            viewBox="-400 -260 800 480"
            className="h-full w-full overflow-visible"
            role="img"
            aria-label={t.proximityMapLabel}
          >
            {/* Rutas: se iluminan solo cuando su edificio está activo */}
            {items.map((it) => {
              const g = isoProject(it.gx, it.gy, 0);
              const isActive = active === it.name;
              return (
                <motion.line
                  key={it.name}
                  x1={majmaGround.x}
                  y1={majmaGround.y}
                  x2={g.x}
                  y2={g.y}
                  stroke="var(--color-gold)"
                  strokeDasharray="1 5"
                  strokeLinecap="round"
                  animate={{
                    strokeOpacity: isActive ? 0.9 : 0.12,
                    strokeWidth: isActive ? 1.5 : 1,
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              );
            })}

            {/* Sombra tenue de base para asentar cada volumen en el plano */}
            {sorted.map((it) => {
              const f = isoBoxFaces(it.gx, it.gy, 16, 0);
              return (
                <ellipse
                  key={`shadow-${it.name}`}
                  cx={f.ground.x}
                  cy={f.ground.y + 3}
                  rx={20}
                  ry={9}
                  fill="var(--color-ink)"
                  opacity={0.35}
                />
              );
            })}

            {sorted.map((it, i) => {
              const isActive = active === it.name;
              const dimmed = active !== null && !isActive;
              const opacity = dimmed ? 0.32 : isActive ? 1 : 0.72;
              return (
                <motion.g
                  key={it.name}
                  initial={{ opacity: reduce ? undefined : 0, y: reduce ? 0 : 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: reduce ? 0 : 0.05 * i, ease: EASE }}
                  style={{
                    transformOrigin: `${isoProject(it.gx, it.gy, 0).x}px ${isoProject(it.gx, it.gy, 0).y}px`,
                  }}
                >
                  <motion.g
                    animate={{ opacity }}
                    transition={{ duration: 0.35, ease: EASE }}
                    transform={`translate(${isoProject(it.gx, it.gy, 0).x}, ${isoProject(it.gx, it.gy, 0).y})`}
                    onMouseEnter={() => setActive(it.name)}
                    onMouseLeave={() => setActive((a) => (a === it.name ? null : a))}
                    onClick={() => setActive(it.name)}
                    onFocus={() => setActive(it.name)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${it.name}, ${it.time} ${t.minWalk}`}
                    className="cursor-pointer outline-none"
                  >
                    <circle cx={0} cy={-24} r={40} fill="transparent" />
                    <IsoBuilding type={it.glyph} opacity={1} />
                    <motion.g
                      animate={{ scale: isActive ? 1.18 : 1 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      style={{ transformOrigin: "0px -84px" }}
                    >
                      <circle
                        cx={0}
                        cy={-84}
                        r={11}
                        fill="var(--color-ink)"
                        stroke="var(--color-gold)"
                        strokeWidth={isActive ? 1.75 : 1.1}
                      />
                      <text
                        x={0}
                        y={-80.5}
                        textAnchor="middle"
                        fontSize="10"
                        fontFamily="var(--font-serif)"
                        fill="var(--color-gold)"
                        style={{ pointerEvents: "none" }}
                      >
                        {numByName.get(it.name)}
                      </text>
                    </motion.g>
                  </motion.g>
                </motion.g>
              );
            })}

            {/* MAJMA: la maqueta se sostiene sobre su propio brillo */}
            <motion.circle
              cx={majmaGround.x}
              cy={majmaGround.y - 30}
              r={30}
              fill="var(--color-gold)"
              initial={{ opacity: 0.1 }}
              animate={reduce ? { opacity: 0.1 } : { opacity: [0.08, 0.22, 0.08] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "blur(14px)" }}
            />
            <g transform={`translate(${majmaGround.x}, ${majmaGround.y})`}>
              <IsoBuilding type="tower" opacity={1} />
            </g>
            <text
              x={majmaGround.x}
              y={majmaGround.y + 22}
              textAnchor="middle"
              fill="var(--color-gold)"
              fontSize="12"
              letterSpacing="2"
              fontFamily="var(--font-serif)"
            >
              MAJMA
            </text>

            {/* Recorrido: un punto dorado camina desde MAJMA hasta el lugar activo */}
            {!reduce &&
              activeItem &&
              (() => {
                const g = isoProject(activeItem.gx, activeItem.gy, 0);
                return (
                  <motion.circle
                    key={`walker-${activeItem.name}`}
                    r={3.5}
                    fill="var(--color-gold)"
                    initial={{ cx: majmaGround.x, cy: majmaGround.y, opacity: 0 }}
                    animate={{
                      cx: [majmaGround.x, g.x],
                      cy: [majmaGround.y, g.y],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ filter: "drop-shadow(0 0 3px var(--color-gold))" }}
                  />
                );
              })()}

            {/* Rosa de los vientos */}
            <g transform="translate(348, -212)" opacity={0.55}>
              <circle r={22} fill="none" stroke="var(--color-gold)" strokeWidth={1} opacity={0.6} />
              <path d="M0,-16 L5,3 L0,-2 L-5,3 Z" fill="var(--color-gold)" />
              <text
                x={0}
                y={32}
                textAnchor="middle"
                fontSize="9"
                letterSpacing="1"
                fill="var(--color-cream)"
                fillOpacity={0.6}
              >
                N
              </text>
            </g>

            {/* Escala */}
            <g transform="translate(-372, 198)" opacity={0.5}>
              <line x1={0} y1={0} x2={64} y2={0} stroke="var(--color-cream)" strokeWidth={1} />
              <line x1={0} y1={-4} x2={0} y2={4} stroke="var(--color-cream)" strokeWidth={1} />
              <line x1={64} y1={-4} x2={64} y2={4} stroke="var(--color-cream)" strokeWidth={1} />
              <text
                x={32}
                y={16}
                textAnchor="middle"
                fontSize="8"
                letterSpacing="0.5"
                fill="var(--color-cream)"
                fillOpacity={0.65}
              >
                {t.scaleLabel}
              </text>
            </g>

            {sorted.map((it) => {
              const g = isoProject(it.gx, it.gy, 0);
              const isActive = active === it.name;
              const dimmed = active !== null && !isActive;
              return (
                <text
                  key={`label-${it.name}`}
                  x={g.x}
                  y={g.y + 16}
                  textAnchor="middle"
                  fill={isActive ? "var(--color-gold)" : "var(--color-cream)"}
                  fillOpacity={dimmed ? 0.3 : isActive ? 1 : 0.7}
                  fontSize="10"
                  letterSpacing="0.5"
                  style={{ pointerEvents: "none" }}
                >
                  {it.time} {t.minWalk}
                </text>
              );
            })}
          </svg>
        </div>

        <div className="relative min-h-[220px] md:min-h-[260px]">
          <AnimatePresence mode="wait">
            {activeItem ? (
              <motion.div
                key={activeItem.name}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden border border-gold/30 bg-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center gap-3 border-b border-cream/10 bg-gold/[0.08] px-5 py-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/50 font-serif text-xs text-gold">
                    {numByName.get(activeItem.name)}
                  </span>
                  <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-gold">
                    <LandmarkGlyph
                      type={activeItem.glyph}
                      stroke="currentColor"
                      strokeWidth={1.5}
                    />
                  </svg>
                  <div>
                    <h3 className="font-serif text-lg leading-tight text-cream">
                      {activeItem.name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80">
                      {activeItem.time} {t.minWalk}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-cream/70">{activeItem.desc}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-cream/10 pt-4">
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
                        {t.hoursLabel}
                      </dt>
                      <dd className="mt-1 text-xs leading-relaxed text-cream/80">
                        {activeItem.hours}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
                        {t.priceLabel}
                      </dt>
                      <dd className="mt-1 text-xs leading-relaxed text-cream/80">
                        {activeItem.price}
                      </dd>
                    </div>
                  </dl>
                  {mapsHref && (
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-gold/70 transition-colors duration-300 hover:text-gold"
                    >
                      {t.howToGetThere}
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex h-full min-h-[220px] flex-col items-center justify-center gap-4 border border-cream/10 p-8 text-center md:min-h-[260px]"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold/60">
                  <LandmarkGlyph type="tower" stroke="currentColor" strokeWidth={1.25} />
                </svg>
                <p className="max-w-[24ch] text-xs uppercase tracking-[0.3em] text-cream/40">
                  {t.mapHint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-10 border-t border-cream/10 pt-8 md:mt-12">
        <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-gold/70 md:text-left">
          {t.discoverLabel}
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          {byTime.map((it, i) => {
            const isActive = active === it.name;
            return (
              <button
                key={it.name}
                type="button"
                onMouseEnter={() => setActive(it.name)}
                onMouseLeave={() => setActive((a) => (a === it.name ? null : a))}
                onClick={() => setActive(it.name)}
                onFocus={() => setActive(it.name)}
                className={`flex items-center gap-2.5 border-b py-1.5 text-left transition-colors duration-300 ${
                  isActive
                    ? "border-gold/50 text-gold"
                    : "border-transparent text-cream/60 hover:text-cream/90"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-serif text-[10px] transition-colors duration-300 ${
                    isActive ? "border-gold text-gold" : "border-cream/30 text-cream/50"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="truncate text-xs">{it.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────── Guía de Cáceres ─────────── */

type GuideItem = {
  name: string;
  time: string;
  text: string;
  badge?: string;
  aside?: string;
  skipDirections?: boolean;
};
type GuideGroup = { label: string; icon: typeof Landmark; items: GuideItem[] };

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

function GuiaCaceres() {
  const t = useT().guia;
  const groupIcons = [Car, Landmark, UtensilsCrossed, Compass];
  const groups: GuideGroup[] = t.groups.map((g, i) => ({ ...g, icon: groupIcons[i] }));
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const active = groups[activeTab];

  return (
    <section id="guia" className="relative overflow-hidden bg-ink py-32 text-cream md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="max-w-2xl">
            <SectionNumber n="06" label={t.sectionLabel} dark />
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-cream md:text-6xl">
              {t.titlePre}
              <br />
              <em className="text-gold-soft">{t.titleEm}</em>.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-cream/80">{t.p1}</p>
            <div className="mt-8">
              <LiveWeather />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 md:mt-20">
            <ExperienceMap />
          </div>
        </Reveal>

        {/* Índice de capítulos, como en un cuaderno de viaje: numeración romana
            en vez de pestañas genéricas de aplicación. */}
        <div className="mt-24 grid grid-cols-1 gap-10 md:grid-cols-[260px_1fr] md:gap-16">
          <div className="flex gap-3 overflow-x-auto pb-2 md:sticky md:top-32 md:h-fit md:flex-col md:gap-1 md:overflow-visible md:pb-0">
            {groups.map((g, gi) => {
              const isActive = activeTab === gi;
              return (
                <button
                  key={gi}
                  type="button"
                  onClick={() => {
                    setActiveTab(gi);
                    setExpanded(null);
                  }}
                  className={`group flex shrink-0 items-baseline gap-4 border-l-2 py-3 pl-5 text-left transition-colors md:shrink ${
                    isActive ? "border-gold" : "border-cream/10 hover:border-cream/30"
                  }`}
                >
                  <span
                    className={`font-serif text-2xl leading-none transition-colors ${
                      isActive ? "text-gold" : "text-cream/30 group-hover:text-cream/50"
                    }`}
                  >
                    {ROMAN_NUMERALS[gi]}
                  </span>
                  <span className="flex flex-col">
                    <span
                      className={`text-xs uppercase tracking-[0.25em] transition-colors ${
                        isActive ? "text-cream" : "text-cream/50 group-hover:text-cream/70"
                      }`}
                    >
                      {g.label}
                    </span>
                    <span className="hidden text-[10px] text-cream/35 md:inline">
                      {g.items.length} {g.items.length === 1 ? t.placeSingular : t.placePlural}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                {active.items.map((it, i) => {
                  const isOpen = expanded === it.name;
                  const mapsHref = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                    "Calle Cornudilla 3, Cáceres",
                  )}&destination=${encodeURIComponent(`${it.name}, Cáceres`)}&travelmode=walking`;
                  return (
                    <motion.div
                      key={it.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                      className={`border p-6 transition-colors ${
                        isOpen
                          ? "border-gold/50 bg-cream/[0.06]"
                          : "border-cream/10 bg-cream/[0.03] hover:border-gold/30"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : it.name)}
                        className="flex w-full items-start justify-between gap-4 text-left"
                      >
                        <div className="flex gap-4">
                          <active.icon
                            className="mt-1 h-4 w-4 shrink-0 text-gold"
                            strokeWidth={1.25}
                          />
                          <div>
                            <span className="font-serif text-lg text-cream">{it.name}</span>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <span className="text-[10px] uppercase tracking-[0.25em] text-gold">
                                {it.time}
                              </span>
                              {it.badge && (
                                <span className="border border-gold/40 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.15em] text-gold-soft">
                                  {it.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <ChevronDown
                          className={`mt-1 h-4 w-4 shrink-0 text-cream/40 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 text-sm leading-relaxed text-cream/70">{it.text}</p>
                            {it.aside && (
                              <p className="mt-3 border-l-2 border-gold/50 pl-3 text-sm italic leading-relaxed text-gold-soft/90">
                                {it.aside}
                              </p>
                            )}
                            {!it.skipDirections && (
                              <a
                                href={mapsHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-soft"
                              >
                                <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                                {t.howToGetThere}
                              </a>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="mt-16 border-t border-cream/10 pt-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40">
                {t.plazaMayorNote}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-cream/70">
                {t.plazaMayorDistances.map((d) => (
                  <span key={d.name}>
                    {d.name} <span className="text-gold">· {d.time}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Testimonios ─────────── */

type Review = {
  name: string;
  origin: string;
  text: string;
};

/* Reseñas reales de huéspedes, tal cual aparecen en Booking.com (recortadas por Booking con "...") */
function Testimonios() {
  const t = useT().testimonios;
  const reviews: Review[] = [
    {
      name: "Maria",
      origin: "Chile",
      text: "Su anfitrión súper atento! Pedí una plancha que no tenía el dpto y me la consiguió sin problema! Además siempre recomendaba lugares y estaba...",
    },
    {
      name: "Elizabeth",
      origin: "España",
      text: "La ubicación es ideal para visitar Cáceres. El anfitrión muy atento. Tener en cuenta que para el apartamento 2 y 3 hay que subir escaleras y que...",
    },
    {
      name: "Maite",
      origin: "España",
      text: "La paz que se respira en el apartamento, la cercanía a la zona monumental, el diseñó interior y la cama nos resultó comodísima. Descansamos muy...",
    },
    {
      name: "Laura",
      origin: "España",
      text: "El apartamento con mayor encanto en el que hemos estado. Está cuidado al detalle, la terraza con vistas a la muralla no puede ser más agradable...",
    },
  ];

  return (
    <section id="testimonios" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionNumber n="07" label={t.sectionLabel} />
              <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
                {t.titlePre}
                <br />
                <em className="text-gold">{t.titleEm}</em>.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" strokeWidth={1} />
                ))}
              </div>
              <span className="text-sm text-ink/70">{t.ratingBadge}</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div className="flex h-full flex-col border border-border bg-background p-8">
                <span
                  className="font-serif text-6xl italic leading-none text-gold/60"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/80">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-serif text-lg text-ink">{r.name}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {r.origin} · {t.verifiedBadge}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Preguntas frecuentes ─────────── */

function FAQ() {
  const t = useT().faq;

  return (
    <section id="faq" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal>
          <div className="mb-16 text-center">
            <div className="flex justify-center">
              <SectionNumber n="08" label={t.sectionLabel} />
            </div>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
              {t.titlePre}
              <br />
              <em className="text-gold">{t.titleEm}</em>.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {t.items.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-ink/15">
                <AccordionTrigger className="py-6 text-left font-serif text-lg text-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-ink/75">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-12 text-center text-sm leading-relaxed text-ink/60">
            {t.helpPre}{" "}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline underline-offset-4 hover:text-ink"
            >
              {t.helpLink}
            </a>{" "}
            {t.helpPost}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Calendario de reserva ───────────
   No hay motor de reservas propio: el calendario nunca inventa disponibilidad.
   Solo captura las fechas deseadas y las entrega a la reserva real en Booking. */

function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function BookingCalendar() {
  const t = useT().reserva.calendar;
  const { lang } = useLang();
  const today = startOfDay(new Date());
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState(2);

  const locale = lang === "es" ? "es-ES" : "en-GB";
  const rawMonthLabel = viewMonth.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const monthLabel = rawMonthLabel.charAt(0).toUpperCase() + rawMonthLabel.slice(1);
  const weekdayLabels = Array.from({ length: 7 }).map((_, i) => {
    // 2024-01-01 es lunes: usamos esa semana solo para sacar las iniciales, en el orden correcto.
    const d = new Date(2024, 0, 1 + i);
    return d.toLocaleDateString(locale, { weekday: "narrow" });
  });

  const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;
  const cells: (Date | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1),
    ),
  ];

  const isPast = (d: Date) => d < today;
  const isSameDay = (a: Date | null, b: Date | null) => !!a && !!b && a.getTime() === b.getTime();
  const inRange = (d: Date) => !!checkIn && !!checkOut && d > checkIn && d < checkOut;

  const handlePick = (d: Date) => {
    if (isPast(d)) return;
    if (!checkIn || checkOut || d <= checkIn) {
      setCheckIn(d);
      setCheckOut(null);
      return;
    }
    setCheckOut(d);
  };

  const nights =
    checkIn && checkOut ? Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000) : 0;

  const bookingHref =
    checkIn && checkOut
      ? `${BOOKING_URL}checkin=${toISODate(checkIn)}&checkout=${toISODate(checkOut)}`
      : BOOKING_URL;

  const canGoPrevMonth =
    new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1) >
    new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="mx-auto mt-14 max-w-md overflow-hidden border border-gold/30 bg-cream text-left text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
      <BattlementSeam from="var(--color-ink)" to="var(--color-cream)" />

      <div className="stone-grain p-6 md:p-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Mes anterior"
            disabled={!canGoPrevMonth}
            onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
            className="text-ink/50 transition-colors hover:text-gold disabled:opacity-20 disabled:hover:text-ink/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-serif text-lg text-ink">{monthLabel}</span>
          <button
            type="button"
            aria-label="Mes siguiente"
            onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
            className="text-ink/50 transition-colors hover:text-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-y-2 text-center">
          {weekdayLabels.map((w, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.2em] text-ink/40">
              {w}
            </span>
          ))}
          {cells.map((d, i) => {
            if (!d) return <span key={i} />;
            const past = isPast(d);
            const selected = isSameDay(d, checkIn) || isSameDay(d, checkOut);
            const within = inRange(d);
            return (
              <button
                key={i}
                type="button"
                disabled={past}
                onClick={() => handlePick(d)}
                className={`relative py-2 text-sm transition-colors ${
                  past
                    ? "cursor-not-allowed text-ink/20"
                    : selected
                      ? "bg-gold font-semibold text-ink"
                      : within
                        ? "bg-gold/15 text-ink"
                        : "text-ink/80 hover:bg-gold/15"
                }`}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-ink/10 bg-ink/[0.03] px-6 py-5 md:px-8">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-ink/50">{t.checkin}</div>
            <div className="font-serif text-base text-ink">
              {checkIn
                ? checkIn.toLocaleDateString(locale, { day: "numeric", month: "short" })
                : "—"}
            </div>
          </div>
          <BattlementMark className="h-4 w-auto shrink-0 text-gold" />
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.25em] text-ink/50">{t.checkout}</div>
            <div className="font-serif text-base text-ink">
              {checkOut
                ? checkOut.toLocaleDateString(locale, { day: "numeric", month: "short" })
                : "—"}
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-ink/50">
          {!checkIn
            ? t.selectPrompt
            : !checkOut
              ? t.selectCheckout
              : `${nights} ${nights === 1 ? t.night : t.nights}`}
        </p>

        <a
          href={bookingHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("click_booking", {
              location: "calendar",
              checkin: checkIn ? toISODate(checkIn) : "",
              checkout: checkOut ? toISODate(checkOut) : "",
            })
          }
          className="mt-5 flex items-center justify-center gap-3 bg-gold px-6 py-3.5 text-xs uppercase tracking-[0.3em] text-ink transition-all hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)] active:scale-[0.98]"
        >
          {t.cta}
          <ArrowRight className="h-4 w-4" />
        </a>

        {(checkIn || checkOut) && (
          <button
            type="button"
            onClick={() => {
              setCheckIn(null);
              setCheckOut(null);
            }}
            className="mt-3 w-full text-center text-[10px] uppercase tracking-[0.2em] text-ink/40 hover:text-gold"
          >
            {t.reset}
          </button>
        )}

        {checkIn && checkOut && (
          <div className="mt-6 border-t border-dashed border-ink/15 pt-6">
            <p className="font-serif text-base text-ink">{t.directTitle}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink/60">{t.directHint}</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="flex-1 border border-ink/15 bg-background px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none"
              />
              <label className="flex shrink-0 items-center gap-2 border border-ink/15 bg-background px-3 py-2.5 text-sm text-ink">
                <span className="text-[10px] uppercase tracking-[0.2em] text-ink/50">
                  {t.guestsLabel}
                </span>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="bg-background text-sm text-ink focus:outline-none"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <a
              href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${encodeURIComponent(
                `Hola, soy ${guestName || "un huésped"}. Quiero reservar en MAJMA del ${toISODate(
                  checkIn,
                )} al ${toISODate(checkOut)} (${nights} ${nights === 1 ? t.night : t.nights}) para ${guestCount} ${
                  t.guestsLabel
                }. ¿Hay disponibilidad?`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("click_whatsapp", {
                  location: "calendar_direct_request",
                  checkin: toISODate(checkIn),
                  checkout: toISODate(checkOut),
                  guests: guestCount,
                })
              }
              className="mt-4 flex items-center justify-center gap-3 border border-ink/20 px-6 py-3.5 text-xs uppercase tracking-[0.3em] text-ink transition-all hover:border-gold hover:text-gold active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              {t.directCta}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────── Reserva ─────────── */

function Reserva() {
  const t = useT().reserva;
  return (
    <section id="reserva" className="relative overflow-hidden bg-ink py-32 text-cream md:py-48">
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-[0.06]">
        <BattlementMark className="h-[90vh] w-auto text-cream" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <SectionNumber n="09" label={t.sectionLabel} dark />
          <h2 className="mt-6 font-serif text-5xl leading-[1] text-cream md:text-7xl">
            {t.titlePre}
            <br />
            <em className="text-gold-soft">{t.titleEm}</em>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream/80">{t.p1}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_booking", { location: "reserva" })}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-ink transition-all hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-[1px] active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {t.ctaBooking}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_whatsapp", { location: "reserva" })}
              className="inline-flex items-center justify-center gap-3 border border-cream/40 px-8 py-4 text-xs uppercase tracking-[0.3em] text-cream transition-all hover:border-gold hover:text-gold active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              {t.ctaWhatsapp}
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => trackEvent("click_phone", { location: "reserva" })}
              className="inline-flex items-center justify-center gap-3 px-4 py-4 text-xs uppercase tracking-[0.3em] text-cream/80 transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4" />
              {PHONE_HUMAN}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mx-auto mt-16 max-w-sm text-sm leading-relaxed text-cream/60">
            {t.calendar.hint}
          </p>
          <BookingCalendar />
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Footer ─────────── */

function Footer() {
  const t = useT().footer;
  return (
    <footer className="border-t border-border bg-cream py-16 pb-28 text-ink md:pb-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-10">
        <div>
          <img src={logoFull} alt="MAJMA · Apartamentos turísticos" className="h-16 w-auto" />
          <p className="mt-6 max-w-xs text-sm text-muted-foreground">{t.tagline}</p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            {t.contacto}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`tel:${PHONE_TEL}`} className="hover:text-gold">
                +34 {PHONE_HUMAN}
              </a>
            </li>
            <li>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                {t.whatsapp}
              </a>
            </li>
            <li>{t.direccion}</li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            {t.legal}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/aviso-legal" className="hover:text-gold">
                {t.avisoLegal}
              </Link>
            </li>
            <li>
              <Link to="/privacidad" className="hover:text-gold">
                {t.privacidad}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-border px-6 pt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:px-10">
        © {new Date().getFullYear()} MAJMA · Cáceres
      </div>
    </footer>
  );
}

/* ─────────── Asistente MAJMA (busca en las FAQ) ───────────
   No hay backend de IA conectado: busca por coincidencia de palabras
   clave contra las preguntas frecuentes reales de la web. Si no
   encuentra una respuesta razonable, ofrece WhatsApp en vez de
   inventar una respuesta. */

function normalizeForMatch(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ");
}

const CHAT_STOPWORDS = new Set([
  "el",
  "la",
  "los",
  "las",
  "de",
  "del",
  "y",
  "a",
  "en",
  "que",
  "con",
  "por",
  "para",
  "es",
  "un",
  "una",
  "al",
  "se",
  "hay",
  "como",
  "cual",
  "cuales",
  "son",
  "o",
  "the",
  "is",
  "are",
  "and",
  "of",
  "to",
  "in",
  "for",
  "on",
  "with",
  "do",
  "does",
  "i",
  "we",
]);

function scoreFaqMatch(query: string, target: string) {
  const qWords = normalizeForMatch(query)
    .split(/\s+/)
    .filter((w) => w.length > 2 && !CHAT_STOPWORDS.has(w));
  if (qWords.length === 0) return 0;
  const tWords = new Set(
    normalizeForMatch(target)
      .split(/\s+/)
      .filter((w) => w.length > 2 && !CHAT_STOPWORDS.has(w)),
  );
  let hits = 0;
  for (const w of qWords) if (tWords.has(w)) hits++;
  return hits / qWords.length;
}

type ChatMessage = { role: "user" | "bot"; text: string; waFallback?: boolean };

function ChatbotWidget() {
  const t = useT().chatbot;
  const faqItems = useT().faq.items;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [thread, setThread] = useState<ChatMessage[]>([]);

  const ask = (question: string) => {
    if (!question.trim()) return;
    let bestScore = 0;
    let bestAnswer: string | null = null;
    for (const item of faqItems) {
      const score = Math.max(
        scoreFaqMatch(question, item.q),
        scoreFaqMatch(question, item.a) * 0.6,
      );
      if (score > bestScore) {
        bestScore = score;
        bestAnswer = item.a;
      }
    }
    const matched = bestScore >= 0.4 ? bestAnswer : null;
    setThread((th) => [
      ...th,
      { role: "user", text: question },
      matched ? { role: "bot", text: matched } : { role: "bot", text: t.noMatch, waFallback: true },
    ]);
    setQuery("");
    trackEvent("chatbot_ask", { matched: !!matched });
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t.label}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1, ease: EASE }}
        className="fixed bottom-24 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-transform hover:scale-105 md:bottom-6"
      >
        {open ? <X className="h-5 w-5" /> : <BattlementMark className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed bottom-40 left-5 right-5 z-50 flex max-h-[70vh] flex-col overflow-hidden border border-gold/30 bg-cream shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:right-auto sm:w-[380px] md:bottom-24"
          >
            <div className="flex items-center gap-3 bg-ink px-5 py-4 text-cream">
              <BattlementMark className="h-5 w-auto text-gold" />
              <div>
                <div className="font-serif text-base">{t.title}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-cream/60">
                  {t.subtitle}
                </div>
              </div>
            </div>

            <div className="stone-grain flex-1 space-y-3 overflow-y-auto p-4 text-ink">
              <p className="text-sm text-ink/70">{t.greeting}</p>
              {thread.length === 0 && (
                <div className="flex flex-wrap gap-2">
                  {faqItems.slice(0, 5).map((it) => (
                    <button
                      key={it.q}
                      type="button"
                      onClick={() => ask(it.q)}
                      className="border border-ink/15 bg-cream px-3 py-1.5 text-left text-xs text-ink/80 hover:border-gold hover:text-gold"
                    >
                      {it.q}
                    </button>
                  ))}
                </div>
              )}
              {thread.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gold text-ink"
                        : "border border-ink/10 bg-cream text-ink/85"
                    }`}
                  >
                    {m.text}
                    {m.waFallback && (
                      <a
                        href={WA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("click_whatsapp", { location: "chatbot" })}
                        className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-soft"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        {t.whatsappCta}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(query);
              }}
              className="flex items-center gap-2 border-t border-ink/10 bg-cream p-3"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 border border-ink/15 bg-background px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                aria-label={t.send}
                className="flex h-9 w-9 shrink-0 items-center justify-center bg-gold text-ink transition-colors hover:bg-gold-soft"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────── WhatsApp FAB ─────────── */

function WhatsAppFab() {
  const wa = useT().whatsappFab;
  const [show, setShow] = useState(false);
  const [tag, setTag] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    if (typeof window === "undefined") return;
    setShow(v > window.innerHeight * 0.9);
  });
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setTag(true), 1200);
    const t2 = setTimeout(() => setTag(false), 4500);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [show]);

  return (
    <motion.a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("click_whatsapp", { location: "fab" })}
      aria-label={wa.ariaLabel}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="group fixed bottom-24 right-5 z-50 flex items-center gap-3 rounded-full bg-ink px-5 py-4 text-cream shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-all hover:bg-gold hover:text-ink md:bottom-6"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
      <motion.span
        initial={false}
        animate={{ width: tag ? "auto" : 0, opacity: tag ? 1 : 0, marginLeft: tag ? 4 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="hidden overflow-hidden whitespace-nowrap text-xs uppercase tracking-[0.3em] sm:inline-block"
      >
        {wa.tag}
      </motion.span>
    </motion.a>
  );
}

/* ─────────── Sticky CTA móvil ─────────── */

function MobileStickyCTA() {
  const t = useT().mobileSticky;
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    if (typeof window === "undefined") return;
    setShow(v > window.innerHeight * 0.6);
  });
  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: show ? 0 : 80 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-ink/10 bg-cream/95 p-3 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.2)] backdrop-blur md:hidden"
    >
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("click_booking", { location: "mobile_sticky" })}
        className="flex flex-1 items-center justify-center gap-2 bg-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] text-cream active:scale-[0.98]"
      >
        {t.ctaBooking}
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        onClick={() => trackEvent("click_phone", { location: "mobile_sticky" })}
        aria-label={t.ariaCall}
        className="flex items-center justify-center border border-ink/30 px-4 py-3 text-ink active:scale-[0.98]"
      >
        <Phone className="h-4 w-4" />
      </a>
    </motion.div>
  );
}
