"use client";

import Link from "next/link";
import { motion } from "motion/react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-surface">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(232,50,31,0.25), transparent 55%), radial-gradient(circle at 80% 70%, rgba(232,50,31,0.15), transparent 50%)",
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.7))]" />
      <motion.div
        className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Streetwear · Traído de Chile
        </motion.p>
        <motion.h1 variants={item} className="font-display mt-3 text-6xl leading-none tracking-wide sm:text-8xl">
          ROPA CON
          <br />
          ACTITUD CALLEJERA
        </motion.h1>
        <motion.p variants={item} className="mt-5 max-w-md text-sm text-muted sm:text-base">
          Poleras, polerones, championes y accesorios streetwear traídos directo desde Chile
          para Uruguay. Calces oversize, drops limitados y la actitud de la calle.
        </motion.p>
        <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/tienda?gender=HOMBRE"
              className="block bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:opacity-90"
            >
              Comprar Hombre
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/tienda?gender=MUJER"
              className="block border border-foreground px-7 py-3 text-sm font-bold uppercase tracking-wide hover:border-accent hover:text-accent"
            >
              Comprar Mujer
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
