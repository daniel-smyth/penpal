"use client";

import React from "react";
import useSWR from "swr";
import { IArticle } from "@lib/database/models";
import { ArticleListItem } from "@components/app/admin/account";

const fetchGet = (url: string) => fetch(url).then((res) => res.json());

const ArticleList: React.FC = () => {
  const { data: articles } = useSWR<IArticle[]>(`/api/article`, fetchGet);

  if (!articles) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="max-w-md divide-y divide-gray-300 dark:divide-gray-700">
      {articles.map((article) => (
        <ArticleListItem article={article} key={article._id} />
      ))}
    </ul>
  );
};

export default ArticleList;
