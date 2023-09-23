import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

import { authOptions } from "../../auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";

export const ArticleJoin = Prisma.validator<Prisma.ArticleDefaultArgs>()({
  include: {
    image_queries: true,
    text_queries: true,
  },
});

export type ArticleJoined = Prisma.ArticleGetPayload<typeof ArticleJoin>;

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const articleId = url.pathname.split("/").at(-1);

    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: ArticleJoin.include,
    });

    if (!article) {
      return new NextResponse("Article not found.", {
        status: 404,
      });
    }

    return NextResponse.json(article);
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return new NextResponse("Unauthorized.", {
        status: 404,
      });
    }

    const body = await request.json();

    const article = await prisma.article.create({
      data: {
        ...body,
        user_id: user.id,
      },
    });

    return NextResponse.json(article, {
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
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return new NextResponse("Unauthorized.", {
        status: 404,
      });
    }

    const body = await request.json();

    const article = await prisma.article.update({
      where: {
        id: body.id,
      },
      data: body,
    });

    if (!article) {
      return new NextResponse("Article not found.", {
        status: 404,
      });
    }

    return NextResponse.json(article, {
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
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return new NextResponse("Unauthorized.", {
        status: 404,
      });
    }

    const body = await request.json();

    const article = await prisma.article.delete({
      where: {
        id: body.id,
      },
    });

    if (!article) {
      return new NextResponse("Article not found.", {
        status: 404,
      });
    }

    return NextResponse.json(
      { message: "Article deleted successfully." },
      {
        status: 200,
      },
    );
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
