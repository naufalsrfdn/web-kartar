"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import { UmkmItem } from "@/lib/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import { ShoppingBag, Plus, Edit2, Trash2, MessageCircle, X } from "lucide-react";
import { createWhatsAppLink } from "@/lib/utils";

export default function AdminUmkmPage() {
  const { umkm, addUmkm, updateUmkm, deleteUmkm } = useOskar();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UmkmItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UmkmItem | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    whatsapp: "",
    category: "Kuliner" as UmkmItem["category"],
    description: "",
    priceRange: "",
    location: "Krekah Utara",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80",
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      owner: "",
      whatsapp: "081234567890",
      category: "Kuliner",
      description: "",
      priceRange: "Rp 10.000 - Rp 50.000",
      location: "Krekah Utara",
      imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80",
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (item: UmkmItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      owner: item.owner,
      whatsapp: item.whatsapp,
      category: item.category,
      description: item.description,
      priceRange: item.priceRange || "",
      location: item.location || "Krekah Utara",
      imageUrl: item.imageUrl,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.owner || !formData.whatsapp) {
      alert("Harap isi nama usaha, pemilik, dan WhatsApp!");
      return;
    }

    if (editingItem) {
      updateUmkm(editingItem.id, formData);
    } else {
      addUmkm(formData);
    }

    setIsOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <h1 className="text-2xl font-black text-oskar-dark">Kelola Katalog UMKM Dusun</h1>
            <p className="text-xs font-medium text-slate-600">
              Tambah produk/jasa warga dusun dan hubungkan langsung tombol WhatsApp order.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="neo-btn neo-btn-primary text-xs py-2.5 px-4 flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Usaha Baru</span>
          </button>
        </div>

        {/* UMKM LIST TABLE */}
        <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
          <div className="overflow-x-auto border-2 border-oskar-dark rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-amber-100 border-b-2 border-oskar-dark text-oskar-dark font-black">
                <tr>
                  <th className="p-3.5">Gambar</th>
                  <th className="p-3.5">Nama Usaha</th>
                  <th className="p-3.5">Pemilik</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">WhatsApp</th>
                  <th className="p-3.5">Est. Price</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {umkm.map((item) => {
                  const waLink = createWhatsAppLink(item.whatsapp, `Halo ${item.owner}`);

                  return (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-oskar-dark bg-slate-100">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="p-3.5 font-bold text-oskar-dark">{item.name}</td>
                      <td className="p-3.5 text-oskar-red font-bold">{item.owner}</td>
                      <td className="p-3.5">
                        <span className="neo-badge bg-oskar-yellow text-oskar-dark text-[10px]">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 underline font-bold flex items-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          {item.whatsapp}
                        </a>
                      </td>
                      <td className="p-3.5 text-slate-600">{item.priceRange || "-"}</td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg border border-oskar-dark bg-amber-100 hover:bg-amber-200 text-oskar-dark"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 rounded-lg border border-oskar-dark bg-rose-100 hover:bg-rose-200 text-rose-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
                {editingItem ? `Edit UMKM: ${editingItem.name}` : "Tambah UMKM Dusun"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Nama Usaha</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Nama Pemilik</label>
                    <input
                      type="text"
                      required
                      value={formData.owner}
                      onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                      className="neo-input text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">No WhatsApp Pemilik</label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="neo-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Kategori</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as UmkmItem["category"] })
                      }
                      className="neo-input text-xs cursor-pointer"
                    >
                      <option value="Kuliner">Kuliner</option>
                      <option value="Jasa">Jasa</option>
                      <option value="Kerajinan">Kerajinan</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Pertanian">Pertanian</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Estimasi Harga</label>
                    <input
                      type="text"
                      placeholder="Contoh: Rp 10.000 - Rp 50.000"
                      value={formData.priceRange}
                      onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                      className="neo-input text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Deskripsi Produk/Jasa</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">URL Foto Usaha</label>
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="neo-btn neo-btn-primary w-full py-2.5 text-xs"
                  >
                    {editingItem ? "Simpan Perubahan" : "Tambah UMKM"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={!!deleteTarget}
          title={`Hapus UMKM: ${deleteTarget?.name}`}
          message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.name}" dari katalog UMKM dusun?`}
          confirmText="Ya, Hapus"
          onConfirm={() => {
            if (deleteTarget) deleteUmkm(deleteTarget.id);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AdminLayout>
  );
}
