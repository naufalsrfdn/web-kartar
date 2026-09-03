"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import { FinancialTransaction } from "@/lib/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Wallet, Plus, Trash2, TrendingUp, TrendingDown, ArrowDownCircle, ArrowUpCircle, X } from "lucide-react";
import { formatDate, formatRupiah } from "@/lib/utils";

export default function AdminKeuanganPage() {
  const { transactions, addTransaction, deleteTransaction } = useOskar();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<FinancialTransaction | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: 100000,
    type: "INCOME" as FinancialTransaction["type"],
    category: "Iuran Anggota",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || formData.amount <= 0) {
      alert("Harap isi keterangan dan nominal valid!");
      return;
    }

    addTransaction({
      title: formData.title,
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
      note: formData.note,
    });

    setIsOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <h1 className="text-2xl font-black text-oskar-dark">Kelola Keuangan Kas OSKAR</h1>
            <p className="text-xs font-medium text-slate-600">
              Catat transaksi pemasukan & pengeluaran kas. Saldo publik otomatis diperbarui.
            </p>
          </div>

          <button
            onClick={() => {
              setFormData({
                title: "",
                amount: 100000,
                type: "INCOME",
                category: "Iuran Anggota",
                date: new Date().toISOString().split("T")[0],
                note: "",
              });
              setIsOpen(true);
            }}
            className="neo-btn neo-btn-primary text-xs py-2.5 px-4 flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Transaksi Kas</span>
          </button>
        </div>

        {/* FINANCIAL STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="neo-card p-5 bg-oskar-dark text-white border-2 border-oskar-dark space-y-2">
            <span className="text-xs font-bold text-oskar-yellow">TOTAL SALDO AKHIR</span>
            <div className="text-2xl font-black">{formatRupiah(currentBalance)}</div>
          </div>

          <div className="neo-card p-5 bg-emerald-50 border-2 border-oskar-dark space-y-2">
            <span className="text-xs font-bold text-emerald-800">TOTAL PEMASUKAN</span>
            <div className="text-2xl font-black text-emerald-900">{formatRupiah(totalIncome)}</div>
          </div>

          <div className="neo-card p-5 bg-rose-50 border-2 border-oskar-dark space-y-2">
            <span className="text-xs font-bold text-rose-800">TOTAL PENGELUARAN</span>
            <div className="text-2xl font-black text-rose-950">{formatRupiah(totalExpense)}</div>
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
          <h2 className="text-lg font-black text-oskar-dark">Riwayat Transaksi</h2>
          <div className="overflow-x-auto border-2 border-oskar-dark rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-amber-100 border-b-2 border-oskar-dark text-oskar-dark font-black">
                <tr>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5">Keterangan</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Jenis</th>
                  <th className="p-3.5 text-right">Nominal</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="p-3.5 text-slate-600 whitespace-nowrap">{formatDate(t.date)}</td>
                    <td className="p-3.5 font-bold text-oskar-dark">{t.title}</td>
                    <td className="p-3.5 text-slate-600">{t.category}</td>
                    <td className="p-3.5">
                      {t.type === "INCOME" ? (
                        <span className="neo-badge bg-emerald-100 text-emerald-950 border-emerald-900 text-[10px]">
                          PEMASUKAN
                        </span>
                      ) : (
                        <span className="neo-badge bg-rose-100 text-rose-950 border-rose-900 text-[10px]">
                          PENGELUARAN
                        </span>
                      )}
                    </td>
                    <td
                      className={`p-3.5 text-right font-black ${
                        t.type === "INCOME" ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {t.type === "INCOME" ? "+" : "-"} {formatRupiah(t.amount)}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setDeleteTarget(t)}
                        className="p-1.5 rounded-lg border border-oskar-dark bg-rose-100 hover:bg-rose-200 text-rose-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
            <div className="bg-white border-2 border-oskar-dark rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-neo-lg space-y-6 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl border-2 border-oskar-dark bg-slate-100 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black text-oskar-dark border-b-2 border-slate-100 pb-3">
                Catat Transaksi Kas Baru
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Keterangan Transaksi</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Iuran anggota bulan ini / Pembelian bola voli"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Jenis Transaksi</label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as FinancialTransaction["type"],
                        })
                      }
                      className="neo-input text-xs cursor-pointer"
                    >
                      <option value="INCOME">Pemasukan (+)</option>
                      <option value="EXPENSE">Pengeluaran (-)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Nominal (Rp)</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                      className="neo-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Kategori</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Iuran / Kegiatan / Perlengkapan"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="neo-input text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Tanggal</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="neo-input text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" className="neo-btn neo-btn-primary w-full py-2.5 text-xs">
                    Simpan Transaksi Kas
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={!!deleteTarget}
          title={`Hapus Transaksi: ${deleteTarget?.title}`}
          message={`Apakah Anda yakin ingin menghapus catatan transaksi "${deleteTarget?.title}" senilai ${formatRupiah(deleteTarget?.amount || 0)}?`}
          confirmText="Ya, Hapus"
          onConfirm={() => {
            if (deleteTarget) deleteTransaction(deleteTarget.id);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AdminLayout>
  );
}
