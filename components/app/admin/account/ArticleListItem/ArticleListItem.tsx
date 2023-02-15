"use client";

import React from "react";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { fetcher as fetch } from "@lib/fetcher";
import { IArticle } from "@lib/database/models";
import { X as XIcon } from "lucide-react";

const fetchDelete = (url: string) => fetch({ url, method: "DELETE" });

const ArticleListItem: React.FC<{ article: IArticle }> = ({ article }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const openArticle = () => {
    router.push(`/article/${article._id}/text`);
  };

  const deleteArticle = async () => {
    try {
      mutate("/api/article", fetchDelete(`/api/article?id=${article._id}`), {
        populateCache: (_r, a: IArticle[] = []) => {
          return a.filter((a) => a._id !== article._id);
        },
        revalidate: false,
      });
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

  return (
    <li className="p-3">
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-1" onClick={openArticle}>
          <p>{article.title === "" ? "No title" : article.title}</p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {article.updatedAt?.toDateString() || "No date"}
          </p>
        </div>
        <div className="flex-shrink-0">
          <XIcon onClick={deleteArticle} />
        </div>
      </div>
    </li>
  );
};

export default ArticleListItem;
