import React from 'react';
import { getUser } from '@lib/auth';
import { ArticleList } from '@components/app/profile';

export default async function AccountPage() {
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
