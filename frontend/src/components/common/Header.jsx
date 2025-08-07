import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import LoginModal from '../auth/LoginModal';

const Header = ({ title, showBack = false, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Left Section - Logo, Brand, and Navigation */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-80" onClick={handleLogoClick}>
          {/* Custom Logo - Circular with teal-blue and green gradient */}
          <div className="w-8 h-8 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-blue-500 to-green-400"></div>
            {/* Stylized 'G' or pie chart effect */}
            <div className="absolute inset-1 bg-white rounded-full"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-teal-400 to-green-400 rounded-full"></div>
          </div>
          {/* Brand Name */}
          <div className="text-xl font-bold text-gray-900 tracking-tight">Crash</div>
        </div>
        
        {/* Navigation Links - Right next to brand name */}
        <div className="flex items-center gap-6">
          <span 
            className={`tracking-wider text-sm font-medium cursor-pointer transition-colors ${
              activeRoute === 'stocks' ? 'text-gray-600' : 'text-gray-400'
            } hover:text-gray-600`}
            style={{fontWeight: 'bold' }}
            onClick={() => handleNavClick('stocks')}
          >
            Stocks
          </span>
          <span 
            className={`text-bold tracking-wider text-sm font-medium cursor-pointer transition-colors ${
              activeRoute === 'mutual-funds' ? 'text-gray-600' : 'text-gray-400'
            } hover:text-gray-600`}
            style={{fontWeight: 'bold' }}
            onClick={() => handleNavClick('mutual-funds')}
          >
            Mutual Funds
          </span>
          <span 
            className={`text-bold tracking-wider text-sm font-medium cursor-pointer transition-colors ${
              activeRoute === 'ipos' ? 'text-gray-600' : 'text-gray-400'
            } hover:text-gray-600`}
            style={{fontWeight: 'bold' }}
            onClick={() => handleNavClick('ipos')}
          >
            IPOs
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Login/Sign up Button */}
        <button 
          onClick={() => setIsLoginModalOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-green-600 transition-all duration-200"
        >
          Login/Sign up
        </button>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default Header;