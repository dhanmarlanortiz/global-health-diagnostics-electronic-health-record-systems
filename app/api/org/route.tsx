import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const orgs = await prisma.organization.findMany();
  return NextResponse.json(orgs);
}