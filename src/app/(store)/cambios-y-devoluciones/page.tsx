export default function CambiosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl tracking-wide">Cambios y Devoluciones</h1>
      <div className="mt-6 space-y-4 text-sm text-muted">
        <p>Tienes 30 días desde la recepción de tu pedido para solicitar un cambio o devolución.</p>
        <p>La prenda debe estar sin uso, con etiquetas originales y en su empaque original.</p>
        <p>
          Para iniciar un cambio o devolución, escríbenos por{" "}
          <a href="https://wa.me/59899123456" className="text-accent underline">
            WhatsApp
          </a>{" "}
          indicando tu número de pedido.
        </p>
        <p>Los costos de envío de la devolución corren por cuenta del cliente, salvo error nuestro.</p>
      </div>
    </div>
  );
}
