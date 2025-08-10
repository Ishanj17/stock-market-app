import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { SkeletonCard, SkeletonText } from '../common/SkeletonLoader';

const BuyStockModal = ({ isOpen, onClose, stock }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!stock) return null;

  const currentPrice = stock.price?.NSE || stock.price?.BSE || stock.price;
  const totalAmount = currentPrice * quantity;

  const handleBuyStock = async () => {
    setLoading(true);
    try {
      // MOCK API - Replace with real API call
      const apiUrl = process.env.REACT_APP_API_URL;
      
      // For now, simulate a successful purchase since this is a mock implementation
      // In real implementation, you would make the actual API call
      setTimeout(() => {
        // Close modal and navigate to investments page
        onClose();
        navigate('/investments');
      }, 1000); // Simulate processing time
      
      // TODO: Uncomment this when real API is available
      /*
      const response = await fetch(`${apiUrl}/api/investments/buy-stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          stockSymbol: stock.name,
          stockName: stock.name,
          quantity: quantity,
          pricePerShare: currentPrice,
          totalAmount: totalAmount
        }),
      });

      if (response.ok) {
        // Close modal and navigate to investments page
        onClose();
        navigate('/investments');
      } else {
        alert('Failed to buy stock. Please try again.');
      }
      */
    } catch (error) {
      console.error('Error buying stock:', error);
      alert('Error buying stock. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex h-[500px] max-h-[90vh]">
        {/* Left Panel - Green Background */}
        <div className="w-1/2 relative overflow-hidden"
            style={{
              backgroundColor: '#00D09C',
            }}
        >
          {/* Topographic pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 Q25,40 50,50 T100,50" stroke="white" strokeWidth="0.5" fill="none"/>
              <path d="M0,60 Q25,50 50,60 T100,60" stroke="white" strokeWidth="0.5" fill="none"/>
              <path d="M0,40 Q25,30 50,40 T100,40" stroke="white" strokeWidth="0.5" fill="none"/>
            </svg>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-8">
            <div className="text-6xl mb-4">📈</div>
            <h1 className="text-3xl font-bold mb-4 text-center">
              Invest in {stock.name}
            </h1>
            <div className="w-16 h-0.5 bg-white mb-4"></div>
            <p className="text-lg text-center">
              Build your portfolio with this promising stock
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-1/2 bg-white p-6 flex items-center">
          <div className="max-w-sm mx-auto w-full">
            {/* Title */}
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
              Confirm Purchase
            </h2>

            {loading ? (
              <div className="space-y-6 animate-pulse">
                {/* Stock Details Skeleton */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between mb-2 last:mb-0">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  ))}
                </div>

                {/* Quantity Input Skeleton */}
                <div className="mb-6">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>

                {/* Total Amount Skeleton */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>

                {/* Button Skeleton */}
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>

                {/* Disclaimer Skeleton */}
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ) : (
              <>
                {/* Stock Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Stock:</span>
                    <span className="font-semibold text-gray-900">{stock.name}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Current Price:</span>
                    <span className="font-semibold text-gray-900">₹{currentPrice}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Industry:</span>
                    <span className="font-semibold text-gray-900">{stock.industry}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Risk Level:</span>
                    <span className="font-semibold text-gray-900">{stock.risk}</span>
                  </div>
                </div>

                {/* Quantity Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ color: '#00D09C' }}
                  >
                    Number of Shares
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <span className="text-lg font-bold text-green-600">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Buy Button */}
                <button
                  onClick={handleBuyStock}
                  disabled={loading}
                  style={{
                    backgroundColor: '#00D09C',
                  }}
                  className="w-full px-4 py-3 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Purchase...
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="w-4 h-4" />
                      Buy {quantity} Share{quantity > 1 ? 's' : ''}
                    </>
                  )}
                </button>

                {/* Disclaimer */}
                <div className="mt-4 text-xs text-gray-500 text-center">
                  By proceeding, you agree to our{' '}
                  <a href="#" className="text-green-600 underline">Terms of Service</a>{' '}
                  and acknowledge that stock investments carry risk.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BuyStockModal; 