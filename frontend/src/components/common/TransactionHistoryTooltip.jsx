import React, { useState, useEffect, useRef } from 'react';
import { FaHistory, FaDownload } from 'react-icons/fa';
import { SkeletonCard, SkeletonText } from './SkeletonLoader';

const TransactionHistoryTooltip = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    // MOCK API - Replace with real API call
    setTimeout(() => {
      setLoading(false);
      setTransactions(mockTransactions);
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

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // Mock API call with timeout
      setTimeout(() => {
        const mockTransactions = [
          {
            id: 1,
            type: 'BUY',
            stockName: 'Apple Inc.',
            symbol: 'AAPL',
            quantity: 10,
            price: 175.50,
            totalAmount: 1755.00,
            date: '2024-01-15T10:30:00Z',
            status: 'COMPLETED'
          },
          {
            id: 2,
            type: 'SELL',
            stockName: 'Tesla Inc.',
            symbol: 'TSLA',
            quantity: 5,
            price: 250.00,
            totalAmount: 1250.00,
            date: '2024-01-14T14:20:00Z',
            status: 'COMPLETED'
          },
          {
            id: 3,
            type: 'DEPOSIT',
            amount: 5000.00,
            date: '2024-01-12T16:45:00Z',
            status: 'COMPLETED'
          }
        ];
        setTransactions(mockTransactions);
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'BUY': return '💰';
      case 'SELL': return '📉';
      case 'DEPOSIT': return '💰';
      case 'WITHDRAWAL': return '💸';
      default: return '📊';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'BUY': return 'text-green-400';
      case 'SELL': return 'text-red-400';
      case 'DEPOSIT': return 'text-blue-400';
      case 'WITHDRAWAL': return 'text-orange-400';
      default: return 'text-gray-400';
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
            <div className="bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg min-w-72">
              {/* Arrow */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
              
              {/* Header Skeleton */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded w-32"></div>
                </div>
                <div className="w-3 h-3 bg-gray-600 rounded"></div>
              </div>

              {/* Transactions List Skeleton */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded text-xs animate-pulse">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-600 rounded"></div>
                      <div>
                        <div className="h-3 bg-gray-600 rounded w-16 mb-1"></div>
                        <div className="h-2 bg-gray-600 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h-3 bg-gray-600 rounded w-20 mb-1"></div>
                      <div className="h-2 bg-gray-600 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Skeleton */}
              <div className="mt-3 pt-2 border-t border-gray-600">
                <div className="flex items-center justify-between text-xs">
                  <div className="h-3 bg-gray-600 rounded w-24"></div>
                  <div className="h-3 bg-gray-600 rounded w-16"></div>
                </div>
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
          <div className="bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg min-w-72">
            {/* Arrow */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-600">
              <div className="flex items-center gap-2">
                <FaHistory className="w-4 h-4 text-green-400" />
                <h3 className="font-semibold text-white">Recent Transactions</h3>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <FaDownload className="w-3 h-3" />
              </button>
            </div>

            {/* Transactions List */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-2 bg-gray-700 rounded text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTransactionIcon(transaction.type)}</span>
                    <div>
                      <p className="text-white font-medium">
                        {transaction.type === 'DEPOSIT' || transaction.type === 'WITHDRAWAL' 
                          ? transaction.type
                          : `${transaction.symbol}`
                        }
                      </p>
                      <p className="text-gray-400 text-xs">
                        {transaction.stockName || transaction.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'BUY' || transaction.type === 'DEPOSIT' ? '+' : '-'}
                      ₹{(transaction.totalAmount || transaction.amount).toFixed(0)}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-3 pt-2 border-t border-gray-600">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Total: {transactions.length} transactions</span>
                <button className="text-green-400 hover:text-green-300 transition-colors">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistoryTooltip; 