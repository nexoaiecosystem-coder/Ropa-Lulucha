import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de privacidad",
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold tracking-tight">
        Política de privacidad
      </h1>
      <p className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
        Borrador provisorio, sin revisión legal todavía. Hay que completarlo
        y validarlo antes de publicar el sitio, en particular respecto a la
        normativa de protección de datos personales aplicable en Uruguay
        (Ley N.º 18.331) si se llega a recolectar información de clientes.
      </p>
      <div className="flex flex-col gap-6 text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">
            Qué datos recolectamos
          </h2>
          <p>
            Hoy el sitio no tiene formularios ni carrito de compra: los datos
            que compartís (nombre, dirección, teléfono) se intercambian de
            forma directa por WhatsApp para coordinar cada compra, y no
            quedan almacenados en este sitio.
          </p>
        </section>
        <section>
          <h2 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">
            Para qué se usan
          </h2>
          <p>
            Únicamente para coordinar la venta, el envío y responder
            consultas. No compartimos tus datos con terceros con fines
            comerciales.
          </p>
        </section>
        <section>
          <h2 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">
            Contacto
          </h2>
          <p>
            Para cualquier consulta sobre tus datos, escribinos a{" "}
            {siteConfig.contactEmail}.
          </p>
        </section>
      </div>
    </div>
  );
}
