"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import { EventItem } from "@/lib/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Plus, Edit2, Trash2, ExternalLink, X, Upload, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { compressImage } from "@/lib/image-compress";

export default function AdminKegiatanPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useOskar();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    location: "Lapangan Serbaguna Krekah Utara",
    description: "",
    category: "Seni & Budaya",
    previewPhotos: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
    ],
    gdriveUrl: "https://drive.google.com/drive/folders/oskar-krekah-2026",
  });

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < Math.min(files.length, 3); i++) {
        const compressed = await compressImage(files[i], 800, 800, 0.75);
        compressedList.push(compressed);
      }
      setFormData({ ...formData, previewPhotos: compressedList });
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
      location: "Lapangan Serbaguna Krekah Utara",
      description: "",
      category: "Seni & Budaya",
      previewPhotos: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
      ],
      gdriveUrl: "https://drive.google.com/drive/folders/oskar-krekah-2026",
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (item: EventItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      date: item.date,
      location: item.location,
      description: item.description,
      category: item.category,
      previewPhotos: item.previewPhotos,
      gdriveUrl: item.gdriveUrl,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.gdriveUrl) {
      alert("Judul dan Link Google Drive wajib diisi!");
      return;
    }

    const payload = {
      title: formData.title,
      date: formData.date,
      location: formData.location,
      description: formData.description,
      category: formData.category,
      previewPhotos: formData.previewPhotos,
      gdriveUrl: formData.gdriveUrl,
    };

    if (editingItem) {
      updateEvent(editingItem.id, payload);
    } else {
      addEvent(payload);
    }

    setIsOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <h1 className="text-2xl font-black text-oskar-dark">Kelola Kegiatan Dusun</h1>
            <p className="text-xs font-medium text-slate-600">
              Upload foto kegiatan (otomatis dikompres agar ringan) & sediakan link Google Drive.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="neo-btn neo-btn-primary text-xs py-2.5 px-4 flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kegiatan Baru</span>
          </button>
        </div>

        <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
          <div className="overflow-x-auto border-2 border-oskar-dark rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-amber-100 border-b-2 border-oskar-dark text-oskar-dark font-black">
                <tr>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5">Judul Kegiatan</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Google Drive Link</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="p-3.5 text-slate-600 whitespace-nowrap">{formatDate(e.date)}</td>
                    <td className="p-3.5 font-bold text-oskar-dark">{e.title}</td>
                    <td className="p-3.5">
                      <span className="neo-badge bg-oskar-yellow text-oskar-dark text-[10px]">
                        {e.category}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <a
                        href={e.gdriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-oskar-red font-bold underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        GDrive Folder
                      </a>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(e)}
                        className="p-1.5 rounded-lg border border-oskar-dark bg-amber-100 hover:bg-amber-200 text-oskar-dark"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(e)}
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

        {/* MODAL FORM */}
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
                {editingItem ? `Edit Kegiatan: ${editingItem.title}` : "Tambah Kegiatan Baru"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Judul Acara</label>
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
                    <label className="text-xs font-black text-oskar-dark uppercase">Tanggal Acara</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="neo-input text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Kategori</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="neo-input text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Lokasi Acara</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Deskripsi Kegiatan</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                {/* FILE UPLOAD WITH AUTO CANVAS COMPRESSION (revisi.pdf page 7) */}
                <div className="p-4 bg-amber-50 border-2 border-dashed border-oskar-dark rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-oskar-dark uppercase flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-oskar-red" />
                      <span>Upload Foto (Auto Kompres Lightweight)</span>
                    </span>
                    {uploading && (
                      <span className="text-[11px] font-bold text-oskar-red animate-pulse">
                        Mekompres foto...
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="neo-btn neo-btn-secondary text-xs py-2 px-4 cursor-pointer flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      <span>Pilih File Foto (Max 3)</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {formData.previewPhotos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {formData.previewPhotos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="relative h-16 rounded-lg overflow-hidden border border-oskar-dark bg-white"
                        >
                          <Image src={photo} alt={`Preview ${idx}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">
                    URL Google Drive Dokumentasi Full
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.gdriveUrl}
                    onChange={(e) => setFormData({ ...formData, gdriveUrl: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="neo-btn neo-btn-primary w-full py-2.5 text-xs">
                    {editingItem ? "Simpan Perubahan" : "Buat Kegiatan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={!!deleteTarget}
          title={`Hapus Kegiatan: ${deleteTarget?.title}`}
          message={`Apakah Anda yakin ingin menghapus kegiatan "${deleteTarget?.title}"?`}
          confirmText="Ya, Hapus"
          onConfirm={() => {
            if (deleteTarget) deleteEvent(deleteTarget.id);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AdminLayout>
  );
}
