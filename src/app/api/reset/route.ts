import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  initialMembers,
  initialApplications,
  initialUmkm,
  initialEvents,
  initialNews,
  initialSettings,
} from "@/lib/mock-data";

export async function POST() {
  try {
    // 1. Delete all current data from SQLite database
    await prisma.contactMessage.deleteMany();
    await prisma.memberApplication.deleteMany();
    await prisma.member.deleteMany();
    await prisma.umkm.deleteMany();
    await prisma.event.deleteMany();
    await prisma.news.deleteMany();
    await prisma.setting.deleteMany();

    // 2. Re-seed default initial data
    for (const m of initialMembers) {
      await prisma.member.create({
        data: {
          id: m.id,
          fullName: m.fullName,
          gender: m.gender,
          pob: m.pob,
          dob: m.dob,
          whatsapp: m.whatsapp,
          rt: m.rt,
          photoUrl: m.photoUrl,
          roleTitle: m.roleTitle,
          isApproved: m.isApproved,
        },
      });
    }

    for (const app of initialApplications) {
      await prisma.memberApplication.create({
        data: {
          id: app.id,
          fullName: app.fullName,
          gender: app.gender,
          pob: app.pob,
          dob: app.dob,
          whatsapp: app.whatsapp,
          rt: app.rt,
          photoUrl: app.photoUrl,
          status: app.status,
        },
      });
    }

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
      message: "Database berhasil di-reset ke data awal. Password admin tetap 'artapagedev'.",
    });
  } catch (error) {
    console.error("POST /api/reset error:", error);
    return NextResponse.json({ error: "Gagal me-reset database" }, { status: 500 });
  }
}
