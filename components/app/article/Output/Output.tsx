import { ITextQuery } from "@lib/database/models";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@lib/theme";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

interface OutputProps {
  query: ITextQuery;
}

const Output: React.FC<OutputProps> = ({ query }) => {
  const { data: session } = useSession();
  const { email, image } = session?.user || {};

  return (
    <>
      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="flex items-center gap-3 bg-gray-200 py-6 px-4 text-gray-500 dark:bg-gray-700 dark:text-white sm:px-6 lg:px-8"
      >
        <Image
          className="h-7 w-7 rounded-full"
          alt={email || ""}
          src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
          width={21}
          height={21}
        />
        <Balancer>{query.input}</Balancer>
      </motion.div>
      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="bg-gray-100 py-6 px-4 text-gray-500 dark:bg-gray-900 dark:text-white sm:px-6 lg:px-8"
      >
        <Balancer>{query.output.choices[0].text}</Balancer>
      </motion.div>
    </>
  );
};

export default Output;
