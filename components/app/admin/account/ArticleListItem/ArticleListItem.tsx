'use client';

import React from 'react';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/navigation';
import { fetcher as fetch } from '@lib/fetcher';
import { IArticle } from '@lib/database/models';

const fetchDelete = (url: string) => fetch({ url, method: 'DELETE' });

const ArticleListItem: React.FC<{ article: IArticle }> = ({ article }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const openArticle = () => {
    router.push(`/article/${article._id}`);
  };

  const deleteArticle = async () => {
    try {
      mutate('/api/article', fetchDelete(`/api/article?id=${article._id}`), {
        populateCache: (_r, a: IArticle[] = []) => {
          return a.filter((a) => a._id !== article._id);
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
