import React, { useState, useEffect } from 'react';

const NewsCards = ({ news }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNewsClick = (url) => {
    window.open(url, '_blank');
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handlePrev = () => {
    setCurrentIndex(prev => prev === 0 ? (news?.length - 1) : prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev === (news?.length - 1) ? 0 : prev + 1);
  };

  // Auto-navigation effect
  useEffect(() => {
    if (!news || news.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => prev === (news.length - 1) ? 0 : prev + 1);
    }, 3000); // Change news every 5 seconds

    return () => clearInterval(interval);
  }, [news]);

  if (!news || news.length === 0) {
    return null;
  }

  const currentArticle = news[currentIndex];

  return (
    <div className="mt-32 mb-32">      
      <div className="relative max-w-2xl mx-auto">
        <div
          className="bg-white rounded-lg shadow-card border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:border-primary-500 hover:-translate-y-1"
          onClick={() => handleNewsClick(currentArticle.url)}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3 font-poppins leading-tight">
            {currentArticle.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 font-inter">
            {truncateText(currentArticle.summary, 200)}
          </p>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-quicksand font-medium">{currentArticle.source}</span>
            {currentArticle.topics && currentArticle.topics.length > 0 && (
              <span className="text-primary-600 font-inter font-semibold">
                {currentArticle.topics[0]}
              </span>
            )}
          </div>
        </div>

        {/* Navigation Arrows - Left and Right corners */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 transform -translate-x-16 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          aria-label="Previous news"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-0 transform translate-x-16 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          aria-label="Next news"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {news.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to news ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCards; 