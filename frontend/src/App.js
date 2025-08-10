import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/dashboard/DashBoard';
import StockScreen from './components/stocks/StockScreen';
import StockDetails from './components/stocks/StockDetails';
import MutualFundScreen from './components/mutual-funds/MutualFundScreen';
import FundDetails from './components/mutual-funds/FundDetails';
import IPOScreen from './components/ipos/IPOScreen';
import Investments from './components/investments/Investments';
import Watchlist from './components/watchlist/Watchlist';
import AccountBalancePage from './components/balance/AccountBalancePage';
import TransactionHistoryPage from './components/transactions/TransactionHistoryPage';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stocks" element={<StockScreen />} />
          <Route path="/stocks/detail/:name" element={<StockDetails />} />
          <Route path="/mutual-funds" element={<MutualFundScreen />} />
          <Route path="/mutual-funds/details/:name" element={<FundDetails />} />
          <Route path="/ipos" element={<IPOScreen />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/balance" element={<AccountBalancePage />} />
          <Route path="/transactions" element={<TransactionHistoryPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;