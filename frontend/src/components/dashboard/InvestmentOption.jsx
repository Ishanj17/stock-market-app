import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiMoneyStack } from "react-icons/gi";
import { AiOutlineStock } from "react-icons/ai";
import { GiCash } from "react-icons/gi";
import { FaGraduationCap } from 'react-icons/fa';
import './dashboard.css';

const InvestmentOptions = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
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

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex items-center justify-between">
        {/* Left Section - Text and Cards */}
        <div className="w-1/2 pr-12">
          {/* Headline and Description */}
          <div className="mb-8">
            <h1 className="hero-heading text-4xl font-bold text-gray-800 mb-4">
							Markets in Motion!
            </h1>
            <p className="text-lg text-gray-700">
						Long-term or short-term, high risk or low. Newly issued or tried and true — invest the way that suits you. .
            </p>
          </div>

          {/* Three Interactive Cards */}
          <div className="space-y-4">
            {/* Card 1 - Stocks & Intraday */}
            <div 
              className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleCardClick('stocks')}
            >
              <div className="flex items-center gap-4">
								<GiMoneyStack className='text-2xl text-green-500'/>
                <span className="text-lg font-small text-gray-600">Stocks & Intraday</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Card 2 - Mutual funds & SIPs */}
            <div 
              className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleCardClick('mutual-funds')}
            >
              <div className="flex items-center gap-4">
								<AiOutlineStock className='text-2xl text-teal-500'/>
                <span className="text-lg font-small text-gray-600">Mutual funds & SIPs</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Card 3 - Futures & Options */}
            <div 
							className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleCardClick('ipos')}
            >
              <div className="flex items-center gap-4">
								<GiCash className='text-2xl text-blue-500'/>
                <span className="text-lg font-small text-gray-600">IPOs</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 flex justify-center items-center">
          <img 
            src="/stock_img.jpg" 
            alt="Investment Platform" 
            className="w-[75%] h-auto rounded-lg transform"
						style={{ rotate: '-10deg' }}
          />
        </div>
      </div>

      <div className="mt-32 text-center text-[#3c3f52]">
        <FaGraduationCap className="mx-auto text-6xl mb-4" />
        <h2 className="text-6xl font-bold text-gray-600 tracking-wider">
          Investing,<br />
          minus the stress.
        </h2>
      </div>
    </div>
  );
};

export default InvestmentOptions;