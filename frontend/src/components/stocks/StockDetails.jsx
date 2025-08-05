import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../common/Header';
import LoadingSpinner from '../common/LoadingSpinner';

const StockDetails = () => {
  const navigate = useNavigate();
  const { stockId } = useParams();
  console.log(useParams());
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState(null);
  const [error, setError] = useState(null);

  // Mock stock database
  const stockDatabase = {
    'TCS': { id: 'TCS', name: 'TCS', price: '3,850', change: '+2.5%', volume: '2.5M', category: 'IT', marketCap: '₹7.2T', pe: '25.4', high: '3,920', low: '3,780' },
    'RELIANCE': { id: 'RELIANCE', name: 'RELIANCE', price: '2,450', change: '+1.8%', volume: '1.8M', category: 'Oil & Gas', marketCap: '₹16.5T', pe: '18.2', high: '2,480', low: '2,420' },
    'INFOSYS': { id: 'INFOSYS', name: 'INFOSYS', price: '1,650', change: '+3.1%', volume: '1.2M', category: 'IT', marketCap: '₹6.8T', pe: '22.1', high: '1,680', low: '1,620' },
    'HDFC_BANK': { id: 'HDFC_BANK', name: 'HDFC BANK', price: '1,850', change: '+0.8%', volume: '950K', category: 'Banking', marketCap: '₹10.2T', pe: '16.8', high: '1,870', low: '1,830' },
    'ICICI_BANK': { id: 'ICICI_BANK', name: 'ICICI BANK', price: '950', change: '+1.2%', volume: '750K', category: 'Banking', marketCap: '₹6.5T', pe: '14.2', high: '960', low: '940' },
    'ADANI_PORTS': { id: 'ADANI_PORTS', name: 'ADANI PORTS', price: '850', change: '+15.2%', volume: '5.2M', category: 'Infrastructure', marketCap: '₹1.8T', pe: '28.5', high: '870', low: '820' },
    'TATA_MOTORS': { id: 'TATA_MOTORS', name: 'TATA MOTORS', price: '650', change: '+12.8%', volume: '3.8M', category: 'Automobile', marketCap: '₹2.1T', pe: '15.6', high: '670', low: '630' },
    'WIPRO': { id: 'WIPRO', name: 'WIPRO', price: '450', change: '+8.5%', volume: '2.1M', category: 'IT', marketCap: '₹2.4T', pe: '19.8', high: '460', low: '440' },
    'BHARTI_AIRTEL': { id: 'BHARTI_AIRTEL', name: 'BHARTI AIRTEL', price: '750', change: '+6.3%', volume: '1.9M', category: 'Telecom', marketCap: '₹4.2T', pe: '12.4', high: '760', low: '740' },
    'SUN_PHARMA': { id: 'SUN_PHARMA', name: 'SUN PHARMA', price: '950', change: '+5.7%', volume: '1.5M', category: 'Pharma', marketCap: '₹2.8T', pe: '24.6', high: '970', low: '930' }
  };

  useEffect(() => {
    const fetchStockDetails = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const stockData = stockDatabase[stockId];
        if (stockData) {
          setStock(stockData);
        } else {
          setError('Stock not found');
        }
      } catch (err) {
        setError('Failed to load stock details');
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [stockId]);

  const handleBack = () => {
    navigate('/stocks');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!stock) return <div className="text-center text-gray-500 p-8">Stock not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={stock.name} showBack={true} onBack={handleBack} />
      
      <div className="max-w-2xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          {/* Stock Name */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            {stock.name}
          </h2>
          
          {/* 4x2 Grid Layout */}
          <div className="grid grid-cols-4 gap-4">
            {/* Row 1 */}
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Current Price</div>
              <div className="text-lg font-bold text-gray-900">₹{stock.price}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Change</div>
              <div className={`text-lg font-bold ${
                stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stock.change}
              </div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Volume</div>
              <div className="text-lg font-bold text-gray-900">{stock.volume}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Category</div>
              <div className="text-lg font-bold text-gray-900">{stock.category}</div>
            </div>
            
            {/* Row 2 */}
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Market Cap</div>
              <div className="text-lg font-bold text-gray-900">{stock.marketCap}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">P/E Ratio</div>
              <div className="text-lg font-bold text-gray-900">{stock.pe}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Day High</div>
              <div className="text-lg font-bold text-gray-900">₹{stock.high}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Day Low</div>
              <div className="text-lg font-bold text-gray-900">₹{stock.low}</div>
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