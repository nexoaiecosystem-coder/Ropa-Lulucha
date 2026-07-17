import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Términos y condiciones",
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold tracking-tight">
        Términos y condiciones
      </h1>
      <p className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
        Borrador provisorio. Este texto es un punto de partida genérico y
        todavía no fue revisado por un abogado ni refleja los datos reales
        del negocio (razón social, RUT, domicilio, política de cambios
        definitiva). No publicar tal cual: hay que completarlo y validarlo
        legalmente antes de que el sitio esté operativo.
      </p>
      <div className="flex flex-col gap-6 text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">
            Quiénes somos
          </h2>
          {/* TODO: reemplazar por razón social, RUT y domicilio fiscal reales */}
          <p>
            {siteConfig.brandName} es un emprendimiento dedicado a la venta de
            ropa y calzado originales en Uruguay. Datos legales del negocio:
            por completar.
          </p>
        </section>
        <section>
          <h2 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">
            Productos y precios
          </h2>
          <p>
            Los precios publicados están expresados en pesos uruguayos (UYU)
            e incluyen los impuestos correspondientes, salvo que se indique
            lo contrario. Los precios y la disponibilidad de stock pueden
            cambiar sin previo aviso.
          </p>
        </section>
        <section>
          <h2 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">
            Proceso de compra
          </h2>
          <p>
            Actualmente la compra se coordina de forma manual por WhatsApp:
            la publicación de un producto en el sitio no implica una compra
            confirmada hasta que ambas partes acuerdan disponibilidad, precio
            final y forma de pago.
          </p>
        </section>
        <section>
          <h2 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">
            Cambios y devoluciones
          </h2>
          {/* TODO: definir y publicar la política real */}
          <p>Política por definir. Ver la sección Envíos y pagos.</p>
        </section>
        <section>
          <h2 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">
            Contacto
          </h2>
          <p>
            Ante cualquier consulta sobre estos términos, escribinos a{" "}
            {siteConfig.contactEmail} o por WhatsApp.
          </p>
        </section>
      </div>
    </div>
  );
}
