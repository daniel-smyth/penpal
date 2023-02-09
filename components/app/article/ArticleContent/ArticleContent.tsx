"use client";

import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@lib/theme";
import { Twitter } from "@components/icons";

const ArticleContent: React.FC = () => {
  return (
    <motion.div
      className="max-w-xl px-5 xl:px-0"
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
      <motion.a
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        href="https://twitter.com/steventey/status/1613928948915920896"
        target="_blank"
        rel="noreferrer"
        className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
      >
        <Twitter className="h-5 w-5 text-[#1d9bf0]" />
        <p className="text-sm font-semibold text-[#1d9bf0]">
          Introducing Precedent
        </p>
      </motion.a>
      <motion.h1
        className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Balancer>Building blocks for your Next project</Balancer>
      </motion.h1>
      <motion.p
        className="mt-6 text-center text-gray-500 md:text-xl"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Balancer>
          An opinionated collection of components, hooks, and utilities for your
          Next.js project.
        </Balancer>
      </motion.p>
    </motion.div>
  );
};

export default ArticleContent;
