import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialEvents } from "@/lib/mock-data";

async function ensureEventsSeeded() {
  try {
    const count = await prisma.event.count();
    if (count === 0) {
      for (const e of initialEvents) {
        await prisma.event.create({
          data: {
            id: e.id,
            title: e.title,
            date: e.date,
            location: e.location,
            description: e.description,
            category: e.category,
            previewPhotos: JSON.stringify(e.previewPhotos || []),
            gdriveUrl: e.gdriveUrl,
          },
        });
      }
    }
  } catch (err) {
    console.warn("Event seed note:", err);
  }
}

export async function GET() {
  try {
    await ensureEventsSeeded();
    const events = await prisma.event.findMany({
      orderBy: { date: "desc" },
    });
    
    // Parse previewPhotos back to string[] for frontend consumption
    const formatted = events.map((ev) => {
      let parsedPhotos: string[] = [];
      try {
        parsedPhotos = typeof ev.previewPhotos === "string" ? JSON.parse(ev.previewPhotos) : ev.previewPhotos;
      } catch (e) {
        parsedPhotos = [];
      }
      return {
        ...ev,
        previewPhotos: parsedPhotos,
      };
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, date, location, description, category, previewPhotos, gdriveUrl } = body;

    if (!title || !date) {
      return NextResponse.json({ error: "Judul dan tanggal kegiatan wajib diisi" }, { status: 400 });
    }

    const newEvent = await prisma.event.create({
      data: {
        title,
        date,
        location: location || "",
        description: description || "",
        category: category || "Kegiatan",
        previewPhotos: JSON.stringify(previewPhotos || []),
        gdriveUrl: gdriveUrl || "",
      },
    });

    return NextResponse.json({
      ...newEvent,
      previewPhotos: Array.isArray(previewPhotos) ? previewPhotos : [],
    }, { status: 201 });
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json({ error: "Gagal membuat kegiatan" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, previewPhotos, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    const dataToUpdate: any = { ...rest };
    if (previewPhotos !== undefined) {
      dataToUpdate.previewPhotos = JSON.stringify(previewPhotos);
    }

    const updated = await prisma.event.update({
      where: { id },
      data: dataToUpdate,
    });

    let parsedPhotos = [];
    try {
      parsedPhotos = JSON.parse(updated.previewPhotos);
    } catch (e) {
      parsedPhotos = [];
    }

    return NextResponse.json({
      ...updated,
      previewPhotos: parsedPhotos,
    });
  } catch (error) {
    console.error("PATCH /api/events error:", error);
    return NextResponse.json({ error: "Gagal memperbarui kegiatan" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/events error:", error);
    return NextResponse.json({ error: "Gagal menghapus kegiatan" }, { status: 500 });
  }
}
