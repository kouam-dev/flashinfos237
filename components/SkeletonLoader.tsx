// components/SkeletonLoader.tsx
import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="max-w-7xl mx-auto mt-14 md:mt-28 px-4 py-6">
      {/* Welcome message skeleton */}
      <div className="bg-gray-200 animate-pulse p-3 mb-6 rounded h-20"></div>

      {/* Featured Articles Section Skeleton */}
      <section className="mb-12">
        <div className="grid md:grid-cols-12 gap-6">
          {/* Main featured article skeleton */}
          <div className="md:col-span-8">
            <div className="relative h-96 overflow-hidden rounded-md bg-gray-200 animate-pulse"></div>
          </div>

          {/* Secondary featured articles skeleton */}
          <div className="md:col-span-4 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="h-24 w-36 flex-shrink-0 rounded-md bg-gray-200 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News by Category Skeleton */}
      <div className="grid md:grid-cols-12 gap-8">
        {/* Main content skeleton */}
        <div className="md:col-span-8">
          <section>
            <div className="h-8 bg-gray-200 animate-pulse rounded w-60 mb-6"></div>
            
            <div className="grid gap-8 mb-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6">
                  <div className="h-56 md:h-40 md:w-60 bg-gray-200 animate-pulse rounded-md"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-24"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded mb-2 w-full"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-full"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-48"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Category sections skeleton */}
          {[...Array(3)].map((_, i) => (
            <section key={i} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-40"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
              </div>
              
              <div className="grid gap-8">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex flex-col md:flex-row gap-6">
                    <div className="h-56 md:h-40 md:w-60 bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 animate-pulse rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-48"></div>
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
          <div className="bg-gray-50 p-6 rounded-md mb-8">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-40 mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start">
                  <div className="h-8 w-8 bg-gray-200 animate-pulse rounded mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-full"></div>
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tag cloud skeleton */}
          <div className="bg-gray-50 p-6 rounded-md mb-8">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-40 mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="bg-gray-200 animate-pulse h-8 w-16 rounded-full"
                ></div>
              ))}
            </div>
          </div>

          {/* Newsletter signup skeleton */}
          <div className="bg-gray-100 p-6 rounded-md">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-40 mb-2"></div>
            <div className="h-12 bg-gray-200 animate-pulse rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-200 animate-pulse rounded w-full mb-3"></div>
            <div className="h-10 bg-gray-200 animate-pulse rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}