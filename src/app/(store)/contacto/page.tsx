export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl tracking-wide">Contacto</h1>
      <div className="mt-6 space-y-3 text-sm">
        <p>
          <span className="text-muted">WhatsApp: </span>
          <a href="https://wa.me/59899123456" className="text-accent underline">
            +598 99 123 456
          </a>
        </p>
        <p>
          <span className="text-muted">Email: </span>
          <a href="mailto:hola@lulucha.com.uy" className="text-accent underline">
            hola@lulucha.com.uy
          </a>
        </p>
        <p>
          <span className="text-muted">Local: </span>Pocitos, Montevideo, Uruguay
        </p>
        <p>
          <span className="text-muted">Instagram: </span>
          <a href="https://instagram.com" className="text-accent underline">
            @lulucha
          </a>
        </p>
      </div>
    </div>
  );
}
