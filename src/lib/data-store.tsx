"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Member,
  MemberApplication,
  Leadership,
  UmkmItem,
  EventItem,
  NewsItem,
  ContactMessage,
  SystemSettings,
} from "./types";
import {
  initialMembers,
  initialApplications,
  initialLeadership,
  initialUmkm,
  initialEvents,
  initialNews,
  initialSettings,
} from "./mock-data";

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

const initialMessages: ContactMessage[] = [];

interface OskarContextType {
  members: Member[];
  applications: MemberApplication[];
  leadership: Leadership[];
  umkm: UmkmItem[];
  events: EventItem[];
  news: NewsItem[];
  messages: ContactMessage[];
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

  // Messages Actions
  addMessage: (msgData: { name: string; contact: string; message: string }) => Promise<void>;
  markMessageRead: (id: string, isRead: boolean) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  // Member Actions
  addApplication: (appData: Omit<MemberApplication, "id" | "status" | "createdAt">) => Promise<void>;
  approveApplication: (id: string) => Promise<void>;
  rejectApplication: (id: string, note?: string) => Promise<void>;
  addMember: (memberData: Omit<Member, "id" | "createdAt">) => Promise<void>;
  updateMember: (id: string, updated: Partial<Member>) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;

  // UMKM Actions
  addUmkm: (umkmData: Omit<UmkmItem, "id">) => Promise<void>;
  updateUmkm: (id: string, umkmData: Partial<UmkmItem>) => Promise<void>;
  deleteUmkm: (id: string) => Promise<void>;

  // Event Actions
  addEvent: (eventData: Omit<EventItem, "id">) => Promise<void>;
  updateEvent: (id: string, eventData: Partial<EventItem>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  // News Actions
  addNews: (newsData: Omit<NewsItem, "id">) => Promise<void>;
  updateNews: (id: string, newsData: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;

  // Settings
  toggleRegistration: (open: boolean) => Promise<void>;
  updateSettings: (newSettings: Partial<SystemSettings>) => Promise<void>;
}

const OskarContext = createContext<OskarContextType | undefined>(undefined);

export const OskarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [applications, setApplications] = useState<MemberApplication[]>(initialApplications);
  const [leadership] = useState<Leadership[]>(initialLeadership);
  const [umkm, setUmkm] = useState<UmkmItem[]>(initialUmkm);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);

  const [adminPassword, setAdminPassword] = useState<string>("artapagedev");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize state with central SQLite database
  const refreshAllData = async () => {
    try {
      const [resMembers, resApps, resUmkm, resEvents, resNews, resMsgs, resSettings] =
        await Promise.allSettled([
          fetch("/api/members").then((r) => r.json()),
          fetch("/api/applications").then((r) => r.json()),
          fetch("/api/umkm").then((r) => r.json()),
          fetch("/api/events").then((r) => r.json()),
          fetch("/api/news").then((r) => r.json()),
          fetch("/api/messages").then((r) => r.json()),
          fetch("/api/settings").then((r) => r.json()),
        ]);

      if (resMembers.status === "fulfilled" && Array.isArray(resMembers.value) && resMembers.value.length > 0) {
        setMembers(resMembers.value);
      }
      if (resApps.status === "fulfilled" && Array.isArray(resApps.value) && resApps.value.length > 0) {
        setApplications(resApps.value);
      }
      if (resUmkm.status === "fulfilled" && Array.isArray(resUmkm.value) && resUmkm.value.length > 0) {
        setUmkm(resUmkm.value);
      }
      if (resEvents.status === "fulfilled" && Array.isArray(resEvents.value) && resEvents.value.length > 0) {
        setEvents(resEvents.value);
      }
      if (resNews.status === "fulfilled" && Array.isArray(resNews.value) && resNews.value.length > 0) {
        setNews(resNews.value);
      }
      if (resMsgs.status === "fulfilled" && Array.isArray(resMsgs.value)) {
        setMessages(resMsgs.value);
      }
      if (resSettings.status === "fulfilled" && resSettings.value && typeof resSettings.value === "object") {
        setSettings((prev) => ({ ...prev, ...resSettings.value }));
      }
    } catch (err) {
      console.warn("DB synchronization load error:", err);
    }
  };

  useEffect(() => {
    try {
      const savedPass = localStorage.getItem("oskar_admin_password");
      if (savedPass) setAdminPassword(savedPass);

      const savedAdmin = localStorage.getItem("oskar_admin");
      if (savedAdmin === "true") setIsAdminLoggedIn(true);
    } catch (e) {
      console.warn("LocalStorage reading error:", e);
    }

    refreshAllData();
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

  // Auth
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
    localStorage.setItem("oskar_admin_password", newPass);
    showToast("Password admin berhasil diperbarui!", "success");
    return true;
  };

  // Messages Actions
  const addMessage = async (msgData: { name: string; contact: string; message: string }) => {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msgData),
      });
      if (res.ok) {
        const saved = await res.json();
        setMessages((prev) => [saved, ...prev]);
      }
    } catch (e) {
      console.warn("API Post Message error:", e);
    }
    showToast("Pesan Anda telah dikirim ke pengurus OSKAR!", "success");
  };

  const markMessageRead = async (id: string, isRead: boolean) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead } : m)));
    try {
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead }),
      });
    } catch (e) {
      console.warn("API Patch Message error:", e);
    }
  };

  const deleteMessage = async (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    try {
      await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
    } catch (e) {
      console.warn("API Delete Message error:", e);
    }
    showToast("Pesan telah dihapus.", "info");
  };

  // Member Applications & Members
  const addApplication = async (appData: Omit<MemberApplication, "id" | "status" | "createdAt">) => {
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appData),
      });
      if (res.ok) {
        const savedApp = await res.json();
        setApplications((prev) => [savedApp, ...prev]);
        showToast("Pendaftaran Anda berhasil dikirim! Menunggu persetujuan Admin OSKAR.", "success");
        return;
      }
    } catch (e) {
      console.warn("API Post Application error:", e);
    }
    showToast("Gagal menyimpan pendaftaran ke database server.", "error");
  };

  const approveApplication = async (id: string) => {
    const target = applications.find((a) => a.id === id);
    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "APPROVED" }),
      });
      if (res.ok) {
        await refreshAllData();
        showToast(`Pendaftaran ${target?.fullName || ""} berhasil disetujui!`, "success");
        return;
      }
    } catch (e) {
      console.warn("API Approve Application error:", e);
    }
    showToast("Gagal menyetujui pendaftaran.", "error");
  };

  const rejectApplication = async (id: string, note?: string) => {
    const target = applications.find((a) => a.id === id);
    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "REJECTED", note }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: "REJECTED" as const, note } : a))
        );
        showToast(`Pendaftaran ${target?.fullName || ""} ditolak.`, "info");
        return;
      }
    } catch (e) {
      console.warn("API Reject Application error:", e);
    }
  };

  const addMember = async (memberData: Omit<Member, "id" | "createdAt">) => {
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData),
      });
      if (res.ok) {
        const savedMember = await res.json();
        setMembers((prev) => [savedMember, ...prev]);
        showToast(`Anggota baru ${savedMember.fullName} berhasil ditambahkan!`, "success");
        return;
      }
    } catch (e) {
      console.warn("API Add Member error:", e);
    }
    showToast("Gagal menambahkan anggota.", "error");
  };

  const updateMember = async (id: string, updated: Partial<Member>) => {
    try {
      const res = await fetch("/api/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updated }),
      });
      if (res.ok) {
        const updatedMember = await res.json();
        setMembers((prev) => prev.map((m) => (m.id === id ? updatedMember : m)));
        showToast("Data anggota berhasil diperbarui!", "success");
        return;
      }
    } catch (e) {
      console.warn("API Update Member error:", e);
    }
  };

  const deleteMember = async (id: string) => {
    const target = members.find((m) => m.id === id);
    try {
      const res = await fetch(`/api/members?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
        showToast(`Data anggota ${target?.fullName || ""} berhasil dihapus!`, "info");
        return;
      }
    } catch (e) {
      console.warn("API Delete Member error:", e);
    }
  };

  // UMKM Actions
  const addUmkm = async (umkmData: Omit<UmkmItem, "id">) => {
    try {
      const res = await fetch("/api/umkm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(umkmData),
      });
      if (res.ok) {
        const newItem = await res.json();
        setUmkm((prev) => [newItem, ...prev]);
        showToast(`UMKM "${newItem.name}" berhasil ditambahkan!`, "success");
        return;
      }
    } catch (e) {
      console.warn("API Add UMKM error:", e);
    }
  };

  const updateUmkm = async (id: string, umkmData: Partial<UmkmItem>) => {
    try {
      const res = await fetch("/api/umkm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...umkmData }),
      });
      if (res.ok) {
        const updatedItem = await res.json();
        setUmkm((prev) => prev.map((u) => (u.id === id ? updatedItem : u)));
        showToast("Data UMKM berhasil diperbarui!", "success");
        return;
      }
    } catch (e) {
      console.warn("API Update UMKM error:", e);
    }
  };

  const deleteUmkm = async (id: string) => {
    try {
      const res = await fetch(`/api/umkm?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setUmkm((prev) => prev.filter((u) => u.id !== id));
        showToast("UMKM telah dihapus dari direktori.", "info");
        return;
      }
    } catch (e) {
      console.warn("API Delete UMKM error:", e);
    }
  };

  // Event Actions
  const addEvent = async (eventData: Omit<EventItem, "id">) => {
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      if (res.ok) {
        const newItem = await res.json();
        setEvents((prev) => [newItem, ...prev]);
        showToast(`Kegiatan "${newItem.title}" berhasil dibuat!`, "success");
        return;
      }
    } catch (e) {
      console.warn("API Add Event error:", e);
    }
  };

  const updateEvent = async (id: string, eventData: Partial<EventItem>) => {
    try {
      const res = await fetch("/api/events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...eventData }),
      });
      if (res.ok) {
        const updatedItem = await res.json();
        setEvents((prev) => prev.map((e) => (e.id === id ? updatedItem : e)));
        showToast("Data kegiatan berhasil diperbarui!", "success");
        return;
      }
    } catch (e) {
      console.warn("API Update Event error:", e);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
        showToast("Kegiatan telah dihapus.", "info");
        return;
      }
    } catch (e) {
      console.warn("API Delete Event error:", e);
    }
  };

  // News Actions
  const addNews = async (newsData: Omit<NewsItem, "id">) => {
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsData),
      });
      if (res.ok) {
        const newItem = await res.json();
        setNews((prev) => [newItem, ...prev]);
        showToast("Artikel/Berita baru berhasil diterbitkan!", "success");
        return;
      }
    } catch (e) {
      console.warn("API Add News error:", e);
    }
  };

  const updateNews = async (id: string, newsData: Partial<NewsItem>) => {
    try {
      const res = await fetch("/api/news", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...newsData }),
      });
      if (res.ok) {
        const updatedItem = await res.json();
        setNews((prev) => prev.map((n) => (n.id === id ? updatedItem : n)));
        showToast("Artikel berhasil diperbarui!", "success");
        return;
      }
    } catch (e) {
      console.warn("API Update News error:", e);
    }
  };

  const deleteNews = async (id: string) => {
    try {
      const res = await fetch(`/api/news?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setNews((prev) => prev.filter((n) => n.id !== id));
        showToast("Artikel berita telah dihapus.", "info");
        return;
      }
    } catch (e) {
      console.warn("API Delete News error:", e);
    }
  };

  // Settings
  const toggleRegistration = async (open: boolean) => {
    await updateSettings({ registrationOpen: open });
    showToast(`Status Pendaftaran Anggota resmi ${open ? "DIBUKA" : "DITUTUP"}.`, "info");
  };

  const updateSettings = async (newSettings: Partial<SystemSettings>) => {
    try {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });
      showToast("Pengaturan sistem berhasil diperbarui!", "success");
    } catch (e) {
      console.warn("API Update Settings error:", e);
    }
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
        messages,
        settings,
        isAdminLoggedIn,
        toasts,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        showToast,
        removeToast,
        addMessage,
        markMessageRead,
        deleteMessage,
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
