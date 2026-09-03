"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOskar } from "@/lib/data-store";
import { Calendar, MapPin, ExternalLink, Camera } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function KegiatanPage() {
  const { events } = useOskar();

  // Sort events starting from newest date
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 flex-1">
        {/* HEADER */}
        <div className="neo-card p-8 bg-white border-2 border-oskar-dark space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-oskar-yellow text-oskar-dark font-bold text-xs rounded-xl border-2 border-oskar-dark shadow-neo-sm uppercase">
            <Camera className="w-4 h-4" />
            <span>ARSIP DOKUMENTASI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-oskar-dark">
            Kegiatan & Acara Dusun
          </h1>
          <p className="text-sm font-medium text-slate-600">
            Dokumentasi lengkap foto dan informasi kegiatan Organisasi Pemuda Pemudi Krekah Utara.
          </p>
        </div>

        {/* EVENTS LIST (SORTED NEWEST FIRST, NO STATUS TAGS) */}
        <div className="space-y-8">
          {sortedEvents.map((item) => (
            <div key={item.id} className="neo-card p-6 sm:p-8 bg-white border-2 border-oskar-dark space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4">
                <div className="space-y-1">
                  <span className="neo-badge bg-oskar-yellow text-oskar-dark text-[11px]">
                    {item.category}
                  </span>
                  <h2 className="text-2xl font-black text-oskar-dark pt-1">{item.title}</h2>
                </div>

                <div className="space-y-1 text-xs font-bold text-slate-600 sm:text-right shrink-0">
                  <div className="flex items-center gap-1.5 sm:justify-end">
                    <Calendar className="w-4 h-4 text-oskar-red" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:justify-end">
                    <MapPin className="w-4 h-4 text-oskar-orange" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                {item.description}
              </p>

              {/* PREVIEW PHOTOS (1-3) */}
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                  Foto Kegiatan:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {item.previewPhotos.slice(0, 3).map((photo, idx) => (
                    <div
                      key={idx}
                      className="relative h-44 rounded-xl overflow-hidden border-2 border-oskar-dark bg-slate-100 shadow-neo-sm"
                    >
                      <Image
                        src={photo}
                        alt={`${item.title} preview ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* GOOGLE DRIVE DOCUMENTATION CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-50 p-4 rounded-xl border-2 border-oskar-dark">
                <div className="text-xs font-medium text-slate-700">
                  <span className="font-bold text-oskar-dark">Dokumentasi Foto Lengkap:</span> Seluruh hasil dokumentasi foto & video resolusi tinggi disimpan di Google Drive.
                </div>
                <a
                  href={item.gdriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-primary text-xs py-2.5 px-5 flex items-center gap-2 shrink-0 w-full sm:w-auto justify-center"
                >
                  <span>Buka Google Drive Acara</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
