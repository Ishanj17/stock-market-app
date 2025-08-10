import React, { useState, useEffect } from 'react';
import { FaWallet, FaArrowUp, FaArrowDown, FaSync, FaChartLine, FaTimes } from 'react-icons/fa';
import Header from '../common/Header';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import Footer from '../common/Footer';
import axios from 'axios';

const AccountBalancePage = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [addFundsModalOpen, setAddFundsModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [addFundsAmount, setAddFundsAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // MOCK API - Replace with real API call
    setTimeout(() => {
      const mockBalance = {
        availableBalance: 12500.75,
        investedAmount: 6855.00,
        totalBalance: 19355.75,
        pendingAmount: 0.00,
        currency: 'INR',
        lastUpdated: new Date().toISOString(),
        monthlyGrowth: 12.5,
        yearlyGrowth: 8.2,
        accountNumber: 'ACC123456789',
        accountType: 'Trading Account'
      };
      setLoading(false);
      setBalance(mockBalance);
    }, 1500); // Simulate API delay
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
          lastUpdated: new Date().toISOString(),
          monthlyGrowth: 12.5,
          yearlyGrowth: 8.2,
          accountNumber: 'ACC123456789',
          accountType: 'Trading Account'
        };
        setBalance(mockBalance);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBalance();
    setRefreshing(false);
  };

  const handleAddFunds = () => {
    setAddFundsModalOpen(true);
    setAddFundsAmount('');
    setBankDetails({
      accountNumber: '',
      ifscCode: '',
      accountHolderName: ''
    });
  };

  const handleWithdrawFunds = () => {
    setWithdrawModalOpen(true);
    setWithdrawAmount('');
  };

  const handleAddFundsSubmit = async (e) => {
    e.preventDefault();
    if (!addFundsAmount || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.accountHolderName) {
      alert('Please fill in all fields');
      return;
    }

    const amount = parseFloat(addFundsAmount);
    if (amount < 500) {
      alert('Minimum amount required is ₹500');
      return;
    }

    setProcessing(true);
    try {
      // MOCK API - Replace with real API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      alert(`Successfully initiated fund transfer of ₹${amount.toLocaleString()} from ${bankDetails.accountHolderName}'s account. Funds will be credited within 1-2 business days.`);
      setAddFundsModalOpen(false);
      setAddFundsAmount('');
      setBankDetails({
        accountNumber: '',
        ifscCode: '',
        accountHolderName: ''
      });
      
      // In real implementation, you would refresh the balance here
      // fetchBalance();
      
    } catch (error) {
      alert('Failed to initiate fund transfer. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    if (!withdrawAmount) {
      alert('Please enter withdrawal amount');
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (amount < 100) {
      alert('Minimum withdrawal amount is ₹100');
      return;
    }

    if (amount > balance.availableBalance) {
      alert('Insufficient available balance for withdrawal');
      return;
    }

    setProcessing(true);
    try {
      // MOCK API - Replace with real API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      alert(`Successfully initiated withdrawal of ₹${amount.toLocaleString()}. Amount will be transferred to your registered bank account within 1-2 business days.`);
      setWithdrawModalOpen(false);
      setWithdrawAmount('');
      
      // In real implementation, you would refresh the balance here
      // fetchBalance();
      
    } catch (error) {
      alert('Failed to initiate withdrawal. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleViewPortfolio = () => {
    // Navigate to investments and scroll to top
    navigate('/investments');
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Account Balance" />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading account balance...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Account Balance" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Balance</h1>
          <p className="text-gray-600">Manage and monitor your trading account</p>
        </div>

        {/* Main Balance Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                <FaWallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Total Balance</h2>
                <p className="text-gray-500">Account: {balance.accountNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <FaSync className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>

            </div>
          </div>

          {/* Total Balance Display */}
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg mb-2">Total Account Value</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">₹{balance.totalBalance.toLocaleString()}</h1>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-green-600">+{balance.monthlyGrowth}% this month</span>
              <span className="text-gray-400">|</span>
              <span className="text-blue-600">+{balance.yearlyGrowth}% this year</span>
            </div>
          </div>

          {/* Balance Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Available Balance */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FaArrowUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Available Balance</h3>
              <p className="text-2xl font-bold text-blue-600">₹{balance.availableBalance.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Ready to invest</p>
            </div>

            {/* Invested Amount */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FaArrowDown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Invested Amount</h3>
              <p className="text-2xl font-bold text-green-600">₹{balance.investedAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">In active positions</p>
            </div>

            {/* Pending Amount */}
            <div className="bg-yellow-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FaChartLine className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Pending Amount</h3>
              <p className="text-2xl font-bold text-yellow-600">₹{balance.pendingAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Processing transactions</p>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Account Number</span>
                <span className="font-medium text-gray-900">{balance.accountNumber}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Account Type</span>
                <span className="font-medium text-gray-900">{balance.accountType}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Currency</span>
                <span className="font-medium text-gray-900">{balance.currency}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium text-gray-900">
                  {new Date(balance.lastUpdated).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={handleAddFunds}
                className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-left relative group"
                title="Minimum deposit amount: ₹500"
              >
                <div className="flex items-center gap-3">
                  <FaArrowUp className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Add Funds</p>
                    <p className="text-sm text-green-100">Deposit money to your account</p>
                  </div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Minimum deposit amount: ₹500
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              
              <button 
                onClick={handleWithdrawFunds}
                className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-left relative group"
                title="Withdraw funds to your bank account"
              >
                <div className="flex items-center gap-3">
                  <FaArrowDown className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Withdraw Funds</p>
                    <p className="text-sm text-orange-100">Transfer money to your bank</p>
                  </div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Minimum withdrawal: ₹100
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              
              <button 
                onClick={handleViewPortfolio}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FaChartLine className="w-5 h-5" />
                  <div>
                    <p className="font-medium">View Portfolio</p>
                    <p className="text-sm text-blue-100">Check your investments</p>
                  </div>
                </div>
              </button>
              

            </div>
          </div>
        </div>
      </div>
      
      {/* Add Funds Modal */}
      {addFundsModalOpen && (
        <Modal isOpen={addFundsModalOpen} onClose={() => setAddFundsModalOpen(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Funds to Account</h3>
              <button
                onClick={() => setAddFundsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddFundsSubmit}>
              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Add (₹)
                </label>
                <input
                  type="number"
                  min="500"
                  step="100"
                  value={addFundsAmount}
                  onChange={(e) => setAddFundsAmount(e.target.value)}
                  placeholder="Enter amount (min: ₹500)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum amount: ₹500
                </p>
              </div>
              
              {/* Bank Details */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Account Number
                </label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                  placeholder="Enter bank account number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={bankDetails.ifscCode}
                  onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value.toUpperCase()})}
                  placeholder="Enter IFSC code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={bankDetails.accountHolderName}
                  onChange={(e) => setBankDetails({...bankDetails, accountHolderName: e.target.value})}
                  placeholder="Enter account holder name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAddFundsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    'Add Funds'
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      
      {/* Withdraw Funds Modal */}
      {withdrawModalOpen && (
        <Modal isOpen={withdrawModalOpen} onClose={() => setWithdrawModalOpen(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Withdraw Funds</h3>
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleWithdrawSubmit}>
              {/* Available Balance Info */}
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="text-sm text-blue-800">
                  <span className="font-medium">Available Balance:</span>
                  <div className="text-lg font-bold text-blue-900">
                    ₹{balance.availableBalance.toLocaleString()}
                  </div>
                </div>
              </div>
              
              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Withdrawal Amount (₹)
                </label>
                <input
                  type="number"
                  min="100"
                  max={balance.availableBalance}
                  step="100"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter withdrawal amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum: ₹100 | Maximum: ₹{balance.availableBalance.toLocaleString()}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setWithdrawModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    'Withdraw Funds'
                  )}
                                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      
      {/* Footer spacing */}
      <div className="mt-16 mb-8"></div>
      
      <Footer />
    </div>
  );
};

export default AccountBalancePage; 