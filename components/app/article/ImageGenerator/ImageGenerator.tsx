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
import MockOutput from "../MockOutput/MockOutput";
import Output from "../Output/Output";

interface ImageGeneratorProps {
  article: IArticle;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  article: fallbackData,
}) => {
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

  const onMockInputClick = (input: string) => {
    setQuery({ ...query, input });
  };

  return (
    <div className="fixed bottom-0 left-0 h-full w-full sm:pl-64">
      <div className="flex h-4/5 items-center justify-center overflow-y-auto pt-16">
        <ul className="max-h-4/5 h-full w-full">
          <AnimatePresence>
            <motion.div
              initial="hidden"
              whileInView="show"
              animate="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {article.text.history.length === 0 ? (
                <div className="py-8">
                  <MockOutput onClick={onMockInputClick} />
                </div>
              ) : (
                article.text.history.map((query) => (
                  <Output key={query.input} query={query} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </ul>
      </div>
      <div className="flex h-1/5 items-center justify-center border-t border-gray-300 bg-gray-50 px-6 dark:border-gray-600 dark:bg-gray-900 sm:px-12 lg:px-16">
        <form onSubmit={generateImage} className="w-full">
          <Input
            type="text"
            label="Generate Image"
            id="image-generator-input"
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
