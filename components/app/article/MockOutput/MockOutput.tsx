import { motion } from "framer-motion";
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
    <div className="flex flex-col gap-6">
      {mockInputs.map((input) => (
        <motion.div
          key={input}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex cursor-pointer gap-3 text-gray-600 dark:text-white"
          onClick={() => onClick(input)}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <div className="h-full w-full px-8 sm:px-12 lg:px-16">
            <div className="h-full w-full rounded-xl bg-gray-200 p-6 dark:bg-gray-800">
              &quot;{input}&quot;
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MockOutput;
