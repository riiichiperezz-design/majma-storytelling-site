import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";

import { TopBar, Footer, ChatbotWidget, WhatsAppFab, MobileStickyCTA } from "@/routes/index";
import { blogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

import heroImg from "@/assets/hero-caceres.webp";
import caceresSkylineImg from "@/assets/caceres-skyline.webp";
import mapa3dImg from "@/assets/mapa3d.webp";

const COVER_IMAGES = { hero: heroImg, skyline: caceresSkylineImg, map: mapa3dImg };

const TITLE = "Guía y blog de Cáceres | MAJMA Apartamentos Turísticos";
const DESCRIPTION =
  "Itinerarios, gastronomía, historia y consejos prácticos para tu visita a Cáceres, Patrimonio de la Humanidad, escritos desde el casco histórico donde te alojas.";

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
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <TopBar />
      <main className="bg-cream pb-24 pt-36 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Guía de Cáceres</div>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-ink md:text-5xl">
            Ideas, itinerarios y consejos<em className="text-gold not-italic"> para tu visita.</em>
          </h1>
          <p className="mt-6 max-w-xl text-ink/70">
            Escrito desde el casco histórico amurallado de Cáceres, donde están los apartamentos
            MAJMA.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
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
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
      <WhatsAppFab />
      <MobileStickyCTA />
    </div>
  );
}
