'use client';

import React, { FC } from 'react';

interface ArticleListItemProps {
  article: string;
}

const ArticleListItem: FC<ArticleListItemProps> = ({ article }) => {
  return <>{article}</>;
};

export default ArticleListItem;
