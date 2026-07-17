# Tienda online (nombre de marca por definir)

Sitio de marca + catálogo para la venta de ropa y calzado originales (Nike,
Adidas, Jordan, etc.) en Uruguay. Es la primera etapa técnica del proyecto:
una landing con catálogo y checkout vía WhatsApp, pensada para validar el
negocio antes de invertir en una tienda online completa con carrito y pagos
integrados.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Qué hay placeholder todavía

Todo lo marcado con `TODO` en el código es un dato de ejemplo que hay que
reemplazar antes de publicar el sitio:

- **`src/lib/site-config.ts`**: nombre de la marca, número de WhatsApp,
  usuario de Instagram. Es el único archivo que hay que tocar para que el
  nombre de la marca se actualice en todo el sitio.
- **`src/lib/products.ts`**: catálogo de ejemplo (productos, precios,
  talles). Reemplazar por el stock real cuando esté disponible.
- **`src/components/ProductImagePlaceholder.tsx`**: hoy los productos
  muestran un bloque de color en vez de una foto real. Cuando haya fotos de
  producto, se reemplaza por el componente `<Image>` de Next.js.
- **`src/app/terminos/page.tsx`** y **`src/app/privacidad/page.tsx`**: son
  borradores genéricos (marcados con un aviso visible en la página) que
  todavía no fueron revisados por un abogado ni tienen los datos legales
  reales del negocio (razón social, RUT, domicilio). No publicar tal cual.

## Cómo está armado

- **Next.js (App Router) + TypeScript + Tailwind CSS**.
- `/` — landing con propuesta de valor y productos destacados.
- `/catalogo` — grilla de productos con filtro por categoría.
- `/catalogo/[slug]` — ficha de producto, con botón "Comprar por WhatsApp"
  que abre WhatsApp con un mensaje pre-armado (nombre y precio del
  producto).
- `/contacto` — WhatsApp e Instagram.
- `/envios-y-pagos` — cómo se compra, medios de pago, envíos y devoluciones
  (contenido borrador, a completar).
- `/terminos` y `/privacidad` — borradores legales genéricos, a revisar.
- `robots.txt` y `sitemap.xml` generados automáticamente
  (`src/app/robots.ts` y `src/app/sitemap.ts`) a partir de
  `siteConfig.siteUrl` y del catálogo.
- Menú mobile (hamburguesa) en `src/components/MobileNav.tsx` para pantallas
  chicas.
- Página 404 con la identidad del sitio (`src/app/not-found.tsx`).

No hay carrito de compras ni pasarela de pagos todavía: cada compra se
cierra por WhatsApp de forma manual. Es intencional para esta etapa inicial.

## Próximos pasos sugeridos

1. Definir nombre de marca e identidad visual (logo, colores, tipografía) y
   actualizar `site-config.ts` y la paleta en `globals.css`.
2. Cargar el catálogo real con fotos de producto.
3. Conseguir dominio propio, actualizar `siteConfig.siteUrl` y desplegar
   (por ejemplo en Vercel).
4. Revisar con un abogado los textos de `/terminos` y `/privacidad`, y
   completar los datos reales del negocio.
5. Definir medios de pago, zonas y costos de envío reales para completar
   `/envios-y-pagos`.
6. Cuando haya volumen de ventas: sumar checkout con pagos online (por
   ejemplo Mercado Pago, muy usado en Uruguay) y un panel simple de
   inventario.
