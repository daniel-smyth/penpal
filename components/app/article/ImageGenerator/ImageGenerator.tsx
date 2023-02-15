"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fetcher } from "@lib/fetcher";
import { useArticle } from "@lib/hooks";
import { IArticle, IImageQuery } from "@lib/database/models";
import { Input } from "@components/ui/server";
import Balancer from "react-wrap-balancer";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";

interface ImageGeneratorProps {
  article: IArticle;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  article: fallbackData,
}) => {
  const { data: session } = useSession();
  const { email, image } = session?.user || {};
  const { article, mutate } = useArticle(fallbackData._id, { fallbackData });
  const [query, setQuery] = useState({ ...fallbackData.image.current });
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [article?.image.history]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { result } = await fetcher({
        url: "/api/ai/image",
        params: {
          input: query.input,
          articleId: article._id || "",
        },
      });
      setQuery({ ...result, input: "" });

      const newArticle = {
        ...article,
        image: {
          current: { ...result, input: "" },
          history: [...article.image.history, result],
        },
      };

      mutate(newArticle, { optimisticData: newArticle });
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  const onHistoryClick = async (query: IImageQuery) => {
    setQuery(query);

    const newArticle = {
      ...article,
      image: { ...article.image, current: query },
    };

    await fetcher({
      url: "/api/article",
      method: "PUT",
      params: { id: article._id || "" },
      body: { ...article, image: { ...article.image, current: query } },
    });
    mutate(newArticle, { optimisticData: newArticle });
  };

  return (
    <div className="fixed bottom-0 left-0 h-full w-full">
      <div className="flex h-4/5 items-center justify-center overflow-y-auto pt-16">
        <ul className="max-h-4/5 h-full w-full">
          <AnimatePresence>
            {article.image.history.map((query, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex"></div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex items-center gap-3 bg-gray-200 py-6 px-4 text-gray-500 sm:px-6 lg:px-8"
                >
                  <Image
                    className="h-7 w-7 rounded-full"
                    alt={email || ""}
                    src={
                      image ||
                      `https://avatars.dicebear.com/api/micah/${email}.svg`
                    }
                    width={21}
                    height={21}
                  />
                  <Balancer>{query.input}</Balancer>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="bg-gray-100 py-6 px-4 text-gray-500 sm:px-6 lg:px-8"
                >
                  <Balancer>{query.output.data.url}</Balancer>
                </motion.div>
              </motion.li>
            ))}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </ul>
      </div>
      <div className="flex h-1/5 items-center justify-center border-t border-gray-300 bg-gray-50 px-6 dark:border-gray-600 dark:bg-gray-900 sm:px-12 lg:px-16">
        <form onSubmit={generateImage} className="w-full">
          <Input
            id="image-generator-input"
            label="Generate Image"
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

export default ImageGenerator;
