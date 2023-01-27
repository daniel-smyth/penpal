'use client';

import { FC, useState } from 'react';
import { IArticle } from '@lib/database/models';
import { getSession, useSession } from 'next-auth/react';

interface ShareArticleProps {
  article: IArticle;
}

const ShareArticle: FC<ShareArticleProps> = ({ article }) => {
  const { data } = useSession();
  const [alert, setAlert] = useState('');

  const emailArticle = () => {
    if (!data?.user) {
      setAlert('Create an account to email this article');
    } else {
      setAlert('Enter an optional email to send to');
    }
  };

  return (
    <>
      <p>{alert}</p>
      <button onClick={emailArticle}>Email article</button>;
      {data?.user && <button>Email article to my email</button>}
    </>
  );
};

export default ShareArticle;
