import { fetcher } from '@lib/fetcher';
import { Article, IArticle } from '@lib/database/models';
import {
  ImageGenerator,
  ShareArticle,
  TextGenerator
} from '@components/app/article';
import { articleService } from '@lib/database/services';
import { useArticle } from '@lib/hooks';

export default function EditArticlePage({
  params: { id }
}: {
  params: { id: string };
}) {
  const { article, mutate } = useArticle(id);

  if (!article) {
    return <div>Loading...</div>;
  }

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
