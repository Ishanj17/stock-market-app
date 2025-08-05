import React from 'react';

const IPOCard = ({ IPO, onClick }) => {
  const isPositive = IPO.change.startsWith('+');
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary-300 hover:scale-[1.02]"
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {IPO.name}
          </h3>
          <p className="text-sm text-gray-500">
            Volume: {IPO.volume}
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900 mb-1">
            ₹{IPO.price}
          </p>
          <p className={`text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {IPO.change}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IPOCard;