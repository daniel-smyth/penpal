"use client";

import React from "react";
import useSWR from "swr";
import { IArticle } from "@lib/database/models";
import ArticleListItem from "./ArticleListItem/ArticleListItem";

const fetchGet = (url: string) => fetch(url).then((res) => res.json());

interface ArticleListProps {
  articles?: IArticle[];
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles: fallbackData,
}) => {
  const { data: articles } = useSWR<IArticle[]>(`/api/article`, fetchGet, {
    fallbackData,
  });

  return (
    <ul className="divide-y divide-gray-300 dark:divide-gray-700">
      {articles?.map((article) => (
        <ArticleListItem article={article} key={article._id} />
      ))}
    </ul>
  );
};

export default ArticleList;
