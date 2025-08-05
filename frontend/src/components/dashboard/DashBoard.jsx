import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import DashboardCard from './DashBoardCard';
import MarketSentiment from './MarketSentiment';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    trendingStocks: [],
    mutualFunds: [],
    ipos: [],
    marketSentiment: {}
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      const mockData = {
        trendingStocks: [
          { name: 'TCS', price: '3,450', change: 2.5 },
          { name: 'RELIANCE', price: '2,850', change: 5.2 },
          { name: 'INFY', price: '1,850', change: -1.2 }
        ],
        mutualFunds: [
          { name: 'HDFC Fund', return: 18.5 },
          { name: 'SBI Bluechip', return: 15.2 },
          { name: 'ICICI Prudential', return: 8.5 }
        ],
        ipos: [
          { company: 'Company A', priceBand: '100-120' },
          { company: 'Company B', priceBand: '250-280' },
          { company: 'Company C', priceBand: '150-180' }
        ],
        marketSentiment: {
          sensex: { value: '65,000', change: 1.2 },
          nifty: { value: '19,500', change: 0.8 }
        }
      };
      
      setDashboardData(mockData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleViewAll = (type) => {
    switch (type) {
      case 'trending-stocks':
        navigate('/stocks');
        break;
      case 'mutual-funds':
        navigate('/mutual-funds');
        break;
      case 'ipos':
        navigate('/ipos');
        break;
      default:
        break;
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchDashboardData} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            type="trending-stocks"
            title="Trending Stocks"
            icon="📈"
            data={dashboardData.trendingStocks}
            showButton={true}
            onClick={() => handleViewAll('trending-stocks')}
          />
          
          <DashboardCard
            type="mutual-funds"
            title="Mutual Funds"
            icon="💰"
            data={dashboardData.mutualFunds}
            onClick={() => handleViewAll('mutual-funds')}
            showButton={true}
          />
          
          <DashboardCard
            type="ipos"
            title="IPO Listings"
            icon="🚀"
            data={dashboardData.ipos}
            onClick={() => handleViewAll('ipos')}
            showButton={true}
          />
        </div>
        <div className="mt-8"></div>
        <MarketSentiment data={dashboardData.marketSentiment} />
      </div>
    </div>
  );
};

export default Dashboard;