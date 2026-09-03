"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOskar } from "@/lib/data-store";
import { Newspaper, Calendar, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { NewsItem } from "@/lib/types";

export default function BeritaPage() {
  const { news } = useOskar();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Lock body scroll when detail modal is open (revisi.pdf page 4)
  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedNews]);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 flex-1">
        {/* HEADER */}
        <div className="neo-card p-8 bg-white border-2 border-oskar-dark space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-oskar-yellow text-oskar-dark font-bold text-xs rounded-xl border-2 border-oskar-dark shadow-neo-sm uppercase">
            <Newspaper className="w-4 h-4" />
            <span>KABAR & ARTIKEL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-oskar-dark">
            Berita & Pengumuman Dusun
          </h1>
          <p className="text-sm font-medium text-slate-600">
            Informasi terkini seputar kegiatan dan pengumuman Organisasi Pemuda Pemudi Krekah Utara.
          </p>
        </div>

        {/* NEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              id={item.slug}
              className="neo-card neo-card-hover bg-white p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative h-56 w-full rounded-xl overflow-hidden border-2 border-oskar-dark bg-slate-100 shadow-neo-sm">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 neo-badge bg-oskar-red text-white">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-oskar-orange" />
                  <span>{formatDate(item.date)}</span>
                </div>

                <h2 className="text-xl font-black text-oskar-dark leading-snug">{item.title}</h2>
                <p className="text-xs font-medium text-slate-600 line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
              </div>

              <button
                onClick={() => setSelectedNews(item)}
                className="neo-btn neo-btn-white text-xs py-2.5 w-full text-center"
              >
                Baca Artikel Selengkapnya
              </button>
            </div>
          ))}
        </div>

        {/* BLURRED & SCROLL-LOCKED DETAIL MODAL */}
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
            <div className="bg-white border-2 border-oskar-dark rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-neo-lg space-y-6 relative max-h-[85vh] overflow-y-auto my-auto">
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl border-2 border-oskar-dark bg-slate-100 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <span className="neo-badge bg-oskar-yellow text-oskar-dark">
                  {selectedNews.category}
                </span>
                <h2 className="text-2xl font-black text-oskar-dark">{selectedNews.title}</h2>
                <div className="text-xs font-bold text-slate-500">
                  <span>{formatDate(selectedNews.date)}</span>
                </div>
              </div>

              <div className="relative h-64 w-full rounded-xl overflow-hidden border-2 border-oskar-dark">
                <Image
                  src={selectedNews.thumbnail}
                  alt={selectedNews.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedNews.content}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="neo-btn neo-btn-dark text-xs py-2.5 px-6"
                >
                  Tutup Artikel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
