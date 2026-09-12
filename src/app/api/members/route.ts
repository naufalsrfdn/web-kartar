import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error("GET /api/members error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, gender, pob, dob, whatsapp, rt, photoUrl, roleTitle, isApproved } = body;

    if (!fullName || !whatsapp) {
      return NextResponse.json({ error: "Nama dan WhatsApp wajib diisi" }, { status: 400 });
    }

    const newMember = await prisma.member.create({
      data: {
        fullName,
        gender: gender || "Laki-laki",
        pob: pob || "",
        dob: dob || "",
        whatsapp,
        rt: rt || "RT 1",
        photoUrl: photoUrl || "",
        roleTitle: roleTitle || null,
        isApproved: isApproved !== undefined ? isApproved : true,
      },
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("POST /api/members error:", error);
    return NextResponse.json({ error: "Gagal membuat anggota" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    const updated = await prisma.member.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/members error:", error);
    return NextResponse.json({ error: "Gagal mengupdate anggota" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    await prisma.member.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/members error:", error);
    return NextResponse.json({ error: "Gagal menghapus anggota" }, { status: 500 });
  }
}
