import { createRootRoute } from "@tanstack/react-router";
import { RootLayout } from "@/components/layout/RootLayout";

// Root route wraps all pages.
export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-foreground">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-muted-foreground">Kembali ke beranda Mele Laundry.</p>
      <a href="/" className="mt-6 inline-flex font-semibold text-primary hover:underline">
        Kembali ke beranda
      </a>
    </main>
  ),
});
