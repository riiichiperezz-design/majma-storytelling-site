import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad · MAJMA Apartamentos Turísticos" },
      { name: "description", content: "Política de privacidad y tratamiento de datos personales conforme al RGPD." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-ink md:px-10">
      <Link to="/" className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-gold">
        ← Volver
      </Link>
      <h1 className="mt-6 font-serif text-5xl leading-tight">Política de privacidad</h1>
      <div className="mt-4 h-px w-16 bg-gold" />
      <div className="mt-10 space-y-6 text-ink/85 leading-relaxed">
        <p>
          De acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD 3/2018, se informa a
          los usuarios del tratamiento de sus datos personales.
        </p>
        <h2 className="font-serif text-2xl">Responsable del tratamiento</h2>
        {/* TODO: pendientes del propietario — razón social y NIF. Hasta
            entonces no se muestran estos campos para no dejar placeholders
            visibles al usuario. */}
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Domicilio:</strong> Calle Cornudilla, 3, 10003 Cáceres, España</li>
          <li><strong>Contacto:</strong> +34 722 24 74 36</li>
        </ul>
        <p className="text-sm text-ink/60">
          Los datos identificativos del responsable del tratamiento están en proceso de
          incorporación a esta política de privacidad.
        </p>
        <h2 className="font-serif text-2xl">Finalidad</h2>
        <p>
          Los datos facilitados a través de formularios, WhatsApp, teléfono o email se utilizan
          exclusivamente para gestionar consultas y reservas del apartamento turístico MAJMA.
        </p>
        <h2 className="font-serif text-2xl">Legitimación</h2>
        <p>
          Consentimiento del interesado y ejecución de la relación contractual de alojamiento
          turístico.
        </p>
        <h2 className="font-serif text-2xl">Conservación</h2>
        <p>
          Los datos se conservan durante el tiempo necesario para cumplir con las obligaciones
          legales derivadas del alojamiento (registro de viajeros ante las autoridades, fiscalidad).
        </p>
        <h2 className="font-serif text-2xl">Destinatarios</h2>
        <p>
          No se ceden datos a terceros salvo obligación legal (Cuerpos y Fuerzas de Seguridad
          del Estado, Agencia Tributaria) o a las plataformas de reserva utilizadas por el propio
          huésped (Booking).
        </p>
        <h2 className="font-serif text-2xl">Derechos</h2>
        <p>
          El interesado puede ejercer sus derechos de acceso, rectificación, supresión, oposición,
          limitación y portabilidad enviando un mensaje al teléfono/WhatsApp indicado, adjuntando
          copia de su DNI. También puede reclamar ante la Agencia Española de Protección de Datos
          (aepd.es).
        </p>
        <h2 className="font-serif text-2xl">Cookies</h2>
        <p>
          Este sitio utiliza únicamente cookies técnicas necesarias y, solo si el usuario lo
          consiente a través del aviso de cookies, cookies analíticas de Google Analytics para
          medir el uso de la web. No se utilizan cookies de publicidad ni de seguimiento con
          fines comerciales de terceros. Puedes cambiar tu decisión en cualquier momento desde
          el aviso de cookies.
        </p>
      </div>
    </main>
  );
}
