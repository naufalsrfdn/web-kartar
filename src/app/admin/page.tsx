"use client";

import React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import {
  Users,
  UserPlus,
  Calendar,
  Wallet,
  ShoppingBag,
  AlertCircle,
  ArrowRight,
  Plus,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const {
    members,
    applications,
    events,
    umkm,
    transactions,
    settings,
    toggleRegistration,
  } = useOskar();

  const totalMembers = members.filter((m) => m.isApproved).length;
  const pendingApplications = applications.filter((a) => a.status === "PENDING");
  const upcomingEvents = events;

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* HEADER & TOGGLE */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-950 font-bold text-xs rounded-xl border-2 border-oskar-dark shadow-neo-sm mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>PANEL PENGURUS AKTIFF</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-oskar-dark">
              Dashboard Admin OSKAR
            </h1>
            <p className="text-xs font-medium text-slate-600">
              Ringkasan data keanggotaan, pendaftaran pending, kas, dan kegiatan dusun.
            </p>
          </div>

          {/* TOGGLE REGISTRATION BUTTON */}
          <div className="p-3 bg-amber-50 border-2 border-oskar-dark rounded-xl flex items-center gap-3">
            <div className="text-xs font-bold text-slate-700">
              <span>Status Pendaftaran: </span>
              <span
                className={settings.registrationOpen ? "text-emerald-700 font-black" : "text-rose-700 font-black"}
              >
                {settings.registrationOpen ? "DIBUKA" : "DITUTUP"}
              </span>
            </div>
            <button
              onClick={() => toggleRegistration(!settings.registrationOpen)}
              className={`neo-btn text-xs py-1.5 px-3 flex items-center gap-1.5 ${
                settings.registrationOpen
                  ? "bg-emerald-400 text-oskar-dark hover:bg-emerald-500"
                  : "bg-rose-500 text-white hover:bg-rose-600"
              }`}
            >
              {settings.registrationOpen ? (
                <>
                  <ToggleRight className="w-4 h-4" /> Tutup Form
                </>
              ) : (
                <>
                  <ToggleLeft className="w-4 h-4" /> Buka Form
                </>
              )}
            </button>
          </div>
        </div>

        {/* PENDING APPLICATIONS ALERT CARD */}
        {pendingApplications.length > 0 && (
          <div className="neo-card p-6 bg-rose-100 border-2 border-oskar-dark text-rose-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-neo">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500 text-white border-2 border-oskar-dark rounded-xl shadow-neo-sm shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black">
                  {pendingApplications.length} Pendaftaran Anggota Menunggu Approval!
                </h3>
                <p className="text-xs font-medium text-rose-900 mt-0.5">
                  Ada calon anggota baru yang sudah mengirim formulir. Harap lakukan verifikasi data.
                </p>
              </div>
            </div>
            <Link
              href="/admin/pendaftaran"
              className="neo-btn neo-btn-primary text-xs py-2.5 px-5 shrink-0 flex items-center gap-1.5"
            >
              <span>Review Pendaftaran</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="neo-card p-5 bg-amber-50 border-2 border-oskar-dark space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">ANGGOTA RESMI</span>
              <Users className="w-5 h-5 text-oskar-dark" />
            </div>
            <div className="text-3xl font-black text-oskar-dark">{totalMembers}</div>
            <Link href="/admin/anggota" className="text-xs font-bold text-oskar-red hover:underline block">
              Kelola data anggota →
            </Link>
          </div>

          <div className="neo-card p-5 bg-rose-50 border-2 border-oskar-dark space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">PENDING APPROVAL</span>
              <UserPlus className="w-5 h-5 text-oskar-red" />
            </div>
            <div className="text-3xl font-black text-oskar-dark">
              {pendingApplications.length}
            </div>
            <Link href="/admin/pendaftaran" className="text-xs font-bold text-oskar-red hover:underline block">
              Proses pendaftaran →
            </Link>
          </div>

          <div className="neo-card p-5 bg-emerald-50 border-2 border-oskar-dark space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">SALDO KAS SAAT INI</span>
              <Wallet className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-950">{formatRupiah(balance)}</div>
            <Link href="/admin/keuangan" className="text-xs font-bold text-emerald-700 hover:underline block">
              Catat transaksi →
            </Link>
          </div>

          <div className="neo-card p-5 bg-sky-50 border-2 border-oskar-dark space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">UMKM TERDAFTAR</span>
              <ShoppingBag className="w-5 h-5 text-sky-600" />
            </div>
            <div className="text-3xl font-black text-oskar-dark">{umkm.length}</div>
            <Link href="/admin/umkm" className="text-xs font-bold text-sky-700 hover:underline block">
              Tambah usaha warga →
            </Link>
          </div>
        </div>

        {/* QUICK ACTIONS & UPCOMING AGENDA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* QUICK ACTIONS */}
          <div className="lg:col-span-6 neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
            <h2 className="text-lg font-black text-oskar-dark border-b-2 border-slate-100 pb-3">
              Aksi Cepat Admin
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/pendaftaran"
                className="p-4 bg-amber-50 border-2 border-oskar-dark rounded-xl shadow-neo-sm hover:-translate-y-0.5 transition-all text-xs font-bold space-y-2 block"
              >
                <UserPlus className="w-5 h-5 text-oskar-red" />
                <span>Approve Pendaftaran ({pendingApplications.length})</span>
              </Link>

              <Link
                href="/admin/anggota"
                className="p-4 bg-emerald-50 border-2 border-oskar-dark rounded-xl shadow-neo-sm hover:-translate-y-0.5 transition-all text-xs font-bold space-y-2 block"
              >
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Kelola Data Anggota</span>
              </Link>

              <Link
                href="/admin/keuangan"
                className="p-4 bg-sky-50 border-2 border-oskar-dark rounded-xl shadow-neo-sm hover:-translate-y-0.5 transition-all text-xs font-bold space-y-2 block"
              >
                <Wallet className="w-5 h-5 text-sky-600" />
                <span>Tambah Transaksi Kas</span>
              </Link>

              <Link
                href="/admin/kegiatan"
                className="p-4 bg-rose-50 border-2 border-oskar-dark rounded-xl shadow-neo-sm hover:-translate-y-0.5 transition-all text-xs font-bold space-y-2 block"
              >
                <Calendar className="w-5 h-5 text-rose-600" />
                <span>Tambah Kegiatan Dusun</span>
              </Link>
            </div>
          </div>

          {/* UPCOMING AGENDA PREVIEW */}
          <div className="lg:col-span-6 neo-card p-6 bg-oskar-dark text-white border-2 border-oskar-dark space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-oskar-yellow">AGENDA MANDAT TERDEKAT</span>
                <Calendar className="w-5 h-5 text-oskar-red" />
              </div>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white">{upcomingEvents[0].title}</h3>
                  <p className="text-xs text-slate-300 font-medium">{upcomingEvents[0].description}</p>
                  <div className="text-xs font-bold text-oskar-yellow pt-1">
                    Tanggal: {formatDate(upcomingEvents[0].date)} | {upcomingEvents[0].location}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">Belum ada agenda mendatang terdaftar.</p>
              )}
            </div>

            <Link
              href="/admin/kegiatan"
              className="neo-btn neo-btn-secondary text-xs py-2.5 text-center mt-4"
            >
              Kelola Semua Kegiatan
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
