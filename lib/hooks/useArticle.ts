import useSWR from 'swr';
import { IArticle } from '@lib/database/models';

export const fetcher = (id: string) => fetch(id).then((res) => res.json());

export const useArticle = (id: string) => {
  const { data, mutate, error, isLoading } = useSWR<IArticle>(
    `/api/article?id=${id}`,
    fetcher
  );

  return {
    article: data,
    mutate,
    isLoading,
    isError: error
  };
};
