"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOskar } from "@/lib/data-store";
import { ShieldCheck, ArrowLeft, KeyRound, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginAdmin, isAdminLoggedIn } = useOskar();
  const router = useRouter();

  if (isAdminLoggedIn) {
    router.push("/admin");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (success) {
      router.push("/admin");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
      <div className="neo-card p-8 bg-white border-2 border-oskar-dark max-w-md w-full shadow-neo-lg space-y-6">
        <div className="text-center space-y-3">
          <div className="relative w-20 h-20 mx-auto rounded-full bg-white overflow-hidden p-1 flex items-center justify-center">
            <Image src="/logo.png" alt="OSKAR Logo" fill className="object-contain" priority />
          </div>
          <h1 className="text-2xl font-black text-oskar-dark">Login Admin OSKAR</h1>
          <p className="text-xs font-medium text-slate-600">
            Masukkan kata sandi pengurus untuk mengakses Dashboard Admin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-oskar-dark uppercase flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-oskar-red" />
              <span>Password Admin</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Masukkan password admin..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="neo-input text-xs sm:text-sm pr-10"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-oskar-dark"
                title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="neo-btn neo-btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Masuk Dashboard</span>
          </button>
        </form>

        <div className="pt-2 text-center border-t border-slate-200">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-oskar-dark underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website Publik</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
