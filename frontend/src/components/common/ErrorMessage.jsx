import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-48 w-full">
      <div className="text-4xl mb-4">⚠️</div>
      <p className="text-gray-600 text-base mb-5 max-w-xs text-center">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-lg font-medium transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;