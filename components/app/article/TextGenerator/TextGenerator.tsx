'use client';

import { ChangeEvent, FC } from 'react';
import { useArticle } from '@lib/hooks';
import { fetcher } from '@lib/fetcher';
import { ITextQuery } from '@lib/database/models/query/query.model';

interface EditArticleInputsProps {
  articleId: string;
}

const EditArticleInputs: FC<EditArticleInputsProps> = ({ articleId }) => {
  const { article, mutate } = useArticle(articleId);

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateCompletion = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const response: ITextQuery = await fetcher({
        url: '/api/ai/text',
        params: {
          prompt: e.target.value,
          articleId: article._id
        }
      });
      mutate({
        ...article,
        text: {
          current: response,
          history: [...article.text.history, response]
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
        <li key={i}>{prompt.input}</li>
      ))}
    </>
  );
};

export default EditArticleInputs;
