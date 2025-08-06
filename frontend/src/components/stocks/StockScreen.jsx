import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import LoadingSpinner from '../common/LoadingSpinner';
import axios from 'axios';

const StockScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('trending');
  const [stocksData, setStocksData] = useState([]);

  const tabs = [
    { id: 'trending', label: 'Trending' },
    { id: 'price_shockers', label: 'Intra-Day' },
    { id: 'BSE_most_active', label: 'BSE Active' },
    { id: 'NSE_most_active', label: 'NSE Active' }
  ];

  // Different mock data for each category
  const mockDataByCategory = {
    trending: [],
    price_shockers: [],
    BSE_most_active: [],
    NSE_most_active: []
  };

  const fetchStocksData = async (tabType) => {
    setLoading(true);
    try {
      // Simulate API delay
      const API_BASE_URL = process.env.REACT_APP_API_URL;
      // trending stocks
      if(tabType === 'trending') {
        const fetchTrendingStocks = async () => {
          const res = await axios.get(`${API_BASE_URL}/api/stocks/trending`);
          return res.data;
        };
        const {
          trending_stocks: { top_gainers, top_losers },
        } = await fetchTrendingStocks();
        const trendingStocks = [...top_gainers, ...top_losers];
        mockDataByCategory[tabType] = trendingStocks.map(stock => ({
          company_name: stock.company_name,
          price: stock.price,
          percent_change: stock.percentChange,
          volume: stock.volume
        }))
      }
      // price shockers
      if(tabType === 'price_shockers') {
        const fetchPriceShockers = async () => {
          const res = await axios.get(`${API_BASE_URL}/api/stocks/price-shockers`);
          return res.data;
        };
        const {
          BSE_PriceShocker
        } = await fetchPriceShockers();
        mockDataByCategory[tabType] = BSE_PriceShocker.map(stock => ({
          company_name: stock.displayName,
          price: stock.price,
          percent_change: stock.percentChange,
          volume: stock.volume
        }))
      }
      // // BSE most active
      if(tabType === 'BSE_most_active') {
        const fetchBSEMostActive = async () => {
          const res = await axios.get(`${API_BASE_URL}/api/stocks/BSE-most-active`);
          return res.data;
        };
        const BSE_most_active = await fetchBSEMostActive();
        mockDataByCategory[tabType] = BSE_most_active.map(stock => ({
          company_name: stock.company,
          price: stock.price,
          percent_change: stock.percent_change,
          volume: stock.volume
        }))
      }
      // // NSE most active
      if(tabType === 'NSE_most_active') {
        const fetchNSEMostActive = async () => {
          const res = await axios.get(`${API_BASE_URL}/api/stocks/NSE-most-active`);
          return res.data;
        };
        const NSE_most_active = await fetchNSEMostActive();
        mockDataByCategory[tabType] = NSE_most_active.map(stock => ({
          company_name: stock.company,
          price: stock.price,
          percent_change: stock.percent_change,
          volume: stock.volume
        }))
      }     

      const mockData = mockDataByCategory[tabType] || [];
      setStocksData(mockData);
    } catch (err) {
      setError('Failed to load stocks data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocksData(activeTab);
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleStockClick = (stock) => {
    // Navigate to stock details page
    navigate(`/stocks/detail/${stock.company_name}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  const formatVolume = (volume) => {
    if (!volume) return '--';
    const num = typeof volume === 'string' ? parseFloat(volume.replace(/,/g, '')) : volume;
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(2)}Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(2)}L`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toLocaleString();
  };

  const formatPriceChange = (change) => {
    if (!change) return '--';
    const changeStr = change.toString();
    if (changeStr.includes('%')) {
      return changeStr;
    }
    return `${change}%`;
  };

  const isPositiveChange = (change) => {
    if (!change) return false;
    return typeof change === 'number' 
      ? change >= 0 
      : !change.toString().includes('-');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Stocks" showBack={true} onBack={handleBack} />
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="tracking-wider text-lg font-semibold text-gray-600 mb-3">
            Stocks
          </h1>
          
          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-1.5 rounded-full border-2 transition-all duration-200 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-transparent text-gray-600 border-gray-500'
                    : 'bg-transparent text-gray-400 border-gray-200 hover:border-gray-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stocks Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Market price
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">
                  1D price change
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stocksData.map((stock, index) => (
                <tr 
                  key={index}
                  onClick={() => handleStockClick(stock)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600">
                      {stock.company_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-700">
                    ₹{stock.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <span className={`font-medium ${
                      isPositiveChange(stock.percent_change) 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {isPositiveChange(stock.percent_change) ? '+' : ''}{formatPriceChange(stock.percent_change)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {formatVolume(stock.volume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {stocksData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No stocks data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockScreen;