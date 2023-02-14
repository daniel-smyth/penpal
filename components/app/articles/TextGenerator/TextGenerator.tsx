"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetcher } from "@lib/fetcher";
import { useArticle } from "@lib/hooks";
import { IArticle, ITextQuery } from "@lib/database/models";
import { Input } from "@components/ui/server";
import Balancer from "react-wrap-balancer";
import { AnimatePresence, motion } from "framer-motion";

interface TextGeneratorProps {
  article: IArticle;
}

const TextGenerator: React.FC<TextGeneratorProps> = ({
  article: fallbackData,
}) => {
  const { article, mutate } = useArticle(fallbackData._id, { fallbackData });
  const [query, setQuery] = useState({ ...fallbackData.text.current });
  const [error, setError] = useState("");
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  }, [article?.text.history]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { result } = await fetcher({
        url: "/api/ai/text",
        params: {
          input: query.input,
          articleId: article._id || "",
        },
      });
      setQuery({ ...result, input: "" });

      const newArticle = {
        ...article,
        text: {
          current: { ...result, input: "" },
          history: [...article.text.history, result],
        },
      };

      mutate(newArticle, { optimisticData: newArticle });
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  const onHistoryClick = async (query: ITextQuery) => {
    setQuery(query);

    const newArticle = {
      ...article,
      text: { ...article.text, current: query },
    };

    await fetcher({
      url: "/api/article",
      method: "PUT",
      params: { id: article._id || "" },
      body: { ...article, text: { ...article.text, current: query } },
    });
    mutate(newArticle, { optimisticData: newArticle });
  };

  return (
    <div className="flex h-screen flex-col">
      <ul ref={ulRef} className="flex-[0.6] overflow-y-auto">
        <AnimatePresence>
          {article.text.history.map((query, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="bg-gray-200 p-6 text-gray-500"
              >
                <Balancer>{query.input}</Balancer>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="bg-gray-100 p-6 text-gray-500"
              >
                <Balancer>{query.output.choices[0].text}</Balancer>
              </motion.div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="flex flex-[0.3] items-center justify-center border-t border-gray-300 bg-gray-50 text-center dark:bg-gray-900 sm:left-64">
        <form onSubmit={generateText} className="w-8/12">
          <Input
            id="text-generator-input"
            label="Enter Prompt"
            type="text"
            value={query.input}
            onChange={(e) =>
              setQuery((query) => ({ ...query, input: e.target.value }))
            }
          />
        </form>
      </div>
    </div>
  );
};

export default TextGenerator;
