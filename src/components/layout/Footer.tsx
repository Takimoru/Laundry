import { ArrowUp, MessageCircle } from "lucide-react";

import { navItems, siteConfig } from "@/config/site";
import { inquiryUrl } from "@/lib/whatsapp";

const whatsappUrl = inquiryUrl("Halo Mele Laundry, saya ingin bertanya tentang layanan laundry.");

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 py-9 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-foreground">{siteConfig.brand}</p>
          <p className="mt-1 text-sm text-muted-foreground">{siteConfig.tagline}</p>
          <p className="mt-2 text-xs text-muted-foreground">© {new Date().getFullYear()} Mele Laundry</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-primary">
              {item.label}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            WhatsApp
          </a>
          <a
            href="#home"
            aria-label="Kembali ke atas"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted"
          >
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
