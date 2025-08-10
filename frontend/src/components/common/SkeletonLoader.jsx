import React from 'react';

// Basic skeleton with shimmer animation
const Skeleton = ({ className = "", ...props }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    {...props}
  />
);

// Text skeleton with different sizes
export const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        className={`h-4 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
      />
    ))}
  </div>
);

// Card skeleton
export const SkeletonCard = ({ className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <SkeletonText lines={3} />
  </div>
);

// Table row skeleton
export const SkeletonTableRow = ({ columns = 6, className = "" }) => (
  <tr className={`animate-pulse ${className}`}>
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {index === 0 && (
            <>
              <Skeleton className="w-10 h-10 rounded-full mr-4" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </>
          )}
          {index > 0 && <Skeleton className="h-4 w-16" />}
        </div>
      </td>
    ))}
  </tr>
);

// Table skeleton
export const SkeletonTable = ({ rows = 5, columns = 6, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
    <div className="px-6 py-4 border-b border-gray-200">
      <Skeleton className="h-6 w-32" />
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-6 py-3 text-left">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, index) => (
            <SkeletonTableRow key={index} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Dashboard card skeleton
export const SkeletonDashboardCard = ({ className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="w-8 h-8 rounded-lg" />
    </div>
    <Skeleton className="h-8 w-24 mb-2" />
    <Skeleton className="h-4 w-20" />
  </div>
);

// Balance breakdown skeleton
export const SkeletonBalanceBreakdown = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {Array.from({ length: 3 }).map((_, index) => (
      <SkeletonDashboardCard key={index} />
    ))}
  </div>
);

// Investment row skeleton
export const SkeletonInvestmentRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <Skeleton className="w-10 h-10 rounded-full mr-4" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <Skeleton className="h-4 w-12" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <Skeleton className="h-4 w-16" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <Skeleton className="h-4 w-16" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <Skeleton className="h-4 w-20" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <Skeleton className="h-4 w-24" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <Skeleton className="h-8 w-16 rounded-md" />
    </td>
  </tr>
);

// Transaction row skeleton
export const SkeletonTransactionRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <Skeleton className="w-8 h-8 rounded-full mr-3" />
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <Skeleton className="h-6 w-16 rounded-full" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <Skeleton className="h-4 w-20" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <Skeleton className="h-4 w-16" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <Skeleton className="h-4 w-20" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <Skeleton className="h-8 w-20 rounded-lg" />
    </td>
  </tr>
);

// News card skeleton
export const SkeletonNewsCard = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
    <Skeleton className="w-full h-48" />
    <div className="p-4">
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-2/3 mb-3" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  </div>
);

// Stock card skeleton
export const SkeletonStockCard = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div>
          <Skeleton className="h-4 w-20 mb-1" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-4 w-20" />
    </div>
  </div>
);

// Modal skeleton
export const SkeletonModal = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-pulse">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="w-6 h-6 rounded" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
        <div className="flex gap-3 mt-6">
          <Skeleton className="h-10 flex-1 rounded" />
          <Skeleton className="h-10 flex-1 rounded" />
        </div>
      </div>
    </div>
  </div>
);

// Chart skeleton
export const SkeletonChart = ({ height = "h-64", className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-8 w-20 rounded" />
    </div>
    <Skeleton className={`w-full ${height} rounded`} />
  </div>
);

// List skeleton
export const SkeletonList = ({ items = 5, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 animate-pulse">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-8 w-20 rounded" />
      </div>
    ))}
  </div>
);

export default Skeleton; 