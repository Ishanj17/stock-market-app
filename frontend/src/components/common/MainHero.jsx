import React from 'react';
import './common.css';

const MainHero = () => {
  return (
    <div className='mt-10'>
      {/* Image Section */}
      <div className="relative bg-white min-h-screen flex justify-center items-center">
        <div className="relative w-[70%] h-[60%]">
          <img 
            src="/boy.jpg" 
            alt="Financial Platform Hero" 
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
      
      {/* Text Section - Positioned above image with overlap */}
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <h1 className="hero-heading text-center whitespace-nowrap tracking-widest">
          Crash. Learn. Groww.
        </h1>
      </div>
    </div>
  );
};

export default MainHero;