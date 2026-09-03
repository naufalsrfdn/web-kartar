"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOskar } from "@/lib/data-store";
import { MapPin, Phone, Instagram, Send, Mail, CheckCircle2, ExternalLink } from "lucide-react";
import { TikTokIcon } from "@/components/TikTokIcon";
import { createWhatsAppLink } from "@/lib/utils";

export default function KontakPage() {
  const { settings, showToast } = useOskar();
  const [formState, setFormState] = useState({ name: "", contact: "", message: "" });
  const [sent, setSent] = useState(false);

  // Dynamic values from Admin Settings!
  const address = settings.secretariatAddress || "Krekah, Gilangharjo, Pandak, Bantul, Yogyakarta";
  const waNumber = settings.whatsappNumber || "083843418369";
  const igHandle = settings.instagramHandle || "@oskar.krekahutara";
  const tiktokHandle = settings.tiktokHandle || "@krekahutara";
  const mapsUrl = settings.mapsEmbedUrl || "https://www.google.com/maps?q=artapage";

  const igClean = igHandle.replace("@", "");
  const tiktokClean = tiktokHandle.replace("@", "");

  const waLink = createWhatsAppLink(
    waNumber,
    "Halo Admin OSKAR Krekah Utara, saya ingin berkomunikasi seputar kegiatan organisasi."
  );

  // Dynamic Google Maps Iframe Embed URL for artapage
  const iframeEmbedSrc = `https://maps.google.com/maps?q=artapage&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast("Pesan Anda berhasil dikirim ke pengurus OSKAR!", "success");
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 flex-1">
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

        {/* MAIN CONTENT GRID - EQUAL ALIGNED HEIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT SIDE (CONTACT INFO + GOOGLE MAPS EMBED) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* INFORMASI KONTAKS CARD */}
            <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
              <h2 className="text-xl font-black text-oskar-dark border-b-2 border-slate-100 pb-3">
                Informasi Kontak Sekretariat
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                <div className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="p-2.5 bg-oskar-red text-white border border-oskar-dark rounded-lg shadow-neo-sm shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-oskar-dark">Alamat Sekretariat</h3>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="p-2.5 bg-emerald-400 text-oskar-dark border border-oskar-dark rounded-lg shadow-neo-sm shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-oskar-dark">WhatsApp Admin</h3>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-emerald-700 underline block mt-0.5"
                    >
                      {waNumber} (Chat Direct)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="p-2.5 bg-pink-400 text-oskar-dark border border-oskar-dark rounded-lg shadow-neo-sm shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-oskar-dark">Instagram Resmi</h3>
                    <a
                      href={`https://instagram.com/${igClean}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-pink-700 underline block mt-0.5"
                    >
                      {igHandle}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="p-2.5 bg-slate-900 text-white border border-oskar-dark rounded-lg shadow-neo-sm shrink-0 flex items-center justify-center">
                    <TikTokIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-oskar-dark">TikTok Resmi</h3>
                    <a
                      href={`https://tiktok.com/@${tiktokClean}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-slate-800 underline block mt-0.5"
                    >
                      {tiktokHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ARTAPAGE GOOGLE MAPS EMBED CARD */}
            <div className="neo-card p-5 bg-amber-50 border-2 border-oskar-dark space-y-3 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-oskar-dark flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-oskar-red" />
                  Peta Lokasi Artapage (OSKAR)
                </h3>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-oskar-red hover:underline flex items-center gap-1"
                >
                  <span>Buka Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border-2 border-oskar-dark bg-slate-200 shadow-neo-sm flex-1">
                <iframe
                  title="Google Maps Embed Artapage"
                  src={iframeEmbedSrc}
                  className="w-full h-full border-0 min-h-[260px]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="pt-1">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-primary text-xs py-2.5 px-4 w-full flex items-center justify-center gap-2"
                >
                  <span>Buka Google Maps Artapage (artapage)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (SEND MESSAGE FORM - PERFECT EQUAL ALIGNMENT) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="neo-card p-6 sm:p-8 bg-white border-2 border-oskar-dark flex-1 flex flex-col justify-between space-y-6">
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
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4 flex-1 flex flex-col">
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

                    <div className="space-y-1.5 flex-1 flex flex-col">
                      <label className="text-xs font-black text-oskar-dark uppercase">Isi Pesan</label>
                      <textarea
                        required
                        placeholder="Tuliskan pesan, pertanyaan, usulan kegiatan, atau tawaran kerjasama di sini..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="neo-input text-xs sm:text-sm flex-1 min-h-[180px] resize-none"
                      />
                    </div>
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
      </main>

      <Footer />
    </>
  );
}
