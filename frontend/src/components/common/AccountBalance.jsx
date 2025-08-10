import React, { useState, useEffect } from 'react';
import { FaWallet, FaArrowUp, FaArrowDown, FaHistory } from 'react-icons/fa';

const AccountBalance = ({ isOpen, onClose }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // MOCK API - Replace with real API call
    setTimeout(() => {
      setLoading(false);
      setBalance(mockBalance);
    }, 1000); // Simulate API delay
  }, []);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      // Mock API call with timeout
      setTimeout(() => {
        const mockBalance = {
          availableBalance: 12500.75,
          investedAmount: 6855.00,
          totalBalance: 19355.75,
          pendingAmount: 0.00,
          currency: 'INR',
          lastUpdated: new Date().toISOString()
        };
        setBalance(mockBalance);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaWallet className="w-6 h-6" />
              <h2 className="text-xl font-bold">Account Balance</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Balance Details */}
        <div className="p-6">
          {loading ? (
            <div className="space-y-6 animate-pulse">
              {/* Total Balance Skeleton */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              
              {/* Balance Breakdown Skeleton */}
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-28 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
              
              {/* Last Updated Skeleton */}
              <div className="text-center">
                <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
              </div>
              
              {/* Action Buttons Skeleton */}
              <div className="flex gap-3">
                <div className="h-10 bg-gray-200 rounded flex-1"></div>
                <div className="h-10 bg-gray-200 rounded flex-1"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Total Balance */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Balance</p>
                    <p className="text-2xl font-bold text-gray-900">₹{balance.totalBalance.toLocaleString()}</p>
                  </div>
                  <div className="text-green-600">
                    <FaWallet className="w-8 h-8" />
                  </div>
                </div>
              </div>

              {/* Balance Breakdown */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaArrowUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Available Balance</p>
                      <p className="text-sm text-gray-500">Ready to invest</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-blue-600">₹{balance.availableBalance.toLocaleString()}</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FaArrowDown className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Invested Amount</p>
                      <p className="text-sm text-gray-500">In stocks & funds</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-green-600">₹{balance.investedAmount.toLocaleString()}</p>
                </div>

                {balance.pendingAmount > 0 && (
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <FaHistory className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Pending Amount</p>
                        <p className="text-sm text-gray-500">Processing</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-yellow-600">₹{balance.pendingAmount.toLocaleString()}</p>
                  </div>
                )}
              </div>

              {/* Last Updated */}
              <div className="text-center text-xs text-gray-500">
                Last updated: {new Date(balance.lastUpdated).toLocaleString()}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-teal-500 to-green-500 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-green-600 transition-all duration-200">
                  Add Money
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Withdraw
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountBalance; 