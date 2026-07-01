import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CookieConsent } from "../components/cookie-consent";
import { LangProvider, useT } from "../lib/i18n";

function NotFoundComponent() {
  const t = useT();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-foreground">404</h1>
        <h2 className="mt-4 font-serif text-xl text-foreground">{t.notFound.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.notFound.body}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gold px-5 py-3 text-xs uppercase tracking-[0.3em] text-ink transition-colors hover:bg-gold-soft"
          >
            {t.notFound.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const t = useT();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-xl text-foreground">{t.errorPage.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.errorPage.body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-gold px-5 py-3 text-xs uppercase tracking-[0.3em] text-ink transition-colors hover:bg-gold-soft"
          >
            {t.errorPage.retry}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-border px-5 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition-colors hover:bg-accent"
          >
            {t.errorPage.home}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MAJMA · Apartamentos turísticos en el casco histórico de Cáceres" },
      {
        name: "description",
        content:
          "Apartamentos turísticos MAJMA, a dos minutos de la Iglesia de San Juan, en pleno casco histórico de Cáceres, Ciudad Patrimonio de la Humanidad.",
      },
      { name: "author", content: "MAJMA Apartamentos Turísticos" },
      { property: "og:site_name", content: "MAJMA · Cáceres" },
      {
        property: "og:title",
        content: "MAJMA · Apartamentos turísticos en el casco histórico de Cáceres",
      },
      {
        property: "og:description",
        content:
          "Tres apartamentos en el corazón amurallado de Cáceres, a dos pasos de la Iglesia de San Juan.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_ES" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "MAJMA · Apartamentos turísticos en el casco histórico de Cáceres",
      },
      {
        name: "twitter:description",
        content:
          "Tres apartamentos en el corazón amurallado de Cáceres, a dos pasos de la Iglesia de San Juan.",
      },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#14110C" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Public+Sans:wght@300;400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <CookieConsent />
      </LangProvider>
    </QueryClientProvider>
  );
}
