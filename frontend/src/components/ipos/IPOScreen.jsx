import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import LoadingSpinner from '../common/LoadingSpinner';
import { SkeletonCard, SkeletonList } from '../common/SkeletonLoader';
import Footer from '../common/Footer';
import axios from 'axios';

const IPOScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const [iposData, setIposData] = useState({
    upcoming: [],
    active: [],
    closed: []
  });

  const tabs = [
    { id: 'active', label: 'Open' },
    { id: 'closed', label: 'Closed' },
    { id: 'upcoming', label: 'Upcoming' }
  ];

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    setLoading(true);
    const fetchIpos = async () => {
      try {
        // MOCK API - Replace with real API call
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
        
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

  const handleBack = () => {
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '--';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short'
    });
  };

  const renderUpcomingTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="shadow-md border-2 border-gray-200 min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
              Additional Info
            </th>
            <th className="px-6 py-4 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">
              Announcing date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {iposData.upcoming.map((ipo, index) => (
            <tr 
              key={index}
              className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <td className="px-6 py-4">
                <div className="text-gray-700">
                  {ipo.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-green-700">
                  {ipo.additional_text || '--'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                {formatDate(ipo.bidding_start_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {iposData.upcoming.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No upcoming IPOs available
        </div>
      )}
    </div>
  );

  const renderActiveTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="shadow-md border-2 border-gray-200 min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
              Additional Info
            </th>
            <th className="px-6 py-4 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">
              Closing date
            </th>
            <th className="px-6 py-4 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">
              Overall subscription
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {iposData.active.map((ipo, index) => (
            <tr 
              key={index}
              className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-700">
                  {ipo.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-green-700">
                  {ipo.additional_text || '--'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-orange-700">
                {formatDate(ipo.bidding_end_date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                {ipo.subscription_rate || '--'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {iposData.active.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No active IPOs available
        </div>
      )}
    </div>
  );

  const renderClosedTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="shadow-md border-2 border-gray-200 min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
              Additional Info
            </th>
            <th className="px-6 py-4 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">
              Price Band
            </th>
            <th className="px-6 py-4 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">
              Listing Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {iposData.closed.map((ipo, index) => (
            <tr 
              key={index}
              className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-700">
                  {ipo.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-green-700">
                  {ipo.additional_text || '--'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-red-700">
                ₹{ipo.min_price} - ₹{ipo.max_price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                {formatDate(ipo.listing_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {iposData.closed.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No closed IPOs available
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="IPOs" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
          </div>
          
          {/* Tabs Skeleton */}
          <div className="flex space-x-1 mb-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded-lg animate-pulse w-24"></div>
            ))}
          </div>
          
          {/* IPO Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
        
        {/* Footer spacing */}
        <div className="mt-16 mb-8"></div>
        
        <Footer />
      </div>
    );
  }
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="IPOs" showBack={true} onBack={handleBack} />
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="tracking-wider text-lg font-semibold text-gray-600 mb-3">
            IPO - Initial Public Offerings
          </h1>
          
          {/* Navigation Buttons */}
          <div className="flex space-x-3 mt-4">
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

      {/* IPO Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upcoming' && renderUpcomingTable()}
        {activeTab === 'active' && renderActiveTable()}
        {activeTab === 'closed' && renderClosedTable()}
      </div>
      
      {/* Footer spacing */}
      <div className="mt-16 mb-8"></div>
      
      <Footer />
    </div>
  );
};

export default IPOScreen;