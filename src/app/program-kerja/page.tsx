"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOskar } from "@/lib/data-store";
import { Briefcase, CheckCircle2, Clock, CalendarCheck } from "lucide-react";

export default function ProgramKerjaPage() {
  const { programs } = useOskar();
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = [
    "ALL",
    "Sosial",
    "Olahraga",
    "Keagamaan",
    "Kepemudaan",
    "Lingkungan",
    "Kewirausahaan",
  ];

  const filteredPrograms = programs.filter(
    (p) => selectedCategory === "ALL" || p.category === selectedCategory
  );

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 flex-1">
        {/* HEADER */}
        <div className="neo-card p-8 bg-white border-2 border-oskar-dark space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-oskar-yellow text-oskar-dark font-bold text-xs rounded-xl border-2 border-oskar-dark shadow-neo-sm">
            <Briefcase className="w-4 h-4" />
            <span>AGENDA STRATEGIS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-oskar-dark">
            Program Kerja OSKAR
          </h1>
          <p className="text-sm font-medium text-slate-600">
            Rencana dan capaian program kerja kepemudaan per kategori bidang.
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`neo-badge cursor-pointer transition-all text-xs py-1.5 px-3.5 ${
                selectedCategory === cat
                  ? "bg-oskar-red text-white border-oskar-dark shadow-neo-sm"
                  : "bg-white text-oskar-dark hover:bg-slate-100 border-oskar-dark"
              }`}
            >
              {cat === "ALL" ? "Semua Bidang" : cat}
            </button>
          ))}
        </div>

        {/* PROGRAM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((item) => {
            let statusBadge = (
              <span className="neo-badge bg-sky-100 text-sky-950 border-oskar-dark">
                <Clock className="w-3 h-3 mr-1 text-sky-600" /> Rencana
              </span>
            );
            if (item.status === "ONGOING") {
              statusBadge = (
                <span className="neo-badge bg-emerald-300 text-oskar-dark border-oskar-dark animate-pulse">
                  <CalendarCheck className="w-3 h-3 mr-1 text-oskar-dark" /> Sedang Berjalan
                </span>
              );
            } else if (item.status === "COMPLETED") {
              statusBadge = (
                <span className="neo-badge bg-slate-200 text-slate-800 border-oskar-dark">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Selesai
                </span>
              );
            }

            return (
              <div key={item.id} className="neo-card neo-card-hover bg-white p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="neo-badge bg-oskar-yellow text-oskar-dark text-[11px]">
                      Bidang: {item.category}
                    </span>
                    {statusBadge}
                  </div>

                  <h2 className="text-xl font-black text-oskar-dark">{item.title}</h2>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Target: {item.target}</span>
                  <span className="text-oskar-red font-black">Tahun {item.year}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
