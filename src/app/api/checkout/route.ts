import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { discountRateForCount, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "@/lib/constants";

const checkoutSchema = z
  .object({
    customerName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().min(2),
    region: z.string().min(2),
    shippingMethod: z.enum(["despacho", "retiro"]),
    paymentMethod: z.enum(["mercadopago", "abitab_redpagos", "transferencia"]),
    items: z
      .array(
        z.object({
          variantId: z.string(),
          quantity: z.number().int().positive(),
        })
      )
      .min(1),
  })
  .refine((data) => data.shippingMethod === "retiro" || (data.address?.trim().length ?? 0) >= 3, {
    message: "La dirección es obligatoria para el despacho a domicilio",
    path: ["address"],
  });

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  try {
    const order = await prisma.$transaction(async (tx) => {
      const variants = await tx.productVariant.findMany({
        where: { id: { in: data.items.map((i) => i.variantId) } },
        include: { product: true },
      });

      const lineItems = data.items.map((item) => {
        const variant = variants.find((v) => v.id === item.variantId);
        if (!variant) throw new Error(`Variante no encontrada: ${item.variantId}`);
        if (variant.stock < item.quantity) {
          throw new Error(`Sin stock suficiente para ${variant.product.name} (talla ${variant.size})`);
        }
        return { variant, quantity: item.quantity };
      });

      const totalCount = lineItems.reduce((sum, li) => sum + li.quantity, 0);
      const subtotal = lineItems.reduce((sum, li) => sum + li.quantity * li.variant.product.price, 0);
      const discountRate = discountRateForCount(totalCount);
      const afterDiscount = subtotal - Math.round(subtotal * discountRate);
      const shippingCost =
        data.shippingMethod === "retiro" || afterDiscount >= FREE_SHIPPING_THRESHOLD
          ? 0
          : STANDARD_SHIPPING_COST;
      const total = afterDiscount + shippingCost;

      const orderNumber = `LU-${Date.now().toString(36).toUpperCase()}`;

      const created = await tx.order.create({
        data: {
          orderNumber,
          status: "PAGADO",
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          address: data.address?.trim() || "Retiro en local",
          city: data.city,
          region: data.region,
          shippingMethod: data.shippingMethod,
          paymentMethod: data.paymentMethod,
          subtotal: afterDiscount,
          shippingCost,
          total,
          items: {
            create: lineItems.map((li) => ({
              variantId: li.variant.id,
              productName: li.variant.product.name,
              size: li.variant.size,
              price: li.variant.product.price,
              quantity: li.quantity,
            })),
          },
        },
      });

      for (const li of lineItems) {
        await tx.productVariant.update({
          where: { id: li.variant.id },
          data: { stock: { decrement: li.quantity } },
        });
      }

      return created;
    });

    return NextResponse.json({ orderNumber: order.orderNumber });
  } catch (err) {
    const message = err instanceof Error ? err.message : "No se pudo procesar el pedido";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
