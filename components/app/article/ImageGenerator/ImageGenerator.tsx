'use client';

import { FC, useState } from 'react';
import { fetcher } from '@lib/fetcher';
import { useArticle } from '@lib/hooks';
import { IArticle, IImageQuery } from '@lib/database/models';

interface ImageGeneratorProps {
  article: IArticle;
}

const ImageGenerator: FC<ImageGeneratorProps> = ({ article: initialData }) => {
  const { article, mutate } = useArticle(initialData._id, {
    fallbackData: initialData
  });
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateImage = async () => {
    try {
      const response: IImageQuery = await fetcher({
        url: '/api/ai/image',
        params: { prompt, articleId: article._id }
      });
      mutate({
        ...article,
        image: {
          current: response,
          history: [...article.image.history, response]
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
      <p>{article.image.current.output.data.url}</p>
      <label htmlFor="image-generator-input">image-generator-input</label>
      <input
        id="image-generator-input"
        type="text"
        value={article.image.current.input}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {article.image.history.map((prompt, i) => (
        <li key={i}>
          <button
            onClick={() =>
              mutate({
                ...article,
                image: {
                  ...article.image,
                  current: prompt
                }
              })
            }
          >
            {prompt.input}
          </button>
        </li>
      ))}
      <button onClick={generateImage}>Generate Image</button>
    </>
  );
};

export default ImageGenerator;
