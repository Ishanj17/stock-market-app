import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import ErrorMessage from '../common/ErrorMessage';
import { SkeletonTable } from '../common/SkeletonLoader';
import axios from 'axios';
import Footer from '../common/Footer';
import { FaArrowUp, FaArrowDown, FaChartLine, FaFire, FaStar } from 'react-icons/fa';

const StockScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('trending');
  const [stocksData, setStocksData] = useState([]);

  const tabs = [
    { 
      id: 'trending', 
      label: 'Trending', 
      icon: FaStar,
      description: 'Most popular stocks today'
    },
    { 
      id: 'price_shockers', 
      label: 'Shockers', 
      icon: FaFire,
      description: 'Biggest price movers'
    },
    { 
      id: 'BSE_most_active', 
      label: 'BSE Active', 
      icon: FaChartLine,
      description: 'High volume BSE stocks'
    },
    { 
      id: 'NSE_most_active', 
      label: 'NSE Active', 
      icon: FaChartLine,
      description: 'High volume NSE stocks'
    }
  ];

  const fetchStocksData = async (tabType) => {
    setLoading(true);
    setError(null);
    
    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL;
      
      let response;
      switch (tabType) {
        case 'trending':
          response = await axios.get(`${API_BASE_URL}/api/stocks/trending`);
          break;
        case 'price_shockers':
          response = await axios.get(`${API_BASE_URL}/api/stocks/price-shockers`);
          break;
        case 'BSE_most_active':
          response = await axios.get(`${API_BASE_URL}/api/stocks/BSE-most-active`);
          break;
        case 'NSE_most_active':
          response = await axios.get(`${API_BASE_URL}/api/stocks/NSE-most-active`);
          break;
        default:
          response = await axios.get(`${API_BASE_URL}/api/stocks/trending`);
      }
      
      // Handle different possible response structures
      let stocksArray = [];
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          stocksArray = response.data;
        } else if (response.data.trending_stocks) {
          // Handle the actual API response structure
          if (tabType === 'trending') {
            // Combine top gainers and top losers for trending tab
            const topGainers = response.data.trending_stocks.top_gainers || [];
            const topLosers = response.data.trending_stocks.top_losers || [];
            stocksArray = [...topGainers, ...topLosers];
          } else if (tabType === 'price_shockers') {
            // For price shockers, show top gainers and losers
            const topGainers = response.data.trending_stocks.top_gainers || [];
            const topLosers = response.data.trending_stocks.top_losers || [];
            stocksArray = [...topGainers, ...topLosers];
          } else {
            // For other tabs, use top gainers as default
            stocksArray = response.data.trending_stocks.top_gainers || [];
          }
        } else if (response.data.BSE_PriceShocker && Array.isArray(response.data.BSE_PriceShocker)) {
          // Handle BSE Price Shocker response
          stocksArray = response.data.BSE_PriceShocker;
        } else if (response.data.NSE_PriceShocker && Array.isArray(response.data.NSE_PriceShocker)) {
          // Handle NSE Price Shocker response
          stocksArray = response.data.NSE_PriceShocker;
        } else if (response.data.stocks && Array.isArray(response.data.stocks)) {
          stocksArray = response.data.stocks;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          stocksArray = response.data.data;
        } else if (response.data.results && Array.isArray(response.data.results)) {
          stocksArray = response.data.results;
        } else {
          console.warn('Unexpected response structure:', response.data);
          stocksArray = [];
        }
      }
      
      // Process the data to ensure proper types and formatting
      stocksArray = stocksArray.map(stock => ({
        ...stock,
        // Handle different field names from different APIs
        company_name: stock.company_name || stock.displayName || stock.company || stock.name || 'Unknown Company',
        price: parseFloat(stock.price) || 0,
        percent_change: parseFloat(stock.percentChange || stock.percent_change) || 0,
        net_change: parseFloat(stock.netChange || stock.net_change) || 0,
        volume: parseInt(stock.volume) || 0,
        year_high: parseFloat(stock.yhigh || stock.year_high || stock['52_week_high']) || 0,
        year_low: parseFloat(stock.ylow || stock.year_low || stock['52_week_low']) || 0,
        // Handle exchange information
        exchange: stock.exchangeType || stock.exchange || 'N/A',
        ric: stock.ric || stock.tickerId || stock.ticker || '--',
        nseCode: stock.nseCode || '--'
      }));
      
      setStocksData(stocksArray);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      setError('Failed to fetch stocks data');
      setStocksData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocksData(activeTab);
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleStockClick = (stock) => {
    // Navigate to stock details page using the most appropriate identifier
    const stockIdentifier = stock.company_name || stock.displayName || stock.company;
    navigate(`/stocks/detail/${stockIdentifier}`);
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
    if (!change && change !== 0) return '--';
    const changeStr = change.toString();
    if (changeStr.includes('%')) {
      return changeStr;
    }
    return `${change}%`;
  };

  const isPositiveChange = (change) => {
    if (!change && change !== 0) return false;
    return typeof change === 'number' 
      ? change >= 0 
      : !change.toString().includes('-');
  };

  const getChangeIcon = (change) => {
    return isPositiveChange(change) ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Stocks" showBack={true} onBack={handleBack} />
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-80"></div>
          </div>

          {/* Tab Navigation Skeleton */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-12 bg-gray-200 rounded animate-pulse w-24"></div>
                ))}
              </nav>
            </div>
            
            {/* Tab Description Skeleton */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-96"></div>
            </div>
          </div>

          {/* Table Skeleton */}
          <SkeletonTable rows={10} columns={6} />
        </div>
        <Footer />
      </div>
    );
  }
  if (error) return <ErrorMessage message={error} onRetry={() => fetchStocksData(activeTab)} />;

  return (
    <div className="min-h-screen">
      <Header title="Stocks" showBack={true} onBack={handleBack} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 px-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-700 mb-2">Stocks</h1>
            <p className="text-gray-500">Explore trending stocks and market movers</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg mb-8">
          <div className="">
            <nav className="flex space-x-8 px-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Stocks Grid/Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-600">
              {tabs.find(tab => tab.id === activeTab)?.label} Stocks ({Array.isArray(stocksData) ? stocksData.length : 0})
            </h2>
          </div>
          
          {!Array.isArray(stocksData) || stocksData.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks available</h3>
              <p className="text-gray-500">Try selecting a different category or check back later</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                      Change
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                      52W High
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                      52W Low
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                      Volume
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.isArray(stocksData) && stocksData.map((stock, index) => (
                    <tr 
                      key={index}
                      className="transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {stock.company_name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div 
                              onClick={() => handleStockClick(stock)}
                              className="text-sm font-medium font-semibold text-gray-700 hover:text-teal-600 cursor-pointer transition-colors duration-200 hover:underline"
                              title={stock.description || ''}
                            >
                              {stock.company_name}
                            </div>
                            {stock.description && (
                              <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                                {stock.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-semibold text-gray-900">₹{stock.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className={`flex items-center justify-end gap-1 text-sm font-medium ${
                          isPositiveChange(stock.percent_change) 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {getChangeIcon(stock.percent_change)}
                          <span>
                            {isPositiveChange(stock.percent_change) ? '+' : ''}{formatPriceChange(stock.percent_change)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900">₹{stock.year_high || '--'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900">₹{stock.year_low || '--'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900">{formatVolume(stock.volume)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer spacing */}
      <div className="mt-16 mb-8"></div>
      
      <Footer />
    </div>
  );
};

export default StockScreen;