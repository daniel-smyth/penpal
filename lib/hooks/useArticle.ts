import { ArticleJoined } from "@app/api/articles/[id]/route";
import useSWR from "swr";
import { BareFetcher, PublicConfiguration } from "swr/_internal";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useArticle = (
  id: string,
  config?: Partial<PublicConfiguration<ArticleJoined, any, BareFetcher<ArticleJoined>>>,
) => {
  const { data, mutate, error, isLoading } = useSWR<ArticleJoined>(
    `/api/articles/${id}`,
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
