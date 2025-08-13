import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaShoppingCart, FaEye, FaWallet, FaHistory } from 'react-icons/fa';
import LoginModal from '../auth/LoginModal';
import { useAuth } from '../../context/AuthContext';

const Header = ({ title, showBack = false, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

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
      case 'investments':
        navigate('/investments');
        break;
      case 'watchlist':
        navigate('/watchlist');
        break;
      case 'balance':
        navigate('/balance');
        break;
      case 'transactions':
        navigate('/transactions');
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
    if (path === '/investments') return 'investments';
    if (path === '/watchlist') return 'watchlist';
    if (path === '/balance') return 'balance';
    if (path === '/transactions') return 'transactions';
    return 'dashboard';
  };

  const activeRoute = getActiveRoute();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const getUserInitial = () => {
    if (user && user.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div className="border-b border-gray-50 shadow-md px-8 py-4 flex justify-between items-center top-0 z-10">
      {/* Left Section - Logo, Brand, and Navigation */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-80" onClick={handleLogoClick}>
          {/* Custom Logo - Circular with teal-blue and green gradient */}
          <div className="w-8 h-8 rounded-full relative overflow-hidden">
            <div className="w-10 h-10 rounded-full relative overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-blue-500 to-green-400"></div>
              <div className="absolute inset-[3px] bg-white rounded-full"></div>
              <div className="absolute inset-[6px] bg-gradient-to-br from-teal-400 to-green-400 rounded-full"></div>
            </div>
          </div>
          {/* Brand Name */}
          <div className="tracking-wide text-2xl font-bold text-gray-800 tracking-tight">Crash</div>
        </div>
        
        {/* Navigation Links - Right next to brand name */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('stocks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-base tracking-wide transition-all duration-200
              ${activeRoute === 'stocks' 
                ? 'text-gray-900 border-b-2 border-green-500'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: '14px'  }}
          >
            <span className="hidden sm:inline">Stocks</span>
          </button>
          {/* <span 
            className={`tracking-wider text-sm font-medium cursor-pointer transition-colors ${
              activeRoute === 'mutual-funds' ? 'text-gray-600' : 'text-gray-400'
            } hover:text-gray-600`}
            style={{fontWeight: 'bold' }}
            onClick={() => handleNavClick('mutual-funds')}
          >
            Mutual Funds
          </span>
          <span 
            className={`tracking-wider text-sm font-medium cursor-pointer transition-colors ${
              activeRoute === 'ipos' ? 'text-gray-600' : 'text-gray-400'
            } hover:text-gray-600`}
            style={{fontWeight: 'bold' }}
            onClick={() => handleNavClick('ipos')}
          >
            IPOs
          </span> */}

        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Watchlist Button - Only show when authenticated */}
        {isAuthenticated && (
          <button
            onClick={() => handleNavClick('watchlist')}
            className={`flex items-center gap-1 px-1 py-2 rounded-md font-semibold text-base tracking-wide transition-all duration-200
              ${activeRoute === 'watchlist' 
                ? 'text-gray-900 border-b-2 border-green-500'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: '14px'  }}
          >
            <span className="hidden sm:inline">Watchlist</span>
          </button>
        )}

        {/* Investments Button - Only show when authenticated */}
        {isAuthenticated && (
          <button
            onClick={() => handleNavClick('investments')}
            className={`flex items-center gap-1 px-1 py-2 rounded-md font-semibold text-base tracking-wide transition-all duration-200
              ${activeRoute === 'investments' 
                ? 'text-gray-900 border-b-2 border-green-500'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: '14px'  }}
          >
            <span className="hidden sm:inline">Investments</span>
          </button>
        )}

        {/* Account Balance Button - Only show when authenticated */}
        {isAuthenticated && (
          <button
            onClick={() => handleNavClick('balance')}
            className={`flex items-center gap-1 px-1 py-2 rounded-md font-semibold text-base tracking-wide transition-all duration-200
              ${activeRoute === 'balance' 
                ? 'text-gray-900 border-b-2 border-green-500'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: '14px'  }}
          >
            <span className="hidden sm:inline">Balance</span>
          </button>
        )}

        {/* Transaction History Button - Only show when authenticated */}
        {isAuthenticated && (
          <button
            onClick={() => handleNavClick('transactions')}
            className={`flex items-center gap-1 px-1 py-2 rounded-md font-semibold text-base tracking-wide transition-all duration-200
              ${activeRoute === 'transactions' 
                ? 'text-gray-900 border-b-2 border-green-500'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: '14px' }}
          >
            <span className="hidden sm:inline">Transactions</span>
          </button>
        )}
        
        {isAuthenticated ? (
          /* User Avatar and Menu */
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold text-lg flex items-center justify-center hover:from-teal-600 hover:to-green-600 transition-all duration-200 cursor-pointer"
            >
              {getUserInitial()}
            </button>
            
            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName || user?.email}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Login/Sign up Button */
          <button 
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-green-600 transition-all duration-200"
          >
            Login/Sign up
          </button>
        )}
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClosing={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default Header;