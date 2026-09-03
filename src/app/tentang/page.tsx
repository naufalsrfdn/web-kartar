"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Compass, History, Shield, Users, Heart, ArrowRight } from "lucide-react";

export default function TentangPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 flex-1">
        {/* HEADER BANNER */}
        <section className="neo-card p-8 sm:p-12 bg-white border-2 border-oskar-dark space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-oskar-yellow text-oskar-dark font-bold text-xs rounded-xl border-2 border-oskar-dark shadow-neo-sm">
            <History className="w-4 h-4" />
            <span>PROFIL ORGANISASI</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-4xl font-black text-oskar-dark">
                Tentang OSKAR Krekah Utara
              </h1>
              <p className="text-base font-medium text-slate-700 leading-relaxed">
                OSKAR (Organisasi Pemuda Pemudi Krekah Utara) adalah wadah otonom kemasyarakatan yang menghimpun seluruh pemuda dan pemudi di lingkungan Dusun Krekah Utara. Diberdayakan sebagai pilar penggerak gotong royong, kebudayaan, sosial, dan wirausaha dusun.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-36 h-36 rounded-full border-2 border-oskar-dark bg-amber-50 p-2 shadow-neo overflow-hidden">
                <Image src="/logo.png" alt="Logo OSKAR" fill className="object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* VISI & MISI */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* VISI */}
          <div className="neo-card p-8 bg-oskar-dark text-white border-2 border-oskar-dark space-y-4 shadow-neo-lg">
            <div className="p-3 bg-oskar-red border-2 border-white rounded-xl shadow-neo-sm w-fit text-white">
              <Compass className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-oskar-yellow">Visi Organisasi</h2>
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              "Terwujudnya Pemuda Krekah Utara yang Solid, Beralak Mulia, Kreatif, Berbudaya, dan Mandiri secara Ekonomi untuk Memajukan Dusun."
            </p>
          </div>

          {/* MISI */}
          <div className="neo-card p-8 bg-white border-2 border-oskar-dark space-y-4 shadow-neo-lg">
            <div className="p-3 bg-oskar-orange border-2 border-oskar-dark rounded-xl shadow-neo-sm w-fit text-white">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-oskar-dark">Misi Organisasi</h2>
            <ul className="space-y-2.5 text-sm font-medium text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-oskar-red shrink-0 mt-1.5" />
                <span>Mempererat tali silaturahmi & kebersamaan antar pemuda di tiap RT.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-oskar-red shrink-0 mt-1.5" />
                <span>Mengembangkan potensi kegiatan olahraga, seni, dan kebudayaan dusun.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-oskar-red shrink-0 mt-1.5" />
                <span>Mendorong wirausaha muda dan pemberdayaan ekonomi lokal dusun.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-oskar-red shrink-0 mt-1.5" />
                <span>Menumbuhkan kepekaan sosial dan kepedulian lingkungan persawahan & pemukiman.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* TUJUAN ORGANISASI */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-oskar-red tracking-wider uppercase">
              PRINSIP KAMI
            </span>
            <h2 className="text-3xl font-black text-oskar-dark">Tujuan Utama OSKAR</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neo-card p-6 bg-amber-50 border-2 border-oskar-dark space-y-3">
              <div className="p-3 bg-oskar-yellow border-2 border-oskar-dark rounded-xl w-fit">
                <Users className="w-6 h-6 text-oskar-dark" />
              </div>
              <h3 className="text-lg font-black text-oskar-dark">Gotong Royong Dusun</h3>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                Menjadi garda terdepan dalam setiap kegiatan kemasyarakatan, hajatan warga, merti dusun, dan kerja bakti rutin.
              </p>
            </div>

            <div className="neo-card p-6 bg-rose-50 border-2 border-oskar-dark space-y-3">
              <div className="p-3 bg-oskar-red text-white border-2 border-oskar-dark rounded-xl w-fit">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-oskar-dark">Karakter Pemuda</h3>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                Membentuk jiwa kepemimpinan generasi muda yang bertanggung jawab, santun, jujur, dan berintegritas tinggi.
              </p>
            </div>

            <div className="neo-card p-6 bg-emerald-50 border-2 border-oskar-dark space-y-3">
              <div className="p-3 bg-emerald-400 text-oskar-dark border-2 border-oskar-dark rounded-xl w-fit">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-oskar-dark">Kemandirian Usaha</h3>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                Wadah pendampingan bagi usaha mikro warga dusun dan melatih jiwa kemandirian ekonomi pemuda.
              </p>
            </div>
          </div>
        </section>

        {/* CTA TO KEPENGURUSAN & PENDAFTARAN */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-white neo-card border-2 border-oskar-dark">
          <div>
            <h3 className="text-xl font-black text-oskar-dark">Ingin Mengenal Pengurus OSKAR?</h3>
            <p className="text-xs font-medium text-slate-600 mt-1">
              Lihat struktur organisasi lengkap dari Ketua hingga Ketua Divisi Dusun.
            </p>
          </div>
          <Link
            href="/pengurus"
            className="neo-btn neo-btn-primary text-xs py-3 px-6 flex items-center gap-2 shrink-0"
          >
            <span>Lihat Kepengurusan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
