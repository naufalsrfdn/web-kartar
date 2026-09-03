"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Instagram, ShieldCheck } from "lucide-react";
import { TikTokIcon } from "@/components/TikTokIcon";
import { createWhatsAppLink } from "@/lib/utils";
import { useOskar } from "@/lib/data-store";

export const Footer: React.FC = () => {
  const { settings } = useOskar();

  const waNumber = settings.whatsappNumber || "083843418369";
  const address = settings.secretariatAddress || "Krekah, Gilangharjo, Pandak, Bantul, Yogyakarta";
  const igHandle = settings.instagramHandle || "@oskar.krekahutara";
  const tiktokHandle = settings.tiktokHandle || "@krekahutara";

  // Format IG & TikTok URL
  const igClean = igHandle.replace("@", "");
  const tiktokClean = tiktokHandle.replace("@", "");

  const waLink = createWhatsAppLink(
    waNumber,
    "Halo Admin OSKAR Krekah Utara, saya ingin bertanya seputar kegiatan organisasi."
  );

  return (
    <footer className="bg-oskar-dark text-white border-t-2 border-oskar-dark pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center p-0.5">
                <Image src="/logo.png" alt="OSKAR Logo" fill className="object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-wider text-white leading-none">
                  OSKAR
                </h2>
                <p className="text-xs font-bold text-oskar-yellow mt-1">
                  Organisasi Pemuda Pemudi Krekah Utara
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Wadah kreativitas, kebersamaan, dan pengabdian Organisasi Pemuda Pemudi Krekah Utara untuk memajukan masyarakat dan lingkungan dusun.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-black text-oskar-yellow border-b-2 border-slate-700 pb-2 inline-block">
              Navigasi Utama
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-oskar-orange transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-oskar-orange transition-colors">Tentang</Link>
              </li>
              <li>
                <Link href="/anggota" className="hover:text-oskar-orange transition-colors">Anggota</Link>
              </li>
              <li>
                <Link href="/umkm" className="hover:text-oskar-orange text-oskar-yellow font-bold transition-colors">UMKM Dusun</Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-oskar-orange transition-colors">Berita</Link>
              </li>
              <li>
                <Link href="/kegiatan" className="hover:text-oskar-orange transition-colors">Kegiatan</Link>
              </li>
              <li>
                <Link href="/pendaftaran" className="hover:text-oskar-orange transition-colors">Pendaftaran</Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-oskar-orange transition-colors">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* DYNAMIC KONTAK SEKRETARIAT */}
          <div className="space-y-3">
            <h3 className="text-lg font-black text-oskar-yellow border-b-2 border-slate-700 pb-2 inline-block">
              Kontak Sekretariat
            </h3>
            <div className="space-y-2.5 text-sm text-slate-300 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-oskar-red shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                  WhatsApp Admin ({waNumber})
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-5 h-5 text-pink-400 shrink-0" />
                <a
                  href={`https://instagram.com/${igClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline"
                >
                  {igHandle}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <TikTokIcon className="w-5 h-5 text-cyan-400 shrink-0" />
                <a
                  href={`https://tiktok.com/@${tiktokClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline"
                >
                  TikTok ({tiktokHandle})
                </a>
              </div>
            </div>
          </div>

          {/* Admin Portal Access */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-oskar-yellow border-b-2 border-slate-700 pb-2 inline-block">
              Akses Pengurus
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Portal pengelolaan anggota, approve pendaftaran online, dan kelola kegiatan dusun.
            </p>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-600 font-bold text-xs transition-colors shadow-neo-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Masuk Dashboard Admin
            </Link>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <p>© 2026 OSKAR - Organisasi Pemuda Pemudi Krekah Utara. Hak Cipta Dilindungi.</p>
          <div className="text-slate-300 font-bold">
            dev by artapage
          </div>
        </div>
      </div>
    </footer>
  );
};
