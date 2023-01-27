import { fetcher } from '@lib/fetcher';
import { IArticle } from '@lib/database/models';
import { ImageGenerator, TextGenerator } from '@components/app/article';

async function getArticle(id: string) {
  try {
    const article: IArticle = await fetcher({
      url: `http://localhost:3000/api/article`,
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
        Text: {article.text.current}
        <br />
        Text: {article.image.current}
        <br />
        <TextGenerator article={article} />
        <ImageGenerator article={article} />
      </>
    </main>
  );
}
