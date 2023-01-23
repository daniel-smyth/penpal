import useSWR from 'swr';
import { IArticle } from '@lib/database/models';

const useArticle = (id: string) => {
  const { data, mutate, error, isLoading } = useSWR<IArticle>(
    `/api/article/${id}`
  );

  return {
    article: data,
    mutate,
    isLoading,
    isError: error
  };
};

export default useArticle;
