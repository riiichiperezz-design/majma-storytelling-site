import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  useInView,
} from "motion/react";
import { useRef, useState, useCallback, useEffect, useMemo, type MouseEvent } from "react";
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
  Home,
  CalendarCheck,
  Share2,
  Link2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";
import { useT, useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import {
  SITE_URL,
  BOOKING_URL,
  PHONE_HUMAN,
  PHONE_TEL,
  WA_URL,
  GOOGLE_MAPS_URL,
  EASE,
} from "@/lib/site";

import heroImg from "@/assets/hero-caceres.webp";
import heroVideo from "@/assets/hero-video.mp4";
import caceresSkylineImg from "@/assets/caceres-skyline.webp";
import logoFull from "@/assets/logo-full.webp";
import logoBlanco from "@/assets/logo-blanco.webp";
import mapa3dImg from "@/assets/mapa3d.webp";
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
// Compartidos con el blog vía src/lib/site.ts para que no puedan
// desincronizarse entre secciones.

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

/* Preguntas frecuentes para el JSON-LD de SEO — reutiliza content.es.faq.items
   (la misma fuente que alimenta la sección visible y el chatbot) para que el
   rich snippet de Google nunca quede desincronizado con lo que ve el usuario. */
const FAQS = content.es.faq.items;

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
  const t = useT();
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-ink"
      >
        {t.skipToContent}
      </a>
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

export function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));
  const t = useT().nav;
  // Los enlaces de navegación son anclas ("#apartamento"...) que solo existen
  // en la portada. Fuera de ella (p.ej. en el blog), hay que anteponer "/"
  // para volver a la portada y saltar a la sección, en vez de no hacer nada.
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const anchor = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);
  // Fuera de la portada no hay vídeo/hero oscuro tras la cabecera transparente
  // — sin esto, el texto claro quedaría invisible sobre el fondo cream.
  const solidBar = scrolled || !onHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solidBar
          ? "bg-ink/85 backdrop-blur-md shadow-[0_2px_20px_-10px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-6 md:px-10 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      >
        <a
          href={onHome ? "#top" : "/"}
          className="flex items-center text-cream drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          <img
            src={logoBlanco}
            alt="MAJMA · Apartamentos turísticos"
            className={`${scrolled ? "h-9" : "h-12"} w-auto transition-[height] duration-500`}
          />
        </a>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.25em] text-cream/85 md:flex lg:gap-7 lg:tracking-[0.3em]">
          {t.links.map((l) => (
            <a
              key={l.href}
              href={anchor(l.href)}
              className="hover:text-gold transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <LangToggle />
          <a
            href={anchor("#reserva")}
            className="inline-flex items-center gap-2 border border-gold/60 px-5 py-2 text-xs uppercase tracking-[0.3em] text-cream transition-all duration-300 hover:bg-gold hover:text-ink"
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
              href={anchor(l.href)}
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
            href={anchor("#reserva")}
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
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-ink transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-[1px] active:scale-[0.98]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {t.ctaBooking}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#apartamento"
            className="inline-flex items-center gap-3 border border-cream/40 px-8 py-4 text-xs uppercase tracking-[0.3em] text-cream transition-all duration-300 hover:border-gold hover:text-gold active:scale-[0.98]"
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
                className={`group relative px-1 pb-4 pt-1 text-left transition-colors duration-300 ${
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
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-cream px-4 py-2.5 text-[10px] uppercase tracking-[0.3em] text-ink shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:bg-gold"
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

/* ─────────── Descubre Cáceres: mapa 3D interactivo ─────────── */

// Todo lo geométrico/visual del mapa vive aquí, separado de content.ts:
// posición de cada pin (x/y en % de mapa3d.webp, imagen de 1672×941 px) y el
// trazado SVG (`routePath`, mismo sistema de coordenadas 0-100) de la ruta a
// pie desde MAJMA hasta ese punto. No es texto traducible, así que no se
// duplica por idioma — content.ts solo aporta nombre/descripción/horario.
//
// Los routePath NO son curvas dibujadas a mano ni líneas rectas: se generaron
// clasificando cada píxel de mapa3d.webp (calle/plaza vs. tejado vs. muro vs.
// césped por color) y calculando la ruta de menor coste desde MAJMA hasta
// cada punto con Dijkstra sobre esa cuadrícula, para que discurra por las
// propias calles y plazas en vez de atravesar manzanas. El resultado se
// suavizó (Catmull-Rom → Bézier) y se verificó de nuevo muestreando el color
// a lo largo de la curva ya suavizada: cada ruta cruza tejado en <3.3% de los
// puntos muestreados (recortes de esquina al suavizar, no atravesar un
// edificio). Script usado: no versionado, ver historial de este cambio.
//
// Las posiciones (x, y) de los puntos 1-7 y 9-11 vienen de la foto de
// referencia con marcas exactas que envió el propietario. El punto 8 (Foro
// de los Balbos) es el único sin esa referencia — su posición es una
// estimación mía a partir del plano numerado oficial.
// TODO: si algún tramo no encaja al pixel, edita los puntos de control del
// `routePath` correspondiente comparando con la sección renderizada.
const MAJMA_MAP_POSITION = { x: 80.5, y: 58.5 };

const MAP_GEOMETRY: Record<number, { x: number; y: number; routePath: string }> = {
  // 1 · Iglesia de San Juan — a la vuelta de la esquina.
  1: {
    x: 77.28,
    y: 68.91,
    routePath:
      "M 80.5 58.5 C 80.44 59.67, 81.19 62.96, 80.74 64.72 C 80.29 66.47, 78.2 68.44, 77.69 69.18",
  },
  // 2 · Barrio judío — rodea el bloque central y sube por la judería vieja al norte.
  2: {
    x: 50.71,
    y: 28.3,
    routePath:
      "M 80.5 58.5 C 80.44 59.83, 80.98 63.6, 80.74 65.67 C 80.5 67.75, 79.61 69.93, 78.95 71.09 C 78.29 72.26, 77.93 72.05, 76.79 72.69 C 75.66 73.33, 76.73 74.55, 72.13 74.92 C 67.52 75.29, 53.44 76.25, 49.16 74.92 C 44.89 73.59, 46.95 69.87, 46.47 66.95 C 45.99 64.03, 46.02 59.14, 46.29 57.39 C 46.56 55.63, 47.37 57.17, 48.09 56.43 C 48.8 55.69, 50.15 54.14, 50.6 52.92 C 51.05 51.7, 50.99 50.05, 50.78 49.1 C 50.57 48.14, 49.76 48.46, 49.34 47.18 C 48.92 45.91, 49.01 43.68, 48.27 41.45 C 47.52 39.21, 44.53 35.87, 44.86 33.79 C 45.19 31.72, 49.34 29.81, 50.24 29.01",
  },
  // 3 · Museo de Cáceres — rodea por el este, sube hacia la zona norte del museo.
  3: {
    x: 62.99,
    y: 25.4,
    routePath:
      "M 80.5 58.5 C 80.44 59.72, 80.47 63.66, 80.74 65.04 C 81.01 66.42, 81.58 66.68, 82 66.95 C 82.42 67.22, 82.18 68.38, 83.25 66.63 C 84.33 64.88, 87.38 58.93, 88.46 56.43 C 89.53 53.93, 89.65 53.61, 89.71 51.65 C 89.77 49.68, 90.16 47.98, 88.82 44.63 C 87.47 41.29, 82.78 34.06, 81.64 31.56 C 80.5 29.06, 81.67 30.07, 82 29.65 C 82.33 29.22, 83.34 30.82, 83.61 29.01 C 83.88 27.21, 83.97 21.15, 83.61 18.81 C 83.25 16.47, 83.22 15.62, 81.46 14.98 C 79.69 14.35, 74.67 14.61, 73.03 14.98 C 71.38 15.36, 72.13 16.79, 71.59 17.22 C 71.05 17.64, 70.84 16.15, 69.8 17.53 C 68.75 18.92, 66.48 24.12, 65.31 25.5 C 64.14 26.89, 63.22 25.77, 62.8 25.82",
  },
  // 4 · Plaza Mayor — baja por el corredor central hasta la explanada de entrada.
  4: {
    x: 49.63,
    y: 72.24,
    routePath:
      "M 80.5 58.5 C 80.44 59.83, 80.95 63.66, 80.74 65.67 C 80.53 67.69, 80.41 69.29, 79.13 70.78 C 77.84 72.26, 77.75 73.91, 73.03 74.6 C 68.3 75.29, 54.64 75.24, 50.78 74.92 C 46.92 74.6, 50.03 73.06, 49.88 72.69",
  },
  // 5 · Plaza de San Jorge — corredor central, rama hacia la Concatedral.
  5: {
    x: 53.26,
    y: 43.73,
    routePath:
      "M 80.5 58.5 C 80.44 59.83, 81.34 63.34, 80.74 65.67 C 80.14 68.01, 78.23 71.15, 76.79 72.69 C 75.36 74.23, 76.73 74.55, 72.13 74.92 C 67.52 75.29, 53.47 77.84, 49.16 74.92 C 44.86 72, 45.48 62.11, 46.29 57.39 C 47.1 52.66, 52.81 48.88, 54.01 46.55 C 55.2 44.21, 53.56 43.89, 53.47 43.36",
  },
  // 6 · Torre de Bujaco — junto a la entrada de la Plaza Mayor.
  6: {
    x: 44.07,
    y: 68.13,
    routePath:
      "M 80.5 58.5 C 80.44 59.83, 80.95 63.66, 80.74 65.67 C 80.53 67.69, 80.56 69.23, 79.13 70.78 C 77.69 72.32, 77.12 74.23, 72.13 74.92 C 67.14 75.61, 53.29 75.72, 49.16 74.92 C 45.04 74.12, 48.21 71.25, 47.37 70.14 C 46.53 69.02, 44.68 68.54, 44.14 68.23",
  },
  // 7 · Arco de la Estrella — junto a Torre de Bujaco, misma entrada.
  7: {
    x: 47.59,
    y: 64,
    routePath:
      "M 80.5 58.5 C 80.44 59.83, 80.95 63.66, 80.74 65.67 C 80.53 67.69, 80.56 69.23, 79.13 70.78 C 77.69 72.32, 77.12 74.23, 72.13 74.92 C 67.14 75.61, 53.26 75.72, 49.16 74.92 C 45.07 74.12, 47.79 71.84, 47.55 70.14 C 47.31 68.44, 47.7 65.62, 47.73 64.72",
  },
  // 8 · Foro de los Balbos — se desvía del corredor central un poco antes.
  //     Único punto sin foto de referencia del propietario; posición estimada.
  8: {
    x: 52,
    y: 60,
    routePath:
      "M 80.5 58.5 C 80.44 59.83, 81.01 63.55, 80.74 65.67 C 80.47 67.8, 80.2 69.87, 78.77 71.41 C 77.33 72.95, 74.28 74.34, 72.13 74.92 C 69.98 75.5, 66.99 75.08, 65.85 74.92 C 64.71 74.76, 66.36 74.12, 65.31 73.96 C 64.26 73.8, 61 74.97, 59.57 73.96 C 58.13 72.95, 56.94 69.5, 56.7 67.91 C 56.46 66.31, 57.98 66.26, 58.13 64.4 C 58.28 62.54, 57.83 58.18, 57.6 56.75 C 57.36 55.31, 57.12 55.9, 56.7 55.79 C 56.28 55.69, 55.62 55.74, 55.08 56.11 C 54.55 56.48, 53.74 57.7, 53.47 58.02",
  },
  // 9 · Iglesia de San Mateo — rodea por el este, en la zona monumental alta.
  9: {
    x: 66.85,
    y: 36.91,
    routePath:
      "M 80.5 58.5 C 80.44 59.72, 80.47 63.66, 80.74 65.04 C 81.01 66.42, 81.58 66.68, 82 66.95 C 82.42 67.22, 82.18 68.38, 83.25 66.63 C 84.33 64.88, 87.38 58.93, 88.46 56.43 C 89.53 53.93, 89.65 53.56, 89.71 51.65 C 89.77 49.73, 90.1 48.03, 88.82 44.95 C 87.53 41.87, 83.55 35.12, 82 33.16 C 80.44 31.19, 80.14 32.78, 79.49 33.16 C 78.83 33.53, 78.8 35.18, 78.05 35.39 C 77.3 35.6, 75.84 34.22, 75 34.43 C 74.16 34.64, 73.98 35.97, 73.03 36.66 C 72.07 37.35, 70.13 38.26, 69.26 38.58 C 68.39 38.89, 68.21 38.84, 67.82 38.58 C 67.43 38.31, 67.08 37.25, 66.93 36.98",
  },
  // 10 · Concatedral de Santa María — corredor central, ramal corto hacia el sur.
  10: {
    x: 42.25,
    y: 51.98,
    routePath:
      "M 80.5 58.5 C 80.44 59.83, 81.34 63.34, 80.74 65.67 C 80.14 68.01, 78.23 71.15, 76.79 72.69 C 75.36 74.23, 76.73 74.55, 72.13 74.92 C 67.52 75.29, 53.44 77.15, 49.16 74.92 C 44.89 72.69, 47.64 64.19, 46.47 61.53 C 45.31 58.87, 43.03 60.31, 42.17 58.98 C 41.3 57.65, 41.42 54.46, 41.27 53.56",
  },
  // 11 · Iglesia de Santiago — el punto más alejado, rodea todo el borde oeste.
  11: {
    x: 23.32,
    y: 56.04,
    routePath:
      "M 80.5 58.5 C 80.44 59.83, 80.98 63.6, 80.74 65.67 C 80.5 67.75, 79.61 69.93, 78.95 71.09 C 78.29 72.26, 77.93 72.05, 76.79 72.69 C 75.66 73.33, 78.68 74.44, 72.13 74.92 C 65.58 75.4, 43.75 74.6, 37.5 75.56 C 31.25 76.51, 35.62 79.76, 34.63 80.66 C 33.64 81.56, 32.69 79.86, 31.58 80.98 C 30.47 82.09, 28.92 86.29, 27.99 87.35 C 27.06 88.42, 26.61 88.31, 26.02 87.35 C 25.42 86.4, 25 85.71, 24.4 81.62 C 23.8 77.52, 22.91 66.26, 22.43 62.81 C 21.95 59.35, 21.68 61.8, 21.53 60.89 C 21.38 59.99, 21.29 58.08, 21.53 57.39 C 21.77 56.7, 22.73 56.85, 22.97 56.75",
  },
};

// Ritmo de paseo urbano usado solo para estimar una distancia en metros a
// partir del tiempo a pie ya verificado (content.ts → guia.radarPoints). No
// es una medición real del trayecto.
// TODO: verificar la distancia exacta desde Apartamentos MAJMA a cada punto.
const WALK_METERS_PER_MIN = 80;
function estimateMeters(minutes: number) {
  return Math.round((minutes * WALK_METERS_PER_MIN) / 10) * 10;
}

function DiscoverCaceresMap() {
  const t = useT().guia;
  const reduce = useReducedMotionSafe();
  // id del punto activo (hover, foco de teclado o tap); null = ninguno.
  const [active, setActive] = useState<number | null>(null);

  // Combina el texto traducido (content.ts) con la posición y ruta SVG
  // (MAP_GEOMETRY, compartidas por ambos idiomas).
  const points = useMemo(
    () => t.radarPoints.map((p) => ({ ...p, ...MAP_GEOMETRY[p.id] })),
    [t.radarPoints],
  );
  const activePoint = points.find((p) => p.id === active) ?? null;

  const mapsHref = activePoint
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        MAJMA_ADDRESS,
      )}&destination=${encodeURIComponent(`${activePoint.name}, Cáceres`)}&travelmode=walking`
    : null;

  const openPoint = (id: number) => setActive(id);
  const releasePoint = (id: number) => setActive((a) => (a === id ? null : a));
  // Solo el ratón real cierra al salir (hover); un tap táctil no tiene "salir
  // del elemento" y en algunos navegadores/emuladores puede disparar un
  // pointerleave sintético justo después del tap — sin este filtro, eso
  // cierra la tarjeta apenas se abre en móvil.
  const releaseOnMouseLeave = (id: number) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") releasePoint(id);
  };
  const closeCard = () => setActive(null);

  // Ancla la tarjeta junto al pin y la "voltea" hacia el lado contrario
  // cuando el pin está cerca de un borde, para que no se salga del mapa.
  // Las clases se escriben completas (no se concatena el prefijo "md:" en
  // tiempo de ejecución) porque el escáner de Tailwind necesita ver cada
  // nombre de clase entero y literal en el código fuente.
  const flipX = activePoint ? activePoint.x > 55 : false;
  const flipY = activePoint ? activePoint.y > 55 : false;
  const cardXClass = flipX ? "md:-translate-x-[104%]" : "md:translate-x-[4%]";
  const cardYClass = flipY ? "md:-translate-y-[104%]" : "md:translate-y-[4%]";

  return (
    <section id="descubre-caceres" aria-labelledby="descubre-caceres-heading">
      <h3 id="descubre-caceres-heading" className="font-serif text-3xl text-cream md:text-4xl">
        {t.discoverLabel}
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/70 md:text-base">
        {t.discoverSubtitle}
      </p>
      <p className="mt-5 text-center text-xs uppercase tracking-[0.3em] text-cream/40 md:hidden">
        {t.mapTapHint}
      </p>

      <div className="relative mt-6 w-full select-none border border-cream/10 md:mt-8">
        {/* Al activar un punto, el plano baja de brillo/saturación (no de
            opacidad — nunca desaparece) para que la ruta y el pin activo
            queden por encima, en foco. */}
        <motion.img
          src={mapa3dImg}
          alt={t.proximityMapLabel}
          className="block h-auto w-full"
          draggable={false}
          animate={{
            filter: activePoint ? "brightness(0.72) saturate(0.85)" : "brightness(1) saturate(1)",
          }}
          transition={{ duration: 0.3, ease: EASE }}
        />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: activePoint ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="pointer-events-none absolute inset-0 bg-[rgba(15,15,15,0.16)] backdrop-blur-[0.5px]"
        />

        {/* Ruta a pie: recorrido trazado a mano sobre las calles y plazas del
            plano (ver MAP_GEOMETRY) — dos trazos superpuestos, uno base tenue
            que se dibuja progresivamente y otro dorado con brillo, guiones en
            movimiento y un pulso suave, para leerse como una ruta turística
            "iluminada" y no como una línea recta genérica. */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <AnimatePresence>
            {activePoint && (
              // AnimatePresence solo coordina el exit de su hijo motion directo:
              // esta g fuera con opacidad para que toda la ruta (los dos trazos
              // hijos) desaparezca junto con ella, sin depender de que cada
              // motion.path propague su propio exit por separado.
              <motion.g
                key={activePoint.id}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                {/* Trazo base semitransparente: se dibuja de MAJMA al destino */}
                <motion.path
                  d={activePoint.routePath}
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={
                    reduce
                      ? { duration: 0.15 }
                      : { pathLength: { duration: 0.9, ease: EASE }, opacity: { duration: 0.2 } }
                  }
                />
                {/* Trazo dorado luminoso: guiones en movimiento + pulso */}
                <motion.path
                  d={activePoint.routePath}
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth={0.42}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1.4 1.2"
                  initial={{ opacity: 0, strokeDashoffset: 0 }}
                  animate={{
                    opacity: reduce ? 0.95 : [0.75, 1, 0.75],
                    strokeDashoffset: reduce ? 0 : [0, -12],
                  }}
                  transition={
                    reduce
                      ? { duration: 0.15 }
                      : {
                          opacity: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                          strokeDashoffset: { duration: 1.1, repeat: Infinity, ease: "linear" },
                        }
                  }
                  style={{
                    filter:
                      "drop-shadow(0 0 2px var(--color-gold)) drop-shadow(0 0 6px var(--color-gold))",
                  }}
                />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* Punto principal: Apartamentos MAJMA, visualmente diferenciado */}
        <div
          className="pointer-events-none absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: `${MAJMA_MAP_POSITION.x}%`, top: `${MAJMA_MAP_POSITION.y}%` }}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold bg-ink shadow-[0_4px_14px_rgba(0,0,0,0.4)]">
            {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />}
            <Home className="relative h-4 w-4 text-gold" strokeWidth={1.75} />
          </span>
          <span className="mt-1 whitespace-nowrap rounded-sm bg-ink/85 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-gold shadow">
            {t.majmaPinLabel}
          </span>
        </div>

        {/* 8 puntos turísticos numerados. El activo se agranda y brilla; el
            resto baja de opacidad para no competir con la ruta iluminada. */}
        {points.map((p) => {
          const isActive = active === p.id;
          const dimmed = active !== null && !isActive;
          return (
            <motion.button
              key={p.id}
              type="button"
              onPointerEnter={() => openPoint(p.id)}
              onPointerLeave={releaseOnMouseLeave(p.id)}
              onFocus={() => openPoint(p.id)}
              onClick={() => openPoint(p.id)}
              aria-label={`${p.name} — ${p.time} ${t.minWalk}`}
              aria-expanded={isActive}
              animate={{ opacity: dimmed ? 0.45 : 1 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <motion.span
                animate={{ scale: isActive ? 1.22 : 1 }}
                transition={{ duration: 0.25, ease: EASE }}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 font-serif text-xs shadow-[0_3px_10px_rgba(0,0,0,0.35)] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-gold ${
                  isActive
                    ? "border-gold bg-gold text-ink shadow-[0_0_10px_rgba(214,168,79,0.7)]"
                    : "border-gold/85 bg-ink/90 text-gold"
                }`}
              >
                {p.id}
              </motion.span>
            </motion.button>
          );
        })}

        {/* Tarjeta flotante con la información del punto activo.
            En móvil se ancla como una hoja fija al pie de pantalla (para que
            nunca se salga del viewport); desde md el posicionamiento "junto
            al pin" se activa vía media query real (clases md:), no JS, así
            que nunca compite con el `left`/`top` fijo del móvil. El giro
            hacia el lado contrario cuando el pin está cerca de un borde vive
            en un div intermedio SIN animar (una animación de Framer Motion
            en el mismo nodo tomaría el control total de `transform` e
            ignoraría cualquier translate CSS propio). */}
        <AnimatePresence>
          {activePoint && (
            <div
              className={`fixed inset-x-4 bottom-4 z-30 md:absolute md:inset-auto md:bottom-auto md:right-auto md:left-[var(--pin-x)] md:top-[var(--pin-y)] md:w-[min(85vw,20rem)] ${cardXClass} ${cardYClass}`}
              style={
                {
                  "--pin-x": `${activePoint.x}%`,
                  "--pin-y": `${activePoint.y}%`,
                } as React.CSSProperties
              }
            >
              <motion.div
                key={activePoint.id}
                role="dialog"
                aria-label={activePoint.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: EASE }}
                onPointerEnter={() => openPoint(activePoint.id)}
                onPointerLeave={releaseOnMouseLeave(activePoint.id)}
                className="border border-gold/30 bg-cream text-ink shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
              >
                <button
                  type="button"
                  onClick={closeCard}
                  aria-label={t.closeCard}
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-ink/40 transition-colors duration-300 hover:bg-ink/5 hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <div className="border-b border-ink/10 bg-gold/[0.08] px-5 py-4 pr-9">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink/50">
                    {activePoint.id} · {activePoint.time} {t.minWalk}
                  </span>
                  <h4 className="mt-0.5 font-serif text-lg leading-tight">{activePoint.name}</h4>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-ink/70">{activePoint.desc}</p>
                  <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-ink/10 pt-4 text-xs">
                    <div>
                      <dt className="uppercase tracking-[0.15em] text-ink/40">{t.distanceLabel}</dt>
                      <dd className="mt-1 leading-snug text-ink/80">
                        {t.distanceApprox.replace("{m}", String(estimateMeters(activePoint.time)))}
                      </dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-[0.15em] text-ink/40">{t.hoursLabel}</dt>
                      <dd className="mt-1 leading-snug text-ink/80">{activePoint.hours}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-[0.15em] text-ink/40">{t.priceLabel}</dt>
                      <dd className="mt-1 leading-snug text-ink/80">{activePoint.price}</dd>
                    </div>
                  </dl>
                  {mapsHref && (
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-ink/60 transition-colors duration-300 hover:text-ink"
                    >
                      {t.howToGetThere}
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
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
            <DiscoverCaceresMap />
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
                  className={`group flex shrink-0 items-baseline gap-4 border-l-2 py-3 pl-5 text-left transition-colors duration-300 md:shrink ${
                    isActive ? "border-gold" : "border-cream/10 hover:border-cream/30"
                  }`}
                >
                  <span
                    className={`font-serif text-2xl leading-none transition-colors duration-300 ${
                      isActive ? "text-gold" : "text-cream/30 group-hover:text-cream/50"
                    }`}
                  >
                    {ROMAN_NUMERALS[gi]}
                  </span>
                  <span className="flex flex-col">
                    <span
                      className={`text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
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
                      className={`border p-6 transition-colors duration-300 ${
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
            className="text-ink/50 transition-colors duration-300 hover:text-gold disabled:opacity-20 disabled:hover:text-ink/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-serif text-lg text-ink">{monthLabel}</span>
          <button
            type="button"
            aria-label="Mes siguiente"
            onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
            className="text-ink/50 transition-colors duration-300 hover:text-gold"
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
                className={`relative py-2 text-sm transition-colors duration-300 ${
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
          className="mt-5 flex items-center justify-center gap-3 bg-gold px-6 py-3.5 text-xs uppercase tracking-[0.3em] text-ink transition-all duration-300 hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)] active:scale-[0.98]"
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
              className="mt-4 flex items-center justify-center gap-3 border border-ink/20 px-6 py-3.5 text-xs uppercase tracking-[0.3em] text-ink transition-all duration-300 hover:border-gold hover:text-gold active:scale-[0.98]"
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
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-ink transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-[1px] active:scale-[0.98]"
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
              className="inline-flex items-center justify-center gap-3 border border-cream/40 px-8 py-4 text-xs uppercase tracking-[0.3em] text-cream transition-all duration-300 hover:border-gold hover:text-gold active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              {t.ctaWhatsapp}
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => trackEvent("click_phone", { location: "reserva" })}
              className="inline-flex items-center justify-center gap-3 px-4 py-4 text-xs uppercase tracking-[0.3em] text-cream/80 transition-colors duration-300 hover:text-gold"
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

function ShareButton() {
  const t = useT().footer;
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const shareData = { title: document.title, url: SITE_URL };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        trackEvent("share", { method: "native" });
      } catch {
        // El usuario canceló el diálogo nativo — no hacemos nada.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      trackEvent("share", { method: "clipboard" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard no disponible — silenciosamente no hacemos nada.
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-1.5 hover:text-gold"
    >
      {copied ? <Link2 className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
      {copied ? t.linkCopied : t.share}
    </button>
  );
}

export function Footer() {
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
            <li>
              <ShareButton />
            </li>
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

export function ChatbotWidget() {
  const t = useT().chatbot;
  const faqItems = useT().faq.items;
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [query, setQuery] = useState("");
  const [thread, setThread] = useState<ChatMessage[]>([]);

  const toggleOpen = () => {
    setOpen((o) => !o);
    setEverOpened(true);
  };

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
        onClick={toggleOpen}
        aria-label={t.label}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1, ease: EASE }}
        className="fixed bottom-24 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-transform hover:scale-105 md:bottom-6"
      >
        {!everOpened && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/60" />
        )}
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

            <div className="flex divide-x divide-ink/10 border-b border-ink/10 bg-cream">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_booking", { location: "chatbot" })}
                className="flex flex-1 items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-[0.15em] text-ink/80 transition-colors duration-300 hover:bg-gold/10 hover:text-gold"
              >
                <CalendarCheck className="h-3.5 w-3.5" />
                {t.bookCta}
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_whatsapp", { location: "chatbot_bar" })}
                className="flex flex-1 items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-[0.15em] text-ink/80 transition-colors duration-300 hover:bg-gold/10 hover:text-gold"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {t.whatsappCta}
              </a>
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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "bot" && (
                    <span className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
                      <BattlementMark className="h-3 w-auto" />
                    </span>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
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
                </motion.div>
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
                className="flex h-9 w-9 shrink-0 items-center justify-center bg-gold text-ink transition-colors duration-300 hover:bg-gold-soft"
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

export function WhatsAppFab() {
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
      className="group fixed bottom-24 right-5 z-50 flex items-center gap-3 rounded-full bg-ink px-5 py-4 text-cream shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-all duration-300 hover:bg-gold hover:text-ink md:bottom-6"
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

export function MobileStickyCTA() {
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
