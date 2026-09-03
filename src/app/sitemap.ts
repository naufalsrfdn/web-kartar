import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://oskar.my.id";

  const routes = [
    "",
    "/tentang",
    "/anggota",
    "/pendaftaran",
    "/umkm",
    "/kegiatan",
    "/berita",
    "/kontak",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
