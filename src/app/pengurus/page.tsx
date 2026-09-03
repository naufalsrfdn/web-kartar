"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOskar } from "@/lib/data-store";
import { UserCheck, Shield, Phone } from "lucide-react";
import { createWhatsAppLink } from "@/lib/utils";

export default function PengurusPage() {
  const { leadership } = useOskar();

  // Sort by orderIndex
  const sortedLeadership = [...leadership].sort((a, b) => a.orderIndex - b.orderIndex);

  const mainBoard = sortedLeadership.filter((l) => l.orderIndex <= 4);
  const divisionBoard = sortedLeadership.filter((l) => l.orderIndex > 4);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 flex-1">
        {/* HEADER */}
        <div className="neo-card p-8 bg-white border-2 border-oskar-dark space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-oskar-yellow text-oskar-dark font-bold text-xs rounded-xl border-2 border-oskar-dark shadow-neo-sm">
            <UserCheck className="w-4 h-4" />
            <span>STRUKTUR ORGANISASI PERIODE 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-oskar-dark">
            Kepengurusan OSKAR Krekah Utara
          </h1>
          <p className="text-sm font-medium text-slate-600">
            Jajaran pengurus harian dan koordinator divisi pemuda pemudi Dusun Krekah Utara.
          </p>
        </div>

        {/* PENGURUS HARIAN (TOP BOARD) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-oskar-red text-white border-2 border-oskar-dark rounded-xl shadow-neo-sm">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-oskar-dark">Pengurus Harian</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainBoard.map((item) => {
              const waLink = item.whatsapp
                ? createWhatsAppLink(
                    item.whatsapp,
                    `Halo ${item.name} (${item.roleTitle} OSKAR), saya ingin menghubungi Anda.`
                  )
                : null;

              return (
                <div key={item.id} className="neo-card neo-card-hover bg-white p-5 text-center space-y-4">
                  <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-oskar-dark shadow-neo-sm bg-slate-100">
                    <Image
                      src={item.photoUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="neo-badge bg-oskar-yellow text-oskar-dark">
                      {item.roleTitle}
                    </span>
                    <h3 className="text-lg font-black text-oskar-dark pt-1">{item.name}</h3>
                  </div>

                  {waLink && (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn neo-btn-white text-xs py-2 w-full flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Kontak WA</span>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* KOORDINATOR DIVISI */}
        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-oskar-orange text-white border-2 border-oskar-dark rounded-xl shadow-neo-sm">
              <UserCheck className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-oskar-dark">Ketua Divisi & Bidang</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisionBoard.map((item) => (
              <div key={item.id} className="neo-card neo-card-hover bg-white p-5 flex items-center gap-4">
                <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 border-oskar-dark shadow-neo-sm bg-slate-100">
                  <Image
                    src={item.photoUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <span className="neo-badge bg-amber-100 text-oskar-dark border-oskar-dark">
                    {item.roleTitle}
                  </span>
                  <h3 className="text-base font-black text-oskar-dark">{item.name}</h3>
                  {item.division && (
                    <p className="text-xs font-bold text-oskar-red">Bidang: {item.division}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
