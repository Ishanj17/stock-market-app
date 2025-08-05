import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-48 w-full">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;