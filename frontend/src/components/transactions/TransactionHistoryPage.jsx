import React, { useState, useEffect } from 'react';
import { FaHistory, FaDownload, FaFilter, FaSearch, FaEye, FaFileAlt, FaReceipt, FaTimes } from 'react-icons/fa';
import Header from '../common/Header';
import TransactionReceipt from './TransactionReceipt';
import { SkeletonTable, SkeletonTransactionRow } from '../common/SkeletonLoader';
import Footer from '../common/Footer';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { failureToast } from '../common/toast';

// Mock data for transactions
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
    status: 'COMPLETED',
    transactionId: 'TXN_001',
    fees: 15.50,
    exchange: 'NSE'
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
    status: 'COMPLETED',
    transactionId: 'TXN_002',
    fees: 12.50,
    exchange: 'NSE'
  },
  {
    id: 3,
    type: 'BUY',
    stockName: 'Microsoft Corp.',
    symbol: 'MSFT',
    quantity: 8,
    price: 320.00,
    totalAmount: 2560.00,
    date: '2024-01-13T09:15:00Z',
    status: 'COMPLETED',
    transactionId: 'TXN_003',
    fees: 20.00,
    exchange: 'NSE'
  },
  {
    id: 4,
    type: 'DEPOSIT',
    amount: 5000.00,
    date: '2024-01-12T16:45:00Z',
    status: 'COMPLETED',
    transactionId: 'TXN_004',
    fees: 0.00,
    exchange: 'Bank Transfer'
  },
  {
    id: 5,
    type: 'WITHDRAWAL',
    amount: 1000.00,
    date: '2024-01-11T11:30:00Z',
    status: 'COMPLETED',
    transactionId: 'TXN_005',
    fees: 25.00,
    exchange: 'Bank Transfer'
  },
  {
    id: 6,
    type: 'BUY',
    stockName: 'Google LLC',
    symbol: 'GOOGL',
    quantity: 3,
    price: 2800.00,
    totalAmount: 8400.00,
    date: '2024-01-10T13:20:00Z',
    status: 'COMPLETED',
    transactionId: 'TXN_006',
    fees: 30.00,
    exchange: 'NSE'
  }
];

const TransactionHistoryPage = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  // const [sortBy, setSortBy] = useState('date');
  // const [sortOrder, setSortOrder] = useState('desc');
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    if(user) {
      fetchTransactions();  
    }
  }, [user]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const { data : {code, message, data}} = await axios.post(`${apiUrl}/api/transactions/get-transactions`, {
        user_id: user.user_id,
      });
      console.log(code, message, data, 'code, message, data');
      if(code === 200) {
        setTransactions(data);
      } else {
        failureToast('Could not fetch transactions. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'BUY': return '📊';
      case 'SELL': return '📉';
      case 'ADD': return '💰';
      case 'WITHDRAW': return '💸';
      default: return '📊';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'BUY': return 'text-green-600';
      case 'SELL': return 'text-red-600';
      case 'ADD': return 'text-blue-600';
      case 'WITHDRAW': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewReceipt = (transaction) => {
    console.log('View Receipt clicked for transaction:', transaction);
    setSelectedTransaction(transaction);
    setReceiptModalOpen(true);
  };

  const closeReceiptModal = () => {
    setReceiptModalOpen(false);
    setSelectedTransaction(null);
  };

  const getTransactionDescription = (transaction) => {
    switch (transaction.type) {
      case 'BUY':
        return `Purchased ${transaction.quantity} shares of ${transaction.stockName} (${transaction.symbol})`;
      case 'SELL':
        return `Sold ${transaction.quantity} shares of ${transaction.stockName} (${transaction.symbol})`;
      case 'DEPOSIT':
        return `Added funds to trading account`;
      case 'WITHDRAWAL':
        return `Withdrew funds from trading account`;
      default:
        return transaction.type;
    }
  };

  const getTransactionDetails = (transaction) => {
    const details = [];
    
    if (transaction.stockName) {
      details.push({ label: 'Stock Name', value: transaction.stockName });
    }
    if (transaction.symbol) {
      details.push({ label: 'Symbol', value: transaction.symbol });
    }
    if (transaction.quantity) {
      details.push({ label: 'Quantity', value: transaction.quantity });
    }
    if (transaction.price) {
      details.push({ label: 'Price per Share', value: `₹${transaction.price.toFixed(2)}` });
    }
    
    details.push(
      { label: 'Total Amount', value: `₹${(transaction.totalAmount || transaction.amount).toFixed(2)}` },
      { label: 'Transaction ID', value: transaction.transactionId },
      { label: 'Date & Time', value: formatDate(transaction.date) },
      { label: 'Status', value: transaction.status },
      { label: 'Fees', value: `₹${transaction.fees.toFixed(2)}` },
      { label: 'Exchange', value: transaction.exchange }
    );
    
    return details;
  };

  const downloadReceipt = (transaction) => {
    // Create receipt content
    const receiptContent = `
STOCK MARKET APP - TRANSACTION RECEIPT
=====================================

Transaction Type: ${transaction.type}
${getTransactionDescription(transaction)}

${getTransactionDetails(transaction).map(detail => `${detail.label}: ${detail.value}`).join('\n')}

=====================================
Total Amount: ₹${(transaction.totalAmount || transaction.amount).toFixed(2)}
=====================================

Generated on: ${new Date().toLocaleDateString('en-IN')}
Thank you for using Stock Market App!
    `.trim();

    // Create blob and download
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt_${transaction.transactionId}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    // CSV headers
    const headers = [
      'Transaction ID',
      'Type',
      'Stock Name',
      'Symbol',
      'Quantity',
      'Price per Share',
      'Total Amount',
      'Fees',
      'Exchange',
      'Status',
      'Date & Time'
    ];

    // CSV data rows
    const csvData = transactions.map(transaction => [
      transaction.transactionId,
      transaction.type,
      transaction.stockName || '',
      transaction.symbol || '',
      transaction.quantity || '',
      transaction.price ? `₹${transaction.price.toFixed(2)}` : '',
      `₹${(transaction.totalAmount || transaction.amount).toFixed(2)}`,
      `₹${transaction.fees.toFixed(2)}`,
      transaction.exchange || '',
      transaction.status,
      formatDate(transaction.date)
    ]);

    // Combine headers and data
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  let totalAmount = 0;

  transactions.forEach(txn => {
    const price = parseFloat(txn.price_per_share);
    const qty = txn.quantity;
  
    const amount = price * qty;
  
    if (txn.transaction_type === 'BUY' || txn.transaction_type === 'ADD') {
      totalAmount += amount;
    } else if (txn.transaction_type === 'SELL' || txn.transaction_type === 'WITHDRAW') {
      totalAmount -= amount;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Transaction History" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-96"></div>
          </div>
          
          {/* Summary Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Filters Skeleton */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-pulse">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded-lg w-32"></div>
              <div className="h-12 bg-gray-200 rounded-lg w-32"></div>
            </div>
          </div>
          
          {/* Table Skeleton */}
          <SkeletonTable rows={8} columns={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Transaction History" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Transaction History</h1>
          <p className="text-gray-500">Track all your trading and account activities</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <FaHistory className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Total Transactions</p>
                <p className="text-xl font-bold text-gray-900">{transactions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <FaFileAlt className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Total Amount</p>
                {totalAmount > 0 ? (
                  <p className="text-2xl font-bold text-green-500">₹{totalAmount.toLocaleString()}</p>
                ) : (
                  <p className="text-2xl font-bold text-red-500">₹{totalAmount.toLocaleString()}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <FaDownload className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Export Data</p>
                <button onClick={downloadCSV} className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Download CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 mb-2">  
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions by stock, symbol, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden mt-1">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="">
                <tr>
                  <th className="px-6 py-6 text-left text-sm font-medium text-gray-600 font-semibold tracking-wider">Transaction ID</th>
                  <th className="px-6 py-6 text-left text-sm font-medium text-gray-600 font-semibold tracking-wider">Transaction</th>
                  <th className="px-6 py-6 text-left text-sm font-medium text-gray-600 font-semibold tracking-wider">Amount</th>
                  <th className="px-6 py-6 text-left text-sm font-medium text-gray-600 font-semibold tracking-wider">Status</th>
                  <th className="px-6 py-6 text-left text-sm font-medium text-gray-600 font-semibold tracking-wider">Date</th>
                  <th className="px-6 py-6 text-left text-sm font-medium text-gray-600 font-semibold tracking-wider">Receipt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.transaction_id}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getTransactionIcon(transaction.transaction_type)}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.transaction_type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-sm font-semibold ${getTransactionColor(transaction.transaction_type)}`}>
                        {transaction.transaction_type === 'BUY' || transaction.transaction_type === 'ADD' ? '+' : '-'}
                        ₹{(Number(transaction.price_per_share)*Number(transaction.quantity)).toLocaleString()}
                      </p>
                      {transaction.transaction_type === 'BUY' || transaction.transaction_type === 'SELL' ? (
                        <p className="text-xs text-gray-500">@ ₹{transaction.price_per_share}</p>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor('COMPLETED')}`}>
                        {'Completed'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{formatDate(transaction.transaction_date)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleViewReceipt(transaction)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors duration-200 flex items-center gap-2 shadow-sm cursor-pointer"
                        title="View Receipt"
                      >
                        <FaReceipt className="w-4 h-4" />
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {transactions.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Receipt Modal */}
      {receiptModalOpen && selectedTransaction && (
        <TransactionReceipt
          isOpen={receiptModalOpen}
          onClose={closeReceiptModal}
          transaction={selectedTransaction}
          onDownload={downloadReceipt}
        />
      )}
      
      {/* Footer spacing */}
      <div className="mt-16 mb-48"></div>
      
      <Footer />
    </div>
  );
};

export default TransactionHistoryPage; 