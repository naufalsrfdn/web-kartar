"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useOskar } from "@/lib/data-store";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ShoppingBag,
  Calendar,
  Newspaper,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdminLoggedIn, logoutAdmin, applications } = useOskar();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingCount = applications.filter((a) => a.status === "PENDING").length;

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/anggota", label: "Data Anggota", icon: Users },
    {
      href: "/admin/pendaftaran",
      label: "Pendaftaran Pending",
      icon: UserPlus,
      badge: pendingCount > 0 ? pendingCount : null,
    },
    { href: "/admin/umkm", label: "Katalog UMKM", icon: ShoppingBag },
    { href: "/admin/kegiatan", label: "Kelola Kegiatan", icon: Calendar },
    { href: "/admin/berita", label: "Kelola Berita", icon: Newspaper },
    { href: "/admin/pengaturan", label: "Pengaturan Sistem", icon: Settings },
  ];

  if (!isAdminLoggedIn && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="neo-card p-8 bg-white border-2 border-oskar-dark max-w-md w-full text-center space-y-5">
          <div className="w-16 h-16 bg-rose-100 border-2 border-oskar-dark rounded-2xl flex items-center justify-center mx-auto shadow-neo text-rose-600">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-oskar-dark">Akses Terbatas Admin</h2>
            <p className="text-xs font-medium text-slate-600">
              Anda harus masuk terlebih dahulu untuk mengakses Dashboard Admin OSKAR.
            </p>
          </div>
          <Link
            href="/admin/login"
            className="neo-btn neo-btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
          >
            Ke Halaman Login Admin
          </Link>
        </div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col md:flex-row">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden bg-oskar-dark text-white p-4 flex items-center justify-between border-b-2 border-oskar-dark sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full bg-white overflow-hidden p-0.5">
            <Image src="/logo.png" alt="OSKAR Logo" fill className="object-contain" />
          </div>
          <span className="font-black text-sm text-oskar-yellow">OSKAR Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 border border-white rounded-lg text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-oskar-dark text-white border-r-2 border-oskar-dark flex flex-col justify-between p-4 transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* LOGO & BRAND */}
          <div className="flex items-center gap-3 pt-2 pb-4 border-b border-slate-700">
            <div className="relative w-10 h-10 rounded-full bg-white overflow-hidden p-0.5">
              <Image src="/logo.png" alt="OSKAR Logo" fill className="object-contain" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wider text-white leading-none">
                OSKAR ADMIN
              </h2>
              <p className="text-[10px] font-bold text-oskar-yellow mt-1">
                Panel Pengurus Dusun
              </p>
            </div>
          </div>

          {/* MENU LIST */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            {menuItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    active
                      ? "bg-oskar-red text-white border-white shadow-neo-sm"
                      : "border-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-oskar-yellow text-oskar-dark rounded-full text-[10px] font-black animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="pt-4 border-t border-slate-700 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <span>Lihat Web Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => {
              logoutAdmin();
              router.push("/admin/login");
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar / Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT CONTAINER */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
    </div>
  );
};
