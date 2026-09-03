import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://oskar-krekah.org";

  const routes = [
    "",
    "/tentang",
    "/pengurus",
    "/anggota",
    "/pendaftaran",
    "/umkm",
    "/kegiatan",
    "/berita",
    "/program-kerja",
    "/keuangan",
    "/kontak",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
