'use client';

import { IArticle } from '@lib/database/models';
import React, { FC } from 'react';
import useSWR, { mutate } from 'swr';

interface ArticleListItemProps {
  article: IArticle;
}

const fetcher = (id: string) =>
  fetch(`/api/article?id=${id}`, { method: 'DELETE' }).then((res) =>
    res.json()
  );

const ArticleListItem: FC<ArticleListItemProps> = ({ article }) => {
  const deleteArticle = () => {
    mutate('/api/article', fetcher(article._id), {
      optimisticData: (current: IArticle[]) => {
        return current.filter((a) => a._id !== article._id);
      }
    });
  };

  return (
    <>
      <br />
      {article.title}
      <button onClick={deleteArticle}>Delete</button>
    </>
  );
};

export default ArticleListItem;
