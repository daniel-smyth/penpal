'use client';

import React from 'react';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/navigation';
import { fetcher } from '@lib/fetcher';
import { IArticle } from '@lib/database/models';

const deleteFetcher = (id: string) =>
  fetcher({ url: `/api/article?id=${id}`, method: 'DELETE' });

interface ArticleListItemProps {
  article: IArticle;
}

const ArticleListItem: React.FC<ArticleListItemProps> = ({ article }) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const openArticle = () => {
    router.push(`/article/${article._id}`);
  };

  const deleteArticle = async () => {
    try {
      mutate('/api/article', deleteFetcher(article._id || ''), {
        populateCache: (_r, articles: IArticle[] = []) => {
          return articles.filter((a) => a._id !== article._id);
        },
        revalidate: false
      });
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

  return (
    <>
      <div onClick={openArticle}>
        <br />
        <p>{article.title}</p>
      </div>
      <button onClick={deleteArticle}>Delete</button>
    </>
  );
};

export default ArticleListItem;
