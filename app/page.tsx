import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { getUser } from '@lib/auth';

export default async function Home() {
  const user = await getUser();
  const router = useRouter();

  if (!user) {
    return (
      <Link
        href="/api/auth/signin"
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Sign in
      </Link>
    );
  }

  const createArticle = async () => {
    try {
      let res: any = await fetch('/api/article', {
        method: 'POST',
        body: JSON.stringify({
          title: 'My new article',
          email: user.email
        })
      });
      if (res.status === 200) {
        const { _id: articleId } = await res.json();
        router.push('/article/' + articleId);
      } else {
        res = await res.json();
        throw new Error(res.error);
      }
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

  return (
    <main>
      <button onClick={createArticle}>Create Article</button>
    </main>
  );
}
