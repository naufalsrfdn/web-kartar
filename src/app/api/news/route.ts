import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialNews } from "@/lib/mock-data";

async function ensureNewsSeeded() {
  try {
    const count = await prisma.news.count();
    if (count === 0) {
      for (const n of initialNews) {
        await prisma.news.create({
          data: {
            id: n.id,
            title: n.title,
            slug: n.slug,
            thumbnail: n.thumbnail,
            content: n.content,
            date: n.date,
            category: n.category,
          },
        });
      }
    }
  } catch (err) {
    console.warn("News seed note:", err);
  }
}

export async function GET() {
  try {
    await ensureNewsSeeded();
    const articles = await prisma.news.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("GET /api/news error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, thumbnail, content, date, category } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Judul dan isi berita wajib diisi" }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Date.now();

    const newNews = await prisma.news.create({
      data: {
        title,
        slug: generatedSlug,
        thumbnail: thumbnail || "",
        content,
        date: date || new Date().toISOString().split("T")[0],
        category: category || "Kegiatan",
      },
    });

    return NextResponse.json(newNews, { status: 201 });
  } catch (error) {
    console.error("POST /api/news error:", error);
    return NextResponse.json({ error: "Gagal menerbitkan berita" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    const updated = await prisma.news.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/news error:", error);
    return NextResponse.json({ error: "Gagal memperbarui berita" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    await prisma.news.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/news error:", error);
    return NextResponse.json({ error: "Gagal menghapus berita" }, { status: 500 });
  }
}
