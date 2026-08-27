"use client";

import { useState } from "react";

export function Gallery({ images, name }: { images: { url: string; alt: string | null }[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="aspect-[4/5] w-full overflow-hidden bg-surface">
        {current && (
          <img src={current.url} alt={current.alt ?? name} className="h-full w-full object-cover" />
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActive(i)}
              className={`aspect-[4/5] overflow-hidden bg-surface border ${
                i === active ? "border-accent" : "border-transparent"
              }`}
            >
              <img src={img.url} alt={img.alt ?? name} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
