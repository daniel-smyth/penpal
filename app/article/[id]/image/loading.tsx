async function LoadingPage() {
  return (
    <div className="flex h-screen flex-col">
      <div className="z-40 mb-40 flex h-screen w-screen items-center justify-center">
        <span className="spinner-grow spinner-sm">
          <svg
            className="h-12 w-12 animate-spin text-zinc-300"
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
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      </div>
      <div className="bg-gray-100 py-6 px-4 text-gray-500 sm:px-6 lg:px-8" />
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-40 items-center justify-center border-t border-gray-300 bg-gray-50 px-8 pb-8 text-center dark:border-gray-600 dark:bg-gray-900 sm:left-64 sm:flex-[0.22] sm:px-12 lg:px-16" />
      <div className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"></div>
    </div>
  );
}

export default LoadingPage;
