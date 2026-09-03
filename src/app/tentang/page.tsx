"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, Target, Heart, ArrowRight } from "lucide-react";

export default function TentangPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 flex-1">
        {/* HERO TENTANG */}
        <div className="neo-card p-8 sm:p-12 bg-white border-2 border-oskar-dark space-y-6 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="neo-badge bg-oskar-yellow text-oskar-dark text-xs">
              PROFIL ORGANISASI
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-oskar-dark leading-tight">
              Organisasi Pemuda Pemudi Krekah Utara
            </h1>
            <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed">
              OSKAR adalah wadah pemuda-pemudi di Dusun Krekah Utara, Kelurahan Gilangharjo, Kapanewon Pandak, Kabupaten Bantul. Berdiri atas dasar gotong royong dan kepedulian sosial untuk memajukan potensi dusun.
            </p>
          </div>
        </div>

        {/* VISI & MISI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="neo-card p-8 bg-amber-50 border-2 border-oskar-dark space-y-4">
            <div className="p-3 bg-oskar-yellow border-2 border-oskar-dark rounded-xl shadow-neo-sm inline-block">
              <Target className="w-7 h-7 text-oskar-dark" />
            </div>
            <h2 className="text-2xl font-black text-oskar-dark">Visi OSKAR</h2>
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              "Terwujudnya generasi muda Krekah Utara yang bertaqwa, berkarakter, kreatif, mandiri, dan aktif berkontribusi dalam pembangunan dusun serta pelestarian budaya."
            </p>
          </div>

          <div className="neo-card p-8 bg-rose-50 border-2 border-oskar-dark space-y-4">
            <div className="p-3 bg-oskar-red text-white border-2 border-oskar-dark rounded-xl shadow-neo-sm inline-block">
              <Heart className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-oskar-dark">Misi OSKAR</h2>
            <ul className="text-sm font-medium text-slate-700 space-y-2.5 list-disc list-inside">
              <li>Mempererat tali silaturahmi dan kebersamaan antar pemuda di seluruh RT.</li>
              <li>Menyelenggarakan kegiatan keagamaan, olahraga, dan kesenian secara rutin.</li>
              <li>Dukung wirausaha muda & UMKM lokal dusun untuk kemandirian ekonomi.</li>
              <li>Menjadi garda terdepan gotong royong dan aksi sosial masyarakat.</li>
            </ul>
          </div>
        </div>

        {/* WILAYAH RT */}
        <div className="neo-card p-8 bg-white border-2 border-oskar-dark space-y-6">
          <h2 className="text-2xl font-black text-oskar-dark border-b-2 border-slate-100 pb-3">
            Cakupan Wilayah Kedusunan
          </h2>
          <p className="text-sm font-medium text-slate-700">
            Anggota OSKAR tersebar di 3 wilayah RT (RT 1, RT 2, RT 3) Dusun Krekah Utara. Setiap RT memiliki perwakilan pengurus yang siap mengkoordinasikan kegiatan dusun.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border-2 border-oskar-dark rounded-xl text-center">
              <h3 className="text-lg font-black text-oskar-dark">RT 1 Krekah Utara</h3>
              <p className="text-xs font-medium text-slate-500 mt-1">Wilayah Krekah Utara Bagian Barat</p>
            </div>
            <div className="p-4 bg-slate-50 border-2 border-oskar-dark rounded-xl text-center">
              <h3 className="text-lg font-black text-oskar-dark">RT 2 Krekah Utara</h3>
              <p className="text-xs font-medium text-slate-500 mt-1">Wilayah Krekah Utara Bagian Tengah</p>
            </div>
            <div className="p-4 bg-slate-50 border-2 border-oskar-dark rounded-xl text-center">
              <h3 className="text-lg font-black text-oskar-dark">RT 3 Krekah Utara</h3>
              <p className="text-xs font-medium text-slate-500 mt-1">Wilayah Krekah Utara Bagian Timur</p>
            </div>
          </div>
        </div>

        {/* CTA TO ANGGOTA PAGE */}
        <div className="neo-card p-8 bg-oskar-dark text-white border-2 border-oskar-dark flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Ingin Mengenal Anggota OSKAR?</h2>
            <p className="text-xs sm:text-sm font-medium text-slate-300">
              Lihat daftar resmi seluruh anggota Organisasi Pemuda Pemudi Krekah Utara.
            </p>
          </div>
          <Link
            href="/anggota"
            className="neo-btn neo-btn-secondary text-xs sm:text-sm py-3 px-6 flex items-center gap-2 shrink-0"
          >
            <span>Daftar Anggota OSKAR</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
