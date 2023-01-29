'use client';

import React from 'react';
import { mutate } from 'swr';
import { IArticle } from '@lib/database/models';

interface ArticleListItemProps {
  article: IArticle;
}

const fetcher = (id: string) =>
  fetch(`/api/article?id=${id}`, { method: 'DELETE' }).then((res) =>
    res.json()
  );

const ArticleListItem: React.FC<ArticleListItemProps> = ({ article }) => {
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
