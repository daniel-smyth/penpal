import mongoose from "mongoose";
import { fetcher } from "@lib/fetcher";
import Provider from "./provider";

const APP_URL = process.env.APP_URL;

if (!APP_URL) {
  throw new Error("APP_URL undefined. Please add to .env file");
}

export async function getArticle(id: string) {
  if (mongoose.isValidObjectId(id)) {
    try {
      const article = await fetcher({
        url: `${APP_URL}/api/article`,
        params: { id },
      });
      if (!article) {
        throw new Error("article not found");
      }
      return article;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default async function ArticleLayout({
  params: { id },
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  await getArticle(id);

  return <Provider>{children}</Provider>;
}
