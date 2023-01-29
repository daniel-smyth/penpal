import React from 'react';

const ArticleList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// ArticleList.auth = {
//   role: 'admin',
//   loading: <></>,
//   unauthorized: '/login' // redirect to this url
// };

export default ArticleList;
