import { siteConfig } from "@/lib/site-config";

export function AnnouncementBar() {
  return (
    <div className="bg-brand-accent px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white">
      <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {siteConfig.announcements.map((message, index) => (
          <span key={message} className="flex items-center gap-3">
            {index > 0 && <span aria-hidden="true" className="opacity-60">·</span>}
            {message}
          </span>
        ))}
      </p>
    </div>
  );
}
