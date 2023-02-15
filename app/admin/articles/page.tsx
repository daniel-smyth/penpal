import React from "react";
import { getUser } from "@lib/auth";
import { ArticleList, LoadingPage } from "@components/app/admin/articles";

export default async function ArticlesPage() {
  const user = await getUser();

  if (!user) {
    return <main>Not logged in</main>;
  }

  return (
    <div className="fixed bottom-0 left-0 h-full w-full">
      <div className="h-full w-full pt-16">
        <ArticleList />
      </div>
    </div>
  );
  return <LoadingPage />;
}
