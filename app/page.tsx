'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import { fetcher } from '@lib/fetcher';

export default function Home() {
  const router = useRouter();

  const createArticle = async () => {
    try {
      const article = {
        title: '',
        text: {
          current: { input: '', output: { choices: [{ text: '' }] } },
          history: []
        },
        image: {
          current: { input: '', output: { data: { url: '' } } },
          history: []
        }
      };
      const { _id } = await fetcher({
        url: '/api/article',
        method: 'POST',
        body: article
      });
      router.push(`/articles/${_id}`);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

  return (
    <main>
      <Link href="/profile">Profile</Link>
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
      <Link href="/admin/settings/plan"> admin/settings/plan </Link>
      <button onClick={createArticle}>Create Article</button>
    </main>
  );
}
