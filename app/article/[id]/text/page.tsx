import { getArticle } from "@lib/api";
import { TextGenerator } from "@components/app/article";

async function ArticleTextPage({ params: { id } }: { params: { id: string } }) {
  const article = await getArticle(id);

  return <TextGenerator article={JSON.parse(JSON.stringify(article))} />;
}

export default ArticleTextPage;
