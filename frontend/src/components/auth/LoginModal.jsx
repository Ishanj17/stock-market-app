// frontend/src/components/auth/AuthModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { FaGoogle, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import './auth.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const options = ['Stocks', 'Mutual Funds', 'IPOs'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Mock API call to check if user exists
  const checkUserExists = async (email) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock logic: if email contains 'test' it's existing user
        const exists = email.includes('test');
        resolve(exists);
      }, 1000);
    });
  };

  const handleEmailContinue = async () => {
    if (email && email.includes('@')) {
      setLoading(true);
      try {
        const userExists = await checkUserExists(email);
        setIsExistingUser(userExists);
        setStep(userExists ? 'password' : 'signup');
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      // Handle password mismatch
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  const handleGoogleAuth = () => {
    console.log('Google auth clicked');
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setStep('email');
    setIsExistingUser(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex h-[600px] max-h-[90vh]">
        {/* Left Panel - Green Background */}
        <div className="w-1/2 relative overflow-hidden"
            style={{
              backgroundColor: '#00D09C',
            }}
        >
          {/* Topographic pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 Q25,40 50,50 T100,50" stroke="white" strokeWidth="0.5" fill="none"/>
              <path d="M0,60 Q25,50 50,60 T100,60" stroke="white" strokeWidth="0.5" fill="none"/>
              <path d="M0,40 Q25,30 50,40 T100,40" stroke="white" strokeWidth="0.5" fill="none"/>
            </svg>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-8">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Simple, Free Investing.
            </h1>
            <div className="w-16 h-0.5 bg-white mb-4"></div>
            
            <h2 className="text-3xl font-bold transition-opacity duration-500 ease-in-out">
              {options[currentIndex]}
            </h2>
          </div>
        </div>

        {/* Right Panel - White Background */}
        <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <FaTimes className="w-3 h-3" />
          </button>

          {/* Content */}
          <div className="max-w-sm mx-auto w-full">
            {/* Title */}
            <h2 className="hero-heading mb-16 text-center">
              Welcome to Crash
            </h2>

            {/* Email Step */}
            {step === 'email' && (
              <div>
                {/* Google Auth Button */}
                <button
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors mb-6"
                >
                  <FaGoogle className="w-5 h-5 mr-3" />
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <label className="block text-sm font-medium mt-8 mb-2"
                      style={{
                        color: '#00D09C',
                      }}
                >
                  Your Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                    onKeyPress={(e) => e.key === 'Enter' && handleEmailContinue()}
                  />
                  {email && (
                    <button
                      onClick={() => setEmail('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleEmailContinue}
                  disabled={!email || !email.includes('@') || loading}
                  style={{
                    backgroundColor: '#00D09C',
                  }}
                  className="w-full mt-6 px-4 py-3 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Checking...' : 'Continue'}
                </button>
              </div>
            )}

            {/* Password Step (for existing users) */}
            {step === 'password' && (
              <div>
                {/* Show Email (Non-editable) */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2"
                    style={{
                      color: '#00D09C'
                    }}
                  >
                    Email Address
                  </label>
                  <div className="px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    style={{
                      opacity: 0.5,
                    }}
                  >
                    {email}
                  </div>
                </div>

                {/* Password Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2"
                    style={{
                      color: '#00D09C'
                    }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-3 py-3 pr-10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 rounded-lg"
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        color: '#00D09C',
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleLogin}
                  disabled={!password || loading}
                  className="w-full px-4 py-3 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{
                    backgroundColor: '#00D09C',
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <button
                  onClick={() => setStep('email')}
                  className="w-full mt-3 text-green-600 hover:text-green-700 text-sm"
                >
                  ← Back to email
                </button>
              </div>
            )}

            {/* Signup Step (for new users) */}
            {/* Signup Step (for new users) */}
            {step === 'signup' && (
              <div>
                {/* Show Email (Non-editable) */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1"
                    style={{
                      color: '#00D09C'
                    }}
                  >
                    Email Address
                  </label>
                  <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                    style={{
                      opacity: 0.5,
                    }}
                  >
                    {email}
                  </div>
                </div>

                {/* Name Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1"
                    style={{
                      color: '#00D09C'
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 rounded-lg text-sm"
                  />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1"
                    style={{
                      color: '#00D09C'
                    }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="w-full px-3 py-2 pr-10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 rounded-lg text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        color: '#00D09C',
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-1"
                    style={{
                      color: '#00D09C'
                    }}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full px-3 py-2 pr-10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 rounded-lg text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleSignUp()}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        color: '#00D09C',
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleSignUp}
                  disabled={!name.trim() || !password || !confirmPassword || password !== confirmPassword || loading}
                  className="w-full px-4 py-2 text-white rounded-lg font-medium disabled:opacity-80 disabled:cursor-not-allowed transition-colors text-sm"
                  style={{
                    backgroundColor: '#00D09C',
                  }}
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <button
                  onClick={() => setStep('email')}
                  style={{
                    color: '#00D09C',
                  }}
                  className="w-full mt-2 text-xs"
                >
                  ← Back to email
                </button>
              </div>
            )}

            {/* Footer - Only show on email step */}
            {step === 'email' && (
              <div className="mt-8 text-center text-xs text-gray-500">
                By proceeding, I agree to{' '}
                <a href="#" className="text-green-600 underline">T&C</a>,{' '}
                <a href="#" className="text-green-600 underline">Privacy Policy</a>{' '}
                & <a href="#" className="text-green-600 underline">Tariff Rates</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;