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
    trending: [
      { id: 'TCS', name: 'TCS', price: '3,850', change: '+2.5%', volume: '2.5M', category: 'IT' },
      { id: 'RELIANCE', name: 'RELIANCE', price: '2,450', change: '+1.8%', volume: '1.8M', category: 'Oil & Gas' },
      { id: 'INFOSYS', name: 'INFOSYS', price: '1,650', change: '+3.1%', volume: '1.2M', category: 'IT' },
      { id: 'HDFC_BANK', name: 'HDFC BANK', price: '1,850', change: '+0.8%', volume: '950K', category: 'Banking' },
      { id: 'ICICI_BANK', name: 'ICICI BANK', price: '950', change: '+1.2%', volume: '750K', category: 'Banking' }
    ],
    price_shockers: [
      { id: 'ADANI_PORTS', name: 'ADANI PORTS', price: '850', change: '+15.2%', volume: '5.2M', category: 'Infrastructure' },
      { id: 'TATA_MOTORS', name: 'TATA MOTORS', price: '650', change: '+12.8%', volume: '3.8M', category: 'Automobile' },
      { id: 'WIPRO', name: 'WIPRO', price: '450', change: '+8.5%', volume: '2.1M', category: 'IT' },
      { id: 'BHARTI_AIRTEL', name: 'BHARTI AIRTEL', price: '750', change: '+6.3%', volume: '1.9M', category: 'Telecom' },
      { id: 'SUN_PHARMA', name: 'SUN PHARMA', price: '950', change: '+5.7%', volume: '1.5M', category: 'Pharma' }
    ],
    BSE_most_active: [
      { id: 'RELIANCE', name: 'RELIANCE', price: '2,450', change: '+1.2%', volume: '8.5M', category: 'Oil & Gas' },
      { id: 'TCS', name: 'TCS', price: '3,850', change: '+0.8%', volume: '6.2M', category: 'IT' },
      { id: 'HDFC_BANK', name: 'HDFC BANK', price: '1,850', change: '-0.5%', volume: '5.8M', category: 'Banking' },
      { id: 'INFOSYS', name: 'INFOSYS', price: '1,650', change: '+1.1%', volume: '4.9M', category: 'IT' },
      { id: 'ITC', name: 'ITC', price: '450', change: '+0.3%', volume: '4.2M', category: 'FMCG' }
    ],
    NSE_most_active: [
      { id: 'RELIANCE', name: 'RELIANCE', price: '2,450', change: '+1.1%', volume: '12.5M', category: 'Oil & Gas' },
      { id: 'TCS', name: 'TCS', price: '3,850', change: '+0.9%', volume: '9.8M', category: 'IT' },
      { id: 'HDFC_BANK', name: 'HDFC BANK', price: '1,850', change: '-0.3%', volume: '8.7M', category: 'Banking' },
      { id: 'INFOSYS', name: 'INFOSYS', price: '1,650', change: '+1.2%', volume: '7.3M', category: 'IT' },
      { id: 'ICICI_BANK', name: 'ICICI BANK', price: '950', change: '+0.7%', volume: '6.9M', category: 'Banking' }
    ]
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
        console.log(trendingStocks, 'trendingStocks')
        mockDataByCategory[tabType] = trendingStocks.map(stock => ({
          company_name: stock.company_name,
          price: stock.price,
          percent_change: stock.percentChange,
          volume: stock.volume,
          category: ''
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
          volume: stock.volume,
          category: ''
        }))
      }
      // // BSE most active
      if(tabType === 'BSE_most_active') {
        const fetchBSEMostActive = async () => {
          const res = await axios.get(`${API_BASE_URL}/api/stocks/BSE-most-active`);
          return res.data;
        };
        const BSE_most_active = await fetchBSEMostActive();
        console.log(BSE_most_active, 'BSE_most_active')
        mockDataByCategory[tabType] = BSE_most_active.map(stock => ({
          company_name: stock.company,
          price: stock.price,
          percent_change: stock.percent_change,
          volume: stock.volume,
          category: ''
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
          volume: stock.volume,
          category: ''
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
    navigate(`/stocks/${stock.id}`);
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