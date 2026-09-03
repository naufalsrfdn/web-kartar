"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOskar } from "@/lib/data-store";
import {
  Users,
  Calendar,
  Briefcase,
  Wallet,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  Sparkles,
  MapPin,
  UserPlus,
  MessageCircle,
} from "lucide-react";
import { formatDate, formatRupiah, createWhatsAppLink } from "@/lib/utils";

export default function HomePage() {
  const { members, events, news, programs, umkm, transactions, settings } = useOskar();

  const approvedMembers = members.filter((m) => m.isApproved);
  const totalMembers = approvedMembers.length;
  const totalEvents = events.length;
  const totalPrograms = programs.length;
  const totalUmkm = umkm.length;

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const currentBalance = totalIncome - totalExpense;

  const upcomingEvent = events[0];
  const recentEvents = events.slice(0, 3);
  const latestNews = news.slice(0, 2);
  const featuredUmkm = umkm.slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="flex-1 space-y-16 pb-12">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-[#F3EFEA] border-b-2 border-oskar-dark pt-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {settings.heroNotice && (
              <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-oskar-yellow border-2 border-oskar-dark rounded-xl shadow-neo-sm font-bold text-xs text-oskar-dark animate-pulse">
                <Sparkles className="w-4 h-4 text-oskar-dark shrink-0" />
                <span>{settings.heroNotice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-oskar-red text-white border-2 border-oskar-dark rounded-xl font-bold text-xs shadow-neo-sm uppercase">
                  <span>ORGANISASI PEMUDA PEMUDI KREKAH UTARA</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-oskar-dark leading-[1.1] tracking-tight">
                  Pemuda Krekah Utara <br />
                  <span className="text-oskar-red underline decoration-oskar-dark decoration-wavy decoration-2">
                    Bergerak & Berkarya
                  </span>
                </h1>

                <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed max-w-2xl">
                  Wadah resmi solidaritas, kreativitas, dan pengabdian Organisasi Pemuda Pemudi Krekah Utara. Bersama menciptakan lingkungan dusun yang maju, rukun, dan mandiri.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/kegiatan"
                    className="neo-btn neo-btn-primary text-sm sm:text-base py-3 px-6 flex items-center gap-2"
                  >
                    <span>Lihat Kegiatan</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/tentang"
                    className="neo-btn neo-btn-white text-sm sm:text-base py-3 px-6"
                  >
                    Tentang OSKAR
                  </Link>
                </div>
              </div>

              {/* Logo Emblem & Card Highlight */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-white border-2 border-oskar-dark rounded-3xl p-6 shadow-neo-lg flex flex-col items-center justify-center text-center space-y-4 hover:rotate-1 transition-transform">
                  <div className="relative w-40 h-40 rounded-full border-2 border-oskar-dark overflow-hidden bg-white p-2 shadow-neo-sm">
                    <Image
                      src="/logo.png"
                      alt="Logo OSKAR"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-oskar-dark">OSKAR</h3>
                    <p className="text-xs font-bold text-oskar-red">
                      Organisasi Pemuda Pemudi Krekah Utara
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ORGANIZATIONAL STATS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="neo-card p-5 bg-amber-50 border-2 border-oskar-dark flex items-center gap-4">
              <div className="p-3 bg-oskar-yellow border-2 border-oskar-dark rounded-xl shadow-neo-sm shrink-0">
                <Users className="w-6 h-6 text-oskar-dark" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-oskar-dark block">
                  {totalMembers}
                </span>
                <span className="text-xs font-bold text-slate-600">Anggota Aktif</span>
              </div>
            </div>

            <div className="neo-card p-5 bg-orange-50 border-2 border-oskar-dark flex items-center gap-4">
              <div className="p-3 bg-oskar-orange border-2 border-oskar-dark rounded-xl text-white shadow-neo-sm shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-oskar-dark block">
                  {totalEvents}
                </span>
                <span className="text-xs font-bold text-slate-600">Kegiatan Dusun</span>
              </div>
            </div>

            <div className="neo-card p-5 bg-rose-50 border-2 border-oskar-dark flex items-center gap-4">
              <div className="p-3 bg-oskar-red border-2 border-oskar-dark text-white rounded-xl shadow-neo-sm shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-oskar-dark block">
                  {totalPrograms}
                </span>
                <span className="text-xs font-bold text-slate-600">Program Kerja</span>
              </div>
            </div>

            <div className="neo-card p-5 bg-emerald-50 border-2 border-oskar-dark flex items-center gap-4">
              <div className="p-3 bg-emerald-400 border-2 border-oskar-dark text-oskar-dark rounded-xl shadow-neo-sm shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-oskar-dark block">
                  {totalUmkm}
                </span>
                <span className="text-xs font-bold text-slate-600">UMKM Dusun</span>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1 neo-card p-5 bg-sky-50 border-2 border-oskar-dark flex items-center gap-4">
              <div className="p-3 bg-sky-400 border-2 border-oskar-dark text-oskar-dark rounded-xl shadow-neo-sm shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-oskar-dark block">
                  {formatRupiah(currentBalance)}
                </span>
                <span className="text-xs font-bold text-slate-600">Kas Organisasi</span>
              </div>
            </div>
          </div>
        </section>

        {/* AGENDA UTAMA */}
        {upcomingEvent && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="neo-card p-6 sm:p-8 bg-oskar-dark text-white border-2 border-oskar-dark relative overflow-hidden space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-2">
                  <span className="neo-badge bg-oskar-red text-white border-white">
                    AGENDA KEGIATAN
                  </span>
                  <span className="text-xs font-bold text-oskar-yellow">
                    {upcomingEvent.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Calendar className="w-4 h-4 text-oskar-orange" />
                  <span>{formatDate(upcomingEvent.date)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {upcomingEvent.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">
                    {upcomingEvent.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-oskar-yellow">
                    <MapPin className="w-4 h-4 text-oskar-red" />
                    <span>Lokasi: {upcomingEvent.location}</span>
                  </div>
                </div>

                <div className="md:col-span-4 flex md:justify-end">
                  <Link
                    href="/kegiatan"
                    className="neo-btn neo-btn-secondary text-xs sm:text-sm py-3 px-5 flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <span>Detail & Dokumentasi</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* KEGIATAN TERBARU */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black text-oskar-red tracking-wider uppercase">
                DOKUMENTASI ACARA
              </span>
              <h2 className="text-3xl font-black text-oskar-dark mt-1">Kegiatan Terbaru</h2>
            </div>
            <Link
              href="/kegiatan"
              className="neo-btn neo-btn-white text-xs py-2 px-4 flex items-center gap-1.5"
            >
              <span>Semua Kegiatan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentEvents.map((item) => (
              <div key={item.id} className="neo-card neo-card-hover overflow-hidden flex flex-col">
                <div className="relative h-48 w-full bg-slate-200 border-b-2 border-oskar-dark">
                  <Image
                    src={item.previewPhotos[0] || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-500">
                      {formatDate(item.date)}
                    </div>
                    <h3 className="text-lg font-black text-oskar-dark line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-600 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <a
                    href={item.gdriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn neo-btn-dark text-xs py-2 w-full flex items-center justify-center gap-2"
                  >
                    <span>Dokumentasi Full (Google Drive)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-oskar-yellow" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HIGHLIGHT UMKM DUSUN */}
        <section className="bg-amber-100/60 border-y-2 border-oskar-dark py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-black text-oskar-red tracking-wider uppercase">
                  EKONOMI DUSUN
                </span>
                <h2 className="text-3xl font-black text-oskar-dark mt-1">
                  UMKM Pemuda & Warga Dusun
                </h2>
                <p className="text-sm font-medium text-slate-700 mt-1">
                  Dukung produk dan jasa warga Krekah Utara. Langsung hubungi via WhatsApp!
                </p>
              </div>
              <Link
                href="/umkm"
                className="neo-btn neo-btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <span>Lihat Semua UMKM ({umkm.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredUmkm.map((item) => {
                const waLink = createWhatsAppLink(
                  item.whatsapp,
                  `Halo ${item.owner}, saya tertarik dengan produk/jasa "${item.name}" dari direktori OSKAR.`
                );

                return (
                  <div key={item.id} className="neo-card neo-card-hover overflow-hidden flex flex-col bg-white">
                    <div className="relative h-44 w-full bg-slate-200 border-b-2 border-oskar-dark">
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
                        <h3 className="text-lg font-black text-oskar-dark">{item.name}</h3>
                        <p className="text-xs font-bold text-oskar-red">Pemilik: {item.owner}</p>
                        <p className="text-xs font-medium text-slate-600 line-clamp-2">
                          {item.description}
                        </p>
                        {item.priceRange && (
                          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 inline-block">
                            Est. Price: {item.priceRange}
                          </div>
                        )}
                      </div>

                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neo-btn bg-emerald-500 hover:bg-emerald-600 text-white text-xs py-2.5 w-full flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Pesan via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA JOIN MEMBERSHIP */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="neo-card p-8 sm:p-12 bg-oskar-red text-white border-2 border-oskar-dark relative overflow-hidden shadow-neo-lg text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-oskar-dark font-black text-xs rounded-lg border-2 border-oskar-dark shadow-neo-sm uppercase">
              <UserPlus className="w-4 h-4 text-oskar-red" />
              <span>PENDAFTARAN ANGGOTA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white max-w-2xl mx-auto leading-tight">
              Ingin Berkontribusi untuk Dusun Krekah Utara?
            </h2>

            <p className="text-sm sm:text-base font-medium text-amber-100 max-w-xl mx-auto">
              Mari bergabung menjadi bagian dari Organisasi Pemuda Pemudi Krekah Utara. Bersama kita buat program sosial, kebudayaan, dan olahraga yang bermanfaat!
            </p>

            <div className="pt-2">
              <Link
                href="/pendaftaran"
                className="neo-btn neo-btn-secondary text-sm sm:text-base py-3.5 px-8 inline-flex items-center gap-2"
              >
                <span>Daftar Sekarang (Online Form)</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
