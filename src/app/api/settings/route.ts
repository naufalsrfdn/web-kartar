import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialSettings } from "@/lib/mock-data";

async function ensureSettingsSeeded() {
  try {
    const count = await prisma.setting.count();
    if (count === 0) {
      for (const [key, value] of Object.entries(initialSettings)) {
        await prisma.setting.create({
          data: {
            key,
            value: typeof value === "boolean" ? String(value) : (value as string),
          },
        });
      }
    }
  } catch (err) {
    console.warn("Settings seed note:", err);
  }
}

export async function GET() {
  try {
    await ensureSettingsSeeded();
    const rows = await prisma.setting.findMany();
    
    const settingsObj: Record<string, any> = { ...initialSettings };
    rows.forEach((row) => {
      if (row.key === "registrationOpen") {
        settingsObj[row.key] = row.value === "true";
      } else {
        settingsObj[row.key] = row.value;
      }
    });

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json(initialSettings, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    for (const [key, val] of Object.entries(body)) {
      const stringVal = typeof val === "boolean" ? String(val) : String(val ?? "");
      await prisma.setting.upsert({
        where: { key },
        update: { value: stringVal },
        create: { key, value: stringVal },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/settings error:", error);
    return NextResponse.json({ error: "Gagal menyimpan pengaturan" }, { status: 500 });
  }
}
