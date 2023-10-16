import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });

  const org = await prisma.organization.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!org)
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );

  const updatedUser = await prisma.organization.update({
    where: { id: org.id },
    data: {
      name: body.name,
      email: body.email
    }
  })

  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const org = await prisma.organization.findUnique({
    where: { id: parseInt(params.id) }
  })
  
  if (!org)
    return NextResponse.json(
      { error: "Organization not found" },
      { status: 404 }
    );

  await prisma.organization.delete({ 
    where: { id: org.id }
  });

  return NextResponse.json({});
}