import React from 'react';
import { getUser } from '@lib/auth';
import { ArticleList, ArticleListItem } from '@components/app/profile';

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    return <main>Not logged in</main>;
  }

  return (
    <main>
      Name: {user.name}
      <br />
      Email: {user.email}
      <br />
      Articles:
      <ArticleList />
    </main>
  );
}
