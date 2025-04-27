// components/ui/Skeleton.tsx
export default function Skeleton({ type }: { type: 'list' | 'grid' }) {
    if (type === 'list') {
      return (
        <div className="grid gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-8 animate-pulse">
              <div className="relative h-48 md:h-48 md:w-72 rounded-md bg-gray-200" />
              <div className="flex-1 mt-4 md:mt-0">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded mb-2 w-full" />
                <div className="h-4 bg-gray-200 rounded mb-2 w-full" />
                <div className="h-4 bg-gray-200 rounded mb-4 w-2/3" />
                <div className="flex items-center flex-wrap gap-2">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-4 bg-gray-200 rounded-full w-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-32" />
                </div>
                <div className="mt-3 flex gap-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16" />
                  <div className="h-6 bg-gray-200 rounded-full w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-3 w-full" />
              <div className="flex items-center flex-wrap gap-2">
                <div className="h-3 bg-gray-200 rounded w-16" />
                <div className="h-3 bg-gray-200 rounded-full w-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24" />
              </div>
              <div className="mt-3 flex gap-1">
                <div className="h-5 bg-gray-200 rounded-full w-14" />
                <div className="h-5 bg-gray-200 rounded-full w-14" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }