import { ArrowRight } from "lucide-react";

/**
 * Banner reutilizable para futuras campañas estacionales (verano, Navidad,
 * Semana Santa, WOMAD, puentes, eventos de Cáceres...).
 *
 * No se monta todavía en ninguna página: cuando haya una campaña real que
 * lanzar, se importa este componente con `active` y los datos de esa
 * campaña. Con `active={false}` (o sin la prop) no renderiza nada, así que
 * es seguro dejarlo importado de antemano sin que se vea en producción.
 */
export function SeasonalCampaignBanner({
  active = false,
  title,
  subtitle,
  image,
  dates,
  ctaLabel,
  href,
}: {
  /** Si es false, el componente no renderiza nada. */
  active?: boolean;
  title: string;
  subtitle?: string;
  /** Ruta de una imagen ya importada del proyecto (no usar imágenes externas). */
  image?: string;
  /** Texto libre de fechas, ej. "Del 1 al 15 de agosto". */
  dates?: string;
  ctaLabel: string;
  href: string;
}) {
  if (!active) return null;

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative block overflow-hidden border-y border-gold/30 bg-ink text-cream"
    >
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-40"
        />
      )}
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          {dates && (
            <div className="text-[10px] uppercase tracking-[0.35em] text-gold">{dates}</div>
          )}
          <p className="mt-2 font-serif text-2xl leading-snug text-cream md:text-3xl">{title}</p>
          {subtitle && <p className="mt-2 max-w-xl text-sm text-cream/70">{subtitle}</p>}
        </div>
        <span className="inline-flex shrink-0 items-center gap-3 border border-cream/40 px-6 py-3 text-xs uppercase tracking-[0.3em] text-cream transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}
