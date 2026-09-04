import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Auto-ensure table exists in SQLite database
async function ensureTableExists() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS ContactMessage (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        message TEXT NOT NULL,
        isRead INTEGER NOT NULL DEFAULT 0,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.warn("Table initialization note:", err);
  }
}

// GET: Fetch all messages for Admin
export async function GET() {
  try {
    await ensureTableExists();
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET /api/messages error:", error);
    return NextResponse.json([], { status: 200 }); // Graceful fallback
  }
}

// POST: Save incoming message from /kontak page
export async function POST(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { name, contact, message } = body;

    if (!name || !contact || !message) {
      return NextResponse.json(
        { error: "Nama, kontak, dan isi pesan wajib diisi!" },
        { status: 400 }
      );
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        contact,
        message,
        isRead: false,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("POST /api/messages error:", error);
    return NextResponse.json({ error: "Gagal menyimpan pesan" }, { status: 500 });
  }
}

// PATCH: Mark message as read
export async function PATCH(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { id, isRead } = body;

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/messages error:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

// DELETE: Remove message
export async function DELETE(request: Request) {
  try {
    await ensureTableExists();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID mandatory" }, { status: 400 });
    }

    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/messages error:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
