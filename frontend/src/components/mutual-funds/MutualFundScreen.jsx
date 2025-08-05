import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import FundCard from './FundCard';
import LoadingSpinner from '../common/LoadingSpinner';

const MutualFundScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Active');
  const [fundsData, setFundsData] = useState([]);

  const tabs = [
    { id: 'Active', label: 'Active', icon: '📈' }
  ];

  // Different mock data for each category
  const mockDataByCategory = {
    Active: [
        { id: 'AXISBLUECHIP', name: 'Axis Bluechip Fund', price: '45.23', change: '+1.5%', volume: '1.2M', category: 'Large Cap' },
        { id: 'SBI_SMALLCAP', name: 'SBI Small Cap Fund', price: '115.40', change: '+2.1%', volume: '900K', category: 'Small Cap' },
        { id: 'HDFC_HYBRID', name: 'HDFC Hybrid Equity Fund', price: '78.90', change: '+0.9%', volume: '850K', category: 'Hybrid' },
        { id: 'NIPPON_INDIA', name: 'Nippon India Growth Fund', price: '125.75', change: '+1.8%', volume: '650K', category: 'Mid Cap' },
        { id: 'MIRAE_ASSET', name: 'Mirae Asset Emerging Bluechip', price: '98.35', change: '+2.3%', volume: '720K', category: 'Large & Mid Cap' }
      ]      
  };

  const fetchFundsData = async (tabType) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockData = mockDataByCategory[tabType] || [];
      setFundsData(mockData);
    } catch (err) {
      setError('Failed to load funds data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundsData(activeTab);
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleStockClick = (fund) => {
    // Navigate to fund details page
    navigate(`/mutual-funds/${fund.id}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Mutual Funds" showBack={true} onBack={handleBack} />
      
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
          {fundsData.map((fund, index) => (
            <FundCard 
              key={index} 
              fund={fund} 
              onClick={() => handleStockClick(fund)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MutualFundScreen;