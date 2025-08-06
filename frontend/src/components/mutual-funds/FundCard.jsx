import React from 'react';

const FundCard = ({ fund, onClick }) => {
  const isPositive = fund.percentage_change > 0;
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary-300 hover:scale-[1.02]"
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {fund.fund_name}
          </h3>
          <p className="text-sm text-gray-500">
            Volume: {fund.asset_size}
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900 mb-1">
            ₹{fund.latest_nav}
          </p>
          <p className={`text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {fund.percentage_change}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;