import mongoose from "mongoose";
import { articleService } from "@lib/database/services";
import {
  ImageGenerator,
  ShareArticle,
  TextGenerator,
} from "@components/app/article";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI undefined. Please add to .env file");
}

async function getArticle(id: string) {
  if (mongoose.isValidObjectId(id)) {
    try {
      mongoose.connect(MONGODB_URI!);
      const article = await articleService.get(id);
      if (!article) {
        throw new Error("article not found");
      }
      return article.toObject();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

async function ArticlePage({ params: { id } }: { params: { id: string } }) {
  const article = await getArticle(id);

  if (!article || JSON.stringify(article) === "{}") {
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
