"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "@lib/fetcher";
import { IArticle } from "@lib/database/models";
import { useArticles, useWindowSize } from "@lib/hooks";
import { LoadingPage } from "@components/layouts/admin";
import { Table } from "@components/ui/client";

const fetchDelete = (url: string) => fetcher({ url, method: "DELETE" });

interface ArticleListProps {
  userId: string;
  fallbackData?: IArticle[];
}

const ArticleList: React.FC<ArticleListProps> = ({ userId, fallbackData }) => {
  const { articles, mutate, isLoading } = useArticles(userId, { fallbackData });
  const { isMobile } = useWindowSize();
  const router = useRouter();

  if (!articles || isLoading) {
    return <LoadingPage />;
  }

  const openArticle = async (_id: string) => {
    router.push(`/article/${_id}/text`);
  };

  const editArticle = async (_id: string) => {
    console.log(_id);
  };

  const deleteArticle = async (_id: string) => {
    try {
      mutate(fetchDelete(`/api/article?id=${_id}`), {
        populateCache: (_r, a: IArticle[] = []) => {
          return a.filter((a) => a._id !== _id);
        },
        revalidate: false,
      });
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

  return (
    <ul className="divide-y divide-gray-300 py-4 dark:divide-gray-700">
      <Table
        headers={
          isMobile
            ? ["Title", "Action"]
            : ["Title", "Created At", "Last Updated", "Action"]
        }
        rows={articles.map((article, i) => {
          const row: (string | React.ReactNode)[] = [
            article.title || "No Title",
          ];

          if (!isMobile) {
            row.push(article.createdAt);
            row.push(article.updatedAt);
          }

          row.push(
            <div className="flex gap-4" key={article.updatedAt}>
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                onClick={(e) => {
                  e.stopPropagation();
                  editArticle(article._id);
                }}
              >
                Edit
              </a>
              <a
                href="#"
                className="font-medium text-red-600 hover:underline dark:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteArticle(article._id);
                }}
              >
                Delete
              </a>
            </div>,
          );

          return row;
        })}
        onRowClick={(row) => {
          const article = articles.find(
            (a) => a.createdAt === row[1] && a.updatedAt === row[2],
          )!;
          openArticle(article!._id);
        }}
      />
    </ul>
  );
};

export default ArticleList;
