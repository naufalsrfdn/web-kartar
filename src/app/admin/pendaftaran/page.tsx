"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import { MemberApplication } from "@/lib/types";
import { CheckCircle2, XCircle, UserPlus, Calendar, Phone, MapPin } from "lucide-react";
import { formatDate, createWhatsAppLink } from "@/lib/utils";

export default function AdminPendaftaranPage() {
  const { applications, approveApplication, rejectApplication } = useOskar();
  const [rejectModalTarget, setRejectModalTarget] = useState<MemberApplication | null>(null);
  const [rejectNote, setRejectNote] = useState("");

  const pendingApps = applications.filter((a) => a.status === "PENDING");
  const processedApps = applications.filter((a) => a.status !== "PENDING");

  const handleConfirmReject = () => {
    if (rejectModalTarget) {
      rejectApplication(rejectModalTarget.id, rejectNote);
      setRejectModalTarget(null);
      setRejectNote("");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-950 font-bold text-xs rounded-xl border-2 border-oskar-dark shadow-neo-sm mb-2">
              <UserPlus className="w-4 h-4 text-rose-600" />
              <span>ANTREAN PENDAFTARAN ANGGOTA</span>
            </div>
            <h1 className="text-2xl font-black text-oskar-dark">Approval Pendaftaran Pending</h1>
            <p className="text-xs font-medium text-slate-600">
              Verifikasi pendaftaran calon anggota baru sebelum masuk ke direktori anggota resmi.
            </p>
          </div>

          <div className="neo-badge bg-oskar-yellow text-oskar-dark text-xs py-2 px-4 border-2 border-oskar-dark">
            <span>{pendingApps.length} Pendaftaran Pending</span>
          </div>
        </div>

        {/* PENDING APPLICATIONS GRID */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-oskar-dark">Pendaftaran Menunggu Persetujuan</h2>

          {pendingApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingApps.map((item) => {
                const waLink = createWhatsAppLink(
                  item.whatsapp,
                  `Halo ${item.fullName}, kami dari Admin OSKAR Krekah Utara ingin mengonfirmasi pendaftaran anggota Anda.`
                );

                return (
                  <div
                    key={item.id}
                    className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 border-oskar-dark bg-slate-100 shadow-neo-sm">
                          <Image
                            src={item.photoUrl}
                            alt={item.fullName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-black text-oskar-dark">{item.fullName}</h3>
                          <p className="text-xs font-bold text-oskar-red">
                            Gender: {item.gender}
                          </p>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <span className="neo-badge bg-amber-100 text-oskar-dark">
                              {item.rt}
                            </span>
                            <span>Tgl Daftar: {formatDate(item.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-xl border border-oskar-dark text-xs space-y-1.5 font-medium">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Tempat, Tgl Lahir:</span>
                          <span className="font-bold text-oskar-dark">
                            {item.pob}, {formatDate(item.dob)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">WhatsApp:</span>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-emerald-700 underline flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {item.whatsapp}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => approveApplication(item.id)}
                        className="neo-btn bg-emerald-500 hover:bg-emerald-600 text-white text-xs py-2.5 flex-1 flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve / Setujui</span>
                      </button>
                      <button
                        onClick={() => setRejectModalTarget(item)}
                        className="neo-btn bg-rose-600 hover:bg-rose-700 text-white text-xs py-2.5 flex-1 flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject / Tolak</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="neo-card p-12 bg-white border-2 border-oskar-dark text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-black text-oskar-dark">Semua Antrean Bersih!</h3>
              <p className="text-xs font-medium text-slate-500">
                Tidak ada pendaftaran anggota pending yang menunggu verifikasi saat ini.
              </p>
            </div>
          )}
        </div>

        {/* PROCESSED APPLICATIONS HISTORY */}
        {processedApps.length > 0 && (
          <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
            <h2 className="text-lg font-black text-oskar-dark border-b-2 border-slate-100 pb-3">
              Riwayat Pendaftaran (Approved / Rejected)
            </h2>
            <div className="overflow-x-auto border-2 border-oskar-dark rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-amber-100 border-b-2 border-oskar-dark text-oskar-dark font-black">
                  <tr>
                    <th className="p-3">Nama</th>
                    <th className="p-3">RT</th>
                    <th className="p-3">WhatsApp</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Catatan Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {processedApps.map((a) => (
                    <tr key={a.id}>
                      <td className="p-3 font-bold text-oskar-dark">{a.fullName}</td>
                      <td className="p-3">{a.rt}</td>
                      <td className="p-3">{a.whatsapp}</td>
                      <td className="p-3">
                        {a.status === "APPROVED" ? (
                          <span className="neo-badge bg-emerald-100 text-emerald-950 border-emerald-900">
                            APPROVED
                          </span>
                        ) : (
                          <span className="neo-badge bg-rose-100 text-rose-950 border-rose-900">
                            REJECTED
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-500">{a.note || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REJECT REASON MODAL */}
        {rejectModalTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white border-2 border-oskar-dark rounded-2xl p-6 max-w-md w-full shadow-neo-lg space-y-4">
              <h3 className="text-lg font-black text-oskar-dark">
                Tolak Pendaftaran: {rejectModalTarget.fullName}
              </h3>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Alasan Penolakan (Opsional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Bukan warga dusun Krekah Utara / data tidak valid..."
                  value={rejectNote}
                  onChange={(e) => setRejectNote(e.target.value)}
                  className="neo-input text-xs"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setRejectModalTarget(null)}
                  className="neo-btn neo-btn-white text-xs py-2 px-4"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmReject}
                  className="neo-btn bg-rose-600 text-white text-xs py-2 px-4"
                >
                  Konfirmasi Tolak
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
