import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
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
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      const API_BASE_URL = process.env.REACT_APP_API_URL;
      // news
      const fetchNews = async () => {
        const res = await axios.get(`${API_BASE_URL}/api/news`);
        return res.data;
      };
      const newsData = await fetchNews();
      if(Array.isArray(newsData)) {
        setNews(newsData);
        console.log(newsData, "newsData");
      }
      else {
        setNews([]);
      }
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
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
      {news.length > 0 && (
        <NewsCards news={news} />
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;