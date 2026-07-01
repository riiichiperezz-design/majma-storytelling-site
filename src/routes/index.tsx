import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useState, useCallback, type MouseEvent } from "react";
import {
  Wifi, Snowflake, Flame, Tv, Coffee, Baby, Ban, ArrowUpDown, MapPin,
  MessageCircle, ArrowRight, Check,
} from "lucide-react";

import heroImg from "@/assets/hero-caceres.jpg";
import salonImg from "@/assets/salon.jpg";
import dormitorioImg from "@/assets/dormitorio.jpg";
import cocinaImg from "@/assets/cocina.jpg";
import banoImg from "@/assets/bano.jpg";
import terrazaImg from "@/assets/terraza.jpg";
import fachadaImg from "@/assets/fachada.jpg";

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

function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <BattlementMark className={`h-8 w-auto ${dark ? "text-cream" : "text-ink"}`} />
      <div className="flex flex-col leading-none">
        <span
          className={`font-serif text-2xl tracking-[0.35em] ${dark ? "text-cream" : "text-ink"}`}
        >
          MAJMA
        </span>
        <span
          className={`mt-1 text-[10px] uppercase tracking-[0.4em] ${
            dark ? "text-cream/60" : "text-muted-foreground"
          }`}
        >
          Cáceres · Patrimonio
        </span>
      </div>
    </div>
  );
}

/* ─────────── Reveal ─────────── */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────── Tilt de galería ─────────── */

function TiltImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setT({ rx: -y * 8, ry: x * 10 });
  }, []);
  const reset = () => setT({ rx: 0, ry: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`perspective-1000 group overflow-hidden ${className}`}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateX: t.rx, rotateY: t.ry }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
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

type Room = {
  title: string;
  img: string;
  details: string[];
};

function FlipCard({ room }: { room: Room }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="perspective-1000 h-[360px] w-full cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div className="backface-hidden absolute inset-0 overflow-hidden border border-border">
          <img
            src={room.img}
            alt={room.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="mb-2 h-px w-8 bg-gold" />
            <h3 className="font-serif text-3xl text-cream">{room.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-cream/60">
              Pasa el cursor
            </p>
          </div>
        </div>
        {/* Back */}
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
    </div>
  );
}

/* ─────────── Página ─────────── */

function MajmaLanding() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <TopBar />
      <Hero />
      <Territorio />
      <Apartamento />
      <Galeria />
      <Distribucion />
      <Equipamiento />
      <Ubicacion />
      <Reserva />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

/* ─────────── Top bar ─────────── */

function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="text-cream drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          <Wordmark dark />
        </a>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.3em] text-cream/80 md:flex">
          <a href="#territorio" className="hover:text-gold transition-colors">
            Cáceres
          </a>
          <a href="#apartamento" className="hover:text-gold transition-colors">
            Apartamento
          </a>
          <a href="#distribucion" className="hover:text-gold transition-colors">
            Estancias
          </a>
          <a href="#ubicacion" className="hover:text-gold transition-colors">
            Ubicación
          </a>
        </nav>
        <a
          href="#reserva"
          className="hidden items-center gap-2 border border-gold/60 px-5 py-2 text-xs uppercase tracking-[0.3em] text-cream backdrop-blur transition-colors hover:bg-gold hover:text-ink md:inline-flex"
        >
          Reservar
        </a>
      </div>
    </header>
  );
}

/* ─────────── Hero con parallax ─────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yMark = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-screen w-full overflow-hidden bg-ink text-cream"
    >
      <motion.div style={{ y: yImg }} className="absolute inset-0 -top-10 -bottom-10">
        <img
          src={heroImg}
          alt="Casco histórico amurallado de Cáceres al atardecer"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/80" />
      </motion.div>

      {/* Silueta almenada gigante en parallax */}
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
        <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-cream/70">
          <span className="h-px w-10 bg-gold" />
          Cáceres · UNESCO 1986
          <span className="h-px w-10 bg-gold" />
        </div>
        <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-cream md:text-8xl">
          Dormir dentro
          <br />
          <em className="text-gold-soft">de la Historia.</em>
        </h1>
        <p className="mt-8 max-w-xl text-base text-cream/85 md:text-lg">
          A dos minutos de la Iglesia de San Juan, en el corazón amurallado de Cáceres. Un
          apartamento. Una ciudad Patrimonio de la Humanidad a tus pies.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#apartamento"
            className="group inline-flex items-center gap-3 bg-cream px-8 py-4 text-xs uppercase tracking-[0.3em] text-ink transition-colors hover:bg-gold"
          >
            Descubre el apartamento
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#reserva"
            className="inline-flex items-center gap-3 border border-cream/40 px-8 py-4 text-xs uppercase tracking-[0.3em] text-cream transition-colors hover:border-gold hover:text-gold"
          >
            Consultar disponibilidad
          </a>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] uppercase tracking-[0.4em] text-cream/60"
        >
          Baja para entrar
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── El territorio ─────────── */

function Territorio() {
  return (
    <section
      id="territorio"
      className="stone-grain relative overflow-hidden bg-stone-soft py-32 md:py-48"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-5">
          <div className="sticky top-32">
            <div className="text-[10px] uppercase tracking-[0.5em] text-stone-deep">
              01 · El territorio
            </div>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
              Una ciudad escrita
              <br />
              en <em className="text-gold">piedra</em>.
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
            <TiltImage
              src={fachadaImg}
              alt="Fachada de piedra en el casco histórico de Cáceres"
              className="aspect-[4/5] w-full"
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                k: "1986",
                v: "Ciudad Patrimonio de la Humanidad declarada por la UNESCO.",
              },
              {
                k: "3.º",
                v: "Conjunto monumental medieval mejor conservado de Europa, tras Praga y Tallin.",
              },
              {
                k: "2 min",
                v: "A pie desde MAJMA hasta la Iglesia de San Juan.",
              },
            ].map((f, i) => (
              <Reveal key={f.k} delay={0.15 + i * 0.1}>
                <div className="border-t border-ink/20 pt-5">
                  <div className="font-serif text-4xl text-ink">{f.k}</div>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{f.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Apartamento ─────────── */

function Apartamento() {
  return (
    <section id="apartamento" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        <Reveal>
          <div>
            <div className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
              02 · El apartamento
            </div>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
              Fuera, la historia.
              <br />
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
                ["1", "Dormitorio"],
                ["2", "Camas"],
                ["4", "Huéspedes máx."],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-serif text-4xl text-ink">{k}</dt>
                  <dd className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {v}
                  </dd>
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
  return (
    <section className="relative bg-stone-soft py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-[10px] uppercase tracking-[0.5em] text-stone-deep">
                03 · Galería
              </div>
              <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
                Cada rincón,
                <br />
                una <em className="text-gold">postal</em>.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink/70">
              Interior sereno y luminoso, muralla al otro lado de la ventana. Pasa el ratón
              por las imágenes.
            </p>
          </div>
        </Reveal>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {gallery.map((g, i) => (
            <Reveal key={g.alt} delay={i * 0.05} className={g.span}>
              <TiltImage src={g.src} alt={g.alt} className="h-full w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Distribución (flip 3D) ─────────── */

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
        "Armario amplio",
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
        "Secador de pelo",
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
          <div className="mb-16 max-w-2xl">
            <div className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
              04 · Distribución
            </div>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
              Cinco estancias.
              <br />
              <em className="text-gold">Un mismo silencio.</em>
            </h2>
          </div>
        </Reveal>

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
              Todo lo necesario.
              <br />
              <span className="text-gold-soft">Nada de más.</span>
            </h3>
            <div className="h-px w-16 bg-gold md:mb-4" />
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
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
    <section
      id="ubicacion"
      className="stone-grain relative overflow-hidden bg-stone-soft py-32 md:py-48"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:px-10">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.5em] text-stone-deep">
            05 · Ubicación
          </div>
          <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
            A dos pasos
            <br />
            de <em className="text-gold">todo</em>.
          </h2>
          <div className="mt-8 h-px w-16 bg-gold" />
          <p className="mt-8 text-lg leading-relaxed text-ink/80">
            En Cáceres no hace falta coche. Desde MAJMA, cada monumento del casco histórico
            está a unos minutos caminando por calles empedradas.
          </p>
          <ul className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            {spots.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between py-4 text-ink"
              >
                <span className="flex items-center gap-3 text-base">
                  <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  {s.name}
                </span>
                <span className="font-serif text-xl text-ink">{s.time}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-square overflow-hidden border border-ink/15 bg-ink">
            <div className="absolute inset-0 opacity-70">
              <img
                src={heroImg}
                alt="Vista aérea del casco histórico de Cáceres"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-ink/60 via-ink/30 to-ink/80" />
            {/* Marker */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-ink/70 backdrop-blur">
                <BattlementMark className="h-6 w-auto text-gold" />
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.4em] text-cream">
                MAJMA
              </div>
              <div className="mt-1 text-xs text-cream/60">Casco histórico · Cáceres</div>
            </motion.div>
            <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.3em] text-cream/50">
              Ilustración
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Reserva ─────────── */

function Reserva() {
  return (
    <section
      id="reserva"
      className="relative overflow-hidden bg-ink py-32 text-cream md:py-48"
    >
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-[0.06]">
        <BattlementMark className="h-[90vh] w-auto text-cream" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.5em] text-cream/60">
            06 · Reserva
          </div>
          <h2 className="mt-6 font-serif text-5xl leading-[1] text-cream md:text-7xl">
            Tu atalaya
            <br />
            <em className="text-gold-soft">te espera.</em>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream/80">
            Reserva directa o a través de las principales plataformas. Si prefieres, escríbenos
            por WhatsApp y resolvemos cualquier duda al momento.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-ink transition-colors hover:bg-cream"
            >
              Reservar en Booking
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 border border-cream/40 px-8 py-4 text-xs uppercase tracking-[0.3em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Reservar en Airbnb
            </a>
            <a
              href="https://wa.me/34000000000"
              className="inline-flex items-center justify-center gap-3 border border-cream/20 px-8 py-4 text-xs uppercase tracking-[0.3em] text-cream/90 transition-colors hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp directo
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
    <footer className="border-t border-border bg-cream py-16 text-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-10">
        <div>
          <Wordmark />
          <p className="mt-6 max-w-xs text-sm text-muted-foreground">
            Apartamento turístico en el casco histórico de Cáceres. Piedra centenaria, confort
            contemporáneo.
          </p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Contacto
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>hola@majma-caceres.es</li>
            <li>+34 000 000 000</li>
            <li>Casco histórico de Cáceres</li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Legal
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gold">
                Aviso legal
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gold">
                Política de privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gold">
                Instagram
              </a>
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
  return (
    <a
      href="https://wa.me/34000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-ink px-5 py-4 text-cream shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-all hover:bg-gold hover:text-ink"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
      <span className="hidden text-xs uppercase tracking-[0.3em] sm:inline">WhatsApp</span>
    </a>
  );
}
