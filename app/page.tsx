'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import fetcher from '@lib/fetcher';

export default function Home() {
  const { data: session } = useSession();

  const createArticle = async () => {
    try {
      const { _id: articleId } = await fetcher({
        url: '/api/article',
        method: 'POST',
        body: {
          title: 'My new article'
        }
      });
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

  return (
    <main>
      <Link
        href="/api/auth/signin"
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Sign in
      </Link>
      <Link
        href="api/auth/signout"
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        Sign out
      </Link>
      <button onClick={createArticle}>Create Article</button>
    </main>
  );
}
