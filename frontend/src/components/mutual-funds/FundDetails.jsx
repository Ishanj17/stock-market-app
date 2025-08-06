import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../common/Header';
import LoadingSpinner from '../common/LoadingSpinner';
import axios from 'axios';

const FundDetails = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const fund_name = name.split(' ')[0];
  const [loading, setLoading] = useState(true);
  const [fund, setFund] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('returns');

  useEffect(() => {
    const fetchFundDetails = async () => {
      setLoading(true);
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        const mutualFundDetails = async () => {
          const res = await axios.get(`${API_BASE_URL}/api/mutualfunds/details?fund_name=${fund_name}`);
          return res.data;
        };
        const data = await mutualFundDetails();
        
        if (data) {
          setFund(data);
        } else {
          setError('Fund not found');
        }
      } catch (err) {
        setError('Failed to load fund details');
      } finally {
        setLoading(false);
      }
    };

    fetchFundDetails();
  }, [fund_name]);

  const handleBack = () => {
    navigate('/mutual-funds');
  };

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    if (typeof num === 'string') return num;
    if (num >= 1000000000) return `₹${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `₹${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const formatPercent = (num) => {
    if (!num) return 'N/A';
    return typeof num === 'string' ? num : `${num.toFixed(2)}%`;
  };

  const getChangeColor = (change) => {
    if (typeof change === 'string') {
      return change.startsWith('+') || change.startsWith('₹+') ? 'text-green-600' : 'text-red-600';
    }
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'returns', label: 'Returns' },
    { id: 'risk', label: 'Risk Metrics' }
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!fund) return <div className="text-center text-gray-500 p-8">Fund not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={fund.basic_info?.fund_name.split(' ').slice(0, 2).join(' ') + ' Fund' || 'Fund Details'} showBack={true} onBack={handleBack} />
      
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        {/* Fund Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{fund.basic_info?.fund_name.split(' ').slice(0, 2).join(' ') + ' Fund'}</h1>
              <p className="text-gray-600 mb-4">{fund.basic_info?.category}</p>
              <div className="flex flex-wrap gap-4">
                <div className="text-3xl font-bold text-gray-900">
                  ₹{fund.nav_info?.current_nav}
                </div>
                <div className="text-sm text-gray-500">
                  NAV as of {fund.nav_info?.nav_date}
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Risk Level</div>
                <div className="font-semibold">{fund.basic_info?.risk_level}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Fund Info Grid */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Fund Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Fund Size</div>
                      <div className="text-lg font-bold">{formatNumber(fund.basic_info?.fund_size)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Plan Type</div>
                      <div className="text-lg font-bold">{fund.basic_info?.plan_type}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Scheme Type</div>
                      <div className="text-lg font-bold">{fund.basic_info?.scheme_type}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Inception Date</div>
                      <div className="text-lg font-bold">{fund.basic_info?.inception_date}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Fund Manager</div>
                      <div className="text-lg font-bold">{fund.basic_info?.fund_manager}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Registrar</div>
                      <div className="text-lg font-bold">{fund.basic_info?.registrar_agent}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Benchmark</div>
                      <div className="text-lg font-bold">{fund.basic_info?.benchmark_name}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Current NAV</div>
                      <div className="text-lg font-bold">₹{fund.nav_info?.current_nav}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Returns Tab */}
            {activeTab === 'returns' && fund.returns && (
              <div className="space-y-6">
                {/* Absolute Returns */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Absolute Returns</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(fund.returns.absolute).map(([period, value]) => (
                      <div key={period} className="bg-gray-50 rounded-lg p-4">
                        <div className="text-xs text-gray-600 mb-1">{period.toUpperCase()}</div>
                        <div className={`text-lg font-bold ${getChangeColor(value)}`}>
                          {value > 0 ? '+' : ''}{formatPercent(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CAGR Returns */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">CAGR Returns</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(fund.returns.cagr).map(([period, value]) => (
                      <div key={period} className="bg-gray-50 rounded-lg p-4">
                        <div className="text-xs text-gray-600 mb-1">{period.replace('_', ' ').toUpperCase()}</div>
                        <div className={`text-lg font-bold ${getChangeColor(value)}`}>
                          {value > 0 ? '+' : ''}{formatPercent(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Risk Metrics Tab */}
            {activeTab === 'risk' && fund.returns?.risk_metrics && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Risk Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Alpha</div>
                      <div className="text-lg font-bold">{fund.returns.risk_metrics.alpha?.toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Beta</div>
                      <div className="text-lg font-bold">{fund.returns.risk_metrics.beta?.toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Sharpe Ratio</div>
                      <div className="text-lg font-bold">{fund.returns.risk_metrics.sharpe_ratio?.toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Sortino Ratio</div>
                      <div className="text-lg font-bold">{fund.returns.risk_metrics.sortino_ratio?.toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Standard Deviation</div>
                      <div className="text-lg font-bold">{formatPercent(fund.returns.risk_metrics.standard_deviation)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Risk Rating</div>
                      <div className="text-lg font-bold">{fund.returns.risk_metrics.risk_rating}/10</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetails;