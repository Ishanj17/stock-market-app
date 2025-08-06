import React from 'react';

const IPOCard = ({ IPO, activeTab }) => {
  const endDate = new Date(IPO.bidding_end_date);
  const today = new Date();

  return (
    <div 
      onClick={() => window.open(IPO.document_url, '_blank')}
      className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary-300 hover:scale-[1.02]"
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
        {activeTab === 'upcoming' && (
          <h3 className="text-lg font-semibold text-green-800 text-center bg-green-100 px-4 py-2 rounded-md shadow-md">
            {IPO.name}
          </h3>
        )}
        {activeTab === 'active' && (
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {IPO.name}
          </h3>
        )}
        {activeTab === 'closed' && (
          <>
            <h3 className="text-lg font-semibold text-red-800 text-center bg-red-100 px-4 py-2 rounded-md shadow-md">
              {IPO.name}
              <p className="text-xl font-bold text-gray-900 mb-1 text-center mt-2">
                ₹{IPO.min_price} - ₹{IPO.max_price}
              </p>
            </h3>
          </>
        )}
        {activeTab === 'active' && (
          <p className="text-sm text-gray-500">
            Volume: {IPO.lot_size}
          </p>
        )}
      </div>
        <div className="text-right">
          {activeTab === 'active' && (
          <p className="text-xl font-bold text-gray-900 mb-1">
            ₹{IPO.min_price} - ₹{IPO.max_price}
          </p>
          )}
          {activeTab === 'active' && (
            <p className={`text-sm font-medium ${
              endDate > today ? 'text-green-600' : 'text-red-600'
            }`}>
              {endDate ? `Ends: ${endDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` : 'Ended'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IPOCard;
