import { LoadingSpinner } from "@components/icons";

const LoadingPage: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 h-full w-full sm:pl-64">
      <div className="flex h-4/5 w-full items-center justify-center pt-16 sm:h-full">
        <div className="sm:hidden">
          <LoadingSpinner />
        </div>
        <div className="hidden sm:flex">
          <LoadingSpinner size={8} />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
