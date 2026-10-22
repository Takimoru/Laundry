export const siteConfig = {
  brand: "Mele Laundry",
  tagline: "Pakaian bersih, rapi, dan wangi dengan pelayanan yang ramah.",
  whatsappNumber: "6282255168080",
  phoneDisplay: "0822-5516-8080",
  openingHours: "Senin–Minggu · 08.00–10.00",
  alamat: "Jl. Sepinggan Baru, Sepinggan, Kec. Balikpapan Selatan, Kota   Balikpapan,     Kalimantan Timur 76116",
} as const;

export const navItems = [
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Layanan", href: "#services" },
  { label: "Tentang", href: "#about" },
  { label: "Kontak", href: "#contact" },
] as const;

export const laundryServices = [
  { name: "Laundry satuan", detail: "Perawatan pakaian per item." },
  { name: "Laundry kiloan", detail: "Solusi praktis untuk cucian sehari-hari." },
  { name: "Perlengkapan bayi", detail: "Cucian kebutuhan si kecil." },
  { name: "Bedcover", detail: "Perawatan perlengkapan tidur yang tebal." },
  { name: "Sprei dan selimut", detail: "Bersih dan segar untuk waktu istirahat." },
  { name: "Gorden", detail: "Bantu rawat kain gorden di rumah." },
  { name: "Sepatu", detail: "Perawatan untuk sepatu kesayangan." },
  { name: "Tas", detail: "Perawatan untuk tas sehari-hari." },
] as const;

export const serviceHighlights = [
  { title: "Bersih dan rapi", description: "Setiap cucian ditangani dengan perhatian pada hasil akhir." },
  { title: "Cepat dan efisien", description: "Pilihan Laundry Express dengan layanan 3 Jam Beres." },
  { title: "Pelayanan ramah", description: "Kami siap membantu memilih layanan yang sesuai." },
] as const;

export const VisiMisi = {
  Visi:"Menjadi jasa laundry terpercaya yang mengutamakan kerapian, kecepatan, dan keramahan dalam setiap pelayanan.",
  Misi1:"Menjaga kualitas cucian agar tetap bersih dan rapi.",
  Misi2:"Memberikan pelayanan yang cepat dan efisien.",
  Misi3:"Mengutamakan keramahan dan kenyamanan pelanggan.",
  Misi4:"Membangun kepercayaan serta meningkatkan kepuasan pelanggan melalui pelayanan terbaik."

} as const;
