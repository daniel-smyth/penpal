import useSWR from 'swr';
import { IArticle } from '@lib/database/models';

const useArticle = () => {
  const { data, mutate, error, isLoading } = useSWR<IArticle>('/api/article');

  return {
    article: data,
    mutate,
    isLoading,
    isError: error
  };
};

export default useArticle;
