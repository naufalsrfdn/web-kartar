"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import { ToggleLeft, ToggleRight, Save, KeyRound, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminPengaturanPage() {
  const { settings, toggleRegistration, updateSettings, changeAdminPassword } = useOskar();

  const [formData, setFormData] = useState({
    secretariatAddress: settings.secretariatAddress,
    whatsappNumber: settings.whatsappNumber,
    instagramHandle: settings.instagramHandle,
    tiktokHandle: settings.tiktokHandle,
    mapsEmbedUrl: settings.mapsEmbedUrl,
    heroNotice: settings.heroNotice || "",
  });

  // Change password form state
  const [passState, setPassState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmitSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passState.newPassword !== passState.confirmPassword) {
      alert("Konfirmasi password baru tidak cocok!");
      return;
    }

    const ok = changeAdminPassword(passState.currentPassword, passState.newPassword);
    if (ok) {
      setPassState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <h1 className="text-2xl font-black text-oskar-dark">Pengaturan Sistem OSKAR</h1>
            <p className="text-xs font-medium text-slate-600">
              Kontrol pendaftaran online, informasi kontak sekretariat, dan ubah password admin.
            </p>
          </div>
        </div>

        {/* REGISTRATION SYSTEM TOGGLE CARD */}
        <div className="neo-card p-6 bg-amber-50 border-2 border-oskar-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-neo">
          <div>
            <span className="neo-badge bg-oskar-yellow text-oskar-dark mb-2">
              SISTEM PENDAFTARAN ONLINE
            </span>
            <h2 className="text-xl font-black text-oskar-dark">
              Status Pendaftaran Anggota Baru:{" "}
              <span className={settings.registrationOpen ? "text-emerald-700" : "text-rose-700"}>
                {settings.registrationOpen ? "DIBUKA" : "DITUTUP"}
              </span>
            </h2>
            <p className="text-xs font-medium text-slate-600 mt-1">
              Ketika ditutup, formulir pendaftaran pada halaman <code>/pendaftaran</code> akan dinonaktifkan.
            </p>
          </div>

          <button
            onClick={() => toggleRegistration(!settings.registrationOpen)}
            className={`neo-btn text-xs py-3 px-6 flex items-center gap-2 shrink-0 ${
              settings.registrationOpen
                ? "bg-emerald-400 text-oskar-dark hover:bg-emerald-500"
                : "bg-rose-500 text-white hover:bg-rose-600"
            }`}
          >
            {settings.registrationOpen ? (
              <>
                <ToggleRight className="w-5 h-5" />
                <span>Tutup Pendaftaran</span>
              </>
            ) : (
              <>
                <ToggleLeft className="w-5 h-5" />
                <span>Buka Pendaftaran</span>
              </>
            )}
          </button>
        </div>

        {/* CHANGE PASSWORD ADMIN FORM */}
        <div className="neo-card p-6 sm:p-8 bg-white border-2 border-oskar-dark space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3">
            <div className="p-2.5 bg-oskar-red text-white rounded-xl border-2 border-oskar-dark shadow-neo-sm">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-oskar-dark">Ubah Password Admin</h2>
              <p className="text-xs font-medium text-slate-500">
                Ganti kata sandi akses Dashboard Admin secara dinamis.
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-oskar-dark uppercase">
                Password Lama / Saat Ini
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  required
                  placeholder="Masukkan password saat ini (default: artapagedev)"
                  value={passState.currentPassword}
                  onChange={(e) => setPassState({ ...passState, currentPassword: e.target.value })}
                  className="neo-input text-xs pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-oskar-dark"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-oskar-dark uppercase">
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    required
                    minLength={4}
                    placeholder="Masukkan password baru..."
                    value={passState.newPassword}
                    onChange={(e) => setPassState({ ...passState, newPassword: e.target.value })}
                    className="neo-input text-xs pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-oskar-dark"
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-oskar-dark uppercase">
                  Konfirmasi Password Baru
                </label>
                <input
                  type={showNew ? "text" : "password"}
                  required
                  minLength={4}
                  placeholder="Ulangi password baru..."
                  value={passState.confirmPassword}
                  onChange={(e) => setPassState({ ...passState, confirmPassword: e.target.value })}
                  className="neo-input text-xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="neo-btn neo-btn-primary py-2.5 px-5 text-xs flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Update Password Admin</span>
              </button>
            </div>
          </form>
        </div>

        {/* SETTINGS FORM */}
        <div className="neo-card p-6 sm:p-8 bg-white border-2 border-oskar-dark space-y-6">
          <h2 className="text-lg font-black text-oskar-dark border-b-2 border-slate-100 pb-3">
            Informasi Sekretariat & Pengumuman
          </h2>

          <form onSubmit={handleSubmitSettings} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-black text-oskar-dark uppercase">
                Pengumuman Banner Hero (Public Web)
              </label>
              <input
                type="text"
                value={formData.heroNotice}
                onChange={(e) => setFormData({ ...formData, heroNotice: e.target.value })}
                className="neo-input text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-oskar-dark uppercase">
                Alamat Lengkap Sekretariat
              </label>
              <textarea
                rows={2}
                required
                value={formData.secretariatAddress}
                onChange={(e) => setFormData({ ...formData, secretariatAddress: e.target.value })}
                className="neo-input text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-oskar-dark uppercase">
                  Nomor WhatsApp Admin
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="neo-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-oskar-dark uppercase">
                  Handle Instagram OSKAR
                </label>
                <input
                  type="text"
                  required
                  value={formData.instagramHandle}
                  onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                  className="neo-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-oskar-dark uppercase">
                  Handle TikTok OSKAR
                </label>
                <input
                  type="text"
                  required
                  value={formData.tiktokHandle}
                  onChange={(e) => setFormData({ ...formData, tiktokHandle: e.target.value })}
                  className="neo-input text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-oskar-dark uppercase">
                Google Maps Embed / App URL
              </label>
              <input
                type="url"
                required
                value={formData.mapsEmbedUrl}
                onChange={(e) => setFormData({ ...formData, mapsEmbedUrl: e.target.value })}
                className="neo-input text-xs"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="neo-btn neo-btn-primary py-3 px-6 text-xs flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan Sekretariat</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
