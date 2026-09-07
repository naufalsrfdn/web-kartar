import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialUmkm } from "@/lib/mock-data";

async function ensureUmkmSeeded() {
  try {
    const count = await prisma.umkm.count();
    if (count === 0) {
      for (const u of initialUmkm) {
        await prisma.umkm.create({
          data: {
            id: u.id,
            name: u.name,
            owner: u.owner,
            whatsapp: u.whatsapp,
            description: u.description,
            priceRange: u.priceRange,
            location: u.location,
            imageUrl: u.imageUrl,
          },
        });
      }
    }
  } catch (err) {
    console.warn("UMKM seed note:", err);
  }
}

export async function GET() {
  try {
    await ensureUmkmSeeded();
    const items = await prisma.umkm.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/umkm error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, owner, whatsapp, description, priceRange, location, imageUrl } = body;

    if (!name || !owner || !whatsapp) {
      return NextResponse.json({ error: "Nama usaha, pemilik, dan WA wajib diisi" }, { status: 400 });
    }

    const newItem = await prisma.umkm.create({
      data: {
        name,
        owner,
        whatsapp,
        description: description || "",
        priceRange: priceRange || "",
        location: location || "",
        imageUrl: imageUrl || "",
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("POST /api/umkm error:", error);
    return NextResponse.json({ error: "Gagal membuat UMKM" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    const updated = await prisma.umkm.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/umkm error:", error);
    return NextResponse.json({ error: "Gagal memperbarui UMKM" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    await prisma.umkm.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/umkm error:", error);
    return NextResponse.json({ error: "Gagal menghapus UMKM" }, { status: 500 });
  }
}
