'use client';

import React, { FC, useState } from 'react';
import { fetcher } from '@lib/fetcher';
import { useArticle } from '@lib/hooks';
import { IArticle, ITextQuery } from '@lib/database/models';

interface TextGeneratorProps {
  article: IArticle;
}

const TextGenerator: FC<TextGeneratorProps> = ({ article: initialState }) => {
  const { article, mutate } = useArticle(initialState._id, {
    fallbackData: initialState
  });
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateText = async () => {
    try {
      const response: ITextQuery = await fetcher({
        url: '/api/ai/text',
        params: { prompt, articleId: article._id }
      });
      mutate({
        ...article,
        text: {
          current: { ...response, input: '' },
          history: [response, ...article.text.history]
        }
      });
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <>
      <p>{error}</p>
      <p>{article.text.current.output.choices[0].text}</p>
      <label htmlFor="text-generator-input">text-generator-input</label>
      <input
        id="text-generator-input"
        type="text"
        value={article.text.current.input}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {article.text.history.map((prompt, i) => (
        <li key={i}>
          <button
            onClick={() =>
              mutate({
                ...article,
                text: {
                  ...article.text,
                  current: prompt
                }
              })
            }
          >
            {prompt.input}
          </button>
        </li>
      ))}
      <button onClick={generateText}>Generate Text</button>
    </>
  );
};

export default TextGenerator;
