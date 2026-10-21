import { MessageCircle, Menu, Waves, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/config/site";
import { inquiryUrl } from "@/lib/whatsapp";

const whatsappUrl = inquiryUrl("Halo Mele Laundry, saya ingin bertanya tentang layanan laundry.");

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="flex items-center gap-3 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Waves aria-hidden="true" className="size-6" />
          </span>
          <span>
            <span className="block text-sm font-bold tracking-wide text-foreground">{siteConfig.brand}</span>
            <span className="hidden text-xs text-muted-foreground sm:block">Laundry Express</span>
          </span>
        </a>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {item.label}
            </a>
          ))}
          <Button asChild className="ml-2">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
              Hubungi kami
            </a>
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </nav>

      {isOpen ? (
        <div className="border-t border-border bg-background px-4 pb-4 shadow-sm lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm font-semibold text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-2">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
                <MessageCircle aria-hidden="true" />
                Hubungi kami
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
