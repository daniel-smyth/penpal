import { ArticleList, ArticleListItem } from '@components/app/profile';
import { getUser } from '@lib/auth';
import { IArticle } from '@lib/database/models';
import { fetcher } from '@lib/fetcher';
import { ObjectId } from 'mongodb';
import React from 'react';

// async function getArticles() {
//   try {
//     const articles: IArticle[] = await fetcher({
//       url: `http://localhost:3000/api/article`
//     });
//     return articles;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }

export default async function ProfilePage() {
  const user = await getUser();
  // const articles = await getArticles();

  if (!user) {
    return <main>Not logged in</main>;
  }

  console.log(user);

  return (
    <main>
      Name: {user.name}
      <br />
      Email: {user.email}
      <br />
      Articles:
      <ArticleList>
        {(user.articles as ObjectId[]).map((article) => {
          return (
            <React.Fragment key={article.toString()}>
              <br /> <ArticleListItem article={article.toString()} />
            </React.Fragment>
          );
        })}
      </ArticleList>
    </main>
  );
}
