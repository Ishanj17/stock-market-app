import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import FundCard from './FundCard';
import LoadingSpinner from '../common/LoadingSpinner';
import axios from 'axios';

const MutualFundScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Government Bond');
  const [mockDataByCategory, setMockDataByCategory] = useState({
    'Government Bond': [],
    'Banking & PSU': [],
    'Flexi Cap': [],
    'Sector - FMCG': [],
    'Large-Cap': [],
    'Mid-Cap': [],
    'Small-Cap': []
  });

  const tabs = [
    { id: 'Government Bond', label: 'Government Bond'},
    { id: 'Banking & PSU', label: 'Banking & PSU'},
    { id: 'Flexi Cap', label: 'Flexi Cap'},
    { id: 'Sector - FMCG', label: 'Sector - FMCG'},
    { id: 'Large-Cap', label: 'Large-Cap'},
    { id: 'Mid-Cap', label: 'Mid-Cap'},
    { id: 'Small-Cap', label: 'Small-Cap'}
  ];

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
  
    const fetchMutualFunds = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/mutualfunds`);
        const data = res.data;
  
        setMockDataByCategory({
          'Government Bond': data?.Debt?.['Government Bond'] || [],
          'Banking & PSU': data?.Debt?.['Banking & PSU'] || [],
          'Flexi Cap': data?.Equity?.['Flexi Cap'] || [],
          'Sector - FMCG': data?.Equity?.['Sector - FMCG'] || [],
          'Large-Cap': data?.Equity?.['Large-Cap'] || [],
          'Mid-Cap': data?.Equity?.['Mid-Cap'] || [],
          'Small-Cap': data?.Equity?.['Small-Cap'] || []
        });
      } catch (error) {
        console.error('Error fetching mutual funds:', error);
      }
    };
  
    fetchMutualFunds();
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleStockClick = (fund) => {
    // Navigate to fund details page
    navigate(`/mutual-funds/details/${fund.fund_name}`);
  };

  const handleBack = () => {
    navigate('/mutual-funds');
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
          {mockDataByCategory[activeTab] && mockDataByCategory[activeTab].map((fund, index) => (
            <FundCard 
              key={index} 
              fund={fund} 
              onClick={() => {
                handleStockClick(fund);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MutualFundScreen;