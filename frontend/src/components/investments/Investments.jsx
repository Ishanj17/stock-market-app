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

const Investments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [sellQuantity, setSellQuantity] = useState(1);
  const [sellLoading, setSellLoading] = useState(false);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      
      // Check if user is authenticated
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login to view your investments');
        return;
      }

      // MOCK API - Replace with real API call
      // TODO: Replace with actual API calls for user investments
      // For now, using mock data that simulates API response
      const apiUrl = process.env.REACT_APP_API_URL;
      
      try {
        // Simulate API call - in real implementation, this would be:
        // const response = await fetch(`${apiUrl}/api/investments/user-portfolio`, {
        //   headers: { 'Authorization': `Bearer ${token}` }
        // });
        // const data = await response.json();
        
        // Mock API response
        const mockInvestments = [
          {
            id: 1,
            type: 'Stock',
            name: 'Reliance Industries Ltd.',
            symbol: 'RELIANCE',
            quantity: 10,
            avgPrice: 2500.00,
            currentPrice: 2750.00,
            totalValue: 27500.00,
            profitLoss: 2500.00,
            profitLossPercentage: 10.0
          },
          {
            id: 2,
            type: 'Mutual Fund',
            name: 'HDFC Mid-Cap Opportunities Fund',
            symbol: 'HDFCMID',
            quantity: 50,
            avgPrice: 45.00,
            currentPrice: 47.25,
            totalValue: 2362.50,
            profitLoss: 112.50,
            profitLossPercentage: 5.0
          },
          {
            id: 3,
            type: 'Stock',
            name: 'TCS Ltd.',
            symbol: 'TCS',
            quantity: 5,
            avgPrice: 3800.00,
            currentPrice: 3990.00,
            totalValue: 19950.00,
            profitLoss: 950.00,
            profitLossPercentage: 5.0
          }
        ];
        
        setInvestments(mockInvestments);
      } catch (apiError) {
        console.error('API Error:', apiError);
        // Fallback to mock data if API fails
        const fallbackInvestments = [
          {
            id: 1,
            type: 'Stock',
            name: 'Reliance Industries Ltd.',
            symbol: 'RELIANCE',
            quantity: 10,
            avgPrice: 2500.00,
            currentPrice: 2750.00,
            totalValue: 27500.00,
            profitLoss: 2500.00,
            profitLossPercentage: 10.0
          }
        ];
        setInvestments(fallbackInvestments);
      }
    } catch (err) {
      setError('Failed to load investments');
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

  const handleSellConfirm = async () => {
    if (!selectedInvestment || sellQuantity <= 0) return;
    
    setSellLoading(true);
    try {
      // MOCK API - Replace with real API call
      // Mock API call for selling investment
      // TODO: Replace with actual API call when backend is ready
      setSellModalOpen(false);
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // Mock successful sale
      console.log(`Sold ${sellQuantity} units of ${selectedInvestment.name}`);
      
      // Close modal and show success message
      
      setSelectedInvestment(null);
      setLoading(false);
      // alert(`Successfully sold ${sellQuantity} units of ${selectedInvestment.name}`);
      
      // In real implementation, you would refresh the investments list here
      // fetchInvestments();
      
    } catch (error) {
      console.error('Error selling investment:', error);
      alert('Failed to sell investment. Please try again.');
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
    const stockIdentifier = stock.company_name || stock.displayName || stock.company;
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
              <p className="text-2xl font-semibold text-gray-800">$6,855.00</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Total P&L</p>
              <p className="text-2xl font-bold text-green-600">+$855.00</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Total P&L %</p>
              <p className="text-2xl font-bold text-green-600">+14.2%</p>
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
                      Avg Price
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
                  {investments.map((investment) => (
                    <tr key={investment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {investment.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <button 
                              onClick={() => handleStockClick(investment)}
                              className="text-sm font-medium font-semibold text-gray-700 hover:text-teal-600 cursor-pointer transition-colors duration-200 hover:underline"
                              >
                              {investment.name}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {investment.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{investment.avgPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{investment.currentPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{investment.totalValue.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getProfitLossColor(investment.profitLoss)}`}>
                          <span className="mr-1">{getProfitLossIcon(investment.profitLoss)}</span>
                          ₹{investment.profitLoss.toFixed(2)} ({investment.profitLossPercentage.toFixed(1)}%)
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