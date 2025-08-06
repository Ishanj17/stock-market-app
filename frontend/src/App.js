import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/DashBoard';
import StockScreen from './components/stocks/StockScreen';
import StockDetails from './components/stocks/StockDetails';
import MutualFundScreen from './components/mutual-funds/MutualFundScreen';
import FundDetails from './components/mutual-funds/FundDetails';
import IPOScreen from './components/ipos/IPOScreen';

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stocks" element={<StockScreen />} />
          <Route path="/stocks/detail/:name" element={<StockDetails />} />
          <Route path="/mutual-funds" element={<MutualFundScreen />} />
          <Route path="/mutual-funds/details/:name" element={<FundDetails />} />
          <Route path="/ipos" element={<IPOScreen />} />
        </Routes>
      </div>
  );
}

export default App;