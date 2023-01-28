'use client';

import React, { FC, useState } from 'react';
import { fetcher } from '@lib/fetcher';
import { useArticle } from '@lib/hooks';
import { IArticle } from '@lib/database/models';

interface TextGeneratorProps {
  article: IArticle;
}

const TextGenerator: FC<TextGeneratorProps> = ({ article: initialState }) => {
  const { article, mutate } = useArticle(initialState._id, {
    fallbackData: initialState
  });
  const [prompt, setPrompt] = useState(article?.text.current.input || '');
  const [error, setError] = useState('');

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateText = async () => {
    try {
      const { result } = await fetcher({
        url: '/api/ai/text',
        params: { prompt, articleId: article._id }
      });
      mutate({
        ...article,
        text: {
          current: { ...result, input: '' },
          history: [result, ...article.text.history]
        }
      });
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <>
      <strong>Error</strong>
      <br />
      <p>{error}</p>
      <strong>Current Output</strong>
      <br />
      <p>{article.text.current.output.choices[0].text}</p>
      <label htmlFor="text-generator-input">text-generator-input</label>
      <input
        id="text-generator-input"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateText}>Generate Text</button>
      <br />
      <strong>History</strong>
      {article.text.history.map((prompt, i) => (
        <li key={i}>
          <button
            onClick={() => {
              mutate({
                ...article,
                text: {
                  ...article.text,
                  current: prompt
                }
              });
              setPrompt(prompt.input);
            }}
          >
            {prompt.input}
          </button>
        </li>
      ))}
    </>
  );
};

export default TextGenerator;
