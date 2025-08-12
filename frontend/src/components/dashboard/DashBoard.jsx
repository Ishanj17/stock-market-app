import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import NewsCards from './NewsCards';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { SkeletonDashboardCard, SkeletonNewsCard, SkeletonList } from '../common/SkeletonLoader';
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
        setLoading(true);
        try {
          const res = await axios.get(`${API_BASE_URL}/api/news`);
          return res.data;
        } catch (error) {
          console.error('Error fetching news:', error);
          setError('Failed to fetch news');
        } finally {
          setLoading(false);
        }
      };
      const newsData = await fetchNews();
      if(Array.isArray(newsData)) {
        setNews(newsData);
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

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <MainHero />
        <DivideLine />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Investment Options Skeleton */}
          <div className="mb-12">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonDashboardCard key={index} />
              ))}
            </div>
          </div>
          
          {/* News Section Skeleton */}
          <div className="mb-12">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonNewsCard key={index} />
              ))}
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
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
      
      {/* Footer spacing */}
      <div className="mt-16 mb-8"></div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;