import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/DashBoard';
import StockScreen from './components/stocks/StockScreen';
import StockDetails from './components/stocks/StockDetails';
import MutualFundScreen from './components/mutual-funds/MutualFundScreen';
import FundDetails from './components/mutual-funds/FundDetails';
import IPOScreen from './components/ipos/IPOScreen';
import IPODetails from './components/ipos/IPODetails';
import { useEffect } from 'react';
import axios from 'axios';
// import IPOScreen from './components/ipos/IPOScreen';

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stocks" element={<StockScreen />} />
          <Route path="/stocks/:stockId" element={<StockDetails />} />
          <Route path="/mutual-funds" element={<MutualFundScreen />} />
          <Route path="/mutual-funds/:fundId" element={<FundDetails />} />
          <Route path="/ipos" element={<IPOScreen />} />
          <Route path="/ipos/:ipoId" element={<IPODetails />} />
        </Routes>
      </div>
  );
}

export default App;