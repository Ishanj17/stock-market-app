import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import StockCard from './StockCard';
import LoadingSpinner from '../common/LoadingSpinner';
import axios from 'axios';

const StockScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('trending');
  const [stocksData, setStocksData] = useState([]);

  const tabs = [
    { id: 'trending', label: 'Trending', icon: '📈' },
    { id: 'price_shockers', label: 'Price Shockers', icon: '⚡' },
    { id: 'BSE_most_active', label: 'BSE Active', icon: '📊' },
    { id: 'NSE_most_active', label: 'NSE Active', icon: '📊' }
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

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Stocks" showBack={true} onBack={handleBack} />
      
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stocks List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-4">
          {stocksData.map((stock, index) => (
            <StockCard 
              key={index} 
              stock={stock} 
              onClick={() => handleStockClick(stock)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockScreen;