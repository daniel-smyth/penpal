import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("user_id");

    if (!userId) {
      return new NextResponse("`user_id` is required", {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse("User not found.", {
        status: 404,
      });
    }

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const user = await prisma.user.create({
      data: body,
    });

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const user = await prisma.user.update({
      where: {
        id: body.id,
      },
      data: body,
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("user_id");

    if (!userId) {
      return new NextResponse("`user_id` is required", {
        status: 400,
      });
    }

    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
