import { useRouter } from 'next/router';
import { fetcher } from '@lib/fetcher';
import React from 'react';

const HeroButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const article = {
        title: '',
        text: {
          current: { input: '', output: { choices: [{ text: '' }] } },
          history: []
        },
        image: {
          current: { input: '', output: { data: { url: '' } } },
          history: []
        }
      };
      const { _id } = await fetcher({
        url: '/api/article',
        method: 'POST',
        body: article
      });
      router.push(`/articles/${_id}`);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

  return <button onClick={handleClick}>{children}</button>;
};

export default HeroButton;
