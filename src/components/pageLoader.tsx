const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

        <h2 className="text-lg font-semibold text-gray-700">
          Loading...
        </h2>
      </div>
    </div>
  );
};

export default PageLoader;