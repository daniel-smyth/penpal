import React from "react";
import { getUser } from "@lib/auth";
import { getArticles } from "@lib/api";
import { ArticleList, CreateButton } from "@components/app/admin/articles";

export default async function ArticlesPage() {
  const user = await getUser();
  const articles = await getArticles(user?.id!);

  return (
    <div className="fixed bottom-0 left-0 h-full w-full sm:pl-64">
      <div className="h-4/5 overflow-y-auto pt-16 sm:h-full">
        <ArticleList userId={user?.id!} fallbackData={articles} />
      </div>
      <div className="flex h-1/5 items-center justify-center border-t border-gray-300 bg-gray-50 px-6 dark:border-gray-600 dark:bg-gray-900 sm:hidden sm:px-12 lg:px-16">
        <CreateButton>Create Article</CreateButton>
      </div>
    </div>
  );
}
