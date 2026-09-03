"use client";

import React from "react";
import { useOskar } from "@/lib/data-store";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useOskar();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4">
      {toasts.map((toast) => {
        let bgClass = "bg-emerald-100 border-emerald-900 text-emerald-950";
        let Icon = CheckCircle2;

        if (toast.type === "error") {
          bgClass = "bg-rose-100 border-rose-900 text-rose-950";
          Icon = AlertCircle;
        } else if (toast.type === "info") {
          bgClass = "bg-sky-100 border-sky-900 text-sky-950";
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-xl border-2 shadow-neo animate-bounce-once ${bgClass}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-bold flex-1 leading-snug">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-black/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
