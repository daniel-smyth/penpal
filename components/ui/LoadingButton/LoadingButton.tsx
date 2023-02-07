import { HTMLMotionProps, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";

interface LoadingButtonProps extends HTMLMotionProps<"button"> {
  loading?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  ...rest
}) => {
  return (
    <motion.button
      {...rest}
      className="inline-flex min-w-[150px] items-center justify-center rounded-lg border border-emerald-600 bg-emerald-600 p-1.5 px-4 text-sm text-white transition-all hover:bg-emerald-800 "
    >
      <>
        {loading && (
          <span
            className="spinner-grow spinner-sm mr-2 inline-block"
            role="status"
            aria-hidden="true"
          >
            <svg
              className="mr- -ml-1 h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        {children}
      </>
    </motion.button>
  );
};

export default LoadingButton;
