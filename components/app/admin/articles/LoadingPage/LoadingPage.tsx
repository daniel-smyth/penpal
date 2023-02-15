import { LoadingSpinner } from "@components/icons";

const LoadingPage: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 h-full w-full">
      <div className="flex h-full w-full items-center justify-center pt-16">
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default LoadingPage;
