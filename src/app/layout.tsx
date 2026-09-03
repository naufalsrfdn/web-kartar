import type { Metadata } from "next";
import "./globals.css";
import { OskarProvider } from "@/lib/data-store";
import { ToastContainer } from "@/components/ToastContainer";

export const metadata: Metadata = {
  metadataBase: new URL("https://oskar-krekah.org"),
  title: {
    default: "OSKAR - Organisasi Pemuda Krekah Utara",
    template: "%s | OSKAR Krekah Utara",
  },
  description:
    "Website Resmi Organisasi Pemuda Krekah Utara (OSKAR). Wadah kegiatan, pendaftaran anggota, keanggotaan, katalog UMKM dusun, dan transparansi keuangan.",
  keywords: [
    "OSKAR",
    "Krekah Utara",
    "Organisasi Pemuda",
    "Karang Taruna Dusun",
    "Pemuda Pemudi",
    "Sleman",
    "UMKM Krekah",
    "Kegiatan Dusun",
  ],
  authors: [{ name: "Pengurus OSKAR" }],
  openGraph: {
    title: "OSKAR - Organisasi Pemuda Krekah Utara",
    description:
      "Wadah kreasi, kegiatan kepemudaan, direktori UMKM warga, dan pendaftaran anggota OSKAR Dusun Krekah Utara.",
    url: "https://oskar-krekah.org",
    siteName: "OSKAR Krekah Utara",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Logo OSKAR Organisasi Pemuda Krekah Utara",
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
