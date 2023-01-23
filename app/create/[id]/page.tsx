'use client';

import { ChangeEvent } from 'react';
import { useArticle } from '@lib/hooks';

interface CreateProps {
  params: {
    articleId: string;
  };
}

export default function Create({ params: { articleId } }: CreateProps) {
  const { article, mutate } = useArticle(articleId);

  if (!article) {
    return null;
  }

  const generateCompletion = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let res: any = await fetch(
        '/api/article' +
          new URLSearchParams({ prompt: e.target.value, articleId })
      );
      if (res.status === 200) {
        const { result } = await res.json();
        mutate({
          ...article,
          history: [
            ...article.history,
            { input: e.target.value, output: result }
          ]
        });
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
      <input type="text" onChange={generateCompletion} />
      {article.history.map((prompt, i) => (
        <p key={i}>{prompt.output}</p>
      ))}
    </main>
  );
}
