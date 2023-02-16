import mongoose from "mongoose";
import { fetcher } from "@lib/fetcher";
import { IArticle } from "@lib/database/models";

let APP_URL = process.env.APP_URL;

if (!APP_URL) {
  APP_URL = process.env.NEXT_PUBLIC_APP_URL;
}

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

export async function getArticles(id: string) {
  try {
    const articles = await fetcher({
      url: `${APP_URL}/api/article`,
      params: { userId: id },
    });
    if (!articles) {
      throw new Error("no articles");
    }
    return articles;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createArticle(article?: IArticle) {
  try {
    const newArticle = article || {
      title: "",
      text: {
        current: { input: "", output: { choices: [{ text: "" }] } },
        history: [],
      },
      image: {
        current: { input: "", output: { data: { url: "" } } },
        history: [],
      },
    };
    return await fetcher({
      url: "/api/article",
      method: "POST",
      body: newArticle,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
