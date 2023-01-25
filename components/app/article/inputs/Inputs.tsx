'use client';

import { ChangeEvent, FC } from 'react';
import { useArticle } from '@lib/hooks';
import fetcher from '@lib/fetcher';
import { IQuery } from '@lib/database/models';
import { ICompletionResponse, IImageResponse } from '@lib/openai';

interface EditArticleProps {
  articleId: string;
}

const EditArticleInputs: FC<EditArticleProps> = ({ articleId }) => {
  const { article, mutate } = useArticle(articleId);

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateCompletion = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const response: IQuery = await fetcher({
        url: '/api/ai/text',
        params: {
          prompt: e.target.value,
          articleId: article._id
        }
      });
      mutate({
        ...article,
        text: {
          current: (response.output as ICompletionResponse).choices[0].text,
          history: [...article.text.history, response]
        }
      });
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

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
      <input
        type="text"
        onChange={generateCompletion}
        placeholder="Enter completion text"
      />
      {article.text.history.map((prompt, i) => (
        <p key={i}>{prompt.input}</p>
      ))}
      <input
        type="text"
        onChange={generateImage}
        placeholder="Enter image text"
      />
      {article.image.history.map((prompt, i) => (
        <p key={i}>{prompt.input}</p>
      ))}
    </>
  );
};

export default EditArticleInputs;
