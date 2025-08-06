import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import IPOCard from './IPOCard';
import LoadingSpinner from '../common/LoadingSpinner';
import axios from 'axios';

const IPOScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [iposData, setIposData] = useState({
    upcoming: [],
    active: [],
    closed: []
  });

  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'active', label: 'Active' },
    { id: 'closed', label: 'Closed' }
  ];

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    setLoading(true);
    const fetchIpos = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/ipos`);
        const data = res.data;
        setIposData({
          upcoming: data.upcoming,
          active: data.active,
          closed: data.closed
        });
      } catch (error) {
        console.error('Error fetching ipos:', error);
        setError('Failed to load ipos data');
      } finally {
        setLoading(false);
      }
    };
    fetchIpos();
  }, []);


  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleIpoClick = (ipo) => {
    // Navigate to ipo details page
    navigate(`/ipos/${ipo.name}`);
  };

  const handleBack = () => {
    navigate('/ipos');
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
          {iposData[activeTab].map((IPO, index) => (
            <IPOCard 
              key={index} 
              IPO={IPO} 
              activeTab={activeTab}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IPOScreen;