"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slug";
import { CLOTHING_SIZES, SHOE_SIZES } from "@/lib/constants";

type Category = { id: string; name: string };

type VariantRow = { id?: string; size: string; stock: number };
type ImageRow = { url: string; alt?: string };

export type ProductFormValues = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  gender: "HOMBRE" | "MUJER" | "UNISEX";
  categoryId: string;
  featured: boolean;
  isNewDrop: boolean;
  bestSeller: boolean;
  active: boolean;
  images: ImageRow[];
  variants: VariantRow[];
};

const DEFAULT_SIZES = CLOTHING_SIZES;

export function ProductForm({
  categories,
  initial,
}: {
  categories: Category[];
  initial?: ProductFormValues;
}) {
  const router = useRouter();
  const isEdit = !!initial?.id;

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(initial?.price?.toString() ?? "");
  const [compareAtPrice, setCompareAtPrice] = useState(initial?.compareAtPrice?.toString() ?? "");
  const [gender, setGender] = useState(initial?.gender ?? "UNISEX");
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[0]?.id ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [isNewDrop, setIsNewDrop] = useState(initial?.isNewDrop ?? false);
  const [bestSeller, setBestSeller] = useState(initial?.bestSeller ?? false);
  const [active, setActive] = useState(initial?.active ?? true);
  const [images, setImages] = useState<ImageRow[]>(initial?.images ?? [{ url: "" }]);
  const [variants, setVariants] = useState<VariantRow[]>(
    initial?.variants ?? DEFAULT_SIZES.map((s) => ({ size: s, stock: 0 }))
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function autoFillPlaceholder() {
    if (!name) return;
    const bg = "171717";
    setImages([
      { url: `/api/placeholder/${bg}/${encodeURIComponent(name)}`, alt: name },
      { url: `/api/placeholder/b91c1c/${encodeURIComponent(name + " vista 2")}`, alt: name },
    ]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      name,
      slug,
      description,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
      gender,
      categoryId,
      featured,
      isNewDrop,
      bestSeller,
      active,
      images: images.filter((i) => i.url.trim() !== ""),
      variants: variants.filter((v) => v.size.trim() !== ""),
    };

    if (payload.images.length === 0) {
      setError("Agrega al menos una imagen (o usa 'Generar placeholder').");
      return;
    }

    setSubmitting(true);
    const url = isEdit ? `/api/admin/products/${initial!.id}` : "/api/admin/products";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? "No se pudo guardar el producto.");
      return;
    }

    router.push("/admin/productos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted">
            Nombre
          </label>
          <input
            className="input"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted">
            Slug (URL)
          </label>
          <input
            className="input"
            required
            value={slug}
            onChange={(e) => {
              setSlug(slugify(e.target.value));
              setSlugTouched(true);
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted">
            Descripción
          </label>
          <textarea
            className="input"
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted">
            Precio (UYU)
          </label>
          <input
            className="input"
            type="number"
            required
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted">
            Precio antes de descuento (opcional)
          </label>
          <input
            className="input"
            type="number"
            min={0}
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted">
            Categoría
          </label>
          <select className="input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted">
            Género
          </label>
          <select
            className="input"
            value={gender}
            onChange={(e) => setGender(e.target.value as typeof gender)}
          >
            <option value="UNISEX">Unisex</option>
            <option value="HOMBRE">Hombre</option>
            <option value="MUJER">Mujer</option>
          </select>
        </div>
      </section>

      <section className="flex flex-wrap gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Destacado
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isNewDrop} onChange={(e) => setIsNewDrop(e.target.checked)} />
          Nuevo drop
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={bestSeller} onChange={(e) => setBestSeller(e.target.checked)} />
          Más vendido
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          Activo (visible en la tienda)
        </label>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Imágenes</h3>
          <button type="button" onClick={autoFillPlaceholder} className="text-xs text-accent hover:underline">
            Generar placeholder
          </button>
        </div>
        <div className="space-y-2">
          {images.map((img, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="input"
                placeholder="URL de la imagen"
                value={img.url}
                onChange={(e) => {
                  const next = [...images];
                  next[i] = { ...next[i], url: e.target.value };
                  setImages(next);
                }}
              />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                className="px-3 text-muted hover:text-accent"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setImages([...images, { url: "" }])}
          className="mt-2 text-xs text-accent hover:underline"
        >
          + Agregar imagen
        </button>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Tallas y stock</h3>
          <div className="flex gap-3 text-xs">
            <button
              type="button"
              onClick={() => setVariants(CLOTHING_SIZES.map((s) => ({ size: s, stock: 0 })))}
              className="text-accent hover:underline"
            >
              Preset ropa
            </button>
            <button
              type="button"
              onClick={() => setVariants(SHOE_SIZES.map((s) => ({ size: s, stock: 0 })))}
              className="text-accent hover:underline"
            >
              Preset calzado
            </button>
            <button
              type="button"
              onClick={() => setVariants([{ size: "Único", stock: 0 }])}
              className="text-accent hover:underline"
            >
              Talle único
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {variants.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className="input w-28"
                placeholder="Talle"
                value={v.size}
                onChange={(e) => {
                  const next = [...variants];
                  next[i] = { ...next[i], size: e.target.value };
                  setVariants(next);
                }}
              />
              <input
                className="input w-28"
                type="number"
                min={0}
                placeholder="Stock"
                value={v.stock}
                onChange={(e) => {
                  const next = [...variants];
                  next[i] = { ...next[i], stock: Number(e.target.value) };
                  setVariants(next);
                }}
              />
              <button
                type="button"
                onClick={() => setVariants(variants.filter((_, idx) => idx !== i))}
                className="px-3 text-muted hover:text-accent"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setVariants([...variants, { size: "", stock: 0 }])}
          className="mt-2 text-xs text-accent hover:underline"
        >
          + Agregar talle
        </button>
      </section>

      {error && <p className="text-sm text-accent">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-accent px-7 py-3 text-sm font-bold uppercase text-accent-foreground hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear producto"}
      </button>
    </form>
  );
}
