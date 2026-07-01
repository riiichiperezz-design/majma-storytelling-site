import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent, useInView } from "motion/react";
import { useRef, useState, useCallback, useEffect, type MouseEvent } from "react";
import {
  Wifi, Snowflake, Flame, Tv, Coffee, Baby, Ban, ArrowUpDown, MapPin,
  MessageCircle, ArrowRight, Check, Phone, Menu, X, Sun, Star, Quote,
  Landmark, UtensilsCrossed, Compass,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

import heroImg from "@/assets/hero-caceres.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import salonImg from "@/assets/salon.jpg";
import dormitorioImg from "@/assets/dormitorio.jpg";
import cocinaImg from "@/assets/cocina.jpg";
import banoImg from "@/assets/bano.jpg";
import terrazaImg from "@/assets/terraza.jpg";
import fachadaImg from "@/assets/fachada.jpg";

/* ─────────── Datos reales ─────────── */
const BOOKING_URL =
  "https://www.booking.com/hotel/es/apartamentos-turisticos-majma.es.html?aid=356980&label=gog235jc-10CAsoRkIdYXBhcnRhbWVudG9zLXR1cmlzdGljb3MtbWFqbWFIUlgDaEaIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4AoD4ktIGwAIB0gIkZWYxYTJmNDEtZDRkNy00MGU0LWE4NmYtOTc4YWU4Zjc5MDUy2AIB4AIB&sid=faf8b176b4cd575f70169e3f6ca21d42&dist=0&keep_landing=1&sb_price_type=total&type=total&";
const PHONE_HUMAN = "722 24 74 36";
const PHONE_TEL = "+34722247436";
const WA_URL =
  "https://wa.me/34722247436?text=Hola,%20me%20interesa%20reservar%20en%20MAJMA.%20%C2%BFTen%C3%A9is%20disponibilidad%3F";

const EASE = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAJMA · Apartamento turístico en el casco histórico de Cáceres" },
      {
        name: "description",
        content:
          "Apartamento turístico MAJMA: a 2 minutos de la Iglesia de San Juan, en pleno casco histórico de Cáceres, Ciudad Patrimonio de la Humanidad. Un dormitorio, salón, terraza y todo el equipamiento.",
      },
      { property: "og:title", content: "MAJMA · Dormir dentro de la Historia — Cáceres" },
      {
        property: "og:description",
        content:
          "Un apartamento en el corazón amurallado de Cáceres, a dos pasos de la Iglesia de San Juan.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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

function Wordmark({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <BattlementMark className={`${compact ? "h-6" : "h-8"} w-auto ${dark ? "text-cream" : "text-ink"} transition-[height] duration-500`} />
      <div className="flex flex-col leading-none">
        <span
          className={`font-serif ${compact ? "text-xl" : "text-2xl"} tracking-[0.35em] transition-all duration-500 ${dark ? "text-cream" : "text-ink"}`}
        >
          MAJMA
        </span>
        {!compact && (
          <span
            className={`mt-1 text-[10px] uppercase tracking-[0.4em] ${
              dark ? "text-cream/60" : "text-muted-foreground"
            }`}
          >
            Cáceres · Patrimonio
          </span>
        )}
      </div>
    </div>
  );
}

/* ─────────── Reveal ─────────── */

function Reveal({
  children, delay = 0, className = "", y = 24,
}: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
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

function CountUp({ to, duration = 1.6, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
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

  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─────────── Tilt de galería ─────────── */

function TiltImage({
  src, alt, className = "", onClick,
}: { src: string; alt: string; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0 });

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setT({ rx: -y * 6, ry: x * 8 });
  }, [reduce]);
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
  return (
    <button
      type="button"
      aria-label={`Ver detalles de ${room.title}`}
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
          <img src={room.img} alt={room.title} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="mb-2 h-px w-8 bg-gold" />
            <h3 className="font-serif text-3xl text-cream">{room.title}</h3>
            <p className="mt-1 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cream/70">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gold/60 text-gold">+</span>
              Ver detalles
            </p>
          </div>
        </div>
        <div
          className="backface-hidden absolute inset-0 flex flex-col justify-between border border-gold/40 bg-ink p-8 text-cream"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div>
            <div className="mb-3 h-px w-8 bg-gold" />
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
  images, index, onClose, onNav,
}: { images: { src: string; alt: string }[]; index: number | null; onClose: () => void; onNav: (i: number) => void }) {
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button aria-label="Cerrar" onClick={onClose} className="absolute right-6 top-6 text-cream/80 hover:text-gold">
        <X className="h-8 w-8" />
      </button>
      <button
        aria-label="Anterior"
        onClick={(e) => { e.stopPropagation(); onNav((index - 1 + images.length) % images.length); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-gold md:left-8"
      >
        <ArrowRight className="h-8 w-8 rotate-180" />
      </button>
      <motion.img
        key={img.src}
        initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        src={img.src} alt={img.alt}
        className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        aria-label="Siguiente"
        onClick={(e) => { e.stopPropagation(); onNav((index + 1) % images.length); }}
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
      <Territorio />
      <Apartamento />
      <Galeria />
      <Distribucion />
      <Equipamiento />
      <Ubicacion />
      <GuiaCaceres />
      <Testimonios />
      <FAQ />
      <Reserva />
      <Footer />
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

function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  const links = [
    { href: "#territorio", label: "Cáceres" },
    { href: "#apartamento", label: "Apartamento" },
    { href: "#distribucion", label: "Estancias" },
    { href: "#ubicacion", label: "Ubicación" },
    { href: "#guia", label: "Guía" },
    { href: "#testimonios", label: "Huéspedes" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-ink/85 backdrop-blur-md shadow-[0_2px_20px_-10px_rgba(0,0,0,0.5)]" : "bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <a href="#top" className="text-cream drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          <Wordmark dark compact={scrolled} />
        </a>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.3em] text-cream/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-gold transition-colors">{l.label}</a>
          ))}
        </nav>
        <a
          href="#reserva"
          className="hidden items-center gap-2 border border-gold/60 px-5 py-2 text-xs uppercase tracking-[0.3em] text-cream transition-all hover:bg-gold hover:text-ink md:inline-flex"
        >
          Reservar
        </a>
        <button
          aria-label="Menú"
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
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 border-b border-cream/10 hover:text-gold">
              {l.label}
            </a>
          ))}
          <a href="#reserva" onClick={() => setOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 border border-gold px-5 py-3 text-xs text-cream hover:bg-gold hover:text-ink">
            Reservar
          </a>
        </nav>
      </motion.div>
    </header>
  );
}

/* ─────────── Hero ─────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
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

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-screen w-full overflow-hidden bg-ink text-cream"
    >
      <motion.div style={{ y: yImg }} className="absolute inset-0 -top-10 -bottom-10">
        {!reduce && !videoFailed ? (
          <video
            key={heroVideo}
            autoPlay
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
            alt="Casco histórico amurallado de Cáceres al atardecer"
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
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-cream/70"
        >
          <span className="h-px w-10 bg-gold" />
          Cáceres · UNESCO 1986
          <span className="h-px w-10 bg-gold" />
        </motion.div>
        <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-cream md:text-8xl">
          <motion.span
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="block"
          >
            Dormir dentro
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="block"
          >
            <em className="relative text-gold-soft">
              de la Historia.
              <motion.span
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1, ease: EASE }}
                className="absolute -bottom-2 left-0 right-0 h-[2px] origin-left bg-gold/70"
              />
            </em>
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="mt-8 max-w-xl text-base text-cream/85 md:text-lg"
        >
          A dos minutos de la Iglesia de San Juan, en el corazón amurallado de Cáceres. Un
          apartamento. Una ciudad Patrimonio de la Humanidad a tus pies.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-ink transition-all hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-[1px] active:scale-[0.98]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Reservar en Booking
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#apartamento"
            className="inline-flex items-center gap-3 border border-cream/40 px-8 py-4 text-xs uppercase tracking-[0.3em] text-cream transition-all hover:border-gold hover:text-gold active:scale-[0.98]"
          >
            Descubre el apartamento
          </a>
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity: indicatorOpacity }} className="absolute inset-x-0 bottom-8 flex justify-center">
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] uppercase tracking-[0.4em] text-cream/60"
        >
          Baja para entrar
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────── El territorio ─────────── */

function Territorio() {
  const facts = [
    { k: 1986, kSuffix: "", label: "Ciudad Patrimonio de la Humanidad declarada por la UNESCO." },
    { k: null, raw: "3.º", label: "Conjunto monumental medieval mejor conservado de Europa, tras Praga y Tallin." },
    { k: 2, kSuffix: " min", label: "A pie desde MAJMA hasta la Iglesia de San Juan." },
  ];
  return (
    <section id="territorio" className="stone-grain relative overflow-hidden bg-stone-soft py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-5">
          <div className="sticky top-32">
            <SectionNumber n="01" label="El territorio" />
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
              Una ciudad escrita<br />en <em className="text-gold">piedra</em>.
            </h2>
            <div className="mt-8 h-px w-16 bg-gold" />
            <p className="mt-8 text-lg leading-relaxed text-ink/80">
              Cáceres no se visita: se recorre despacio, como quien lee un libro escrito en
              piedra. Calles que huelen a siglos, plazas que han visto pasar romanos, árabes y
              renacentistas, y una muralla que todavía vigila la ciudad desde lo alto.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              MAJMA está ahí, a dos pasos de la Iglesia de San Juan, para que cada noche
              termine — y cada mañana empiece — dentro de esa historia.
            </p>
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <TiltImage src={fachadaImg} alt="Fachada de piedra en el casco histórico de Cáceres" className="aspect-[4/5] w-full" />
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

function SectionNumber({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <motion.span
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`inline-block h-px w-8 origin-left ${dark ? "bg-cream/50" : "bg-ink/40"}`}
      />
      <span className={`text-[10px] uppercase tracking-[0.5em] ${dark ? "text-cream/60" : "text-stone-deep"}`}>
        {n} · {label}
      </span>
    </div>
  );
}

/* ─────────── Apartamento ─────────── */

function Apartamento() {
  return (
    <section id="apartamento" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        <Reveal>
          <div>
            <SectionNumber n="02" label="El apartamento" />
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
              Fuera, la historia.<br />
              <em className="text-gold">Dentro, el descanso.</em>
            </h2>
            <div className="mt-8 h-px w-16 bg-gold" />
            <p className="mt-8 text-lg leading-relaxed text-ink/80">
              Un dormitorio independiente, un salón con carácter propio y una terraza donde
              el atardecer cacereño se sirve solo. MAJMA es un apartamento pensado para dos —
              perfecto también para una familia con un pequeño — con todo lo necesario para
              sentirte en casa, aunque estés a un paso de un Patrimonio Mundial.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                { k: 1, v: "Dormitorio" },
                { k: 2, v: "Camas" },
                { k: 4, v: "Huéspedes máx." },
              ].map(({ k, v }) => (
                <div key={v}>
                  <dt className="font-serif text-4xl text-ink"><CountUp to={k} /></dt>
                  <dd className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <TiltImage src={salonImg} alt="Salón del apartamento MAJMA" className="aspect-[4/5]" />
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Galería ─────────── */

function Galeria() {
  const gallery = [
    { src: terrazaImg, alt: "Vistas desde la terraza de MAJMA", span: "md:col-span-2 md:row-span-2" },
    { src: dormitorioImg, alt: "Dormitorio", span: "" },
    { src: banoImg, alt: "Baño con ducha", span: "" },
    { src: cocinaImg, alt: "Cocina equipada", span: "" },
    { src: fachadaImg, alt: "Fachada del edificio", span: "" },
  ];
  const [lb, setLb] = useState<number | null>(null);
  return (
    <section className="relative bg-stone-soft py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionNumber n="03" label="Galería" />
              <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
                Cada rincón,<br />una <em className="text-gold">postal</em>.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink/70">
              Interior sereno y luminoso, muralla al otro lado de la ventana. Toca cualquier
              imagen para verla en grande.
            </p>
          </div>
        </Reveal>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {gallery.map((g, i) => (
            <Reveal key={g.alt} delay={i * 0.05} className={g.span}>
              <TiltImage src={g.src} alt={g.alt} className="h-full w-full" onClick={() => setLb(i)} />
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
  const rooms: Room[] = [
    {
      title: "Salón",
      img: salonImg,
      details: [
        "Sofá cama para dos huéspedes adicionales",
        "TV de pantalla plana con streaming",
        "Zona de comedor integrada",
        "Luz natural durante todo el día",
      ],
    },
    {
      title: "Dormitorio",
      img: dormitorioImg,
      details: [
        "Cama doble con ropa de cama de calidad",
        "Habitación independiente y silenciosa",
        "Aire acondicionado y calefacción",
        "Cuna disponible bajo petición",
      ],
    },
    {
      title: "Cocina",
      img: cocinaImg,
      details: [
        "Nevera, microondas y fogones",
        "Menaje completo para cocinar",
        "Cafetera",
        "Todo listo para desayunar en casa",
      ],
    },
    {
      title: "Baño",
      img: banoImg,
      details: [
        "Ducha amplia",
        "Toallas y amenities incluidos",
        "WiFi de alta velocidad en toda la vivienda",
        "Luz natural",
      ],
    },
    {
      title: "Terraza",
      img: terrazaImg,
      details: [
        "Vistas al casco histórico",
        "Mesa exterior para dos",
        "Ideal al atardecer",
        "Extensión natural del salón",
      ],
    },
  ];

  return (
    <section id="distribucion" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-6 max-w-2xl">
            <SectionNumber n="04" label="Distribución" />
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
              Cinco estancias.<br /><em className="text-gold">Un mismo silencio.</em>
            </h2>
          </div>
        </Reveal>
        <p className="mb-12 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Descubre cada estancia — toca para ver más
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <FlipCard room={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Equipamiento ─────────── */

function Equipamiento() {
  const items = [
    { icon: Wifi, label: "WiFi gratis" },
    { icon: Snowflake, label: "Aire acondicionado" },
    { icon: Flame, label: "Calefacción" },
    { icon: Tv, label: "TV con streaming" },
    { icon: Coffee, label: "Cafetera" },
    { icon: Sun, label: "Terraza exterior" },
    { icon: ArrowUpDown, label: "Ascensor" },
    { icon: Baby, label: "Cuna · apto niños" },
    { icon: Ban, label: "No fumadores" },
  ];
  return (
    <section className="relative bg-ink py-24 text-cream md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h3 className="font-serif text-3xl text-cream md:text-4xl">
              Todo lo necesario.<br /><span className="text-gold-soft">Nada de más.</span>
            </h3>
            <div className="h-px w-16 bg-gold md:mb-4" />
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.04}>
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

/* ─────────── Ubicación ─────────── */

function Ubicacion() {
  const spots = [
    { name: "Iglesia de San Juan", time: "2 min" },
    { name: "Plaza Mayor", time: "5 min" },
    { name: "Arco de la Estrella", time: "6 min" },
    { name: "Concatedral de Santa María", time: "7 min" },
    { name: "Torre de Bujaco", time: "6 min" },
  ];
  return (
    <section id="ubicacion" className="stone-grain relative overflow-hidden bg-stone-soft py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:px-10">
        <Reveal>
          <SectionNumber n="05" label="Ubicación" />
          <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
            A dos pasos<br />de <em className="text-gold">todo</em>.
          </h2>
          <div className="mt-8 h-px w-16 bg-gold" />
          <p className="mt-8 text-lg leading-relaxed text-ink/80">
            En Cáceres no hace falta coche. Desde MAJMA, cada monumento del casco histórico
            está a unos minutos caminando por calles empedradas.
          </p>
          <ul className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            {spots.map((s) => (
              <li key={s.name} className="flex items-center justify-between py-4 text-ink">
                <span className="flex items-center gap-3 text-base">
                  <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  {s.name}
                </span>
                <span className="font-serif text-xl text-ink">{s.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm italic leading-relaxed text-ink/60">
            Estacionamiento y traslado al aeropuerto disponibles bajo consulta.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-square overflow-hidden border border-ink/15 bg-ink">
            <iframe
              title="Ubicación de MAJMA en Cáceres"
              src="https://www.google.com/maps?q=Iglesia+de+San+Juan,+C%C3%A1ceres,+Spain&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 bg-ink/85 px-3 py-2 text-cream backdrop-blur">
              <BattlementMark className="h-4 w-auto text-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em]">MAJMA · Cáceres</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Guía de Cáceres ─────────── */

type GuideItem = { name: string; time: string; text: string };
type GuideGroup = { label: string; icon: typeof Landmark; items: GuideItem[] };

function GuiaCaceres() {
  const groups: GuideGroup[] = [
    {
      label: "Patrimonio",
      icon: Landmark,
      items: [
        {
          name: "Plaza Mayor",
          time: "5 min a pie",
          text: "El salón de la ciudad, con la Torre de Bujaco vigilando desde lo alto. Punto de partida perfecto para perderse por el casco.",
        },
        {
          name: "Concatedral de Santa María",
          time: "7 min a pie",
          text: "El templo gótico-renacentista donde antaño se juraba fidelidad a los Reyes Católicos. Sube al campanario para las mejores vistas de la ciudad.",
        },
        {
          name: "Museo de Cáceres · Casa de las Veletas",
          time: "8 min a pie",
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
      icon: UtensilsCrossed,
      items: [
        {
          name: "Terrazas de la Plaza Mayor",
          time: "5 min a pie",
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
      icon: Compass,
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
  ];

  return (
    <section id="guia" className="relative bg-ink py-32 text-cream md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <SectionNumber n="06" label="Guía" dark />
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-cream md:text-6xl">
              Cáceres,
              <br />
              <em className="text-gold-soft">a un paseo de casa</em>.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-cream/80">
              No hace falta agenda ni coche: todo lo esencial de la ciudad está a menos de diez
              minutos andando desde MAJMA. Una pequeña guía para aprovechar cada hora.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {groups.map((g, gi) => (
            <Reveal key={g.label} delay={gi * 0.1}>
              <div className="flex items-center gap-3 border-b border-cream/15 pb-4">
                <g.icon className="h-5 w-5 text-gold" strokeWidth={1.25} />
                <h3 className="text-xs uppercase tracking-[0.4em] text-cream/70">{g.label}</h3>
              </div>
              <ul className="mt-6 space-y-6">
                {g.items.map((it) => (
                  <li key={it.name}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-serif text-lg text-cream">{it.name}</span>
                      <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.25em] text-gold">
                        {it.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70">{it.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Testimonios ─────────── */

type Review = {
  name: string;
  origin: string;
  date: string;
  rating: number;
  text: string;
};

function Testimonios() {
  const reviews: Review[] = [
    {
      name: "Laura M.",
      origin: "Madrid, España",
      date: "Mayo 2026",
      rating: 5,
      text: "Despertarse con la muralla al otro lado de la ventana no tiene precio. El apartamento estaba impecable y Iñigo nos respondió al minuto cuando tuvimos una duda con el check-in. Volveremos seguro.",
    },
    {
      name: "Thomas & Julie",
      origin: "Lyon, Francia",
      date: "Abril 2026",
      rating: 5,
      text: "Un emplazamiento perfecto para descubrir Cáceres a pie: en dos minutos ya estábamos en la Plaza Mayor. La terraza al atardecer fue el mejor momento del viaje. Muy recomendable.",
    },
    {
      name: "Marco Rossi",
      origin: "Milán, Italia",
      date: "Marzo 2026",
      rating: 5,
      text: "Camas muy cómodas, cocina bien equipada y una decoración con mucho carácter que respeta el edificio original. Se nota que han cuidado cada detalle. La comunicación con el anfitrión, excelente.",
    },
    {
      name: "Elena Fernández",
      origin: "Sevilla, España",
      date: "Febrero 2026",
      rating: 4,
      text: "Muy buena ubicación y apartamento muy acogedor, silencioso a pesar de estar en pleno casco histórico. Solo echamos en falta un poco más de información sobre el parking al llegar, pero nada que empañe una gran estancia.",
    },
  ];

  return (
    <section id="testimonios" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionNumber n="07" label="Huéspedes" />
              <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
                Palabras de quienes
                <br />
                <em className="text-gold">ya se han alojado</em>.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" strokeWidth={1} />
                ))}
              </div>
              <span className="text-sm text-ink/70">4.8 / 5 en Booking.com</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div className="flex h-full flex-col border border-border bg-background p-8">
                <Quote className="h-6 w-6 text-gold" strokeWidth={1.25} />
                <div className="mt-5 flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`h-3.5 w-3.5 ${s < r.rating ? "fill-gold text-gold" : "text-ink/20"}`}
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">“{r.text}”</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-serif text-lg text-ink">{r.name}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {r.origin} · {r.date}
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
  const faqs = [
    {
      q: "¿A qué hora son el check-in y el check-out?",
      a: "El check-in es a partir de las 16:00h y el check-out hasta las 11:00h. Si necesitas flexibilidad, escríbenos por WhatsApp y lo miramos según disponibilidad.",
    },
    {
      q: "¿Cómo funciona la llegada? ¿Hay alguien esperando?",
      a: "El check-in es autónomo mediante caja de llaves segura. Antes de tu llegada te enviamos instrucciones detalladas y un contacto directo por si necesitas ayuda en cualquier momento.",
    },
    {
      q: "¿Dónde se puede aparcar?",
      a: "El casco histórico es peatonal, pero hay parkings públicos a pocos minutos andando del apartamento. Te indicamos la opción más cómoda al confirmar tu reserva.",
    },
    {
      q: "¿Se admiten niños?",
      a: "Sí, MAJMA es apto para niños. Disponemos de cuna bajo petición sin coste adicional; solo tienes que avisarnos con antelación.",
    },
    {
      q: "¿Se admiten mascotas?",
      a: "Actualmente el apartamento no admite mascotas.",
    },
    {
      q: "¿Cuántos huéspedes caben como máximo?",
      a: "El apartamento tiene capacidad para 4 personas: cama doble en el dormitorio y sofá cama en el salón.",
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

  return (
    <section id="faq" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal>
          <div className="mb-16 text-center">
            <div className="flex justify-center">
              <SectionNumber n="08" label="Preguntas frecuentes" />
            </div>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
              Todo lo que
              <br />
              <em className="text-gold">quieras saber</em>.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-ink/15">
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
            ¿No encuentras respuesta a tu pregunta?{" "}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline underline-offset-4 hover:text-ink"
            >
              Escríbenos por WhatsApp
            </a>{" "}
            y te respondemos enseguida.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Reserva ─────────── */

function Reserva() {
  return (
    <section id="reserva" className="relative overflow-hidden bg-ink py-32 text-cream md:py-48">
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-[0.06]">
        <BattlementMark className="h-[90vh] w-auto text-cream" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <SectionNumber n="09" label="Reserva" dark />
          <h2 className="mt-6 font-serif text-5xl leading-[1] text-cream md:text-7xl">
            Tu atalaya<br /><em className="text-gold-soft">te espera.</em>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream/80">
            Reserva directa en Booking o escríbenos por WhatsApp y resolvemos cualquier duda al
            momento.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row">
            <a
              href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-ink transition-all hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-[1px] active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Reservar en Booking
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-cream/40 px-8 py-4 text-xs uppercase tracking-[0.3em] text-cream transition-all hover:border-gold hover:text-gold active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp directo
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-3 px-4 py-4 text-xs uppercase tracking-[0.3em] text-cream/80 transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4" />
              {PHONE_HUMAN}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Footer ─────────── */

function Footer() {
  return (
    <footer className="border-t border-border bg-cream py-16 pb-28 text-ink md:pb-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-10">
        <div>
          <Wordmark />
          <p className="mt-6 max-w-xs text-sm text-muted-foreground">
            Apartamento turístico en el casco histórico de Cáceres. Piedra centenaria, confort
            contemporáneo.
          </p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Contacto</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`tel:${PHONE_TEL}`} className="hover:text-gold">+34 {PHONE_HUMAN}</a>
            </li>
            <li>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                WhatsApp
              </a>
            </li>
            <li>Casco histórico de Cáceres</li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Legal</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/aviso-legal" className="hover:text-gold">Aviso legal</Link>
            </li>
            <li>
              <Link to="/privacidad" className="hover:text-gold">Política de privacidad</Link>
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

/* ─────────── WhatsApp FAB ─────────── */

function WhatsAppFab() {
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
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [show]);

  return (
    <motion.a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
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
        ¿Dudas? Escríbenos
      </motion.span>
    </motion.a>
  );
}

/* ─────────── Sticky CTA móvil ─────────── */

function MobileStickyCTA() {
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
        href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] text-cream active:scale-[0.98]"
      >
        Reservar en Booking
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        aria-label="Llamar"
        className="flex items-center justify-center border border-ink/30 px-4 py-3 text-ink active:scale-[0.98]"
      >
        <Phone className="h-4 w-4" />
      </a>
    </motion.div>
  );
}
