"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import { ProgramItem } from "@/lib/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Briefcase, Plus, Edit2, Trash2, X } from "lucide-react";

export default function AdminProgramKerjaPage() {
  const { programs, addProgram, updateProgram, deleteProgram } = useOskar();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProgramItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProgramItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Sosial" as ProgramItem["category"],
    year: 2026,
    target: "",
    status: "PLANNED" as ProgramItem["status"],
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      category: "Sosial",
      year: 2026,
      target: "",
      status: "PLANNED",
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (item: ProgramItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      year: item.year,
      target: item.target,
      status: item.status,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.target) {
      alert("Judul dan Target program wajib diisi!");
      return;
    }

    if (editingItem) {
      updateProgram(editingItem.id, formData);
    } else {
      addProgram(formData);
    }

    setIsOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <h1 className="text-2xl font-black text-oskar-dark">Kelola Program Kerja</h1>
            <p className="text-xs font-medium text-slate-600">
              Atur daftar program kerja per bidang dan update progres statusnya.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="neo-btn neo-btn-primary text-xs py-2.5 px-4 flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Program Kerja</span>
          </button>
        </div>

        <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
          <div className="overflow-x-auto border-2 border-oskar-dark rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-amber-100 border-b-2 border-oskar-dark text-oskar-dark font-black">
                <tr>
                  <th className="p-3.5">Judul Program</th>
                  <th className="p-3.5">Bidang</th>
                  <th className="p-3.5">Tahun</th>
                  <th className="p-3.5">Target Capaian</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {programs.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-oskar-dark">{p.title}</td>
                    <td className="p-3.5">
                      <span className="neo-badge bg-oskar-yellow text-oskar-dark text-[10px]">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-oskar-red">{p.year}</td>
                    <td className="p-3.5 text-slate-600">{p.target}</td>
                    <td className="p-3.5">
                      {p.status === "ONGOING" ? (
                        <span className="neo-badge bg-emerald-300 text-oskar-dark text-[10px]">
                          ONGOING
                        </span>
                      ) : p.status === "COMPLETED" ? (
                        <span className="neo-badge bg-slate-200 text-slate-700 text-[10px]">
                          COMPLETED
                        </span>
                      ) : (
                        <span className="neo-badge bg-sky-100 text-sky-900 text-[10px]">
                          PLANNED
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg border border-oskar-dark bg-amber-100 hover:bg-amber-200 text-oskar-dark"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
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
            <div className="bg-white border-2 border-oskar-dark rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-neo-lg space-y-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl border-2 border-oskar-dark bg-slate-100 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black text-oskar-dark border-b-2 border-slate-100 pb-3">
                {editingItem ? `Edit Program: ${editingItem.title}` : "Tambah Program Kerja"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Judul Program</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Bidang</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as ProgramItem["category"] })
                      }
                      className="neo-input text-xs cursor-pointer"
                    >
                      <option value="Sosial">Sosial</option>
                      <option value="Olahraga">Olahraga</option>
                      <option value="Keagamaan">Keagamaan</option>
                      <option value="Kepemudaan">Kepemudaan</option>
                      <option value="Lingkungan">Lingkungan</option>
                      <option value="Kewirausahaan">Kewirausahaan</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Tahun</label>
                    <input
                      type="number"
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2026 })}
                      className="neo-input text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Target Capaian</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Terlaksana setiap Jumat..."
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Deskripsi Program</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Status Progres</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as ProgramItem["status"] })
                    }
                    className="neo-input text-xs cursor-pointer"
                  >
                    <option value="PLANNED">Rencana (PLANNED)</option>
                    <option value="ONGOING">Sedang Berjalan (ONGOING)</option>
                    <option value="COMPLETED">Selesai (COMPLETED)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button type="submit" className="neo-btn neo-btn-primary w-full py-2.5 text-xs">
                    {editingItem ? "Simpan Perubahan" : "Tambah Program"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={!!deleteTarget}
          title={`Hapus Program: ${deleteTarget?.title}`}
          message={`Apakah Anda yakin ingin menghapus program kerja "${deleteTarget?.title}"?`}
          confirmText="Ya, Hapus"
          onConfirm={() => {
            if (deleteTarget) deleteProgram(deleteTarget.id);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AdminLayout>
  );
}
