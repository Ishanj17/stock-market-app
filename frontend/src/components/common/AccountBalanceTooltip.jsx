import React, { useState, useEffect, useRef } from 'react';
import { FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const AccountBalanceTooltip = ({ children }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    // MOCK API - Replace with real API call
    setTimeout(() => {
      setLoading(false);
      setBalance(mockBalance);
    }, 1000); // Simulate API delay
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target) && 
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

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
      }, 300);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="relative inline-block">
        <div
          ref={triggerRef}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          onClick={() => setIsVisible(!isVisible)}
          className="cursor-pointer"
        >
          {children}
        </div>
        
        {isVisible && (
          <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2">
            <div className="bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg min-w-64 animate-pulse">
              {/* Arrow */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
              
              {/* Header Skeleton */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-600">
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-600 rounded w-24"></div>
              </div>

              {/* Total Balance Skeleton */}
              <div className="mb-3">
                <div className="h-3 bg-gray-600 rounded w-20 mb-1"></div>
                <div className="h-5 bg-gray-600 rounded w-28"></div>
              </div>

              {/* Quick Breakdown Skeleton */}
              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-600 rounded"></div>
                      <div className="h-3 bg-gray-600 rounded w-16"></div>
                    </div>
                    <div className="h-3 bg-gray-600 rounded w-20"></div>
                  </div>
                ))}
              </div>

              {/* Last Updated Skeleton */}
              <div className="mt-3 pt-2 border-t border-gray-600">
                <div className="h-3 bg-gray-600 rounded w-24 mx-auto"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="cursor-pointer"
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2"
        >
          <div className="bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg min-w-64">
            {/* Arrow */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
            
            {/* Header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-600">
              <FaWallet className="w-4 h-4 text-green-400" />
              <h3 className="font-semibold text-white">Account Balance</h3>
            </div>

            {/* Total Balance */}
            <div className="mb-3">
              <p className="text-xs text-gray-300 mb-1">Total Balance</p>
              <p className="text-lg font-bold text-white">₹{balance.totalBalance.toLocaleString()}</p>
            </div>

            {/* Quick Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FaArrowUp className="w-3 h-3 text-blue-400" />
                  <span className="text-gray-300">Available</span>
                </div>
                <span className="text-blue-400 font-medium">₹{balance.availableBalance.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FaArrowDown className="w-3 h-3 text-green-400" />
                  <span className="text-gray-300">Invested</span>
                </div>
                <span className="text-green-400 font-medium">₹{balance.investedAmount.toLocaleString()}</span>
              </div>

              {balance.pendingAmount > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300">Pending</span>
                  <span className="text-yellow-400 font-medium">₹{balance.pendingAmount.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Last Updated */}
            <div className="mt-3 pt-2 border-t border-gray-600">
              <p className="text-xs text-gray-400 text-center">
                Updated: {new Date(balance.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountBalanceTooltip; 