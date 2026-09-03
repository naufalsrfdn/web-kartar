"use client";

import React from "react";
import Image from "next/image";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import { UserCheck, Shield } from "lucide-react";

export default function AdminPengurusPage() {
  const { leadership } = useOskar();

  const sorted = [...leadership].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <h1 className="text-2xl font-black text-oskar-dark">Struktur Kepengurusan OSKAR</h1>
            <p className="text-xs font-medium text-slate-600">
              Daftar pengurus harian dan koordinator divisi dusun Krekah Utara.
            </p>
          </div>
        </div>

        <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
          <div className="overflow-x-auto border-2 border-oskar-dark rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-amber-100 border-b-2 border-oskar-dark text-oskar-dark font-black">
                <tr>
                  <th className="p-3.5">Urutan</th>
                  <th className="p-3.5">Foto</th>
                  <th className="p-3.5">Nama Pengurus</th>
                  <th className="p-3.5">Jabatan / Role</th>
                  <th className="p-3.5">Divisi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {sorted.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-black text-oskar-red">#{item.orderIndex}</td>
                    <td className="p-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-oskar-dark bg-slate-100">
                        <Image src={item.photoUrl} alt={item.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-oskar-dark">{item.name}</td>
                    <td className="p-3.5">
                      <span className="neo-badge bg-oskar-yellow text-oskar-dark text-[10px]">
                        {item.roleTitle}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">{item.division || "Pengurus Harian"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
