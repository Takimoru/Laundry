import { MessageCircle } from "lucide-react";

import { inquiryUrl } from "@/lib/whatsapp";

export function FloatingWhatsAppButton() {
  const url = inquiryUrl("Halo Mele Laundry, saya ingin bertanya tentang layanan dan harga.");

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg outline-none transition hover:-translate-y-0.5 hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50"
      aria-label="Hubungi Mele Laundry melalui WhatsApp"
      title="Hubungi Mele Laundry melalui WhatsApp"
    >
      <MessageCircle aria-hidden="true" className="size-5" />
    </a>
  );
}
