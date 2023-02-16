import { ImageGenerator } from "@components/app/article";
import { getArticle } from "@lib/api";

async function ArticleImagePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const article = await getArticle(id);

  return <ImageGenerator article={JSON.parse(JSON.stringify(article))} />;
}

export default ArticleImagePage;
