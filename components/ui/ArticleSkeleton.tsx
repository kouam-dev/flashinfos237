// components/ui/ArticleSkeleton.tsx
export default function ArticleSkeleton() {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Skeleton */}
          <div className="flex-1">
            {/* Article Header Skeleton */}
            <div className="mb-8">
              <div className="w-28 h-6 bg-gray-200 rounded mb-4"></div>
              <div className="w-full h-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="w-3/4 h-8 bg-gray-200 rounded mb-4"></div>
              
              <div className="flex items-center justify-between border-b border-t border-gray-200 py-4">
                <div className="flex items-center">
                  <div className="w-32 h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="w-36 h-5 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            {/* Featured Image Skeleton */}
            <div className="relative aspect-video w-full mb-8 bg-gray-200 rounded-lg"></div>
            
            {/* Article Content Skeleton */}
            <div className="space-y-4 mb-10">
              <div className="w-full h-5 bg-gray-200 rounded"></div>
              <div className="w-full h-5 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
              <div className="w-full h-5 bg-gray-200 rounded"></div>
              <div className="w-5/6 h-5 bg-gray-200 rounded"></div>
              <div className="w-full h-5 bg-gray-200 rounded"></div>
              <div className="w-4/5 h-5 bg-gray-200 rounded"></div>
            </div>
            
            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2 mb-8">
              <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-16 h-8 bg-gray-200 rounded-full"></div>
            </div>
            
            {/* Share Buttons Skeleton */}
            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <div className="w-36 h-6 bg-gray-200 rounded mb-4"></div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            
            {/* Comments Skeleton */}
            <div className="mb-8">
              <div className="w-48 h-8 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="w-32 h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="w-full h-16 bg-gray-200 rounded"></div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="w-32 h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="w-full h-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar Skeleton */}
          <div className="lg:w-96">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-36 h-7 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="w-full h-5 bg-gray-200 rounded mb-2"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }