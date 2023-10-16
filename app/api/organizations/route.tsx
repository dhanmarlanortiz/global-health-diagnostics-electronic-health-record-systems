import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET() {
  	const users = await prisma.organization.findMany();
	
  	return NextResponse.json(users);
}