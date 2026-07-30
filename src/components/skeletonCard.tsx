export const TaskCardSkeleton = () => (
  <div className="rounded-2xl border border-custom p-6 animate-pulse">
    <div className="h-5 w-2/3 rounded bg-gray-300"></div>

    <div className="mt-4 h-4 rounded bg-gray-300"></div>
    <div className="mt-2 h-4 w-5/6 rounded bg-gray-300"></div>

    <div className="mt-8 flex justify-between">
      <div className="h-8 w-20 rounded bg-gray-300"></div>
      <div className="h-8 w-20 rounded bg-gray-300"></div>
    </div>
  </div>
);