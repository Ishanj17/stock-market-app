import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import DashboardCard from './DashBoardCard';
import NewsCards from './NewsCards';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import axios from 'axios';
import MainHero from '../common/MainHero';
import DivideLine from '../common/DivideLine';
import InvestmentOptions from './InvestmentOption';
import Footer from '../common/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    trendingStocks: [],
    mutualFunds: [],
    ipos: [],
    news: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      const API_BASE_URL = process.env.REACT_APP_API_URL;
      // trending stocks
      const fetchTrendingStocks = async () => {
        const res = await axios.get(`${API_BASE_URL}/api/stocks/trending`);
        return res.data;
      };
      const {
        trending_stocks: { top_gainers, top_losers },
      } = await fetchTrendingStocks();
      // mutual funds
      const fetchMutualFunds = async () => {
        const res = await axios.get(`${API_BASE_URL}/api/mutualfunds`);
        return res.data;
      };
      const { Equity } = await fetchMutualFunds();
      // ipos
      const fetchIpos = async () => {
        const res = await axios.get(`${API_BASE_URL}/api/ipos`);
        return res.data;
      };
      const { active } = await fetchIpos();
      
      // news
      const fetchNews = async () => {
        const res = await axios.get(`${API_BASE_URL}/api/news`);
        return res.data;
      };
      const newsData = await fetchNews();
      
      const mockData = {
        trendingStocks: [
          { name: top_gainers[0].company_name, price: top_gainers[0].price, change: top_gainers[0].percent_change},
          { name: top_losers[0].company_name, price: top_losers[0].price, change: top_losers[0].percent_change},
          { name: top_gainers[1].company_name, price: top_gainers[1].price, change: top_gainers[1].percent_change},
        ],
        mutualFunds: [
          { name: Equity["Flexi Cap"][0].fund_name, return: Equity["Flexi Cap"][0]["5_year_return"] },
          { name: Equity["Mid-Cap"][0].fund_name, return: Equity["Mid-Cap"][0]["5_year_return"] },
          { name: Equity["Small-Cap"][0].fund_name, return: Equity["Small-Cap"][0]["5_year_return"] }
        ],
        ipos: [
          { company: active[0].name, priceBand: active[0].min_price + '-' +active[0].max_price },
          { company: active[1].name, priceBand: active[1].min_price + '-' +active[1].max_price },
          { company: active[2].name, priceBand: active[2].min_price + '-' +active[2].max_price }
        ],
        news: newsData
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
      <MainHero />
      <DivideLine />
      <InvestmentOptions />
      <DivideLine />
      <NewsCards news={dashboardData.news} />
      <Footer />
    </div>
  );
};

export default Dashboard;