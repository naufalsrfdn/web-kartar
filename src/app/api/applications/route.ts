import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialApplications } from "@/lib/mock-data";

async function ensureApplicationsSeeded() {
  try {
    const count = await prisma.memberApplication.count();
    if (count === 0) {
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
            createdAt: app.createdAt ? new Date(app.createdAt) : new Date(),
          },
        });
      }
    }
  } catch (err) {
    console.warn("Application seed note:", err);
  }
}

export async function GET() {
  try {
    await ensureApplicationsSeeded();
    const apps = await prisma.memberApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(apps);
  } catch (error) {
    console.error("GET /api/applications error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, gender, pob, dob, whatsapp, rt, photoUrl } = body;

    if (!fullName || !whatsapp || !rt) {
      return NextResponse.json({ error: "Data wajib tidak lengkap" }, { status: 400 });
    }

    const newApp = await prisma.memberApplication.create({
      data: {
        fullName,
        gender: gender || "Laki-laki",
        pob: pob || "",
        dob: dob || "",
        whatsapp,
        rt,
        photoUrl: photoUrl || "",
        status: "PENDING",
      },
    });

    return NextResponse.json(newApp, { status: 201 });
  } catch (error) {
    console.error("POST /api/applications error:", error);
    return NextResponse.json({ error: "Gagal memproses pendaftaran" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, note } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status required" }, { status: 400 });
    }

    const updatedApp = await prisma.memberApplication.update({
      where: { id },
      data: { status, note },
    });

    // If APPROVED, create member entry in database
    if (status === "APPROVED") {
      const existingMember = await prisma.member.findFirst({
        where: { fullName: updatedApp.fullName, whatsapp: updatedApp.whatsapp },
      });

      if (!existingMember) {
        await prisma.member.create({
          data: {
            fullName: updatedApp.fullName,
            gender: updatedApp.gender,
            pob: updatedApp.pob,
            dob: updatedApp.dob,
            whatsapp: updatedApp.whatsapp,
            rt: updatedApp.rt,
            photoUrl: updatedApp.photoUrl,
            isApproved: true,
          },
        });
      }
    }

    return NextResponse.json(updatedApp);
  } catch (error) {
    console.error("PATCH /api/applications error:", error);
    return NextResponse.json({ error: "Gagal memperbarui status pendaftaran" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID mandatory" }, { status: 400 });
    }

    await prisma.memberApplication.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/applications error:", error);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
