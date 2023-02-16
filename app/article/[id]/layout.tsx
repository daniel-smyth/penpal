import { getArticle } from "@lib/api";
import Provider from "./provider";

const APP_URL = process.env.APP_URL;

if (!APP_URL) {
  throw new Error("APP_URL undefined. Please add to .env file");
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
