import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso Legal · MAJMA Apartamentos Turísticos" },
      { name: "description", content: "Aviso legal e información LSSI-CE de MAJMA Apartamentos Turísticos en Cáceres." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: AvisoLegal,
});

function AvisoLegal() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-ink md:px-10">
      <Link to="/" className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-gold">
        ← Volver
      </Link>
      <h1 className="mt-6 font-serif text-5xl leading-tight">Aviso legal</h1>
      <div className="mt-4 h-px w-16 bg-gold" />
      <div className="prose prose-neutral mt-10 max-w-none space-y-6 text-ink/85 leading-relaxed">
        <p>
          En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
          Información y Comercio Electrónico (LSSI-CE), se informa a los usuarios de este sitio
          web de los siguientes datos identificativos del titular:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Titular:</strong> [RAZÓN SOCIAL]</li>
          <li><strong>NIF / CIF:</strong> [NIF]</li>
          <li><strong>Domicilio:</strong> Calle Cornudilla, 3, 10003 Cáceres, España</li>
          <li><strong>Contacto:</strong> +34 722 24 74 36</li>
          <li><strong>Actividad:</strong> Explotación de apartamentos turísticos</li>
          <li><strong>Nº de registro turístico:</strong> [REGISTRO TURÍSTICO EXTREMADURA]</li>
        </ul>
        <h2 className="font-serif text-2xl">Condiciones de uso</h2>
        <p>
          El acceso a este sitio web es gratuito y su navegación implica la aceptación de los
          presentes términos. El titular se reserva el derecho a modificar el contenido sin
          previo aviso.
        </p>
        <h2 className="font-serif text-2xl">Propiedad intelectual</h2>
        <p>
          Todos los textos, imágenes, marcas y demás elementos son propiedad de su titular o
          se utilizan con autorización. Queda prohibida su reproducción sin consentimiento.
        </p>
        <h2 className="font-serif text-2xl">Responsabilidad</h2>
        <p>
          El titular no se hace responsable de un uso incorrecto del sitio web ni de los daños
          derivados de la información aquí contenida.
        </p>
        <h2 className="font-serif text-2xl">Legislación aplicable</h2>
        <p>
          Este aviso legal se rige por la legislación española. Para cualquier controversia,
          las partes se someten a los juzgados y tribunales de Cáceres.
        </p>
      </div>
    </main>
  );
}
