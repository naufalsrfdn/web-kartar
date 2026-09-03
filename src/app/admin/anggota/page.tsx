"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Member } from "@/lib/types";
import { Plus, Edit2, Trash2, Search, Filter, Upload, X, ShieldCheck } from "lucide-react";

export default function AdminAnggotaPage() {
  const { members, addMember, updateMember, deleteMember } = useOskar();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("ALL");
  const [filterRt, setFilterRt] = useState("ALL");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "Laki-laki" as "Laki-laki" | "Perempuan",
    pob: "",
    dob: "",
    whatsapp: "",
    rt: "RT 1" as "RT 1" | "RT 2" | "RT 3",
    roleCategory: "ANGGOTA", // KETUA, WAKIL, SEKRETARIS, BENDAHARA, ANGGOTA, LAINNYA
    customRoleTitle: "",
    photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Reactive filtering by Name search, Gender filter, and RT filter
  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = filterGender === "ALL" || (m.gender || "Laki-laki") === filterGender;
    const matchesRt = filterRt === "ALL" || m.rt === filterRt;
    return matchesSearch && matchesGender && matchesRt;
  });

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

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      fullName: "",
      gender: "Laki-laki",
      pob: "Bantul",
      dob: "2002-01-01",
      whatsapp: "083843418369",
      rt: "RT 1",
      roleCategory: "ANGGOTA",
      customRoleTitle: "",
      photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
    });
    setPhotoPreview("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80");
    setIsAddOpen(true);
  };

  const handleOpenEdit = (member: Member) => {
    setEditingMember(member);
    let category = "ANGGOTA";
    let custom = "";

    if (member.roleTitle) {
      const lower = member.roleTitle.toLowerCase();
      if (lower === "ketua" || lower === "ketua umun") category = "KETUA";
      else if (lower.includes("wakil")) category = "WAKIL";
      else if (lower.includes("sekretaris")) category = "SEKRETARIS";
      else if (lower.includes("bendahara")) category = "BENDAHARA";
      else {
        category = "LAINNYA";
        custom = member.roleTitle;
      }
    }

    setFormData({
      fullName: member.fullName,
      gender: member.gender || "Laki-laki",
      pob: member.pob,
      dob: member.dob,
      whatsapp: member.whatsapp,
      rt: member.rt as "RT 1" | "RT 2" | "RT 3",
      roleCategory: category,
      customRoleTitle: custom,
      photoUrl: member.photoUrl,
    });
    setPhotoPreview(member.photoUrl);
    setIsAddOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.whatsapp) {
      alert("Nama dan No WhatsApp wajib diisi!");
      return;
    }

    let finalRole = "";
    if (formData.roleCategory === "KETUA") finalRole = "Ketua";
    else if (formData.roleCategory === "WAKIL") finalRole = "Wakil Ketua";
    else if (formData.roleCategory === "SEKRETARIS") finalRole = "Sekretaris";
    else if (formData.roleCategory === "BENDAHARA") finalRole = "Bendahara";
    else if (formData.roleCategory === "LAINNYA") finalRole = formData.customRoleTitle;

    const payload = {
      fullName: formData.fullName,
      gender: formData.gender,
      pob: formData.pob,
      dob: formData.dob,
      whatsapp: formData.whatsapp,
      rt: formData.rt,
      roleTitle: finalRole,
      photoUrl: formData.photoUrl,
    };

    if (editingMember) {
      updateMember(editingMember.id, payload);
    } else {
      addMember({
        ...payload,
        isApproved: true,
      });
    }

    setIsAddOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <h1 className="text-2xl font-black text-oskar-dark">Kelola Data Anggota</h1>
            <p className="text-xs font-medium text-slate-600">
              Tambah, edit jabatan/BPH, ganti foto, serta filter data berdasarkan Gender dan RT.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="neo-btn neo-btn-primary text-xs py-2.5 px-4 flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Anggota Manual</span>
          </button>
        </div>

        {/* SEARCH & FILTER BAR (GENDER & RT) */}
        <div className="neo-card p-4 bg-white border-2 border-oskar-dark flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari anggota berdasarkan nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neo-input pl-11 text-xs sm:text-sm"
            />
          </div>

          {/* Filter Group */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Filter Gender */}
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-oskar-dark">
              <Filter className="w-4 h-4 text-oskar-dark" />
              <label className="text-xs font-black text-oskar-dark uppercase">Gender:</label>
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 cursor-pointer focus:outline-none"
              >
                <option value="ALL">Semua Gender</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Filter RT */}
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-oskar-dark">
              <Filter className="w-4 h-4 text-oskar-dark" />
              <label className="text-xs font-black text-oskar-dark uppercase">RT:</label>
              <select
                value={filterRt}
                onChange={(e) => setFilterRt(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 cursor-pointer focus:outline-none"
              >
                <option value="ALL">Semua RT</option>
                <option value="RT 1">RT 1</option>
                <option value="RT 2">RT 2</option>
                <option value="RT 3">RT 3</option>
              </select>
            </div>
          </div>
        </div>

        {/* MEMBERS TABLE */}
        <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span>Menampilkan {filteredMembers.length} dari total {members.length} anggota</span>
          </div>

          <div className="overflow-x-auto border-2 border-oskar-dark rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-amber-100 border-b-2 border-oskar-dark text-oskar-dark font-black">
                <tr>
                  <th className="p-3.5">Foto</th>
                  <th className="p-3.5">Nama Lengkap</th>
                  <th className="p-3.5">Gender</th>
                  <th className="p-3.5">RT</th>
                  <th className="p-3.5">WhatsApp</th>
                  <th className="p-3.5">Jabatan / Status</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-oskar-dark bg-slate-100">
                        <Image src={m.photoUrl} alt={m.fullName} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-oskar-dark">{m.fullName}</td>
                    <td className="p-3.5 text-slate-600">{m.gender || "Laki-laki"}</td>
                    <td className="p-3.5 font-bold text-oskar-red">{m.rt}</td>
                    <td className="p-3.5 text-slate-600">{m.whatsapp}</td>
                    <td className="p-3.5">
                      {m.roleTitle ? (
                        <span className="neo-badge bg-oskar-yellow text-oskar-dark text-[10px]">
                          {m.roleTitle}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">Anggota Aktif</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(m)}
                        className="p-1.5 rounded-lg border border-oskar-dark bg-amber-100 hover:bg-amber-200 text-oskar-dark"
                        title="Edit Data / Ganti Foto"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(m)}
                        className="p-1.5 rounded-lg border border-oskar-dark bg-rose-100 hover:bg-rose-200 text-rose-700"
                        title="Hapus Anggota"
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

        {/* ADD / EDIT MODAL */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
            <div className="bg-white border-2 border-oskar-dark rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-neo-lg space-y-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsAddOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl border-2 border-oskar-dark bg-slate-100 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black text-oskar-dark border-b-2 border-slate-100 pb-3">
                {editingMember ? `Edit Data: ${editingMember.fullName}` : "Tambah Anggota Baru"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-amber-50 border-2 border-dashed border-oskar-dark rounded-xl">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-oskar-dark bg-white shadow-neo-sm">
                    {photoPreview ? (
                      <Image src={photoPreview} alt="Preview Foto" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        No Photo
                      </div>
                    )}
                  </div>
                  <label className="neo-btn neo-btn-secondary text-xs py-1.5 px-3 cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{editingMember ? "Ganti Foto Anggota" : "Upload Foto Profil"}</span>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Jenis Kelamin</label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value as "Laki-laki" | "Perempuan" })
                      }
                      className="neo-input text-xs cursor-pointer"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">RT (1-3)</label>
                    <select
                      value={formData.rt}
                      onChange={(e) =>
                        setFormData({ ...formData, rt: e.target.value as "RT 1" | "RT 2" | "RT 3" })
                      }
                      className="neo-input text-xs cursor-pointer"
                    >
                      <option value="RT 1">RT 1</option>
                      <option value="RT 2">RT 2</option>
                      <option value="RT 3">RT 3</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Tempat Lahir</label>
                    <input
                      type="text"
                      required
                      value={formData.pob}
                      onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                      className="neo-input text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">Tanggal Lahir</label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="neo-input text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="neo-input text-xs"
                  />
                </div>

                {/* JABATAN BPH DROPDOWN */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-oskar-dark uppercase">Pilihan Jabatan</label>
                  <select
                    value={formData.roleCategory}
                    onChange={(e) => setFormData({ ...formData, roleCategory: e.target.value })}
                    className="neo-input text-xs cursor-pointer font-bold"
                  >
                    <option value="ANGGOTA">Anggota Biasa</option>
                    <option value="KETUA">Ketua (BPH Top)</option>
                    <option value="WAKIL">Wakil Ketua (BPH Top)</option>
                    <option value="SEKRETARIS">Sekretaris (BPH Top)</option>
                    <option value="BENDAHARA">Bendahara (BPH Top)</option>
                    <option value="LAINNYA">Jabatan Lain (Tulis Sendiri)</option>
                  </select>
                </div>

                {formData.roleCategory === "LAINNYA" && (
                  <div className="space-y-1">
                    <label className="text-xs font-black text-oskar-dark uppercase">
                      Tulis Jabatan Custom
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Sie Humas / Sie Olahraga"
                      value={formData.customRoleTitle}
                      onChange={(e) => setFormData({ ...formData, customRoleTitle: e.target.value })}
                      className="neo-input text-xs"
                    />
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="neo-btn neo-btn-primary w-full py-2.5 text-xs flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{editingMember ? "Simpan Perubahan" : "Tambah Anggota"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={!!deleteTarget}
          title={`Hapus Data Anggota: ${deleteTarget?.fullName}`}
          message={`Apakah Anda yakin ingin menghapus data anggota ${deleteTarget?.fullName}? Data yang sudah dihapus tidak dapat dikembalikan.`}
          confirmText="Ya, Hapus Data"
          onConfirm={() => {
            if (deleteTarget) deleteMember(deleteTarget.id);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AdminLayout>
  );
}
