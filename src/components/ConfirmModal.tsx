"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Hapus Data",
  cancelText = "Batal",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border-2 border-oskar-dark rounded-2xl p-6 max-w-md w-full shadow-neo-lg space-y-5 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-lg border-2 border-oskar-dark bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 text-rose-600">
          <div className="p-3 bg-rose-100 border-2 border-oskar-dark rounded-xl shadow-neo-sm">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
          </div>
          <h3 className="text-xl font-black text-oskar-dark">{title}</h3>
        </div>

        <p className="text-sm font-medium text-slate-700 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-bold border-2 border-oskar-dark bg-slate-100 hover:bg-slate-200 text-oskar-dark rounded-xl shadow-neo transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            className="px-4 py-2 text-sm font-bold border-2 border-oskar-dark bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-neo transition-all"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
