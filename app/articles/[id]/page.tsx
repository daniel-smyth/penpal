import { prisma } from "@lib/prisma";

import {
  ImageGenerator,
  ShareArticle,
  TextGenerator,
} from "@components/app/article";
import { ArticleJoin } from "@app/api/articles/[id]/route";


interface ArticleRequest {
  params: {
    id: string;
  };
}

async function getArticle(id: string) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: id,
      },
      include: ArticleJoin.include,
    });

    if (!article) {
      throw new Error(`Article "${id}" not found`);
    }

    return article;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function ArticlePage({ params }: ArticleRequest) {
  const article = await getArticle(params.id);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <>
        <br />
        Title: {article.title}
        <br />
        <TextGenerator article={JSON.parse(JSON.stringify(article))} />
        <ImageGenerator article={JSON.parse(JSON.stringify(article))} />
        <ShareArticle article={JSON.parse(JSON.stringify(article))} />
      </>
    </main>
  );
}

export default ArticlePage;
