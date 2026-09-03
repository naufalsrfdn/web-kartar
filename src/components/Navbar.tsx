"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useOskar } from "@/lib/data-store";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { settings } = useOskar();

  // Menu Order from revisi.pdf: home, tentang, anggota, umkm, berita, kegiatan, pendaftaran, kontak
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tentang", label: "Tentang" },
    { href: "/anggota", label: "Anggota" },
    { href: "/umkm", label: "UMKM Dusun", icon: ShoppingBag },
    { href: "/berita", label: "Berita" },
    { href: "/kegiatan", label: "Kegiatan" },
    { href: "/pendaftaran", label: "Pendaftaran", badge: settings.registrationOpen ? "BUKA" : null },
    { href: "/kontak", label: "Kontak" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2] border-b-2 border-oskar-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand (Clean Logo without shadow) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center p-0.5">
              <Image
                src="/logo.png"
                alt="OSKAR Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider text-oskar-dark block leading-none">
                OSKAR
              </span>
              <span className="text-xs font-bold text-slate-600 block mt-0.5">
                Organisasi Pemuda Pemudi Krekah Utara
              </span>
            </div>
          </Link>

          {/* Desktop Nav (8 Items) */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border-2 ${
                    active
                      ? "bg-oskar-red text-white border-oskar-dark shadow-neo-sm"
                      : "border-transparent hover:border-oskar-dark hover:bg-white text-slate-800"
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 bg-emerald-500 text-white rounded text-[10px] font-black border border-black">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border-2 border-oskar-dark bg-white text-oskar-dark shadow-neo-sm focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b-2 border-oskar-dark px-4 pt-3 pb-6 space-y-2 shadow-neo animate-slide-down">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`p-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-between ${
                    active
                      ? "bg-oskar-red text-white border-oskar-dark shadow-neo-sm"
                      : "bg-slate-50 border-oskar-dark text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 bg-emerald-500 text-white rounded text-[10px] font-black border border-black">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
