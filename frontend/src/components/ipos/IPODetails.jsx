import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../common/Header';
import LoadingSpinner from '../common/LoadingSpinner';

const IPODetails = () => {
  const navigate = useNavigate();
  const { ipoId } = useParams();
  console.log(useParams());
  const [loading, setLoading] = useState(true);
  const [IPO, setIPO] = useState(null);
  const [error, setError] = useState(null);

  // Mock stock database
  const ipoDatabase = {
    'OLA_ELECTRIC': {
      id: 'OLA_ELECTRIC',
      name: 'Ola Electric Mobility Ltd',
      price: '180.00',
      change: '+5.2%',
      volume: '3.5M',
      category: 'Electric Vehicles',
      marketCap: '₹12,000 Cr',
      pe: 'N/A',
      high: '188.00',
      low: '175.00'
    },
    'BOAT_LIFESTYLE': {
      id: 'BOAT_LIFESTYLE',
      name: 'boAt Lifestyle Ltd',
      price: '105.50',
      change: '+3.8%',
      volume: '2.1M',
      category: 'Consumer Electronics',
      marketCap: '₹4,200 Cr',
      pe: 'N/A',
      high: '108.40',
      low: '102.00'
    },
    'MOBIKWIK': {
      id: 'MOBIKWIK',
      name: 'MobiKwik Systems Ltd',
      price: '145.20',
      change: '+6.4%',
      volume: '1.9M',
      category: 'Fintech',
      marketCap: '₹5,100 Cr',
      pe: 'N/A',
      high: '149.80',
      low: '141.00'
    },
    'PHARMEASY': {
      id: 'PHARMEASY',
      name: 'API Holdings (PharmEasy)',
      price: '90.40',
      change: '+4.1%',
      volume: '2.3M',
      category: 'Healthcare',
      marketCap: '₹6,500 Cr',
      pe: 'N/A',
      high: '93.00',
      low: '88.10'
    },
    'FIRSTCRY': {
      id: 'FIRSTCRY',
      name: 'FirstCry (BrainBees Solutions)',
      price: '225.00',
      change: '+7.2%',
      volume: '2.8M',
      category: 'E-Commerce',
      marketCap: '₹8,800 Cr',
      pe: 'N/A',
      high: '232.50',
      low: '218.00'
    },
    'OYO_ROOMS': {
      id: 'OYO_ROOMS',
      name: 'Oravel Stays Ltd (OYO Rooms)',
      price: '135.75',
      change: '+2.9%',
      volume: '2.0M',
      category: 'Hospitality',
      marketCap: '₹7,200 Cr',
      pe: 'N/A',
      high: '138.90',
      low: '133.00'
    },
    'DROOM_TECH': {
      id: 'DROOM_TECH',
      name: 'Droom Technology Ltd',
      price: '120.60',
      change: '+3.2%',
      volume: '1.6M',
      category: 'Online Marketplace',
      marketCap: '₹3,900 Cr',
      pe: 'N/A',
      high: '123.80',
      low: '117.50'
    },
    'SWIGGY': {
      id: 'SWIGGY',
      name: 'Swiggy Ltd',
      price: '195.00',
      change: '+4.8%',
      volume: '4.1M',
      category: 'FoodTech',
      marketCap: '₹11,500 Cr',
      pe: 'N/A',
      high: '200.00',
      low: '190.50'
    },
    'DELHIVERY': {
      id: 'DELHIVERY',
      name: 'Delhivery Ltd',
      price: '320.40',
      change: '+1.9%',
      volume: '1.5M',
      category: 'Logistics',
      marketCap: '₹12,800 Cr',
      pe: 'N/A',
      high: '325.00',
      low: '317.00'
    },
    'NYKAA': {
      id: 'NYKAA',
      name: 'FSN E-Commerce Ventures (Nykaa)',
      price: '165.30',
      change: '+2.6%',
      volume: '2.6M',
      category: 'E-Commerce',
      marketCap: '₹7,700 Cr',
      pe: 'N/A',
      high: '168.90',
      low: '162.00'
    }
  };
  
  
  useEffect(() => {
    const fetchIPODetails = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const IPOData = ipoDatabase[ipoId];
        if (IPOData) {
          setIPO(IPOData);
        } else {
          setError('IPO not found');
        }
      } catch (err) {
        setError('Failed to load IPO details');
      } finally {
        setLoading(false);
      }
    };

    fetchIPODetails();
  }, [ipoId]);

  const handleBack = () => {
    navigate('/ipos');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!IPO) return <div className="text-center text-gray-500 p-8">IPO not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={IPO.name} showBack={true} onBack={handleBack} />
      
      <div className="max-w-2xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          {/* Stock Name */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            {IPO.name}
          </h2>
          
          {/* 4x2 Grid Layout */}
          <div className="grid grid-cols-4 gap-4">
            {/* Row 1 */}
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Current Price</div>
              <div className="text-lg font-bold text-gray-900">₹{IPO.price}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Change</div>
              <div className={`text-lg font-bold ${
                IPO.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {IPO.change}
              </div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Volume</div>
              <div className="text-lg font-bold text-gray-900">{IPO.volume}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Category</div>
              <div className="text-lg font-bold text-gray-900">{IPO.category}</div>
            </div>
            
            {/* Row 2 */}
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Market Cap</div>
              <div className="text-lg font-bold text-gray-900">{IPO.marketCap}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">P/E Ratio</div>
              <div className="text-lg font-bold text-gray-900">{IPO.pe}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Day High</div>
              <div className="text-lg font-bold text-gray-900">₹{IPO.high}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Day Low</div>
              <div className="text-lg font-bold text-gray-900">₹{IPO.low}</div>
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

export default IPODetails;