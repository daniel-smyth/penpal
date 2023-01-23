'use client';

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const createArticle = async () => {
    try {
      let res: any = await fetch('/api/article', {
        method: 'POST',
        body: JSON.stringify({
          title: 'My new article'
        })
      });
      if (res.status === 200) {
        const { _id: articleId } = await res.json();
        router.push('/create/' + articleId);
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
