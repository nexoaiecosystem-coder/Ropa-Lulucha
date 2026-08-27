import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

const MESSAGES = [
  `Envío gratis en compras sobre ${formatPrice(FREE_SHIPPING_THRESHOLD)}`,
  "Retiro gratis en local Pocitos, Montevideo",
  "Envíos a todo Uruguay en 3-7 días hábiles",
  "Ropa y championes traídos directo desde Chile",
];

function MarqueeGroup({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {MESSAGES.map((msg, i) => (
        <span key={i} className="flex items-center whitespace-nowrap px-6">
          {msg}
          <span className="ml-6 opacity-60" aria-hidden>
            •
          </span>
        </span>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div
      className="overflow-hidden bg-accent text-accent-foreground text-xs font-semibold tracking-wide"
      role="marquee"
      aria-label="Anuncios de la tienda"
    >
      <div className="marquee-track flex w-max py-2">
        <MarqueeGroup />
        <MarqueeGroup ariaHidden />
      </div>
    </div>
  );
}
