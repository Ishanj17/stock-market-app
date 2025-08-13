import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import Footer from '../common/Footer';
import Modal from '../common/Modal';
import { SkeletonTable, SkeletonInvestmentRow } from '../common/SkeletonLoader';
import { FaTimes, FaDollarSign } from 'react-icons/fa';
import SellInvestmentModal from './SellInvestmentModal';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { failureToast } from '../common/toast';
import { successToast } from '../common/toast';

const Investments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [sellQuantity, setSellQuantity] = useState(1);
  const [sellLoading, setSellLoading] = useState(false);
  const [stockCurrentDetails, setStockCurrentDetails] = useState([]);

  useEffect(() => {
    if(user) {
      fetchInvestments();
    }
  }, [user]);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login to view your investments');
        return;
      }
      const apiUrl = process.env.REACT_APP_API_URL;
      const updatedDetails = [];
      try {
        const {data : {code, message, data}} = await axios.post(`${apiUrl}/api/transactions/get-investments`, {
          user_id: user.user_id
        });
        console.log(code, message, data, 'investments data', user.user_id);
        if(code === 200) {
          const updatedDetails = await Promise.all(
            data.map(async (investment) => {
              const stockIdentifier = investment.stock_name.split(' ').slice(0, -1).join(' ');
              try {
                const { data: { price: { NSE } } } = await axios.get(
                  `${apiUrl}/api/stocks/detail?name=${stockIdentifier}`
                );
                return { stock_name: investment.stock_name, current_price: NSE };
              } catch (err) {
                return { stock_name: investment.stock_name, current_price: null };
              }
            })
          );
          setInvestments(data);
          console.log(updatedDetails, 'updated details');
          setStockCurrentDetails(updatedDetails);
        } else {
          setError(message);
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
        setError('Failed to load investmentms');
      }
    } catch (error) {
      console.error('Error fetching investments:', error);
      setError('Failed to load investmentsmm');
    } finally {
      setLoading(false);
    }
  };

  const getProfitLossColor = (profitLoss) => {
    return profitLoss >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getProfitLossIcon = (profitLoss) => {
    return profitLoss >= 0 ? '↗' : '↘';
  };

  const handleSellClick = (investment) => {
    setSelectedInvestment(investment);
    setSellQuantity(1);
    setSellModalOpen(true);
  };

  const handleSellConfirm = async (currentPrice) => {
    if (!selectedInvestment || sellQuantity <= 0) return;
    
    setSellLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      setLoading(true);
      const {data : {code, message, data}} = await axios.post(`${apiUrl}/api/transactions/sell-stock`, {
        user_id: user.user_id,
        stock_name: selectedInvestment.stock_name,
        quantity: sellQuantity,
        price: currentPrice
      });
      console.log(code, message, data, 'sell investment data', user.user_id);
      if(code === 200) {
        successToast('Investment sold successfully');
      } else {
        failureToast('Please try again');
      } 
      setSellModalOpen(false);
      setSelectedInvestment(null);
      fetchInvestments();
      setLoading(false);
    } catch (error) {
      console.error('Error selling investment:', error);
      failureToast('Please try again');
      setLoading(false);
    } finally {
      setSellLoading(false);
    }
  };

  const handleSellCancel = () => {
    setSellModalOpen(false);
    setSelectedInvestment(null);
    setSellQuantity(1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStockClick = (stock) => {
    // Navigate to stock details page using the most appropriate identifier
    const stockIdentifier = stock.stock_name.split(' ').slice(0, -1).join(' ');
    navigate(`/stocks/detail/${stockIdentifier}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-96"></div>
          </div>
          <SkeletonTable rows={5} columns={7} />
        </div>
        <Footer />
      </div>
    );
  }
  if (error) return <ErrorMessage message={error} onRetry={fetchInvestments} />;

  const totalValue = investments.reduce((acc, investment) => acc + Number(investment.price_per_share) * Number(investment.quantity), 0);
  const totalProfitLoss = investments.reduce((acc, investment, index) => {
    const current = Number(stockCurrentDetails[index]?.current_price) || 0;
    const bought = Number(investment.price_per_share) || 0;
    return acc + (current - bought) * investment.quantity;
  }, 0);
  const totalProfitLossPercentage = (totalProfitLoss / totalValue) * 100; 


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">My Investments</h1>
          <p className="text-gray-500">Track your portfolio performance and manage your investments</p>
        </div>

        {/* Portfolio Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-10 mb-16">
          <h2 className="text-2xl text-center font-bold text-gray-700 mb-4">Portfolio Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Total Value</p>
              <p className="text-2xl font-semibold text-gray-800">
                ₹{totalValue.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Total P&L</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{totalProfitLoss.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Total P&L %</p>
              <p className="text-2xl font-bold text-green-600">
                {totalProfitLossPercentage.toFixed(2)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Holdings</p>
              <p className="text-2xl font-bold text-gray-900">{investments.length}</p>
            </div>
          </div>
        </div>

        {/* Investments List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-600">Your Holdings</h2>
          </div>
          
          {investments.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📈</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No investments yet</h3>
              <p className="text-gray-500 mb-6">Start building your portfolio by exploring stocks, mutual funds, and IPOs</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate('/stocks')}
                  className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-green-600 transition-all duration-200"
                >
                  Explore Stocks
                </button>
                <button
                  onClick={() => navigate('/mutual-funds')}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
                >
                  Explore Mutual Funds
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Investment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Price per share(avg)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Current Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Total Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      P&L
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {investments.map((investment, index) => (
                    <tr key={investment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {investment.stock_name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <button 
                              onClick={() => handleStockClick(investment)}
                              className="text-sm font-medium font-semibold text-gray-700 hover:text-teal-600 cursor-pointer transition-colors duration-200 hover:underline"
                              >
                              {investment.stock_name}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {investment.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{Number(investment.price_per_share).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stockCurrentDetails[index]?.current_price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{(Number(investment.price_per_share) * Number(investment.quantity)).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm font-medium ${
                          ((Number(stockCurrentDetails[index]?.current_price) - Number(investment.price_per_share))
                            / Number(investment.price_per_share) * 100) > 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                        >
                        {((Number(stockCurrentDetails[index]?.current_price) - Number(investment.price_per_share))
                          / Number(investment.price_per_share) * 100).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleSellClick(investment)}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200 transition-colors duration-200 flex items-center gap-1"
                        >
                          Sell
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Sell Modal */}
      {sellModalOpen && selectedInvestment && (
        <SellInvestmentModal
          isOpen={sellModalOpen}
          onClose={handleSellCancel}
          investment={selectedInvestment}
          sellQuantity={sellQuantity}
          setSellQuantity={setSellQuantity}
          onConfirm={handleSellConfirm}
          loading={sellLoading}
        />
      )}
      
      {/* Footer spacing */}
      <div className="mt-16 mb-48"></div>
      
      <Footer />
    </div>
  );
};

export default Investments; 