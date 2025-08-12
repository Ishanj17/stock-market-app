import React, { useState, useEffect } from 'react';
import { FaWallet, FaArrowUp, FaArrowDown, FaSync, FaChartLine, FaTimes } from 'react-icons/fa';
import Header from '../common/Header';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import Footer from '../common/Footer';
import AddFundsModal from './AddFundsModel';
import WithdrawFundsModal from './WithdrawFundsModel';
import { SkeletonBalanceBreakdown, SkeletonDashboardCard, SkeletonText } from '../common/SkeletonLoader';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { successToast, failureToast } from '../common/toast';

const AccountBalancePage = () => {
  const { user } = useAuth();
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
    if(user?.user_id) {
      fetchBalance()
    }
  }, [user?.user_id]);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const { data : {code, message, data}} = await axios.post(`${apiUrl}/api/transactions/get-current-balance`, {
        user_id: user.user_id
      });
      console.log(code, message, data, 'code, message, data');
      if(code === 200) {
        const tempBalance = {
          availableBalance: data[0].available_balance,
          investedAmount: data[0].invested_amount,
          totalBalance: data[0].total_balance,
          currency: 'INR',
          lastUpdated: data[0].updated_at,
          monthlyGrowth: 12.5,
          yearlyGrowth: 8.2,
          accountNumber: data[0].bank_account_number,
          accountType: 'Trading Account'
        };
        setBalance(tempBalance);
      } else {
        failureToast('Please try again later');
      } 
      setLoading(false);
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
    if(balance) {
      setBankDetails({
        accountNumber: balance.accountNumber,
      });
    }
  };

  const handleWithdrawFunds = () => {
    setWithdrawModalOpen(true);
    setWithdrawAmount('');
  };

  const handleAddFundsSubmit = async ({amount}) => {
    setProcessing(true);
    console.log(amount, 'amount');
    console.log(user.user_id, 'user.user_id');
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const { data : {code, message, data}} = await axios.post(`${apiUrl}/api/transactions/add-money`, {
        user_id: user.user_id,
        amount: amount,
      });
      if(code === 200) {
        successToast('Money added successfully');
      } else {
        failureToast('Please try again later');
      }
      setAddFundsModalOpen(false);
      setAddFundsAmount('');
      setBankDetails({
        accountNumber: '',
      });
      fetchBalance();
    } catch (error) {
      failureToast('Failed to initiate fund transfer. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleWithdrawSubmit = async ({amount}) => {

    setProcessing(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const { data : {code, message, data}} = await axios.post(`${apiUrl}/api/transactions/withdraw-money`, {
        user_id: user.user_id,
        amount: amount,
      });
      if(code === 200) {
        successToast('Money withdrawn successfully');
      } else {
        failureToast('Please try again later');
      }
      setWithdrawModalOpen(false);
      setWithdrawAmount('');
      fetchBalance();
    } catch (error) {
      failureToast('Failed to initiate withdrawal. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleViewPortfolio = () => {
    navigate('/investments');
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Account Balance" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-96"></div>
          </div>

          {/* Main Balance Card Skeleton */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </div>
              </div>
              <div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Total Balance Display Skeleton */}
            <div className="text-center mb-8">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-2"></div>
              <div className="h-16 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-2"></div>
              <div className="flex items-center justify-center gap-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              </div>
            </div>

            {/* Balance Breakdown Skeleton */}
            <SkeletonBalanceBreakdown />
          </div>

          {/* Account Details Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SkeletonDashboardCard />
            <SkeletonDashboardCard />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Account Balance" />
      { balance && (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-700 mb-2">Account Balance</h1>
          <p className="text-gray-500">Manage and monitor your trading account</p>
        </div>

        {/* Main Balance Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-24">

          {/* Total Balance Display */}
          <div className="text-center mb-10">
            <p className="text-gray-500 font-semibold text-lg mb-2">Total Account Value</p>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">₹{(Number(balance.totalBalance) + Number(balance.investedAmount))}</h1>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-blue-600">{100*((balance.totalBalance)/(Number(balance.totalBalance) + Number(balance.investedAmount))).toFixed(2)}% ready to invest</span>
              <span className="text-gray-400">|</span>
              <span className="text-green-600">{100*((balance.investedAmount)/(Number(balance.totalBalance) + Number(balance.investedAmount))).toFixed(2)}% amount invested</span>
            </div>
          </div>

          {/* Balance Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Available Balance */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FaArrowUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Available Balance</h3>
              <p className="text-2xl font-bold text-blue-600">₹{balance?.totalBalance?.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Ready to Invest</p>
            </div>

            {/* Invested Amount */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FaArrowDown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Invested Amount</h3>
                <p className="text-2xl font-bold text-green-600">₹{balance?.investedAmount?.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Amount Invested</p>
            </div>

          </div>
        </div>

        {/* Account Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Information */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
            <h3 className="text-gray-500 font-bold text-center text-lg mb-8">
              Account Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-semibold text-gray-800">Account Number</span>
                <span className="text-gray-800">{balance.accountNumber}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-semibold text-gray-800">Account Type</span>
                <span className="text-gray-800">Trading Account</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-semibold text-gray-800">Currency</span>
                <span className="text-gray-800">INR</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-800">Last Updated</span>
                <span className="text-gray-800">
                  {new Date(balance.lastUpdated).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
            <h3 className="text-gray-500 font-bold text-center text-lg mb-8">Quick Actions</h3>
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
      )}
      
      {/* Add Funds Modal */}
      {addFundsModalOpen && (
        <AddFundsModal
          isOpen={addFundsModalOpen}
          onClose={() => setAddFundsModalOpen(false)}
          onSubmit={handleAddFundsSubmit}
          processing={processing}
          accountNumber={balance.accountNumber}
        />
      )}
      
      
      {/* Withdraw Funds Modal */}
      {withdrawModalOpen && (
        <WithdrawFundsModal
          isOpen={withdrawModalOpen}
          onClose={() => setWithdrawModalOpen(false)}
          onSubmit={handleWithdrawSubmit}
          processing={processing}
          availableBalance={balance.totalBalance}
        />
      )}
      
      {/* Footer spacing */}
      <div className="mt-16 mb-48"></div>
      
      <Footer />
    </div>
  );
};

export default AccountBalancePage; 