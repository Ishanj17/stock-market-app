import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { SkeletonStockCard, SkeletonList } from '../common/SkeletonLoader';
import Footer from '../common/Footer';
import { FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { successToast, failureToast } from '../common/toast';


const Watchlist = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!user?.user_id) return;

    const fetchWatchlist = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      const { data : {code, message, data}} = await axios.post(`${apiUrl}/api/watchlist/get-watchlist`, {
        user_id: user.user_id
      });
      if(code === 200) {
        setWatchlist(data);
        setLoading(false);
      } else {
        if(message === "Watchlist does not exist!") { 
          failureToast('No watchlist found');
        } else {
          setError('Please try again later.');
        }
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, []);

  const handleRemoveFromWatchlist = async (stockName) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { data : {code, message, data}} = await axios.post(`${apiUrl}/api/watchlist/remove-from-watchlist`, {
      user_id: user.user_id,
      stock_name: stockName
    });
    if(code === 200) {
      setWatchlist(prev => prev.filter(stock => stock.name !== stockName));
      successToast('Stock removed from watchlist successfully!');
    } else {
      failureToast('Failed to remove from watchlist. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Watchlist" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-80"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonStockCard key={index} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 px-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-700 mb-2">My Watchlist</h1>
            <p className="text-gray-500">Track your favorite stocks and get real-time updates</p>
          </div>
        </div>



        {/* Watchlist Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-600">Watched Stocks ({watchlist.length})</h2>
          </div>
          
          {watchlist.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">👀</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your watchlist is empty</h3>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Risk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Year Low
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Year High
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {watchlist.map((stock) => (
                    <tr key={stock.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {stock.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div 
                              onClick={() => navigate(`/stocks/detail/${stock.name.replace(/\s+Ltd$/i, '')}`)}
                              className="text-sm font-medium text-gray-700 hover:text-teal-600 cursor-pointer transition-colors duration-200 hover:underline"
                            >
                              {stock.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {/* ₹{stock.price.BSE.toFixed(2)} */}
                        {stock.industry}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stock.risk}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stock.yearLow}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stock.yearHigh}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRemoveFromWatchlist(stock.name)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer spacing */}
      <div className="mt-16 mb-48"></div>
      
      <Footer />
    </div>
  );
};

export default Watchlist;