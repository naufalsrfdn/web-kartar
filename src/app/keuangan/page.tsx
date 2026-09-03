"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOskar } from "@/lib/data-store";
import { Wallet, TrendingUp, TrendingDown, ShieldCheck, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { formatDate, formatRupiah } from "@/lib/utils";

export default function KeuanganPage() {
  const { transactions } = useOskar();
  const [typeFilter, setTypeFilter] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  const filteredTransactions = transactions.filter(
    (t) => typeFilter === "ALL" || t.type === typeFilter
  );

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 flex-1">
        {/* HEADER */}
        <div className="neo-card p-8 bg-white border-2 border-oskar-dark space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-950 font-bold text-xs rounded-xl border-2 border-oskar-dark shadow-neo-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>TRANSPARANSI KAS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-oskar-dark">
            Laporan Keuangan OSKAR
          </h1>
          <p className="text-sm font-medium text-slate-600">
            Transparansi arus kas pemasukan dan pengeluaran kas organisasi pemuda.
          </p>
        </div>

        {/* FINANCIAL SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SALDO AKHIR */}
          <div className="neo-card p-6 bg-oskar-dark text-white border-2 border-oskar-dark space-y-3 shadow-neo-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-oskar-yellow">TOTAL SALDO KAS</span>
              <div className="p-2 bg-oskar-yellow text-oskar-dark rounded-lg border-2 border-white">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-white">{formatRupiah(currentBalance)}</h2>
            <p className="text-[11px] font-medium text-slate-400">
              Update real-time dari pencatatan pengurus bendahara.
            </p>
          </div>

          {/* TOTAL PEMASUKAN */}
          <div className="neo-card p-6 bg-emerald-50 border-2 border-oskar-dark space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800">TOTAL PEMASUKAN</span>
              <div className="p-2 bg-emerald-400 text-oskar-dark rounded-lg border-2 border-oskar-dark">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-emerald-900">{formatRupiah(totalIncome)}</h2>
            <p className="text-[11px] font-medium text-emerald-700">
              Iuran rutin anggota, donasi warga, & sponsorship.
            </p>
          </div>

          {/* TOTAL PENGELUARAN */}
          <div className="neo-card p-6 bg-rose-50 border-2 border-oskar-dark space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800">TOTAL PENGELUARAN</span>
              <div className="p-2 bg-rose-500 text-white rounded-lg border-2 border-oskar-dark">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-rose-950">{formatRupiah(totalExpense)}</h2>
            <p className="text-[11px] font-medium text-rose-700">
              Perlengkapan kegiatan, konsumsi acara, & sarana dusun.
            </p>
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-black text-oskar-dark">Riwayat Transaksi Kas</h2>

            {/* FILTER BUTTONS */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTypeFilter("ALL")}
                className={`neo-badge cursor-pointer ${
                  typeFilter === "ALL"
                    ? "bg-oskar-dark text-white"
                    : "bg-slate-100 text-oskar-dark hover:bg-slate-200"
                }`}
              >
                Semua Transaksi
              </button>
              <button
                onClick={() => setTypeFilter("INCOME")}
                className={`neo-badge cursor-pointer ${
                  typeFilter === "INCOME"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-oskar-dark hover:bg-slate-200"
                }`}
              >
                Pemasukan
              </button>
              <button
                onClick={() => setTypeFilter("EXPENSE")}
                className={`neo-badge cursor-pointer ${
                  typeFilter === "EXPENSE"
                    ? "bg-rose-500 text-white"
                    : "bg-slate-100 text-oskar-dark hover:bg-slate-200"
                }`}
              >
                Pengeluaran
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border-2 border-oskar-dark rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-amber-100 border-b-2 border-oskar-dark text-oskar-dark font-black">
                <tr>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5">Keterangan / Transaksi</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Jenis</th>
                  <th className="p-3.5 text-right">Jumlah (Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredTransactions.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3.5 text-slate-600 whitespace-nowrap">
                      {formatDate(item.date)}
                    </td>
                    <td className="p-3.5 font-bold text-oskar-dark">{item.title}</td>
                    <td className="p-3.5 text-slate-600">{item.category}</td>
                    <td className="p-3.5">
                      {item.type === "INCOME" ? (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                          <ArrowDownCircle className="w-4 h-4" /> Masuk
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-rose-600">
                          <ArrowUpCircle className="w-4 h-4" /> Keluar
                        </span>
                      )}
                    </td>
                    <td
                      className={`p-3.5 text-right font-black ${
                        item.type === "INCOME" ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {item.type === "INCOME" ? "+" : "-"} {formatRupiah(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
