import React from "react";
// import { fetcher } from "@lib/fetcher";
import { ArticleList, CreateButton } from "@components/app/admin/articles";

// const APP_URL = process.env.APP_URL;

// if (!APP_URL) {
//   throw new Error("APP_URL undefined. Please add to .env file");
// }

// export async function getArticles() {
//   try {
//     const articles = await fetcher({
//       url: `${APP_URL}/api/article`,
//     });
//     if (!articles) {
//       throw new Error("no articles");
//     }
//     return articles;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }

export default async function ArticlesPage() {
  // const articles = await getArticles();

  // return <LoadingPage />;

  return (
    <div className="fixed bottom-0 left-0 h-full w-full sm:pl-64">
      <div className="h-4/5 overflow-y-auto pt-16 sm:h-full">
        <ArticleList />
      </div>
      <div className="flex h-1/5 items-center justify-center border-t border-gray-300 bg-gray-50 px-6 dark:border-gray-600 dark:bg-gray-900 sm:hidden sm:px-12 lg:px-16">
        <CreateButton>Create Article</CreateButton>
      </div>
    </div>
  );
}
