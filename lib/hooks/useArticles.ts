"use client";

import useSWR from "swr";
import { BareFetcher, PublicConfiguration } from "swr/_internal";
import { fetcher } from "@lib/fetcher";
import { IArticle } from "@lib/database/models";

const fetchGet = (url: string) => fetcher({ url });

export const useArticles = (
  userId: string,
  config?: Partial<
    PublicConfiguration<IArticle[], any, BareFetcher<IArticle[]>>
  >,
) => {
  const { data, mutate, error, isLoading } = useSWR<IArticle[]>(
    `/api/article?userId=${userId}`,
    fetchGet,
    config,
  );

  return {
    articles: data,
    mutate,
    isLoading,
    isError: error,
  };
};
