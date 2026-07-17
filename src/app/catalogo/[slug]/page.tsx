import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductImagePlaceholder } from "@/components/ProductImagePlaceholder";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getProductBySlug, products } from "@/lib/products";
import { formatPrice } from "@/lib/site-config";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product?.name ?? "Producto" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const message = `Hola! Quiero consultar por: ${product.name} (${formatPrice(
    product.price
  )}).`;

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2">
      <ProductImagePlaceholder product={product} className="rounded-2xl" />
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {product.brand}
        </span>
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
        <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
        <p className="text-zinc-600 dark:text-zinc-400">{product.description}</p>

        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Talles disponibles
          </h2>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="rounded-full border border-black/10 px-3 py-1 text-sm dark:border-white/10"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Colores
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {product.colors.join(", ")}
          </p>
        </div>

        <WhatsAppButton message={message} className="mt-4 w-fit">
          Comprar por WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
