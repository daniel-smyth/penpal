import mongoose from "mongoose";
import { articleService } from "@lib/database/services";
import { TextGenerator } from "@components/app/articles";
import { Hero } from "@components/app/home";
import { makeArticle } from "@tests/helpers";
import { Input } from "@components/ui/server";
import { SendIcon } from "lucide-react";

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

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex h-full align-bottom"></div>
      <div className="fixed bottom-0 left-64 right-0 z-0 flex h-48 items-center justify-center bg-gray-900 text-center">
        <Input type="email" width="w-8/12" Icon={SendIcon} />
      </div>
    </div>
  );
}

export default ArticlePage;
