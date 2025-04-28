// components/ui/SkeletonLoader.tsx
export default function SkeletonLoader() {
    return (
      <div className="max-w-7xl mx-auto mt-14 md:mt-28 px-4 py-6 animate-pulse">
        {/* Welcome message skeleton */}
        <div className="bg-red-200 h-20 mb-6 rounded"></div>
        
        {/* Featured articles skeleton */}
        <section className="mb-12">
          <div className="grid md:grid-cols-12 gap-6">
            {/* Main featured article skeleton */}
            <div className="md:col-span-8">
              <div className="h-96 bg-gray-200 rounded-md"></div>
            </div>
            
            {/* Secondary featured articles skeleton */}
            <div className="md:col-span-4 space-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="h-24 w-36 flex-shrink-0 bg-gray-200 rounded-md"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* News by Category skeleton */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="md:col-span-8">
            {/* Latest articles section */}
            <section>
              <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
              
              <div className="grid gap-8 mb-12">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-6">
                    <div className="h-56 md:h-40 md:w-60 bg-gray-200 rounded-md"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Category sections skeleton */}
            {[...Array(3)].map((_, catIndex) => (
              <section key={catIndex} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                
                <div className="grid gap-8">
                  {[...Array(2)].map((_, artIndex) => (
                    <div key={artIndex} className="flex flex-col md:flex-row gap-6">
                      <div className="h-56 md:h-40 md:w-60 bg-gray-200 rounded-md"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
          
          {/* Sidebar skeleton */}
          <div className="md:col-span-4">
            {/* Most viewed skeleton */}
            <div className="bg-gray-100 p-6 rounded-md mb-8">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-8 w-8 bg-gray-200 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tag cloud skeleton */}
            <div className="bg-gray-100 p-6 rounded-md mb-8">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="h-6 bg-gray-200 rounded-full w-16"></div>
                ))}
              </div>
            </div>
            
            {/* Newsletter skeleton */}
            <div className="bg-gray-100 p-6 rounded-md mb-8 h-48"></div>
          </div>
        </div>
      </div>
    );
  }