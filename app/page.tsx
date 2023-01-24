'use client';

import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import fetcher from '@lib/fetcher';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const createArticle = async () => {
    try {
      const { _id: articleId } = await fetcher({
        url: '/api/article',
        method: 'POST',
        body: {
          title: 'My new article',
          text: {
            current: 'This is my new article'
          },
          image: {
            current: 'https://picsum.photos/200/300'
          }
        }
      });
      router.push(`/article/${articleId}`);
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
