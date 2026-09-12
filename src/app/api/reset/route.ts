import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialSettings } from "@/lib/mock-data";

export async function POST() {
  try {
    // 1. Wipe all database tables to make database 100% clean and empty
    await prisma.contactMessage.deleteMany();
    await prisma.memberApplication.deleteMany();
    await prisma.member.deleteMany();
    await prisma.umkm.deleteMany();
    await prisma.event.deleteMany();
    await prisma.news.deleteMany();
    await prisma.setting.deleteMany();

    // 2. Re-insert basic system settings so website configuration remains functional
    for (const [key, value] of Object.entries(initialSettings)) {
      await prisma.setting.create({
        data: {
          key,
          value: typeof value === "boolean" ? String(value) : String(value),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Database berhasil dibersihkan total (kosong). Password admin tetap 'artapagedev'.",
    });
  } catch (error) {
    console.error("POST /api/reset error:", error);
    return NextResponse.json({ error: "Gagal me-reset database" }, { status: 500 });
  }
}
