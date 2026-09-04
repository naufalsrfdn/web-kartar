"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useOskar } from "@/lib/data-store";
import { ContactMessage } from "@/lib/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Mail, Trash2, MessageCircle, CheckCircle, MailOpen, Clock, Search, Filter } from "lucide-react";
import { formatDate, createWhatsAppLink } from "@/lib/utils";

export default function AdminPesanPage() {
  const { messages, markMessageRead, deleteMessage } = useOskar();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL"); // ALL, UNREAD, READ
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "ALL" ||
      (filterStatus === "UNREAD" && !msg.isRead) ||
      (filterStatus === "READ" && msg.isRead);

    return matchesSearch && matchesStatus;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const handleOpenDetail = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      markMessageRead(msg.id, true);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 neo-card p-6 bg-white border-2 border-oskar-dark">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-oskar-dark">Pesan Masuk Sekretariat</h1>
              {unreadCount > 0 && (
                <span className="neo-badge bg-oskar-red text-white text-xs">
                  {unreadCount} Pesan Baru
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-slate-600 mt-1">
              Daftar pesan dan usulan yang dikirim pengunjung melalui halaman Kontak Web Publik.
            </p>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="neo-card p-4 bg-white border-2 border-oskar-dark flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, kontak, atau isi pesan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neo-input pl-11 text-xs sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-oskar-dark shrink-0" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="neo-input text-xs cursor-pointer py-2.5 px-3 font-bold"
            >
              <option value="ALL">Semua Pesan ({messages.length})</option>
              <option value="UNREAD">Belum Dibaca ({unreadCount})</option>
              <option value="READ">Sudah Dibaca ({messages.length - unreadCount})</option>
            </select>
          </div>
        </div>

        {/* MESSAGES LIST / TABLE */}
        <div className="neo-card p-6 bg-white border-2 border-oskar-dark space-y-4">
          {filteredMessages.length > 0 ? (
            <div className="overflow-x-auto border-2 border-oskar-dark rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-amber-100 border-b-2 border-oskar-dark text-oskar-dark font-black">
                  <tr>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Pengirim</th>
                    <th className="p-3.5">Kontak</th>
                    <th className="p-3.5">Pratinjau Pesan</th>
                    <th className="p-3.5">Tanggal</th>
                    <th className="p-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {filteredMessages.map((msg) => (
                    <tr
                      key={msg.id}
                      className={`hover:bg-slate-50 cursor-pointer ${
                        !msg.isRead ? "bg-amber-50/70 font-bold" : ""
                      }`}
                      onClick={() => handleOpenDetail(msg)}
                    >
                      <td className="p-3.5">
                        {!msg.isRead ? (
                          <span className="neo-badge bg-oskar-red text-white text-[10px] flex items-center gap-1 w-fit">
                            <Mail className="w-3 h-3" />
                            <span>BARU</span>
                          </span>
                        ) : (
                          <span className="neo-badge bg-slate-100 text-slate-600 text-[10px] flex items-center gap-1 w-fit">
                            <MailOpen className="w-3 h-3" />
                            <span>DIBACA</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-black text-oskar-dark">{msg.name}</td>
                      <td className="p-3.5 text-slate-700">{msg.contact}</td>
                      <td className="p-3.5 max-w-xs truncate text-slate-600">{msg.message}</td>
                      <td className="p-3.5 text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-oskar-orange" />
                          <span>{formatDate(msg.createdAt)}</span>
                        </div>
                      </td>
                      <td
                        className="p-3.5 text-right space-x-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleOpenDetail(msg)}
                          className="neo-btn neo-btn-white text-[11px] py-1 px-2.5"
                        >
                          Baca
                        </button>
                        <button
                          onClick={() => setDeleteTarget(msg)}
                          className="p-1.5 rounded-lg border border-oskar-dark bg-rose-100 hover:bg-rose-200 text-rose-700 inline-block align-middle"
                          title="Hapus Pesan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center space-y-3">
              <Mail className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-black text-oskar-dark">Belum Ada Pesan Masuk</h3>
              <p className="text-xs font-medium text-slate-500">
                Pesan dari pengunjung web publik pada halaman Kontak akan ditampilkan di sini.
              </p>
            </div>
          )}
        </div>

        {/* DETAIL MESSAGE MODAL */}
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white border-2 border-oskar-dark rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-neo-lg space-y-6 relative">
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-oskar-red" />
                  <h2 className="text-xl font-black text-oskar-dark">Detail Pesan Masuk</h2>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {formatDate(selectedMessage.createdAt)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-amber-50 border-2 border-oskar-dark rounded-xl space-y-1">
                  <div className="text-xs font-black text-oskar-dark uppercase">Pengirim:</div>
                  <div className="text-sm font-bold text-oskar-dark">{selectedMessage.name}</div>
                  <div className="text-xs text-slate-600">Kontak: {selectedMessage.contact}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-black text-oskar-dark uppercase">Isi Pesan:</div>
                  <div className="p-4 bg-slate-50 border-2 border-oskar-dark rounded-xl text-xs font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {/* DIRECT REPLY VIA WHATSAPP BUTTON */}
                <a
                  href={createWhatsAppLink(
                    selectedMessage.contact,
                    `Halo ${selectedMessage.name}, kami pengurus OSKAR Krekah Utara merespons pesan Anda: "${selectedMessage.message.slice(0, 50)}..."`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn bg-emerald-500 hover:bg-emerald-600 text-white text-xs py-2 px-4 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Balas via WhatsApp</span>
                </a>

                <button
                  onClick={() => setSelectedMessage(null)}
                  className="neo-btn neo-btn-dark text-xs py-2 px-4"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={!!deleteTarget}
          title={`Hapus Pesan dari: ${deleteTarget?.name}`}
          message="Apakah Anda yakin ingin menghapus pesan ini dari database?"
          confirmText="Ya, Hapus Pesan"
          onConfirm={() => {
            if (deleteTarget) deleteMessage(deleteTarget.id);
            setDeleteTarget(null);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AdminLayout>
  );
}
