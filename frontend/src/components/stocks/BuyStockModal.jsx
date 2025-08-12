import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { SkeletonCard, SkeletonText } from '../common/SkeletonLoader';
import axios from 'axios';
import { failureToast, successToast } from '../common/toast';

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
      const apiUrl = process.env.REACT_APP_API_URL;
      const { data : {data : [balanceDetails]} } = await axios.post(`${apiUrl}/api/transactions/get-current-balance`, {
        user_id: user.user_id
      });
      if(balanceDetails.total_balance < totalAmount) {
        handleClose();
        failureToast('Insufficient balance! Please add more funds to your account.');
        return;
      }

      const { data : {code, message, data}} = await axios.post(`${apiUrl}/api/transactions/buy-stock`, {
        user_id: user.user_id,
        stock_name: stock.name,
        quantity: String(quantity),
        price: Math.floor(currentPrice)
      });
      if(code === 200) {
        handleClose();
        successToast('Successfully bought '+quantity+' shares of '+stock.name);
        return;
      }
      failureToast(message+' Please try again later.');
      handleClose();
    } catch (error) {
      console.error('Error buying stock:', error);
      failureToast('Error buying stock. Please try again.');
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
      <div className="flex h-[500px] max-h-[90vh] rounded-xl overflow-hidden relative">
        {/* Close Button - Top Right */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-20 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <FaTimes className="w-3 h-3 text-gray-400" />
        </button>

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
            <h2 className="hero-heading font-bold text-center mt-6">
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
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-500">Stock:</span>
                    <span className="font-semibold text-gray-600">{stock.name}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-500">Current Price:</span>
                    <span className="font-semibold text-gray-600">₹{currentPrice}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-500">Industry:</span>
                    <span className="font-semibold text-gray-600">{stock.industry}</span>
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
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">Total Amount</span>
                    <span className="text-lg font-bold text-green-600">₹{totalAmount.toFixed(4)}</span>
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
                <div className="mt-4 text-gray-500 text-center" style={{fontSize: '8px'}}>
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