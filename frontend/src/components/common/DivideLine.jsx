import React from 'react';

const DivideLine = () => {
    return (
    <div className="relative flex items-center justify-center my-8 mt-32 mb-32">
      <div className="w-[25%] border-t border-gray-300"></div>
        <span className="tracking-wider absolute bg-white px-2 text-[10px] text-gray-300">
          ~~
        </span>
    </div>
    );
};

export default DivideLine;