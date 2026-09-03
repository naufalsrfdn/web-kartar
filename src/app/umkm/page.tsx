"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOskar } from "@/lib/data-store";
import { ShoppingBag, MessageCircle, MapPin, Search } from "lucide-react";
import { createWhatsAppLink } from "@/lib/utils";

export default function UmkmPage() {
  const { umkm } = useOskar();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUmkm = umkm.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 flex-1">
        {/* HEADER */}
        <div className="neo-card p-8 bg-amber-100/60 border-2 border-oskar-dark space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-oskar-yellow text-oskar-dark font-bold text-xs rounded-xl border-2 border-oskar-dark shadow-neo-sm uppercase">
            <ShoppingBag className="w-4 h-4" />
            <span>DIREKTORI USAHA LOKAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-oskar-dark">
            UMKM Pemuda & Warga Krekah Utara
          </h1>
          <p className="text-sm font-medium text-slate-700">
            Dukung perekonomian dusun! Temukan aneka kuliner, jasa, kerajinan, dan produk usaha pemuda dan warga lokal.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="neo-card p-5 bg-white border-2 border-oskar-dark">
          <div className="relative w-full">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama usaha, pemilik, atau produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neo-input pl-11 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* UMKM GRID */}
        {filteredUmkm.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUmkm.map((item) => {
              const waLink = createWhatsAppLink(
                item.whatsapp,
                `Halo ${item.owner}, saya tertarik dengan produk/jasa "${item.name}" dari direktori UMKM OSKAR Krekah Utara.`
              );

              return (
                <div key={item.id} className="neo-card neo-card-hover bg-white overflow-hidden flex flex-col justify-between">
                  <div className="relative h-48 w-full bg-slate-200 border-b-2 border-oskar-dark">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-oskar-dark leading-snug">{item.name}</h3>

                      <p className="text-xs font-bold text-oskar-red">
                        Pemilik: <span className="text-slate-800">{item.owner}</span>
                      </p>

                      <p className="text-xs font-medium text-slate-600 leading-relaxed">
                        {item.description}
                      </p>

                      {item.location && (
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-oskar-red shrink-0" />
                          <span>{item.location}</span>
                        </div>
                      )}

                      {item.priceRange && (
                        <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 inline-block mt-1">
                          Range Harga: {item.priceRange}
                        </div>
                      )}
                    </div>

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn bg-emerald-500 hover:bg-emerald-600 text-white text-xs py-3 w-full flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Pesan / Tanya via WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="neo-card p-12 bg-white border-2 border-oskar-dark text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-black text-oskar-dark">UMKM Tidak Ditemukan</h3>
            <p className="text-xs font-medium text-slate-500">
              Tidak ada UMKM yang sesuai dengan kata kunci pencarian Anda.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
