import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Envíos y pagos",
};

const items = [
  {
    title: "¿Cómo se compra?",
    body: "Por ahora no hay pago online: elegís el producto en el catálogo, coordinás talle y color por WhatsApp, y ahí te confirmamos disponibilidad y forma de pago.",
  },
  {
    title: "Medios de pago",
    // TODO: confirmar los medios de pago reales que va a aceptar el negocio (efectivo, transferencia, Mercado Pago, etc.)
    body: "Por definir. Mientras tanto se coordina caso a caso por WhatsApp (por ejemplo efectivo o transferencia bancaria).",
  },
  {
    title: "Envíos",
    // TODO: confirmar zonas de envío, empresa de encomiendas y costos reales.
    body: "Hacemos envíos a todo Uruguay. El costo y el tiempo de entrega se coordinan por WhatsApp según la localidad.",
  },
  {
    title: "Cambios y devoluciones",
    // TODO: definir política real de cambios/devoluciones.
    body: "Por definir. Ante cualquier problema con tu compra, escribinos por WhatsApp y lo resolvemos.",
  },
];

export default function EnviosYPagosPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold tracking-tight">Envíos y pagos</h1>
      <p className="mb-10 text-zinc-600 dark:text-zinc-400">
        Todavía estamos armando el proceso de compra. Esta página se va a ir
        completando a medida que definamos medios de pago, zonas de envío y
        política de cambios.
      </p>
      <dl className="flex flex-col gap-8">
        {items.map((item) => (
          <div key={item.title}>
            <dt className="mb-1 font-semibold">{item.title}</dt>
            <dd className="text-zinc-600 dark:text-zinc-400">{item.body}</dd>
          </div>
        ))}
      </dl>
      <WhatsAppButton
        message="Hola! Tengo una consulta sobre envíos y pagos."
        className="mt-10 w-fit"
      >
        Consultar por WhatsApp
      </WhatsAppButton>
    </div>
  );
}
