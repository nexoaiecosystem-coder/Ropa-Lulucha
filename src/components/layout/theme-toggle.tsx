"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { useHydrated } from "@/lib/use-hydrated";
import { ICON_BUTTON_CLASS } from "@/lib/ui";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const isLight = hydrated && resolvedTheme === "light";

  return (
    <motion.button
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      className={ICON_BUTTON_CLASS}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.svg
            key="sun"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinejoin="round" strokeLinecap="round" />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <circle cx="12" cy="12" r="4.5" />
            <path
              d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.55 1.55M17.55 17.55l1.55 1.55M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.55-1.55M17.55 6.45l1.55-1.55"
              strokeLinecap="round"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
