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
      <h1 className="text-2xl font-bold text-gray-500 tracking-wider mb-4 text-center font-poppins leading-tight">Latest Stock News</h1>
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

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
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