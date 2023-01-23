'use client';

import { ChangeEvent } from 'react';
import { useArticle } from '@lib/hooks';

interface ArticleProps {
  params: {
    articleId: string;
  };
}

export default function Article({ params: { articleId } }: ArticleProps) {
  const { article, mutate } = useArticle(articleId);

  if (!article) {
    return null;
  }

  const generateCompletion = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let res: any = await fetch(
        '/api/ai/text' +
          new URLSearchParams({ prompt: e.target.value, articleId })
      );
      if (res.status === 200) {
        const response = await res.json();
        mutate({
          ...article,
          text: {
            current: response.choices[0].text,
            history: [
              ...article.text.history,
              {
                input: e.target.value,
                output: response
              }
            ]
          }
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

  const generateImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let res: any = await fetch(
        '/api/ai/image' +
          new URLSearchParams({ prompt: e.target.value, articleId })
      );
      if (res.status === 200) {
        const response = await res.json();
        mutate({
          ...article,
          image: {
            current: response.data.url,
            history: [
              ...article.text.history,
              {
                input: e.target.value,
                output: response
              }
            ]
          }
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
      {article.text.history.map((prompt, i) => (
        <p key={i}>{prompt.input}</p>
      ))}
      <input type="text" onChange={generateImage} />
      {article.image.history.map((prompt, i) => (
        <p key={i}>{prompt.input}</p>
      ))}
    </main>
  );
}
