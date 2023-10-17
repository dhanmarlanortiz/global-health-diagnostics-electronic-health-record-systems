import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  	const users = await prisma.user.findMany({
		include: {
			organization: true
		}
	});
	
  	return NextResponse.json(users);
}
