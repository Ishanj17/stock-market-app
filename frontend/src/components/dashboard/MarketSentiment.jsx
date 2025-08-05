import React from 'react';

const MarketSentiment = ({ data }) => {
  const handleSensexClick = () => {
    window.open('https://www.bseindia.com/', '_blank');
  };

  const handleNiftyClick = () => {
    window.open('https://www.nseindia.com/', '_blank');
  };

  return (
    <div className="flex justify-center gap-5 px-10 pb-10 max-w-7xl mx-auto">
      <div 
        className="bg-white rounded-xl shadow-card border border-gray-200 p-5 cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:border-primary-500 hover:-translate-y-1 min-w-[200px] text-center"
        onClick={handleSensexClick}
      >
        <span className="block text-base font-medium text-gray-500 mb-2 font-inter">Sensex</span>
        <span className="block text-xl font-bold text-gray-800 mb-1 font-poppins">{data?.sensex?.value}</span>
        <span className={`block text-sm font-medium ${
          data?.sensex?.change >= 0 ? 'text-green-600' : 'text-red-600'
        } font-inter`}>
          {data?.sensex?.change >= 0 ? '+' : ''}{data?.sensex?.change}%
        </span>
      </div>
      
      <div 
        className="bg-white rounded-xl shadow-card border border-gray-200 p-5 cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:border-primary-500 hover:-translate-y-1 min-w-[200px] text-center"
        onClick={handleNiftyClick}
      >
        <span className="block text-base font-medium text-gray-500 mb-2 font-inter">Nifty</span>
        <span className="block text-xl font-bold text-gray-800 mb-1 font-poppins">{data?.nifty?.value}</span>
        <span className={`block text-sm font-medium ${
          data?.nifty?.change >= 0 ? 'text-green-600' : 'text-red-600'
        } font-inter`}>
          {data?.nifty?.change >= 0 ? '+' : ''}{data?.nifty?.change}%
        </span>
      </div>
    </div>
  );
};

export default MarketSentiment;