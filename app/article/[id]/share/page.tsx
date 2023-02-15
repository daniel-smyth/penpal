import { ImageGenerator } from "@components/app/article";
import { getArticle } from "../layout";

async function ArticlePage({ params: { id } }: { params: { id: string } }) {
  const article = await getArticle(id);

  return <ImageGenerator article={JSON.parse(JSON.stringify(article))} />;
}

export default ArticlePage;
