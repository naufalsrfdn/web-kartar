"use client";

import React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import {
  Users,
  UserPlus,
  ShoppingBag,
  Calendar,
  Newspaper,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    members,
    applications,
    events,
    news,
    umkm,
    messages,
    approveApplication,
  } = useOskar();

  const totalMembers = members.filter((m) => m.isApproved).length;
  const pendingApplications = applications.filter((a) => a.status === "PENDING");
  const unreadMessages = messages.filter((m) => !m.isRead);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <span className="neo-badge bg-oskar-yellow text-oskar-dark mb-1">PANEL CONTROL</span>
            <h1 className="text-2xl font-black text-oskar-dark">Dashboard Admin OSKAR</h1>
            <p className="text-xs font-medium text-slate-600">
              Kelola data anggota, verifikasi pendaftaran, baca pesan masuk, dan publikasikan kegiatan dusun.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/pendaftaran"
              className="neo-btn neo-btn-primary text-xs py-2.5 px-4 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Verifikasi Pendaftaran ({pendingApplications.length})</span>
            </Link>
          </div>
        </div>

        {/* METRIC CARDS (5 CLEAN METRICS INCLUDING UNREAD MESSAGES) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          <div className="neo-card p-5 bg-amber-50 border-2 border-oskar-dark flex items-center justify-between">
            <div>
              <span className="text-2xl font-black text-oskar-dark block">{totalMembers}</span>
              <span className="text-xs font-bold text-slate-600">Anggota Aktif</span>
            </div>
            <div className="p-3 bg-oskar-yellow border-2 border-oskar-dark rounded-xl shadow-neo-sm">
              <Users className="w-5 h-5 text-oskar-dark" />
            </div>
          </div>

          <div className="neo-card p-5 bg-rose-50 border-2 border-oskar-dark flex items-center justify-between">
            <div>
              <span className="text-2xl font-black text-oskar-red block">
                {pendingApplications.length}
              </span>
              <span className="text-xs font-bold text-slate-600">Pendaftaran Pending</span>
            </div>
            <div className="p-3 bg-oskar-red border-2 border-oskar-dark text-white rounded-xl shadow-neo-sm">
              <UserPlus className="w-5 h-5" />
            </div>
          </div>

          <div className="neo-card p-5 bg-sky-50 border-2 border-oskar-dark flex items-center justify-between">
            <div>
              <span className="text-2xl font-black text-sky-900 block">
                {unreadMessages.length}
              </span>
              <span className="text-xs font-bold text-slate-600">Pesan Baru</span>
            </div>
            <div className="p-3 bg-sky-400 border-2 border-oskar-dark text-oskar-dark rounded-xl shadow-neo-sm">
              <Mail className="w-5 h-5" />
            </div>
          </div>

          <div className="neo-card p-5 bg-orange-50 border-2 border-oskar-dark flex items-center justify-between">
            <div>
              <span className="text-2xl font-black text-oskar-dark block">{events.length}</span>
              <span className="text-xs font-bold text-slate-600">Kegiatan Dusun</span>
            </div>
            <div className="p-3 bg-oskar-orange border-2 border-oskar-dark text-white rounded-xl shadow-neo-sm">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 neo-card p-5 bg-emerald-50 border-2 border-oskar-dark flex items-center justify-between">
            <div>
              <span className="text-2xl font-black text-oskar-dark block">{umkm.length}</span>
              <span className="text-xs font-bold text-slate-600">Katalog UMKM</span>
            </div>
            <div className="p-3 bg-emerald-400 border-2 border-oskar-dark text-oskar-dark rounded-xl shadow-neo-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* PENDING APPLICATIONS TABLE */}
        <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
          <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
            <h2 className="text-lg font-black text-oskar-dark flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-oskar-red" />
              <span>Antrean Pendaftaran Anggota Baru</span>
            </h2>
            <Link
              href="/admin/pendaftaran"
              className="text-xs font-bold text-oskar-red hover:underline flex items-center gap-1"
            >
              <span>Kelola Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {pendingApplications.length > 0 ? (
            <div className="overflow-x-auto border-2 border-oskar-dark rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-amber-100 border-b-2 border-oskar-dark text-oskar-dark font-black">
                  <tr>
                    <th className="p-3">Nama Lengkap</th>
                    <th className="p-3">Gender</th>
                    <th className="p-3">RT</th>
                    <th className="p-3">WhatsApp</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {pendingApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-oskar-dark">{app.fullName}</td>
                      <td className="p-3 text-slate-600">{app.gender}</td>
                      <td className="p-3 font-bold text-oskar-red">{app.rt}</td>
                      <td className="p-3 text-slate-600">{app.whatsapp}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => approveApplication(app.id)}
                          className="neo-btn bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] py-1.5 px-3 inline-flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-1">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-xs font-bold text-slate-700">Tidak ada antrean pendaftaran baru.</p>
            </div>
          )}
        </div>

        {/* QUICK MANAGEMENT LINKS (INCLUDING PESAN MASUK) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link
            href="/admin/pesan"
            className="neo-card neo-card-hover p-6 bg-white border-2 border-oskar-dark space-y-3"
          >
            <div className="p-3 bg-sky-400 border-2 border-oskar-dark rounded-xl w-fit">
              <Mail className="w-6 h-6 text-oskar-dark" />
            </div>
            <h3 className="text-lg font-black text-oskar-dark">Pesan Masuk ({messages.length})</h3>
            <p className="text-xs font-medium text-slate-600">
              Baca dan balas pesan/pertanyaan publik dari halaman Kontak.
            </p>
          </Link>

          <Link
            href="/admin/kegiatan"
            className="neo-card neo-card-hover p-6 bg-white border-2 border-oskar-dark space-y-3"
          >
            <div className="p-3 bg-oskar-yellow border-2 border-oskar-dark rounded-xl w-fit">
              <Calendar className="w-6 h-6 text-oskar-dark" />
            </div>
            <h3 className="text-lg font-black text-oskar-dark">Kelola Kegiatan & Foto</h3>
            <p className="text-xs font-medium text-slate-600">
              Tambah dokumentasi acara baru & kompresi foto otomatis.
            </p>
          </Link>

          <Link
            href="/admin/umkm"
            className="neo-card neo-card-hover p-6 bg-white border-2 border-oskar-dark space-y-3"
          >
            <div className="p-3 bg-emerald-400 border-2 border-oskar-dark rounded-xl w-fit">
              <ShoppingBag className="w-6 h-6 text-oskar-dark" />
            </div>
            <h3 className="text-lg font-black text-oskar-dark">Katalog UMKM Dusun</h3>
            <p className="text-xs font-medium text-slate-600">
              Daftarkan usaha baru milik warga & pemuda dusun.
            </p>
          </Link>

          <Link
            href="/admin/berita"
            className="neo-card neo-card-hover p-6 bg-white border-2 border-oskar-dark space-y-3"
          >
            <div className="p-3 bg-oskar-red border-2 border-oskar-dark text-white rounded-xl w-fit">
              <Newspaper className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-oskar-dark">Artikel & Pengumuman</h3>
            <p className="text-xs font-medium text-slate-600">
              Tulis berita terkini seputar dusun Krekah Utara.
            </p>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
