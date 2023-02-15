"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "@lib/fetcher";
import { Button } from "@components/ui/server";
import { ArticleList } from "@components/app/admin/articles";

export default function ArticlesPage() {
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  const createArticle = async () => {
    try {
      setFetching(true);
      const article = {
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
      const { _id } = await fetcher({
        url: "/api/article",
        method: "POST",
        body: article,
      });
      router.push(`/article/${_id}/text`);
    } catch (err: any) {
      console.log(err);
      setFetching(false);
      throw new Error(err);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 h-full w-full sm:pl-64">
      <div className="h-4/5 overflow-y-auto pt-16">
        <ArticleList />
      </div>
      <div className="flex h-1/5 items-center justify-center border-t border-gray-300 bg-gray-50 px-6 dark:border-gray-600 dark:bg-gray-900 sm:px-12 lg:px-16">
        <Button size="large" loading={fetching} onClick={createArticle}>
          Create Article
        </Button>
      </div>
    </div>
  );
}
