'use client';

import { ChangeEvent, FC } from 'react';
import { useArticle } from '@lib/hooks';
import { fetcher } from '@lib/fetcher';
import { IQuery } from '@lib/database/models';
import { ICompletionResponse, IImageResponse } from '@lib/openai';

interface EditArticleInputsProps {
  articleId: string;
}

const EditArticleInputs: FC<EditArticleInputsProps> = ({ articleId }) => {
  const { article, mutate } = useArticle(articleId);

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const response: IQuery = await fetcher({
        url: '/api/ai/image',
        params: {
          prompt: e.target.value,
          articleId: article._id
        }
      });
      mutate({
        ...article,
        image: {
          current: (response.output as IImageResponse).data.url,
          history: [...article.image.history, response]
        }
      });
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

  return (
    <>
      <p>{article.image.current}</p>
      <label htmlFor="image-generator-input">image-generator-input</label>
      <input id="image-generator-input" type="text" onChange={generateImage} />
      {article.image.history.map((prompt, i) => (
        <li key={i}>{prompt.input}</li>
      ))}
    </>
  );
};

export default EditArticleInputs;
