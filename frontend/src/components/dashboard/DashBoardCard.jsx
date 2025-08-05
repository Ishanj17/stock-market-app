import React from 'react';

const DashboardCard = ({ type, title, icon, data, showButton = true, onClick }) => {
  const renderCardContent = () => {
    if (!data || data.length === 0) {
      return <div className="text-center text-gray-500 italic py-5 font-inter text-sm">No data available</div>;
    }

    switch (type) {
      case 'trending-stocks':
        return (
          <div className="flex-1 flex flex-col gap-3">
            {data.slice(0, 3).map((stock, index) => (
              <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-md px-2 -mx-2 transition-colors duration-200">
                <span className="font-inter text-sm font-medium text-gray-700 flex-1">{stock.name}</span>
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                  stock.change >= 0 
                    ? 'text-green-600 bg-green-100' 
                    : 'text-red-600 bg-red-100'
                }`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </span>
                <span className="font-inter text-sm font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded text-center min-w-[60px]">₹{stock.price}</span>
              </div>
            ))}
          </div>
        );

      case 'mutual-funds':
        return (
          <div className="flex-1 flex flex-col gap-3">
            {data.slice(0, 3).map((fund, index) => (
              <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-md px-2 -mx-2 transition-colors duration-200">
                <span className="font-inter text-sm font-medium text-gray-700 flex-1">{fund.name}</span>
                <span className="font-inter text-sm font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded text-center min-w-[60px]">{fund.return}%</span>
              </div>
            ))}
          </div>
        );

      case 'ipos':
        return (
          <div className="flex-1 flex flex-col gap-3">
            {data.slice(0, 3).map((ipo, index) => (
              <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-md px-2 -mx-2 transition-colors duration-200">
                <span className="font-inter text-sm font-medium text-gray-700 flex-1">{ipo.company}</span>
                <span className="font-inter text-sm font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded text-center min-w-[60px]">₹{ipo.priceBand}</span>
              </div>
            ))}
          </div>
        );

      default:
        return <div className="text-center text-gray-500 italic py-5 font-inter text-sm">No data available</div>;
    }
  };

  return (
    <div onClick={onClick} className="bg-white rounded-xl shadow-card border-2 border-gray-200 p-6 min-h-[220px] flex flex-col transition-all duration-300 hover:shadow-card-hover hover:border-primary-500 hover:-translate-y-1 group">
      <div className="flex items-center justify-center mb-5 pb-3 border-b border-gray-100 text-center">
        <span className="text-lg mr-2 text-gray-500">{icon}</span>
        <h3 className="font-quicksand text-lg font-semibold text-gray-800 uppercase tracking-wide">{title}</h3>
      </div>
      
      {renderCardContent()}
      
      {/* {showButton && (
        <div className="mt-5 pt-3 border-t border-gray-100 text-center">
          <button 
            onClick={onViewAll} 
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            View All
          </button>
        </div>
      )} */}
    </div>
  );
};

export default DashboardCard;