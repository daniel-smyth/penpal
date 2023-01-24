import fetcher from '@lib/fetcher';
import { IArticle } from '@lib/database/models';
import { EditArticleInputs } from '@components/app';

interface EditArticleProps {
  params: {
    id: string;
  };
}

async function getArticle(id: string) {
  try {
    const article: IArticle = await fetcher({
      url: `http://localhost:3000/api/article`,
      params: {
        id
      }
    });
    return article;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default async function EditArticle({
  params: { id }
}: EditArticleProps) {
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
        <EditArticleInputs articleId={article._id} />
      </>
    </main>
  );
}
