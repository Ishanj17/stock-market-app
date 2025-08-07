import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../common/Header';
import LoadingSpinner from '../common/LoadingSpinner';
import axios from 'axios';
import './stocks.css';

const StockDetails = () => {
  const navigate = useNavigate();
  let { name } = useParams();
  // name = name.split(' ')[0];
  
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchStockDetails = async () => {
      setLoading(true);
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        const res = await axios.get(`${API_BASE_URL}/api/stocks/detail?name=${name}`);
        const stockData = res.data;

        if (stockData) {
          setStock(stockData);
        } else {
          setError('Stock not found');
        }
      } catch (err) {
        setError('Failed to load stock details');
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [name]);

  const handleBack = () => {
    navigate('/stocks');
  };

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    if (typeof num === 'string') return num;
    if (num >= 1000000000) return `₹${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `₹${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const formatPercent = (num) => {
    if (!num) return 'N/A';
    return typeof num === 'string' ? num : `${num.toFixed(2)}%`;
  };

  const getChangeColor = (change) => {
    if (typeof change === 'string') {
      return change.startsWith('+') || change.startsWith('₹+') ? 'text-green-600' : 'text-red-600';
    }
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'peers', label: 'Peer Comparison' },
    { id: 'news', label: 'Recent News' }
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!stock) return <div className="text-center text-gray-500 p-8">Stock not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={stock.name || 'Stock Details'} showBack={true} onBack={handleBack} />
      
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        {/* Stock Header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="hero-heading font-bold mb-1"
                  style={{fontSize: '30px', fontWeight: '700'}}
              >
                {stock.name}
              </h1>
              <p className="hero-subheading mb-1">{stock.industry} Industry</p>
              <div className="flex flex-wrap gap-4">
                <div className="text-2xl font-bold text-gray-500">
                  ₹{stock.price?.NSE || stock.price?.BSE || stock.price}
                </div>
                <div className={`mt-2 text-sm font-semibold ${getChangeColor(stock.peerCompanyList[0].percentChange)}`}>
                  {stock.peerCompanyList[0].percentChange > 0 ? '+' : ''}{stock.peerCompanyList[0].percentChange}%
                  <span className="text-sm ml-2">
                    ({stock.peerCompanyList[0].netChange > 0 ? '+' : ''}₹{stock.peerCompanyList[0].netChange})
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="hero-subheading">Risk Level</div>
                <div className="font-semibold text-gray-500">{stock.risk}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Price Metrics Grid */}
                <div>
                  <h3 className="text-gray-500 font-bold mb-4">Price & Volume</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Market Cap</div>
                      <div className="text-md font-semibold">{formatNumber(stock.peerCompanyList[0].marketCap * 10000000)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">P/E Ratio</div>
                      <div className="text-md font-semibold">{stock.peerCompanyList[0].priceToEarningsValueRatio?.toFixed(2) || 'N/A'}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">52W High</div>
                      <div className="text-md font-semibold">₹{stock.peerCompanyList[0].yhigh}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">52W Low</div>
                      <div className="text-md font-semibold">₹{stock.peerCompanyList[0].ylow}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">P/B Ratio</div>
                      <div className="text-md font-semibold">{stock.peerCompanyList[0].priceToBookValueRatio?.toFixed(2) || 'N/A'}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Dividend Yield</div>
                      <div className="text-md font-semibold">{formatPercent(stock.peerCompanyList[0].dividendYieldIndicatedAnnualDividend)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Shares Outstanding</div>
                      <div className="text-md font-semibold">{stock.peerCompanyList[0].totalSharesOutstanding}M</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Overall Rating</div>
                      <div className={`text-md font-semibold ${
                        stock.peerCompanyList[0].overallRating === 'Bearish' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {stock.peerCompanyList[0].overallRating}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Description */}
                {stock.description && (
                  <div>
                    <h3 className="text-gray-500 font-bold mb-4">About the Company</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{stock.description}</p>
                  </div>
                )}
              </div>
            )}

            {/* Peer Comparison Tab */}
            {activeTab === 'peers' && stock.peerCompanyList && (
              <div>
                <h3 className="text-gray-500 font-bold mb-4">Peer Companies</h3>
                <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium font-semibold text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium font-semibold text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium font-semibold text-gray-500 uppercase tracking-wider">
                          Change %
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium font-semibold text-gray-500 uppercase tracking-wider">
                          P/E Ratio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium font-semibold text-gray-500 uppercase tracking-wider">
                          Market Cap
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium font-semibold text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stock.peerCompanyList.map((peer, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {peer.imageUrl && (
                                <img className="h-8 w-8 rounded-full mr-3" src={peer.imageUrl} alt="" />
                              )}
                              <div className="text-sm text-gray-900">
                                {peer.companyName}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{peer.price}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getChangeColor(peer.percentChange)}`}>
                            {peer.percentChange > 0 ? '+' : ''}{peer.percentChange}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {peer.priceToEarningsValueRatio?.toFixed(2) || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatNumber(peer.marketCap * 10000000)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              peer.overallRating === 'Bearish' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {peer.overallRating}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Recent News Tab */}
            {activeTab === 'news' && stock.recentNews && (
              <div>
                <h3 className="text-gray-500 font-bold mb-4">Recent News</h3>
                <div className="space-y-4 rounded-lg shadow-md border border-gray-100 p-4">
                  {stock.recentNews.slice(0, 8).map((news, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        {news.thumbnailimage && (
                          <img 
                            src={news.thumbnailimage} 
                            alt="" 
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 onClick={() => window.open(news.url, '_blank')} className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                            {news.headline}
                          </h4>
                          {news.intro && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {news.intro.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '')}
                            </p>
                          )}
                          <div className="flex items-center mt-2 text-xs text-gray-500 space-x-4">
                            <span>{news.byline}</span>
                            <span>{news.timeToRead} min read</span>
                            {news.premiumStory === 'true' && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                Premium
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;