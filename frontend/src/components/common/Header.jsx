import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ title, showBack = false, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavClick = (route) => {
    switch (route) {
      case 'stocks':
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

  const getActiveRoute = () => {
    const path = location.pathname;
    if (path === '/stocks') return 'stocks';
    if (path === '/mutual-funds') return 'mutual-funds';
    if (path === '/ipos') return 'ipos';
    return 'dashboard';
  };

  const activeRoute = getActiveRoute();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-10 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80" onClick={handleLogoClick}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            📈
          </div>
          <div className="text-2xl font-bold text-gray-800">StockApp</div>
        </div>
        
        <div className="flex items-center gap-8">
          
          <span 
            className={`text-base font-medium cursor-pointer transition-colors relative ${
              activeRoute === 'stocks' ? 'text-gray-800' : 'text-gray-500'
            } hover:text-gray-800`}
            onClick={() => handleNavClick('stocks')}
          >
            Stocks
            {activeRoute === 'stocks' && (
              <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary-500"></div>
            )}
          </span>
          <span 
            className={`text-base font-medium cursor-pointer transition-colors relative ${
              activeRoute === 'mutual-funds' ? 'text-gray-800' : 'text-gray-500'
            } hover:text-gray-800`}
            onClick={() => handleNavClick('mutual-funds')}
          >
            Mutual Funds
            {activeRoute === 'mutual-funds' && (
              <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary-500"></div>
            )}
          </span>
          <span 
            className={`text-base font-medium cursor-pointer transition-colors relative ${
              activeRoute === 'ipos' ? 'text-gray-800' : 'text-gray-500'
            } hover:text-gray-800`}
            onClick={() => handleNavClick('ipos')}
          >
            IPOs
            {activeRoute === 'ipos' && (
              <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary-500"></div>
            )}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-lg font-medium transition-colors">
          Login/Sign up
        </button>
      </div>
    </div>
  );
};

export default Header;