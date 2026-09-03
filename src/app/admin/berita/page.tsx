"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import { NewsItem } from "@/lib/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Plus, Edit2, Trash2, X, Upload, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { compressImage } from "@/lib/image-compress";

export default function AdminBeritaPage() {
  const { news, addNews, updateNews, deleteNews } = useOskar();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    thumbnail: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80",
    content: "",
    category: "Kegiatan",
  });

  const [uploading, setUploading] = useState(false);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const compressed = await compressImage(file, 800, 800, 0.75);
      setFormData({ ...formData, thumbnail: compressed });
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
      slug: "artikel-" + Date.now(),
      thumbnail: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80",
      content: "",
      category: "Kegiatan",
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      thumbnail: item.thumbnail,
      content: item.content,
      category: item.category,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert("Judul dan Isi artikel wajib diisi!");
      return;
    }

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const payload = {
      title: formData.title,
      slug,
      thumbnail: formData.thumbnail,
      content: formData.content,
      date: new Date().toISOString().split("T")[0],
      category: formData.category,
    };

    if (editingItem) {
      updateNews(editingItem.id, payload);
    } else {
      addNews(payload);
    }

    setIsOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <h1 className="text-2xl font-black text-oskar-dark">Kelola Berita & Artikel</h1>
            <p className="text-xs font-medium text-slate-600">
              Buat dan publikasikan berita kegiatan & pengumuman dusun.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="neo-btn neo-btn-primary text-xs py-2.5 px-4 flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </button>
        </div>

        <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
          <div className="overflow-x-auto border-2 border-oskar-dark rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-amber-100 border-b-2 border-oskar-dark text-oskar-dark font-black">
                <tr>
                  <th className="p-3.5">Thumbnail</th>
                  <th className="p-3.5">Judul Artikel</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {news.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-oskar-dark bg-slate-100">
                        <Image src={n.thumbnail} alt={n.title} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-oskar-dark">{n.title}</td>
                    <td className="p-3.5">
                      <span className="neo-badge bg-oskar-yellow text-oskar-dark text-[10px]">
                        {n.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 whitespace-nowrap">{formatDate(n.date)}</td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(n)}
                        className="p-1.5 rounded-lg border border-oskar-dark bg-amber-100 hover:bg-amber-200 text-oskar-dark"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(n)}
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
                {editingItem ? "Edit Artikel Berita" : "Tulis Artikel Baru"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Judul Artikel</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

                {/* FILE UPLOAD WITH AUTO COMPRESSION (revisi.pdf page 7) */}
                <div className="p-4 bg-amber-50 border-2 border-dashed border-oskar-dark rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-oskar-dark uppercase flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-oskar-red" />
                      <span>Upload Thumbnail Foto (Auto Kompres)</span>
                    </span>
                    {uploading && (
                      <span className="text-[11px] font-bold text-oskar-red animate-pulse">
                        Mekompres foto...
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-oskar-dark bg-white shrink-0">
                      <Image
                        src={formData.thumbnail}
                        alt="Thumbnail preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <label className="neo-btn neo-btn-secondary text-xs py-2 px-4 cursor-pointer flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      <span>Upload Gambar Thumbnail</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Isi Artikel</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="neo-btn neo-btn-primary w-full py-2.5 text-xs">
                    {editingItem ? "Simpan Perubahan" : "Terbitkan Artikel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={!!deleteTarget}
          title={`Hapus Artikel: ${deleteTarget?.title}`}
          message={`Apakah Anda yakin ingin menghapus artikel berita "${deleteTarget?.title}"?`}
          confirmText="Ya, Hapus"
          onConfirm={() => {
            if (deleteTarget) deleteNews(deleteTarget.id);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AdminLayout>
  );
}
