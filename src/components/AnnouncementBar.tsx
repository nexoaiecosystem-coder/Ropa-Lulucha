import { siteConfig } from "@/lib/site-config";

export function AnnouncementBar() {
  const [firstMessage, ...restMessages] = siteConfig.announcements;

  return (
    <div className="bg-brand-accent px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-white sm:text-xs">
      <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span>{firstMessage}</span>
        {restMessages.map((message) => (
          <span key={message} className="hidden items-center gap-3 sm:flex">
            <span aria-hidden="true" className="opacity-60">·</span>
            {message}
          </span>
        ))}
      </p>
    </div>
  );
}
