import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../common/Header';
import LoadingSpinner from '../common/LoadingSpinner';
import { SkeletonCard, SkeletonChart } from '../common/SkeletonLoader';
import axios from 'axios';
import './funds.css';
import Footer from '../common/Footer';

const FundDetails = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const fund_name = name.split(' ')[0];
  const [loading, setLoading] = useState(true);
  const [fund, setFund] = useState(null);
  const [error, setError] = useState(null);
  const [hoveredSector, setHoveredSector] = useState(null);
  const [sectorAllocation, setSectorAllocation] = useState([]);

  useEffect(() => {
    const fetchFundDetails = async () => {
      setLoading(true);
      try {
        // MOCK API - Replace with real API call
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
        
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        const res = await axios.get(`${API_BASE_URL}/api/mutualfunds/details?fund_name=${fund_name}`);
        const data = res.data;
        
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

  useEffect(() => {
    let temp = [];
      if(fund){
        fund.holdings.map((item) => { 
          if(item.sector_name){
            temp.push({
              sector_name: item.sector_name,
              weight: item.corpus_percentage
            });
          }
        });
        setSectorAllocation(temp.slice(0, 15));
    }
  }, [fund]);

  const formatNumber = (num) => {
    if (!num && num !== 0) return '';
    if (typeof num === 'string') return num;
    // if (num >= 1000000000) return `₹${(num / 1000000000).toFixed(2)}B`;
    // if (num >= 1000000) return `₹${(num / 1000000).toFixed(2)}M`;
    // if (num >= 1000) return `₹${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const formatPercent = (num) => {
    if (!num && num !== 0) return 'N/A';
    return typeof num === 'string' ? num : `${num.toFixed(2)}%`;
  };

  const getChangeColor = (change) => {
    if (!change && change !== 0) return 'text-gray-600';
    if (typeof change === 'string') {
      return change.startsWith('+') || change.startsWith('₹+') ? 'text-green-600' : 'text-red-600';
    }
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
  };

  const riskMetricTooltips = {
    alpha: 'Alpha measures the excess return of the fund compared to the benchmark. Higher alpha indicates better performance.',
    beta: 'Beta measures the fund\'s volatility compared to the market. Beta > 1 means more volatile than market.',
    sharpe_ratio: 'Sharpe ratio measures risk-adjusted return. Higher values indicate better risk-adjusted performance.',
    sortino_ratio: 'Sortino ratio measures downside risk-adjusted return. Higher values indicate better downside protection.',
    standard_deviation: 'Standard deviation measures the fund\'s volatility. Higher values indicate more volatility.',
    information_ratio: 'Information ratio measures the fund\'s excess return relative to tracking error.',
    tracking_error: 'Tracking error measures how closely the fund follows its benchmark.',
    max_drawdown: 'Maximum drawdown is the largest peak-to-trough decline in the fund\'s value.'
  };

  // Pie chart colors matching the image
  const pieColors = [
    '#10B981', '#3B82F6', '#1E40AF', '#F59E0B', '#8B5CF6',
    '#EC4899', '#6B7280', '#EF4444', '#84CC16', '#F97316'
  ];

  const renderPieChart = (data) => {
    if (!data || data.length === 0) return null;

    const total = data.reduce((sum, item) => sum + item.weight, 0);
    let currentAngle = 0;

    return (
      <div className="relative w-80 h-80 mx-auto">
        <svg width="320" height="320" viewBox="0 0 320 320" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.weight / total) * 100;
            const angle = (percentage / 100) * 360;
            const x1 = 160 + 120 * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = 160 + 120 * Math.sin((currentAngle * Math.PI) / 180);
            const x2 = 160 + 120 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
            const y2 = 160 + 120 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M 160 160`,
              `L ${x1} ${y1}`,
              `A 120 120 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');

            const isHovered = hoveredSector === item;
            const isBlurred = hoveredSector && hoveredSector !== item;

            currentAngle += angle;

            return (
              <g key={index}>
                <path
                  d={pathData}
                  fill={pieColors[index % pieColors.length]}
                  stroke="white"
                  strokeWidth="3"
                  onMouseEnter={() => setHoveredSector(item)}
                  onMouseLeave={() => setHoveredSector(null)}
                  style={{ 
                    cursor: 'pointer',
                    opacity: isBlurred ? 0.3 : 1,
                    filter: isBlurred ? 'blur(1px)' : 'none',
                    transition: 'all 0.2s ease-in-out'
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Fund Details" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-96"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <SkeletonCard />
              <SkeletonChart height="h-80" />
              <SkeletonCard />
            </div>
            
            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!fund) return <div className="text-center text-gray-500 p-8">Fund not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={fund.basic_info?.fund_name || 'Fund Details'} showBack={true} onBack={handleBack} />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Simple Fund Header */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="hero-heading font-bold"
                  style={{fontSize: '30px', fontWeight: '700'}}
              >
                {fund.basic_info?.fund_name.split(' ').slice(0, 2).join(' ') + ' Fund'}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <button className="shadow-sm border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
                  <span className="px-3 py-1 font-semibold text-sm text-gray-600">
                    {fund.basic_info?.category}
                  </span>
                </button>
                <button className="shadow-sm border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
                  <span className="px-3 py-1 font-semibold text-sm text-gray-600">
                    {fund.basic_info?.risk_level} Risk
                  </span>
                </button>
                <button className="shadow-sm border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
                  <span className="px-3 py-1 font-semibold text-sm text-gray-600">
                    {fund.basic_info?.plan_type}
                  </span>
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <div>
                <div className="flex items-center gap-2">
                    <span className={`text-xl font-medium ${getChangeColor(fund.returns?.absolute?.['1y'])}`}>
                      {fund.returns?.absolute?.['1y'] > 0 ? '+' : '-'}{formatPercent(fund.returns?.absolute?.['1y'])}
                    </span>
                    <span className="text-xl font-semibold text-gray-500">1Y Return</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getChangeColor(fund.returns?.absolute?.['1d'] || 0)}`}>
                      {fund.returns?.absolute?.['1d'] > 0 ? '+' : ''}{formatPercent(fund.returns?.absolute?.['1d'] || 0)}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">1D</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Information Section */}
        <div className="bg-white rounded-lg mb-4">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">NAV :</p>
                <p className="text-sm font-semibold text-gray-600">₹{fund.nav_info?.current_nav?.toFixed(2) || 'N/A'}</p>
              </div>
              <div className="flex items-center col-span-2 gap-2">
                <p className="text-sm text-gray-600">Risk Metrics :</p>
                <p className="text-sm font-semibold text-gray-600">{fund.basic_info?.nfo_risk|| ''}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Min SIP Amount :</p>
                <p className="text-sm font-semibold text-gray-600">{formatNumber(fund.investment_info?.minimum_sip)} Rs</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Fund Size :</p>
                <p className="text-sm font-semibold text-gray-600">{formatNumber(fund.basic_info?.fund_size)} Cr</p>
              </div>
            </div>
          </div>
        </div>

        {/* Returns Section */}
        {fund.returns && (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="hero-heading text-sm mb-6">Returns</h2>
            
            {/* Absolute Returns */}
            <div className="mb-6 shadow-sm border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-500 ml-4 mb-1">Absolute</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(fund.returns.absolute || {}).map(([period, value]) => (
                    <div key={period}>
                      <div className="text-xs text-gray-600 mb-1">{period.replace('_', ' ').toUpperCase()}</div>
                      <div className={`text-lg font-bold ${getChangeColor(value)}`}>
                        {value > 0 ? '+' : ''}{formatPercent(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CAGR Returns */}
            <div className="mb-6 shadow-sm border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-500 ml-4 mb-1">CAGR Returns</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(fund.returns.cagr || {}).map(([period, value]) => (
                    <div key={period}>
                      <div className="text-xs text-gray-600 mb-1">{period.replace('_', ' ').toUpperCase()}</div>
                      <div className={`text-lg font-bold ${getChangeColor(value)}`}>
                        {value > 0 ? '+' : ''}{formatPercent(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Metrics Section */}
        {fund.returns?.risk_metrics && (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="hero-heading text-sm mb-6">Risk Metrics</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(fund.returns.risk_metrics).map(([metric, value]) => (
                  <div key={metric} className="group relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-gray-600 capitalize">{metric.replace('_', ' ')}</div>
                      {/* <div className="relative">
                        <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 max-w-xs">
                          {riskMetricTooltips[metric] || ''}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div> */}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {metric === 'risk_rating' ? `${value || ''}/10` : 
                       metric === 'standard_deviation' || metric === 'tracking_error' || metric === 'max_drawdown' ? 
                       formatPercent(value) : 
                       (value?.toFixed(2) || '')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Holdings Section */}
        {fund.holdings && (
         <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="hero-heading text-sm font-semibold mb-6">Holdings (15)</h2>
        
          <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse">
                <colgroup>
                  <col className="w-1/3" />
                  <col className="w-1/3" />
                  <col className="w-1/3" />
                </colgroup>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-xs text-gray-600 capitalize text-center px-4 py-4">Name</th>
                    <th className="text-xs text-gray-600 capitalize text-center px-4 py-4">Asset (%)</th>
                    <th className="text-xs text-gray-600 capitalize text-center px-4 py-4">Sector</th>
                  </tr>
                </thead>
                <tbody>
                  {fund.holdings.slice(0, 15).map((holding, index) => (
                    <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="text-sm text-gray-500 text-center px-4 py-4 truncate">{holding.company_name}</td>
                      <td className="text-sm text-gray-500 text-center px-4 py-4">{formatPercent(holding.corpus_percentage)}</td>
                      <td className="text-sm text-gray-500 text-center px-4 py-4 truncate">{holding.sector_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}

        {/* Sector Allocation Section */}
        {sectorAllocation && (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="hero-heading text-sm font-semibold mb-6">Equity Sector Allocation</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Sector List */}
                <div className="space-y-3">
                  {sectorAllocation.map((sector, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                        hoveredSector === sector ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'
                      }`}
                      onMouseEnter={() => setHoveredSector(sector)}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: pieColors[index % pieColors.length] }}
                        ></div>
                        <span className="text-sm text-gray-500">{sector.sector_name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{formatPercent(sector.weight)}</span>
                    </div>
                  ))}
                </div>
                
                {/* Pie Chart */}
                <div className="flex justify-center">
                  {sectorAllocation.length > 0 && renderPieChart(sectorAllocation)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer spacing */}
      <div className="mt-16 mb-8"></div>
      
      <Footer />
    </div>
  );
};

export default FundDetails;