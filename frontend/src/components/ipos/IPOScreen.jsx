import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import IPOCard from './IPOCard';
import LoadingSpinner from '../common/LoadingSpinner';

const IPOScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Active');
  const [iposData, setIposData] = useState([]);

  const tabs = [
    { id: 'Active', label: 'Active', icon: '📈' }
  ];

  // Different mock data for each category
  const mockDataByCategory = {
    Active: [
        { id: 'OLA_ELECTRIC', name: 'Ola Electric Mobility Ltd', price: '180.00', change: '+5.2%', volume: '3.5M', category: 'Electric Vehicles' },
        { id: 'BOAT_LIFESTYLE', name: 'boAt Lifestyle Ltd', price: '105.50', change: '+3.8%', volume: '2.1M', category: 'Consumer Electronics' },
        { id: 'MOBIKWIK', name: 'MobiKwik Systems Ltd', price: '145.20', change: '+6.4%', volume: '1.9M', category: 'Fintech' },
        { id: 'PHARMEASY', name: 'API Holdings (PharmEasy)', price: '90.40', change: '+4.1%', volume: '2.3M', category: 'Healthcare' },
        { id: 'FIRSTCRY', name: 'FirstCry (BrainBees Solutions)', price: '225.00', change: '+7.2%', volume: '2.8M', category: 'E-Commerce' }
      ]   
  };

  const fetchIposData = async (tabType) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockData = mockDataByCategory[tabType] || [];
      setIposData(mockData);
    } catch (err) {
      setError('Failed to load ipos data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIposData(activeTab);
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleIpoClick = (ipo) => {
    // Navigate to ipo details page
    navigate(`/ipos/${ipo.id}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="IPOs" showBack={true} onBack={handleBack} />
      
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
          {iposData.map((IPO, index) => (
            <IPOCard 
              key={index} 
              IPO={IPO} 
              onClick={() => handleIpoClick(IPO)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IPOScreen;