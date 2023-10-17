import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET( request: NextRequest, { params }: { params: { id: string } }) {
  const org = await prisma.organization
    .findUnique({ where: { id: parseInt(params.id) }});

  if (!org)
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  return NextResponse.json(org);
}