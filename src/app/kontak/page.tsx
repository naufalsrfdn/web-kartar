"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOskar } from "@/lib/data-store";
import { MapPin, Phone, Instagram, Send, Mail, CheckCircle2, ExternalLink } from "lucide-react";
import { createWhatsAppLink } from "@/lib/utils";

export default function KontakPage() {
  const { showToast } = useOskar();
  const [formState, setFormState] = useState({ name: "", contact: "", message: "" });
  const [sent, setSent] = useState(false);

  const address = "Krekah, Gilangharjo, Pandak, Bantul, Yogyakarta";
  const waNumber = "083843418369";
  const igHandle = "@oskar.krekahutara";
  const tiktokHandle = "@krekahutara";
  const mapsUrl = "https://maps.app.goo.gl/XXoM8dnfzE9CZJHEA";

  const waLink = createWhatsAppLink(
    waNumber,
    "Halo Admin OSKAR Krekah Utara, saya ingin berkomunikasi seputar kegiatan organisasi."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast("Pesan Anda berhasil dikirim ke pengurus OSKAR!", "success");
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 flex-1">
        {/* HEADER */}
        <div className="neo-card p-8 bg-white border-2 border-oskar-dark space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-oskar-yellow text-oskar-dark font-bold text-xs rounded-xl border-2 border-oskar-dark shadow-neo-sm uppercase">
            <Mail className="w-4 h-4" />
            <span>HUBUNGI KAMI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-oskar-dark">
            Kontak & Lokasi Sekretariat
          </h1>
          <p className="text-sm font-medium text-slate-600">
            Punya pertanyaan, usulan acara, atau kerjasama sponsor? Silakan hubungi pengurus OSKAR.
          </p>
        </div>

        {/* MAIN CONTENT GRID (EQUAL ALIGNED HEIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* CONTACT INFO & MAPS (LEFT SIDE) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-5 flex-1">
              <h2 className="text-xl font-black text-oskar-dark border-b-2 border-slate-100 pb-3">
                Informasi Kontak
              </h2>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 bg-oskar-red text-white border-2 border-oskar-dark rounded-xl shadow-neo-sm shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-oskar-dark">Alamat Sekretariat</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 bg-emerald-400 text-oskar-dark border-2 border-oskar-dark rounded-xl shadow-neo-sm shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-oskar-dark">WhatsApp Admin</h3>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-700 underline block mt-0.5"
                    >
                      {waNumber} (Klik untuk Chat Direct)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 bg-pink-400 text-oskar-dark border-2 border-oskar-dark rounded-xl shadow-neo-sm shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-oskar-dark">Instagram Resmi</h3>
                    <a
                      href="https://instagram.com/oskar.krekahutara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-pink-700 underline block mt-0.5"
                    >
                      {igHandle}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 bg-slate-900 text-white border-2 border-oskar-dark rounded-xl shadow-neo-sm shrink-0 text-center font-bold text-xs">
                    TT
                  </div>
                  <div>
                    <h3 className="font-black text-oskar-dark">TikTok Resmi</h3>
                    <a
                      href="https://tiktok.com/@krekahutara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-slate-800 underline block mt-0.5"
                    >
                      {tiktokHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* MAP CARD WITH DIRECT GOOGLE MAPS LINK */}
            <div className="neo-card p-5 bg-amber-50 border-2 border-oskar-dark space-y-3">
              <h3 className="text-sm font-black text-oskar-dark flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-oskar-red" />
                  Peta Lokasi Dusun Krekah Utara
                </span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-oskar-red hover:underline flex items-center gap-1"
                >
                  <span>Buka Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </h3>
              <div className="p-4 bg-white rounded-xl border-2 border-oskar-dark text-center space-y-2">
                <p className="text-xs font-medium text-slate-600">
                  Dusun Krekah, Kelurahan Gilangharjo, Kapanewon Pandak, Kabupaten Bantul, D.I. Yogyakarta
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-primary text-xs py-2 px-4 inline-flex items-center gap-2"
                >
                  <span>Lihat di Google Maps App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* SEND MESSAGE FORM (RIGHT SIDE - EQUAL ALIGNED HEIGHT) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="neo-card p-6 sm:p-8 bg-white border-2 border-oskar-dark space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <h2 className="text-xl font-black text-oskar-dark border-b-2 border-slate-100 pb-3">
                  Kirim Pesan ke Pengurus OSKAR
                </h2>

                {sent ? (
                  <div className="p-8 bg-emerald-50 border-2 border-oskar-dark rounded-xl text-center space-y-3 my-auto">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h3 className="text-lg font-black text-oskar-dark">Pesan Anda Terkirim!</h3>
                    <p className="text-xs font-medium text-slate-600">
                      Terima kasih telah menghubungi Organisasi Pemuda Pemudi Krekah Utara. Pengurus kami akan segera merespons.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="neo-btn neo-btn-white text-xs py-2 px-4 mt-2"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-oskar-dark uppercase">Nama Anda</label>
                      <input
                        type="text"
                        required
                        placeholder="Masukkan nama lengkap Anda..."
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="neo-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-oskar-dark uppercase">
                        Email / Nomor WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 083843418369 atau email@domain.com"
                        value={formState.contact}
                        onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                        className="neo-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-oskar-dark uppercase">Isi Pesan</label>
                      <textarea
                        required
                        rows={7}
                        placeholder="Tuliskan pesan, pertanyaan, usulan kegiatan, atau tawaran kerjasama di sini..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="neo-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="neo-btn neo-btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Kirim Pesan Sekarang</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
