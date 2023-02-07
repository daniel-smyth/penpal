import useSWR from "swr";
import { IArticle } from "@lib/database/models";
import { BareFetcher, PublicConfiguration } from "swr/_internal";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useArticle = (
  id: string,
  config?: Partial<PublicConfiguration<IArticle, any, BareFetcher<IArticle>>>,
) => {
  const { data, mutate, error, isLoading } = useSWR<IArticle>(
    `/api/article?id=${id}`,
    fetcher,
    config,
  );

  return {
    article: data,
    mutate,
    isLoading,
    isError: error,
  };
};
