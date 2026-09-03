"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOskar } from "@/lib/data-store";
import { Search, Filter, Users, UserPlus } from "lucide-react";

export default function AnggotaPage() {
  const { members } = useOskar();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRt, setSelectedRt] = useState("ALL");

  const approvedMembers = members.filter((m) => m.isApproved);

  // Sorting function: BPH members (Ketua, Wakil, Sekretaris, Bendahara) first!
  const isBph = (roleTitle?: string) => {
    if (!roleTitle) return false;
    const lower = roleTitle.toLowerCase();
    return (
      lower.includes("ketua") ||
      lower.includes("wakil") ||
      lower.includes("sekretaris") ||
      lower.includes("bendahara")
    );
  };

  const sortedMembers = [...approvedMembers].sort((a, b) => {
    const aBph = isBph(a.roleTitle);
    const bBph = isBph(b.roleTitle);
    if (aBph && !bBph) return -1;
    if (!aBph && bBph) return 1;
    return a.fullName.localeCompare(b.fullName);
  });

  const filteredMembers = sortedMembers.filter((member) => {
    const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRt = selectedRt === "ALL" || member.rt === selectedRt;
    return matchesSearch && matchesRt;
  });

  const rtList = ["RT 1", "RT 2", "RT 3"];

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 flex-1">
        {/* HEADER */}
        <div className="neo-card p-8 bg-white border-2 border-oskar-dark space-y-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-oskar-dark">Daftar Anggota OSKAR</h1>
            <p className="text-xs sm:text-sm font-medium text-slate-600">
              Total {approvedMembers.length} anggota Organisasi Pemuda Pemudi Krekah Utara.
            </p>
          </div>

          <Link
            href="/pendaftaran"
            className="neo-btn neo-btn-primary text-xs py-3 px-5 flex items-center gap-2 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Pendaftaran Anggota Baru</span>
          </Link>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="neo-card p-4 bg-amber-50 border-2 border-oskar-dark flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama anggota..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neo-input pl-11 text-xs sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-5 h-5 text-oskar-dark shrink-0" />
            <select
              value={selectedRt}
              onChange={(e) => setSelectedRt(e.target.value)}
              className="neo-input text-xs sm:text-sm cursor-pointer py-2.5 px-3"
            >
              <option value="ALL">Semua RT</option>
              {rtList.map((rt) => (
                <option key={rt} value={rt}>
                  {rt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* MEMBERS GRID (RT BADGE REMOVED ON CARDS - ONLY NAME & JABATAN SHOWN) */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className={`neo-card neo-card-hover p-4 text-center space-y-3 flex flex-col justify-between ${
                  isBph(member.roleTitle) ? "bg-amber-50 border-oskar-dark shadow-neo" : "bg-white"
                }`}
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-2xl overflow-hidden border-2 border-oskar-dark shadow-neo-sm bg-slate-100">
                  <Image
                    src={member.photoUrl}
                    alt={member.fullName}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-black text-oskar-dark line-clamp-1">
                    {member.fullName}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-1 pt-1">
                    {member.roleTitle ? (
                      <span className="neo-badge bg-oskar-yellow text-oskar-dark text-[10px]">
                        {member.roleTitle}
                      </span>
                    ) : (
                      <span className="neo-badge bg-slate-100 text-slate-700 text-[10px]">
                        Anggota
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="neo-card p-12 bg-white border-2 border-oskar-dark text-center space-y-4">
            <Users className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-black text-oskar-dark">Anggota Tidak Ditemukan</h3>
            <p className="text-xs font-medium text-slate-500">
              Tidak ada anggota yang cocok dengan kata kunci pencarian atau filter RT Anda.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
