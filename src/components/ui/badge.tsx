import { clsx } from "clsx";

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-1 text-[11px] font-bold uppercase tracking-wide",
        variant === "accent" && "bg-accent text-accent-foreground",
        variant === "default" && "bg-foreground text-background",
        variant === "muted" && "bg-surface-2 text-muted border border-border"
      )}
    >
      {children}
    </span>
  );
}
