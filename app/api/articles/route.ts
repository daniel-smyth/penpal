import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

import { authOptions } from "../auth/[...nextauth]/route";
import { ArticleJoin } from "./[id]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 404 });
    }

    const articles = await prisma.article.findMany({
      where: {
        user_id: user.id,
      },
      include: ArticleJoin.include,
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const article = await prisma.article.create({
      data: {
        user_id: user?.id,
      },
      include: ArticleJoin.include,
    });

    console.log("Article created: ", article);

    return NextResponse.json(article, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 404 });
    }

    const body = await request.json();

    const article = await prisma.article.update({
      where: {
        id: body.id,
      },
      data: body,
      include: ArticleJoin.include,
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 404 });
    }

    const body = await request.json();

    const article = await prisma.article.delete({
      where: {
        id: body.id,
      },
      include: ArticleJoin.include,
    });

    if (!article) {
      return new NextResponse("Article not found.", {
        status: 404,
      });
    }

    return NextResponse.json({ message: "Article deleted successfully." }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
