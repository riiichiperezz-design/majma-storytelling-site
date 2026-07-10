import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ArrowRight } from "lucide-react";

import { TopBar, Footer, ChatbotWidget, WhatsAppFab, MobileStickyCTA } from "@/routes/index";
import { blogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

import heroImg from "@/assets/hero-caceres.webp";
import caceresSkylineImg from "@/assets/caceres-skyline.webp";
import mapa3dImg from "@/assets/mapa3d.webp";
import apto3Vistas from "@/assets/apto3-vistas.webp";

const COVER_IMAGES = {
  hero: heroImg,
  skyline: caceresSkylineImg,
  map: mapa3dImg,
  vistas: apto3Vistas,
};

const TITLE = "Guía de Cáceres: qué hacer, dónde comer y cómo moverte | MAJMA";
const DESCRIPTION =
  "Guía de Cáceres escrita desde dentro de la muralla: itinerarios, gastronomía, historia, miradores y consejos prácticos para tu visita a esta ciudad Patrimonio de la Humanidad.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:image", content: new URL(heroImg, SITE_URL).toString() },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESCRIPTION,
          url: `${SITE_URL}/blog`,
          publisher: { "@type": "Organization", name: "MAJMA Apartamentos Turísticos" },
        },
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: BlogIndex,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogIndex() {
  const sorted = useMemo(
    () =>
      [...blogPosts].sort(
        (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
      ),
    [],
  );
  const [featured, ...rest] = sorted;
  const tags = useMemo(() => ["Todos", ...Array.from(new Set(sorted.map((p) => p.tag)))], [sorted]);
  const [activeTag, setActiveTag] = useState("Todos");
  const filtered = activeTag === "Todos" ? rest : rest.filter((p) => p.tag === activeTag);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <TopBar />
      <main className="bg-cream pb-24 pt-36 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Guía de Cáceres</div>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-ink md:text-5xl">
            Itinerarios y consejos<em className="text-gold not-italic"> escritos desde la muralla.</em>
          </h1>
          <p className="mt-6 max-w-xl text-ink/70">
            Guía práctica de Cáceres —qué hacer, dónde comer, cómo moverte y qué historias se
            cuentan por el casco histórico— escrita por MAJMA desde dentro de la Ciudad
            Monumental, Patrimonio de la Humanidad.
          </p>

          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group mt-16 grid grid-cols-1 overflow-hidden border border-ink/10 bg-background transition-colors duration-300 hover:border-gold md:grid-cols-2"
            >
              <div className="aspect-[16/10] overflow-hidden md:aspect-auto">
                <img
                  src={COVER_IMAGES[featured.coverImage]}
                  alt={featured.coverAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
                  <span>Último artículo</span>
                  <span className="text-ink/30">·</span>
                  <span>{featured.tag}</span>
                </div>
                <h2 className="mt-4 font-serif text-2xl leading-snug text-ink group-hover:text-gold md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink/60 group-hover:text-gold">
                  Leer artículo
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          )}

          <div className="mt-16 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`border px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                  activeTag === tag
                    ? "border-gold bg-gold text-ink"
                    : "border-ink/15 text-ink/60 hover:border-gold hover:text-gold"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block overflow-hidden border border-ink/10 bg-background transition-colors duration-300 hover:border-gold"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={COVER_IMAGES[post.coverImage]}
                    alt={post.coverAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
                    <span>{post.tag}</span>
                    <span className="text-ink/30">·</span>
                    <span className="flex items-center gap-1 text-ink/50">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min
                    </span>
                  </div>
                  <h2 className="mt-3 font-serif text-xl leading-snug text-ink group-hover:text-gold">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{post.excerpt}</p>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-ink/40">
                    {formatDate(post.publishedDate)}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-20 border-t border-ink/10 pt-8 text-xs text-ink/50">
            Escrito por MAJMA Apartamentos Turísticos, alojados en el corazón amurallado de
            Cáceres desde donde recorremos a pie cada rincón de esta guía.
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
      <WhatsAppFab />
      <MobileStickyCTA />
    </div>
  );
}
