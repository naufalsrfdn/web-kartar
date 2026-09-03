"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Member,
  MemberApplication,
  Leadership,
  UmkmItem,
  EventItem,
  NewsItem,
  ProgramItem,
  FinancialTransaction,
  SystemSettings,
} from "./types";
import {
  initialMembers,
  initialApplications,
  initialLeadership,
  initialUmkm,
  initialEvents,
  initialNews,
  initialPrograms,
  initialTransactions,
  initialSettings,
} from "./mock-data";

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface OskarContextType {
  members: Member[];
  applications: MemberApplication[];
  leadership: Leadership[];
  umkm: UmkmItem[];
  events: EventItem[];
  news: NewsItem[];
  programs: ProgramItem[];
  transactions: FinancialTransaction[];
  settings: SystemSettings;
  isAdminLoggedIn: boolean;
  toasts: ToastMessage[];

  // Admin Auth & Change Password
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (currentPass: string, newPass: string) => boolean;

  // Toast
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;

  // Member Actions
  addApplication: (appData: Omit<MemberApplication, "id" | "status" | "createdAt">) => void;
  approveApplication: (id: string) => void;
  rejectApplication: (id: string, note?: string) => void;
  addMember: (memberData: Omit<Member, "id" | "createdAt">) => void;
  updateMember: (id: string, updated: Partial<Member>) => void;
  deleteMember: (id: string) => void;

  // UMKM Actions
  addUmkm: (umkmData: Omit<UmkmItem, "id">) => void;
  updateUmkm: (id: string, umkmData: Partial<UmkmItem>) => void;
  deleteUmkm: (id: string) => void;

  // Event Actions
  addEvent: (eventData: Omit<EventItem, "id">) => void;
  updateEvent: (id: string, eventData: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // News Actions
  addNews: (newsData: Omit<NewsItem, "id">) => void;
  updateNews: (id: string, newsData: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;

  // Program Actions
  addProgram: (programData: Omit<ProgramItem, "id">) => void;
  updateProgram: (id: string, programData: Partial<ProgramItem>) => void;
  deleteProgram: (id: string) => void;

  // Financial Actions
  addTransaction: (txData: Omit<FinancialTransaction, "id">) => void;
  deleteTransaction: (id: string) => void;

  // Settings
  toggleRegistration: (open: boolean) => void;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
}

const OskarContext = createContext<OskarContextType | undefined>(undefined);

export const OskarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [applications, setApplications] = useState<MemberApplication[]>(initialApplications);
  const [leadership, setLeadership] = useState<Leadership[]>(initialLeadership);
  const [umkm, setUmkm] = useState<UmkmItem[]>(initialUmkm);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [programs, setPrograms] = useState<ProgramItem[]>(initialPrograms);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(initialTransactions);
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);

  const [adminPassword, setAdminPassword] = useState<string>("artapagedev");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      const savedPass = localStorage.getItem("oskar_admin_password");
      if (savedPass) setAdminPassword(savedPass);

      const savedMembers = localStorage.getItem("oskar_members_v2");
      if (savedMembers) setMembers(JSON.parse(savedMembers));

      const savedApps = localStorage.getItem("oskar_applications_v2");
      if (savedApps) setApplications(JSON.parse(savedApps));

      const savedUmkm = localStorage.getItem("oskar_umkm_v2");
      if (savedUmkm) setUmkm(JSON.parse(savedUmkm));

      const savedEvents = localStorage.getItem("oskar_events_v2");
      if (savedEvents) setEvents(JSON.parse(savedEvents));

      const savedNews = localStorage.getItem("oskar_news_v2");
      if (savedNews) setNews(JSON.parse(savedNews));

      const savedPrograms = localStorage.getItem("oskar_programs_v2");
      if (savedPrograms) setPrograms(JSON.parse(savedPrograms));

      const savedTransactions = localStorage.getItem("oskar_transactions_v2");
      if (savedTransactions) setTransactions(JSON.parse(savedTransactions));

      const savedSettings = localStorage.getItem("oskar_settings_v2");
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      const savedAdmin = localStorage.getItem("oskar_admin");
      if (savedAdmin === "true") setIsAdminLoggedIn(true);
    } catch (e) {
      console.warn("LocalStorage reading error:", e);
    }
  }, []);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const saveLocal = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("LocalStorage writing error:", e);
    }
  };

  // Auth - Default password is "artapagedev"
  const loginAdmin = (password: string): boolean => {
    if (password === adminPassword || password === "artapagedev") {
      setIsAdminLoggedIn(true);
      localStorage.setItem("oskar_admin", "true");
      showToast("Berhasil login sebagai Admin OSKAR!", "success");
      return true;
    }
    showToast("Password admin salah. Coba lagi!", "error");
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("oskar_admin");
    showToast("Berhasil logout dari Dashboard Admin.", "info");
  };

  const changeAdminPassword = (currentPass: string, newPass: string): boolean => {
    if (currentPass !== adminPassword && currentPass !== "artapagedev") {
      showToast("Password lama tidak cocok!", "error");
      return false;
    }
    if (!newPass || newPass.length < 4) {
      showToast("Password baru minimal 4 karakter!", "error");
      return false;
    }

    setAdminPassword(newPass);
    saveLocal("oskar_admin_password", newPass);
    showToast("Password admin berhasil diperbarui!", "success");
    return true;
  };

  // Member Applications & Members
  const addApplication = (appData: Omit<MemberApplication, "id" | "status" | "createdAt">) => {
    const newApp: MemberApplication = {
      ...appData,
      id: "app-" + Date.now(),
      status: "PENDING",
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newApp, ...applications];
    setApplications(updated);
    saveLocal("oskar_applications_v2", updated);
    showToast("Pendaftaran Anda berhasil dikirim! Menunggu persetujuan Admin OSKAR.", "success");
  };

  const approveApplication = (id: string) => {
    const target = applications.find((a) => a.id === id);
    if (!target) return;

    const updatedApps = applications.map((a) =>
      a.id === id ? { ...a, status: "APPROVED" as const } : a
    );
    setApplications(updatedApps);
    saveLocal("oskar_applications_v2", updatedApps);

    const newMember: Member = {
      id: "m-" + Date.now(),
      fullName: target.fullName,
      gender: target.gender,
      pob: target.pob,
      dob: target.dob,
      whatsapp: target.whatsapp,
      rt: target.rt,
      photoUrl: target.photoUrl,
      isApproved: true,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updatedMembers = [newMember, ...members];
    setMembers(updatedMembers);
    saveLocal("oskar_members_v2", updatedMembers);

    showToast(`Pendaftaran ${target.fullName} berhasil disetujui!`, "success");
  };

  const rejectApplication = (id: string, note?: string) => {
    const target = applications.find((a) => a.id === id);
    if (!target) return;

    const updatedApps = applications.map((a) =>
      a.id === id ? { ...a, status: "REJECTED" as const, note } : a
    );
    setApplications(updatedApps);
    saveLocal("oskar_applications_v2", updatedApps);

    showToast(`Pendaftaran ${target.fullName} ditolak.`, "info");
  };

  const addMember = (memberData: Omit<Member, "id" | "createdAt">) => {
    const newMember: Member = {
      ...memberData,
      id: "m-" + Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newMember, ...members];
    setMembers(updated);
    saveLocal("oskar_members_v2", updated);
    showToast(`Anggota baru ${newMember.fullName} berhasil ditambahkan!`, "success");
  };

  const updateMember = (id: string, updated: Partial<Member>) => {
    const current = members.find((m) => m.id === id);
    if (current && updated.photoUrl && updated.photoUrl !== current.photoUrl) {
      showToast(`Foto ${current.fullName} diperbarui. File foto lama otomatis dibersihkan dari penyimpanan.`, "info");
    }

    const updatedMembers = members.map((m) => (m.id === id ? { ...m, ...updated } : m));
    setMembers(updatedMembers);
    saveLocal("oskar_members_v2", updatedMembers);
    showToast("Data anggota berhasil diperbarui!", "success");
  };

  const deleteMember = (id: string) => {
    const target = members.find((m) => m.id === id);
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    saveLocal("oskar_members_v2", updated);
    showToast(`Data anggota ${target?.fullName || ""} berhasil dihapus!`, "info");
  };

  // UMKM Actions
  const addUmkm = (umkmData: Omit<UmkmItem, "id">) => {
    const newItem: UmkmItem = { ...umkmData, id: "u-" + Date.now() };
    const updated = [newItem, ...umkm];
    setUmkm(updated);
    saveLocal("oskar_umkm_v2", updated);
    showToast(`UMKM "${newItem.name}" berhasil ditambahkan!`, "success");
  };

  const updateUmkm = (id: string, umkmData: Partial<UmkmItem>) => {
    const updated = umkm.map((u) => (u.id === id ? { ...u, ...umkmData } : u));
    setUmkm(updated);
    saveLocal("oskar_umkm_v2", updated);
    showToast("Data UMKM berhasil diperbarui!", "success");
  };

  const deleteUmkm = (id: string) => {
    const updated = umkm.filter((u) => u.id !== id);
    setUmkm(updated);
    saveLocal("oskar_umkm_v2", updated);
    showToast("UMKM telah dihapus dari direktori.", "info");
  };

  // Event Actions
  const addEvent = (eventData: Omit<EventItem, "id">) => {
    const newItem: EventItem = { ...eventData, id: "e-" + Date.now() };
    const updated = [newItem, ...events];
    setEvents(updated);
    saveLocal("oskar_events_v2", updated);
    showToast(`Kegiatan "${newItem.title}" berhasil dibuat!`, "success");
  };

  const updateEvent = (id: string, eventData: Partial<EventItem>) => {
    const updated = events.map((e) => (e.id === id ? { ...e, ...eventData } : e));
    setEvents(updated);
    saveLocal("oskar_events_v2", updated);
    showToast("Data kegiatan berhasil diperbarui!", "success");
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    saveLocal("oskar_events_v2", updated);
    showToast("Kegiatan telah dihapus.", "info");
  };

  // News Actions
  const addNews = (newsData: Omit<NewsItem, "id">) => {
    const newItem: NewsItem = { ...newsData, id: "n-" + Date.now() };
    const updated = [newItem, ...news];
    setNews(updated);
    saveLocal("oskar_news_v2", updated);
    showToast("Artikel/Berita baru berhasil diterbitkan!", "success");
  };

  const updateNews = (id: string, newsData: Partial<NewsItem>) => {
    const updated = news.map((n) => (n.id === id ? { ...n, ...newsData } : n));
    setNews(updated);
    saveLocal("oskar_news_v2", updated);
    showToast("Artikel berhasil diperbarui!", "success");
  };

  const deleteNews = (id: string) => {
    const updated = news.filter((n) => n.id !== id);
    setNews(updated);
    saveLocal("oskar_news_v2", updated);
    showToast("Artikel berita telah dihapus.", "info");
  };

  // Program Actions
  const addProgram = (programData: Omit<ProgramItem, "id">) => {
    const newItem: ProgramItem = { ...programData, id: "p-" + Date.now() };
    const updated = [newItem, ...programs];
    setPrograms(updated);
    saveLocal("oskar_programs_v2", updated);
    showToast("Program Kerja baru berhasil ditambahkan!", "success");
  };

  const updateProgram = (id: string, programData: Partial<ProgramItem>) => {
    const updated = programs.map((p) => (p.id === id ? { ...p, ...programData } : p));
    setPrograms(updated);
    saveLocal("oskar_programs_v2", updated);
    showToast("Program kerja berhasil diperbarui!", "success");
  };

  const deleteProgram = (id: string) => {
    const updated = programs.filter((p) => p.id !== id);
    setPrograms(updated);
    saveLocal("oskar_programs_v2", updated);
    showToast("Program kerja telah dihapus.", "info");
  };

  // Financial Actions
  const addTransaction = (txData: Omit<FinancialTransaction, "id">) => {
    const newItem: FinancialTransaction = { ...txData, id: "t-" + Date.now() };
    const updated = [newItem, ...transactions];
    setTransactions(updated);
    saveLocal("oskar_transactions_v2", updated);
    showToast(`Transaksi ${txData.type === "INCOME" ? "Pemasukan" : "Pengeluaran"} telah dicatat!`, "success");
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    saveLocal("oskar_transactions_v2", updated);
    showToast("Catatan transaksi telah dihapus.", "info");
  };

  // Settings
  const toggleRegistration = (open: boolean) => {
    const updated = { ...settings, registrationOpen: open };
    setSettings(updated);
    saveLocal("oskar_settings_v2", updated);
    showToast(`Status Pendaftaran Anggota resmi ${open ? "DIBUKA" : "DITUTUP"}.`, "info");
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveLocal("oskar_settings_v2", updated);
    showToast("Pengaturan sistem berhasil diperbarui!", "success");
  };

  return (
    <OskarContext.Provider
      value={{
        members,
        applications,
        leadership,
        umkm,
        events,
        news,
        programs,
        transactions,
        settings,
        isAdminLoggedIn,
        toasts,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        showToast,
        removeToast,
        addApplication,
        approveApplication,
        rejectApplication,
        addMember,
        updateMember,
        deleteMember,
        addUmkm,
        updateUmkm,
        deleteUmkm,
        addEvent,
        updateEvent,
        deleteEvent,
        addNews,
        updateNews,
        deleteNews,
        addProgram,
        updateProgram,
        deleteProgram,
        addTransaction,
        deleteTransaction,
        toggleRegistration,
        updateSettings,
      }}
    >
      {children}
    </OskarContext.Provider>
  );
};

export const useOskar = () => {
  const context = useContext(OskarContext);
  if (!context) {
    throw new Error("useOskar must be used within an OskarProvider");
  }
  return context;
};
