import Image from "next/image";
import email from "next-auth/providers/email";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@lib/theme";

const mockInputs = [
  "Write me an article on the football today",
  "Summarize this news article in 20 words",
  "Make the content I am about to paste sound better",
];

interface MockOutputProps {
  onClick: (input: string) => void;
}

const MockOutput: React.FC<MockOutputProps> = ({ onClick }) => {
  return (
    <>
      <motion.div
        className="flex gap-3 text-gray-600 dark:text-white"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <div className="h-full w-full p-4 text-center sm:p-8 lg:p-12">
          <div className="h-full w-full rounded-xl">
            <p className="font-display text-2xl">Penpal</p>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col gap-6">
        {mockInputs.map((input) => (
          <motion.div
            key={input}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-3 text-gray-600 dark:text-white"
            onClick={() => onClick(input)}
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div className="h-full w-full px-8 sm:px-12 lg:px-16">
              <div className="h-full w-full rounded-xl bg-gray-200 p-6">
                &quot;{input}&quot;
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default MockOutput;
