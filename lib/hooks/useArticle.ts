"use client";

import useSWR from "swr";
import { BareFetcher, PublicConfiguration } from "swr/_internal";
import { fetcher } from "@lib/fetcher";
import { IArticle } from "@lib/database/models";

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
