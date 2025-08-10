import React, { useState } from "react";
import { FaTimes, FaPlus, FaBank } from "react-icons/fa";
import Modal from "../common/Modal";

export default function AddFundsModal({
  isOpen,
  onClose,
  onSubmit,
  processing = false,
}) {
  const [amount, setAmount] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount: parseFloat(amount), ...bankDetails });
  };

  const handleClose = () => {
    setAmount("");
    setBankDetails({
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex h-[500px] max-h-[90vh] rounded-xl overflow-hidden relative">
        {/* Close Button - Top Right */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-20 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <FaTimes className="w-3 h-3 text-gray-400" />
        </button>

        {/* Left Panel - Green Background for Adding Funds */}
        <div className="w-1/2 relative overflow-hidden"
            style={{
              backgroundColor: '#10B981',
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
            <div className="text-6xl mb-4">💰</div>
            <h1 className="text-3xl font-bold mb-4 text-center">
              Add Funds
            </h1>
            <div className="w-16 h-0.5 bg-white mb-4"></div>
            <p className="text-lg text-center">
              Boost your trading power and seize opportunities
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-1/2 bg-white p-6 flex items-center">
          <div className="max-w-sm mx-auto w-full">
            {/* Title */}
            <h2 className="hero-heading font-bold text-center mt-6">
              Fund Your Account
            </h2>

            {processing ? (
              <div className="space-y-6 animate-pulse">
                {/* Amount Input Skeleton */}
                <div className="mb-6">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                </div>

                {/* Bank Details Skeleton */}
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="mb-4">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                  </div>
                ))}

                {/* Button Skeleton */}
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>

                {/* Disclaimer Skeleton */}
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Amount Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ color: '#10B981' }}
                  >
                    Amount to Add (₹)
                  </label>
                  <input
                    type="number"
                    min="500"
                    step="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount (min: ₹500)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Minimum amount: ₹500
                  </p>
                </div>

                {/* Bank Details */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                    placeholder="Enter bank account number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={bankDetails.ifscCode}
                    onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value.toUpperCase()})}
                    placeholder="Enter IFSC code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                    required
                  />
                </div>

                {/* Add Funds Button */}
                <button
                  type="submit"
                  disabled={processing}
                  style={{
                    backgroundColor: '#10B981',
                  }}
                  className="w-full px-4 py-3 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaPlus className="w-4 h-4" />
                      Add ₹{amount || '0'} to Account
                    </>
                  )}
                </button>

                {/* Disclaimer */}
                <div className="mt-4 text-gray-500 text-center" style={{fontSize: '8px'}}>
                  By proceeding, you agree to our{' '}
                  <a href="#" className="text-green-600 underline">Terms of Service</a>{' '}
                  and acknowledge that funds will be added within 1-2 business days.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
