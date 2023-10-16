import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";
import bcrypt from 'bcrypt';
import prisma from "@/prisma/client";

const schema = z.object({
    email: z.string().email(),
    username: z.string().min(1),
    role: z.number(),
    isActive: z.number().default(1),
    password: z.string().min(1),
    organizationId: number()
})

export async function POST(request: NextRequest) {
    const body = await request.json();
  
    const validation = schema.safeParse(body);
    if (!validation.success)
      	return NextResponse.json(validation.error.errors, {
        	status: 400,
		});
	
    const user = await prisma.user.findUnique({
      	where: { username: body.username },
	});
  
    if (user)
      	return NextResponse.json(
        	{ error: "User already exists" },
        	{ status: 400 }
      	);
  
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({ 
      	data: {
        	username: body.username,
			email: body.email,
			role: body.role,
			isActive: body.isActive,
			password: body.password,
			organizationId: body.organizationId,
        	hashedPassword	
      	}
	});

    // return NextResponse.json({ username: newUser.username });
    return NextResponse.json({});
}