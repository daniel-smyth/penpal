import { fetcher } from '@lib/fetcher';
import { IArticle } from '@lib/database/models';
import {
  ImageGenerator,
  ShareArticle,
  TextGenerator
} from '@components/app/article';

async function getArticle(id: string) {
  try {
    const article: IArticle = await fetcher({
      url: `${process.env.API_URL}/api/article`,
      params: { id }
    });
    return article;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default async function EditArticlePage({
  params: { id }
}: {
  params: { id: string };
}) {
  const article = await getArticle(id);

  return (
    <main>
      <>
        <br />
        Title: {article.title}
        <br />
        <TextGenerator article={article} />
        <ImageGenerator article={article} />
        <ShareArticle article={article} />
      </>
    </main>
  );
}
