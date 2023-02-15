import { LoadingSpinner } from "@components/icons";

const LoadingPage: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 h-full w-full">
      <div className="flex h-4/5 w-full items-center justify-center pt-16">
        <LoadingSpinner />
      </div>
      <div className="h-1/5 w-full border-t border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-900 sm:pl-64"></div>
    </div>
  );
};

export default LoadingPage;
