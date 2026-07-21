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
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:gap-10 sm:px-6 sm:py-16 md:grid-cols-2">
      <ProductImagePlaceholder product={product} className="rounded-2xl" />
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {product.category} · {product.gender}
        </span>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{product.name}</h1>
        <p className="flex items-center gap-3 text-2xl font-semibold">
          {formatPrice(product.price)}
          {product.originalPrice && (
            <span className="text-lg font-normal text-zinc-400 line-through dark:text-zinc-500">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </p>
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

        <WhatsAppButton message={message} className="mt-4 w-full sm:w-fit">
          Comprar por WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
