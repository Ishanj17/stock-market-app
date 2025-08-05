import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../common/Header';
import LoadingSpinner from '../common/LoadingSpinner';

const StockDetails = () => {
  const navigate = useNavigate();
  const { fundId } = useParams();
  console.log(useParams());
  const [loading, setLoading] = useState(true);
  const [fund, setFund] = useState(null);
  const [error, setError] = useState(null);

  // Mock stock database
  const mutualFundDatabase = {
    'AXISBLUECHIP': {
      id: 'AXISBLUECHIP',
      name: 'Axis Bluechip Fund',
      price: '45.23',
      change: '+1.5%',
      volume: '1.2M',
      category: 'Large Cap',
      marketCap: '₹8,500 Cr',
      pe: 'N/A',
      high: '46.10',
      low: '44.50'
    },
    'SBI_SMALLCAP': {
      id: 'SBI_SMALLCAP',
      name: 'SBI Small Cap Fund',
      price: '115.40',
      change: '+2.1%',
      volume: '900K',
      category: 'Small Cap',
      marketCap: '₹12,700 Cr',
      pe: 'N/A',
      high: '117.50',
      low: '113.20'
    },
    'HDFC_HYBRID': {
      id: 'HDFC_HYBRID',
      name: 'HDFC Hybrid Equity Fund',
      price: '78.90',
      change: '+0.9%',
      volume: '850K',
      category: 'Hybrid',
      marketCap: '₹6,300 Cr',
      pe: 'N/A',
      high: '80.00',
      low: '77.80'
    },
    'NIPPON_INDIA': {
      id: 'NIPPON_INDIA',
      name: 'Nippon India Growth Fund',
      price: '125.75',
      change: '+1.8%',
      volume: '650K',
      category: 'Mid Cap',
      marketCap: '₹10,200 Cr',
      pe: 'N/A',
      high: '127.30',
      low: '124.10'
    },
    'MIRAE_ASSET': {
      id: 'MIRAE_ASSET',
      name: 'Mirae Asset Emerging Bluechip',
      price: '98.35',
      change: '+2.3%',
      volume: '720K',
      category: 'Large & Mid Cap',
      marketCap: '₹9,800 Cr',
      pe: 'N/A',
      high: '99.70',
      low: '96.80'
    },
    'ICICI_PRU_TECH': {
      id: 'ICICI_PRU_TECH',
      name: 'ICICI Prudential Technology Fund',
      price: '215.60',
      change: '+3.2%',
      volume: '580K',
      category: 'Sectoral - Technology',
      marketCap: '₹7,900 Cr',
      pe: 'N/A',
      high: '218.90',
      low: '212.10'
    },
    'KOTAK_EQTY_OPP': {
      id: 'KOTAK_EQTY_OPP',
      name: 'Kotak Equity Opportunities Fund',
      price: '90.10',
      change: '+1.1%',
      volume: '670K',
      category: 'Large & Mid Cap',
      marketCap: '₹6,200 Cr',
      pe: 'N/A',
      high: '91.20',
      low: '88.80'
    },
    'PARAG_PAREKH_FLEXI': {
      id: 'PARAG_PAREKH_FLEXI',
      name: 'Parag Parikh Flexi Cap Fund',
      price: '62.80',
      change: '+1.7%',
      volume: '510K',
      category: 'Flexi Cap',
      marketCap: '₹5,400 Cr',
      pe: 'N/A',
      high: '63.90',
      low: '61.60'
    },
    'MOTILAL_OSWAL_NASDAQ': {
      id: 'MOTILAL_OSWAL_NASDAQ',
      name: 'Motilal Oswal Nasdaq 100 FOF',
      price: '175.45',
      change: '+2.6%',
      volume: '490K',
      category: 'International',
      marketCap: '₹3,100 Cr',
      pe: 'N/A',
      high: '177.00',
      low: '173.20'
    },
    'UTI_NIFTY_INDEX': {
      id: 'UTI_NIFTY_INDEX',
      name: 'UTI Nifty Index Fund',
      price: '155.20',
      change: '+0.6%',
      volume: '600K',
      category: 'Index Fund',
      marketCap: '₹4,500 Cr',
      pe: 'N/A',
      high: '156.40',
      low: '154.10'
    }
  };
  
  useEffect(() => {
    const fetchStockDetails = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const fundData = mutualFundDatabase[fundId];
        if (fundData) {
          setFund(fundData);
        } else {
          setError('Fund not found');
        }
      } catch (err) {
        setError('Failed to load fund details');
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [fundId]);

  const handleBack = () => {
    navigate('/mutual-funds');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!fund) return <div className="text-center text-gray-500 p-8">Fund not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={fund.name} showBack={true} onBack={handleBack} />
      
      <div className="max-w-2xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          {/* Stock Name */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            {fund.name}
          </h2>
          
          {/* 4x2 Grid Layout */}
          <div className="grid grid-cols-4 gap-4">
            {/* Row 1 */}
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Current Price</div>
              <div className="text-lg font-bold text-gray-900">₹{fund.price}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Change</div>
              <div className={`text-lg font-bold ${
                fund.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {fund.change}
              </div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Volume</div>
              <div className="text-lg font-bold text-gray-900">{fund.volume}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Category</div>
              <div className="text-lg font-bold text-gray-900">{fund.category}</div>
            </div>
            
            {/* Row 2 */}
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Market Cap</div>
              <div className="text-lg font-bold text-gray-900">{fund.marketCap}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">P/E Ratio</div>
              <div className="text-lg font-bold text-gray-900">{fund.pe}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Day High</div>
              <div className="text-lg font-bold text-gray-900">₹{fund.high}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Day Low</div>
              <div className="text-lg font-bold text-gray-900">₹{fund.low}</div>
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div className="mt-6 bg-gray-100 rounded-lg p-6 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-3xl mb-2">📈</div>
              <p className="text-sm font-medium">Price Chart</p>
              <p className="text-xs">Chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockDetails;