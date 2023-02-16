"use client";

import React from "react";
import { IArticle } from "@lib/database/models";
import { useArticles } from "@lib/hooks";
import { LoadingPage } from "@components/layouts/dashboard";
import ArticleListItem from "./ArticleListItem/ArticleListItem";
import { X as XIcon, Pencil as PencilIcon } from "lucide-react";

interface ArticleListProps {
  userId: string;
  fallbackData?: IArticle[];
}

const ArticleList: React.FC<ArticleListProps> = ({ userId, fallbackData }) => {
  const { articles, isLoading } = useArticles(userId, { fallbackData });

  return (
    <ul className="divide-y divide-gray-300 dark:divide-gray-700">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {/* <li className="cursor-pointer p-4 dark:bg-gray-900 dark:hover:bg-gray-800 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1 dark:text-white">
                <p>Title</p>
              </div>
              <div className="flex flex-shrink-0 gap-4 text-gray-500 dark:text-white">
                Actions
              </div>
            </div>
          </li> */}
          {articles?.map((article) => (
            <ArticleListItem article={article} key={article._id} />
          ))}
        </>
      )}
    </ul>
  );
};

export default ArticleList;
