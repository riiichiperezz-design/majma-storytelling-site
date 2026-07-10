import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, ArrowRight, MessageCircle, Sparkles, HelpCircle } from "lucide-react";

import { TopBar, Footer, ChatbotWidget, WhatsAppFab, MobileStickyCTA } from "@/routes/index";
import { blogPosts, getBlogPost, type BlogPost } from "@/lib/blog";
import { SITE_URL, BOOKING_URL, WA_URL } from "@/lib/site";

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

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    // Sin loaderData, la ruta ha resuelto a notFound() — deja que el 404
    // global (__root.tsx) gestione el título/contenido, sin leer post.*.
    if (!loaderData) return {};
    const post = loaderData as BlogPost;
    const url = `${SITE_URL}/blog/${post.slug}`;
    const image = new URL(COVER_IMAGES[post.coverImage], SITE_URL).toString();
    const faqBlock = post.body.find((b) => b.type === "faq");

    return {
      meta: [
        { title: `${post.title} | MAJMA Apartamentos Turísticos` },
        { name: "description", content: post.metaDescription },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "index, follow" },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            image,
            datePublished: post.publishedDate,
            dateModified: post.updatedDate ?? post.publishedDate,
            author: { "@type": "Organization", name: "MAJMA Apartamentos Turísticos" },
            publisher: { "@type": "Organization", name: "MAJMA Apartamentos Turísticos" },
            mainEntityOfPage: url,
          },
        },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        },
        ...(faqBlock && faqBlock.type === "faq"
          ? [
              {
                "script:ld+json": {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqBlock.items.map((qa) => ({
                    "@type": "Question",
                    name: qa.q,
                    acceptedAnswer: { "@type": "Answer", text: qa.a },
                  })),
                },
              },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BlogPostPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BookingCta() {
  return (
    <div className="my-10 border border-gold/30 bg-ink px-6 py-8 text-center md:px-10">
      <div className="text-[10px] uppercase tracking-[0.35em] text-gold">
        MAJMA · Casco histórico
      </div>
      <p className="mt-3 font-serif text-2xl text-cream">
        Vive Cáceres desde dentro de la muralla.
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-cream/70">
        Tres apartamentos independientes a dos minutos a pie de la Iglesia de San Juan, en pleno
        casco histórico.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-xs uppercase tracking-[0.3em] text-ink transition-colors duration-300 hover:bg-gold-soft"
        >
          Reservar en Booking
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-cream/40 px-6 py-3 text-xs uppercase tracking-[0.3em] text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp directo
        </a>
      </div>
    </div>
  );
}

function BlogPostPage() {
  const post = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <TopBar />
      <main className="bg-cream pb-24 pt-32 md:pt-40">
        <article className="mx-auto max-w-3xl px-6 md:px-10">
          <nav
            aria-label="Migas de pan"
            className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ink/40"
          >
            <Link to="/" className="hover:text-gold">
              Inicio
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-gold">
              Blog
            </Link>
            <span>/</span>
            <span className="text-ink/60">{post.tag}</span>
          </nav>

          <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
            <span>{post.tag}</span>
            <span className="text-ink/30">·</span>
            <span className="flex items-center gap-1 text-ink/50">
              <Clock className="h-3 w-3" />
              {post.readTime} min de lectura
            </span>
          </div>
          <h1 className="mt-4 font-serif text-3xl leading-tight text-ink md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 text-xs uppercase tracking-[0.25em] text-ink/40">
            {post.updatedDate
              ? `Actualizado el ${formatDate(post.updatedDate)}`
              : formatDate(post.publishedDate)}
          </div>

          <div className="mt-10 aspect-[16/9] overflow-hidden">
            <img
              src={COVER_IMAGES[post.coverImage]}
              alt={post.coverAlt}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-10 border border-gold/30 bg-stone-soft/40 p-6">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              En resumen
            </div>
            <ul className="mt-4 space-y-2">
              {post.quickFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="prose prose-neutral mt-10 max-w-none text-ink/85">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="mt-10 font-serif text-2xl text-ink">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} className="mt-4 list-disc space-y-2 pl-6">
                    {block.items.map((item, j) => (
                      <li key={j} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "tip") {
                return (
                  <div
                    key={i}
                    className="not-prose my-8 border-l-2 border-gold bg-cream px-6 py-5"
                  >
                    <div className="text-[10px] uppercase tracking-[0.35em] text-gold">
                      Consejo MAJMA
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/80">{block.text}</p>
                  </div>
                );
              }
              if (block.type === "link") {
                return (
                  <Link
                    key={i}
                    to="/blog/$slug"
                    params={{ slug: block.slug }}
                    className="not-prose group my-8 flex items-center justify-between gap-4 border border-ink/15 px-6 py-4 text-sm text-ink transition-colors duration-300 hover:border-gold"
                  >
                    <span className="font-medium">{block.text}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                  </Link>
                );
              }
              if (block.type === "faq") {
                return (
                  <div key={i} className="not-prose mt-10">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-gold">
                      <HelpCircle className="h-3.5 w-3.5" />
                      Preguntas frecuentes
                    </div>
                    <div className="mt-4 divide-y divide-ink/10 border-t border-ink/10">
                      {block.items.map((qa, j) => (
                        <div key={j} className="py-5">
                          <p className="font-serif text-lg text-ink">{qa.q}</p>
                          <p className="mt-2 text-sm leading-relaxed text-ink/70">{qa.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <p key={i} className="mt-4 leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>

          <BookingCta />

          {related.length > 0 && (
            <div className="mt-16 border-t border-ink/10 pt-10">
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Sigue leyendo</div>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group block"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={COVER_IMAGES[p.coverImage]}
                        alt={p.coverAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <h3 className="mt-3 font-serif text-base leading-snug text-ink group-hover:text-gold">
                      {p.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
      <ChatbotWidget />
      <WhatsAppFab />
      <MobileStickyCTA />
    </div>
  );
}
