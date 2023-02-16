"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { X as XIcon, Pencil as PencilIcon } from "lucide-react";
import { fetcher as fetch } from "@lib/fetcher";
import { IArticle } from "@lib/database/models";

const fetchDelete = (url: string) => fetch({ url, method: "DELETE" });

const ArticleListItem: React.FC<{ article: IArticle }> = ({ article }) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

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
    <li
      className="cursor-pointer p-4 dark:bg-gray-900 dark:hover:bg-gray-800 sm:px-6 lg:px-8"
      onClick={openArticle}
    >
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-1 dark:text-white">
          <p>{article.title === "" ? "No title" : article.title}</p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {article.updatedAt
              ? `${new Date(article.updatedAt).toLocaleString()}`
              : "No date"}
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-4 text-gray-500 dark:text-white">
          <PencilIcon onClick={deleteArticle} />
          <XIcon onClick={deleteArticle} />
        </div>
      </div>
    </li>
  );
};

export default ArticleListItem;
