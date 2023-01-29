import React from 'react';
import useSWR from 'swr';
import { IArticle } from '@lib/database/models';
import { ArticleListItem } from '@components/app/profile';

const ArticleList: React.FC = () => {
  const { data: articles } = useSWR<IArticle[]>(`/api/article`);

  if (!articles) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {articles.map((article) => (
        <ArticleListItem article={article} key={article.title} />
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
