import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET( request: NextRequest, { params }: { params: { id: string } }) {
  const user = await prisma.user
    .findUnique({ where: { id: parseInt(params.id) }});

  if (!user)
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
    console.log(user)
  return NextResponse.json(user);
}