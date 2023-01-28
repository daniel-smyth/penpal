'use client';

import { FC, useState } from 'react';
import { fetcher } from '@lib/fetcher';
import { useArticle } from '@lib/hooks';
import { IArticle } from '@lib/database/models';

interface ImageGeneratorProps {
  article: IArticle;
}

const ImageGenerator: FC<ImageGeneratorProps> = ({ article: initialData }) => {
  const { article, mutate } = useArticle(initialData._id, {
    fallbackData: initialData
  });
  const [prompt, setPrompt] = useState(article?.image.current.input || '');
  const [error, setError] = useState('');

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateImage = async () => {
    try {
      const { result } = await fetcher({
        url: '/api/ai/image',
        params: { prompt, articleId: article._id }
      });
      mutate({
        ...article,
        image: {
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
      <p>{article.image.current.output.data.url}</p>
      <label htmlFor="image-generator-input">image-generator-input</label>
      <input
        id="image-generator-input"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage}>Generate Image</button>
      {article.image.history.map((prompt, i) => (
        <li key={i}>
          <button
            onClick={() => {
              mutate({
                ...article,
                image: {
                  ...article.image,
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

export default ImageGenerator;
