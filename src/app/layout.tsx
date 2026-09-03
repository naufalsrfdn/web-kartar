import type { Metadata } from "next";
import "./globals.css";
import { OskarProvider } from "@/lib/data-store";
import { ToastContainer } from "@/components/ToastContainer";

export const metadata: Metadata = {
  metadataBase: new URL("https://oskar.my.id"),
  title: {
    default: "OSKAR - Organisasi Pemuda Pemudi Krekah Utara",
    template: "%s | OSKAR Krekah Utara",
  },
  description:
    "Website Resmi Organisasi Pemuda Pemudi Krekah Utara (OSKAR). Wadah kegiatan, pendaftaran online, keanggotaan, dan katalog UMKM dusun.",
  keywords: [
    "OSKAR",
    "Krekah Utara",
    "Organisasi Pemuda Pemudi Krekah Utara",
    "Pemuda Krekah",
    "Bantul",
    "Gilangharjo",
    "Pandak",
    "UMKM Krekah",
    "Kegiatan Dusun",
    "kartar",
    "Karang Taruna",
  ],
  authors: [{ name: "OSKAR Krekah Utara" }],
  openGraph: {
    title: "OSKAR - Organisasi Pemuda Pemudi Krekah Utara",
    description:
      "Wadah kreasi, kegiatan kepemudaan, direktori UMKM warga, dan pendaftaran online Organisasi Pemuda Pemudi Krekah Utara.",
    url: "https://oskar.my.id",
    siteName: "OSKAR Krekah Utara",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Logo OSKAR Organisasi Pemuda Pemudi Krekah Utara",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-oskar-dark antialiased">
        <OskarProvider>
          {children}
          <ToastContainer />
        </OskarProvider>
      </body>
    </html>
  );
}
