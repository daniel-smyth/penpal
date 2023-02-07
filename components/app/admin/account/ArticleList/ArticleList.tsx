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
    <>
      {articles.map((article) => (
        <ArticleListItem article={article} key={article._id} />
      ))}
    </>
  );
};

// ArticleList.auth = {
//   role: 'admin',
//   loading: <></>,
//   unauthorized: '/login' // redirect to this url
// };

export default ArticleList;
