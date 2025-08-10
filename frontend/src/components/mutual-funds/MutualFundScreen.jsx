import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import { SkeletonTable } from '../common/SkeletonLoader';
import axios from 'axios';
import Footer from '../common/Footer';

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
    setLoading(true);
    const API_BASE_URL = process.env.REACT_APP_API_URL;
  
    const fetchMutualFunds = async () => {
      setLoading(true);
      try {
        // MOCK API - Replace with real API call
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
        
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
        setError('Failed to fetch mutual funds');
      } finally {
        setLoading(false);
      }
    };
  
    fetchMutualFunds();
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFundClick = (fund) => {
    // Navigate to fund details page
    navigate(`/mutual-funds/details/${fund.fund_name}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  const getRiskLevel = (fund) => {
    // Determine risk level based on fund category or data
    if (activeTab.includes('Government') || activeTab.includes('Banking')) {
      return 'Low Risk';
    } else if (activeTab.includes('Large-Cap')) {
      return 'Moderate Risk';
    } else if (activeTab.includes('Mid-Cap') || activeTab.includes('Flexi')) {
      return 'High Risk';
    } else if (activeTab.includes('Small-Cap')) {
      return 'Very High Risk';
    }
    return 'Moderate Risk';
  };

  const getCategory = () => {
    if (activeTab.includes('Government') || activeTab.includes('Banking')) {
      return 'Debt';
    }
    return 'Equity';
  };

  const formatPercentage = (value) => {
    if (!value) return '--';
    const numValue = parseFloat(value);
    return isNaN(numValue) ? '--' : `${numValue.toFixed(2)}%`;
  };

  const getPerformanceColor = (value) => {
    if (!value) return 'text-gray-500';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'text-gray-500';
    return numValue >= 0 ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Mutual Funds" showBack={true} onBack={handleBack} />
        
        {/* Header Section Skeleton */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-3"></div>
            
            {/* Navigation Buttons Skeleton */}
            <div className="flex flex-wrap gap-3 mt-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-8 bg-gray-200 rounded-full animate-pulse w-24"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="mb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SkeletonTable rows={8} columns={4} />
        </div>
      </div>
    );
  }
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Mutual Funds" showBack={true} onBack={handleBack} />
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="tracking-wider text-lg font-semibold text-gray-600 mb-3">
            Mutual Funds
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

      {/* Mutual Funds Table */}
      <div className="mb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="shadow-md border-2 border-gray-200 min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Fund Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-600 uppercase tracking-wider">
                  1Y
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-600 uppercase tracking-wider">
                  3Y
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-600 uppercase tracking-wider">
                  5Y
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockDataByCategory[activeTab] && mockDataByCategory[activeTab].map((fund, index) => (
                <tr 
                  key={index}
                  onClick={() => handleFundClick(fund)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-gray-600 mb-1">
                        {fund.fund_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getRiskLevel(fund)} • {getCategory()}
                        {fund.rating && (
                          <span className="ml-1">
                            {[...Array(parseInt(fund.rating) || 0)].map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className={`text-sm font-medium ${getPerformanceColor(fund['1_year_return'])}`}>
                      {formatPercentage(fund['1_year_return'])}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className={`text-sm font-medium ${getPerformanceColor(fund['3_year_return'])}`}>
                      {formatPercentage(fund['3_year_return'])}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className={`text-sm font-medium ${getPerformanceColor(fund['5_year_return'])}`}>
                      {formatPercentage(fund['5_year_return'])}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {(!mockDataByCategory[activeTab] || mockDataByCategory[activeTab].length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No mutual funds data available for {activeTab}
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

export default MutualFundScreen;