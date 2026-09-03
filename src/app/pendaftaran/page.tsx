"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOskar } from "@/lib/data-store";
import { UserPlus, Upload, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";

export default function PendaftaranPage() {
  const { settings, addApplication } = useOskar();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "Laki-laki" as "Laki-laki" | "Perempuan",
    pob: "",
    dob: "",
    whatsapp: "",
    rt: "RT 1" as "RT 1" | "RT 2" | "RT 3",
    photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"
  );
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData({ ...formData, photoUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.whatsapp || !formData.pob || !formData.dob) {
      alert("Harap isi seluruh field wajib!");
      return;
    }

    addApplication({
      fullName: formData.fullName,
      gender: formData.gender,
      pob: formData.pob,
      dob: formData.dob,
      whatsapp: formData.whatsapp,
      rt: formData.rt,
      photoUrl: formData.photoUrl,
    });

    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 flex-1">
        {/* HEADER */}
        <div className="neo-card p-8 bg-white border-2 border-oskar-dark space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-oskar-yellow text-oskar-dark font-bold text-xs rounded-xl border-2 border-oskar-dark shadow-neo-sm uppercase">
            <UserPlus className="w-4 h-4" />
            <span>FORMULIR ONLINE</span>
          </div>
          <h1 className="text-3xl font-black text-oskar-dark">Pendaftaran Anggota OSKAR</h1>
          <p className="text-sm font-medium text-slate-600">
            Mari bergabung menjadi bagian Organisasi Pemuda Pemudi Krekah Utara.
          </p>
        </div>

        {/* REGISTRATION CLOSED BANNER */}
        {!settings.registrationOpen && (
          <div className="neo-card p-6 bg-rose-100 border-2 border-oskar-dark text-rose-950 flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" />
            <div>
              <h3 className="text-lg font-black">Pendaftaran Anggota Sedang Ditutup</h3>
              <p className="text-xs font-medium mt-0.5">
                Pengurus OSKAR sedang membatasi pendaftaran anggota baru saat ini. Silakan hubungi Admin jika ada pertanyaan.
              </p>
            </div>
          </div>
        )}

        {/* SUBMITTED SUCCESS STATE */}
        {submitted ? (
          <div className="neo-card p-8 sm:p-12 bg-emerald-50 border-2 border-oskar-dark text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-400 border-2 border-oskar-dark rounded-2xl flex items-center justify-center mx-auto shadow-neo text-oskar-dark">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-oskar-dark">Form Pendaftaran Terkirim!</h2>
              <p className="text-sm font-medium text-slate-700 max-w-md mx-auto">
                Terima kasih <strong>{formData.fullName}</strong>. Data pendaftaran Anda masuk ke dalam antrean status <strong className="text-oskar-red">"Pending"</strong> dan akan diverifikasi oleh Admin OSKAR.
              </p>
            </div>

            <div className="p-4 bg-white border-2 border-oskar-dark rounded-xl text-left text-xs space-y-1 max-w-md mx-auto">
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-500 font-bold">Nama Lengkap:</span>
                <span className="font-black text-oskar-dark">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-slate-500 font-bold">Jenis Kelamin:</span>
                <span className="font-black text-oskar-dark">{formData.gender}</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-slate-500 font-bold">RT:</span>
                <span className="font-black text-oskar-dark">{formData.rt}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-bold">WhatsApp:</span>
                <span className="font-black text-oskar-dark">{formData.whatsapp}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setSubmitted(false)}
                className="neo-btn neo-btn-white text-xs py-2.5 px-5"
              >
                Kirim Pendaftaran Lain
              </button>
              <Link
                href="/anggota"
                className="neo-btn neo-btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5"
              >
                <span>Lihat Daftar Anggota</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* FORM BODY */
          <form
            onSubmit={handleSubmit}
            className={`neo-card p-6 sm:p-10 bg-white border-2 border-oskar-dark space-y-6 ${
              !settings.registrationOpen ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {/* PHOTO UPLOAD PREVIEW */}
            <div className="flex flex-col items-center justify-center space-y-3 p-6 bg-amber-50 border-2 border-dashed border-oskar-dark rounded-2xl">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-oskar-dark bg-white shadow-neo-sm">
                {photoPreview ? (
                  <Image src={photoPreview} alt="Preview Foto" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    No Photo
                  </div>
                )}
              </div>
              <div className="text-center">
                <label className="neo-btn neo-btn-secondary text-xs py-2 px-4 cursor-pointer inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Pilih Foto Profil (Bebas / Bebas Rapi)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-500 font-medium mt-1">
                  Foto tidak harus menggunakan seragam. Yang penting wajah terlihat jelas.
                </p>
              </div>
            </div>

            {/* FORM INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-oskar-dark uppercase">
                  Nama Lengkap <span className="text-oskar-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ahmad Bagus Prasetyo"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="neo-input text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-oskar-dark uppercase">
                  Jenis Kelamin <span className="text-oskar-red">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value as "Laki-laki" | "Perempuan" })
                  }
                  className="neo-input text-xs sm:text-sm cursor-pointer"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-oskar-dark uppercase">
                  Tempat Lahir <span className="text-oskar-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bantul / Sleman"
                  value={formData.pob}
                  onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                  className="neo-input text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-oskar-dark uppercase">
                  Tanggal Lahir <span className="text-oskar-red">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="neo-input text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-oskar-dark uppercase">
                  Nomor WhatsApp <span className="text-oskar-red">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 083843418369"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="neo-input text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-oskar-dark uppercase">
                  Wilayah RT Dusun Krekah Utara <span className="text-oskar-red">*</span>
                </label>
                <select
                  value={formData.rt}
                  onChange={(e) =>
                    setFormData({ ...formData, rt: e.target.value as "RT 1" | "RT 2" | "RT 3" })
                  }
                  className="neo-input text-xs sm:text-sm cursor-pointer"
                >
                  <option value="RT 1">RT 1</option>
                  <option value="RT 2">RT 2</option>
                  <option value="RT 3">RT 3</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                type="submit"
                disabled={!settings.registrationOpen}
                className="neo-btn neo-btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Kirim Pendaftaran Anggota</span>
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </>
  );
}
