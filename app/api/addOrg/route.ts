import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
    address: z.string()
})

export async function POST(request: NextRequest) {
    const body = await request.json();
  
    const validation = schema.safeParse(body);
    if (!validation.success)
      	return NextResponse.json(
			validation.error.errors, {
        		status: 401,
			}
		);
	
    const companyName = await prisma.organization.findUnique({
      	where: { name: body.name },
	});
  
    if (companyName)
      	return NextResponse.json(
        	{ error: "Name already exists" },
        	{ status: 400 }
      	);
  
    const newOrg = await prisma.organization.create({ 
      	data: {
        	name: body.name,
			email: body.email,
			phone: body.phone,
			address: body.address
      	}
	});

    // return NextResponse.json({ username: newUser.username });
    return NextResponse.json({name: newOrg.name});
}