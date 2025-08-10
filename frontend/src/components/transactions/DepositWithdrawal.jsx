import React, { useState } from 'react';
import Modal from '../common/Modal';
import { FaTimes, FaArrowUp, FaArrowDown, FaCreditCard, FaUniversity, FaMobile } from 'react-icons/fa';
import { SkeletonCard, SkeletonText } from '../common/SkeletonLoader';

const DepositWithdrawal = ({ isOpen, onClose, type = 'deposit' }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('amount');

  const isDeposit = type === 'deposit';

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: FaMobile, description: 'Instant transfer' },
    { id: 'card', name: 'Credit/Debit Card', icon: FaCreditCard, description: 'Secure payment' },
    { id: 'bank', name: 'Net Banking', icon: FaUniversity, description: 'Direct bank transfer' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    setLoading(true);
    try {
      // MOCK API - Replace with real API call
      setTimeout(() => {
        setStep('payment');
        setLoading(false);
      }, 1000); // Simulate API delay
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAmount('');
    setStep('amount');
    setPaymentMethod('upi');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex h-[600px] max-h-[90vh]">
        {/* Left Panel */}
        <div className="w-1/2 relative overflow-hidden"
            style={{
              backgroundColor: isDeposit ? '#00D09C' : '#EF4444',
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
            <div className="text-6xl mb-4">
              {isDeposit ? '💰' : '💸'}
            </div>
            <h1 className="text-3xl font-bold mb-4 text-center">
              {isDeposit ? 'Add Money' : 'Withdraw Money'}
            </h1>
            <div className="w-16 h-0.5 bg-white mb-4"></div>
            <p className="text-lg text-center">
              {isDeposit 
                ? 'Add funds to your account to start investing'
                : 'Withdraw your earnings to your bank account'
              }
            </p>
          </div>
        </div>

        {/* Right Panel */}
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
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
              {isDeposit ? 'Add Money' : 'Withdraw Money'}
            </h2>

            {step === 'amount' ? (
              <>
                {loading ? (
                  <div className="space-y-6 animate-pulse">
                    {/* Amount Input Skeleton */}
                    <div className="mb-6">
                      <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                      <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
                    </div>

                    {/* Quick Amount Buttons Skeleton */}
                    <div className="mb-6">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                      <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <div key={index} className="h-10 bg-gray-200 rounded-lg"></div>
                        ))}
                      </div>
                    </div>

                    {/* Button Skeleton */}
                    <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
                  </div>
                ) : (
                  <>
                    {/* Amount Input */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2"
                        style={{ color: isDeposit ? '#00D09C' : '#EF4444' }}
                      >
                        Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-green-300"
                        min="1"
                      />
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-3">Quick Amounts:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {[1000, 5000, 10000, 25000, 50000, 100000].map((quickAmount) => (
                          <button
                            key={quickAmount}
                            onClick={() => setAmount(quickAmount.toString())}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            ₹{quickAmount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Continue Button */}
                    <button
                      onClick={() => setStep('payment')}
                      disabled={!amount || parseFloat(amount) <= 0}
                      style={{
                        backgroundColor: isDeposit ? '#00D09C' : '#EF4444',
                      }}
                      className="w-full px-4 py-3 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Continue
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <div className="space-y-6 animate-pulse">
                    {/* Payment Method Selection Skeleton */}
                    <div className="mb-6">
                      <div className="h-4 bg-gray-200 rounded w-36 mb-3"></div>
                      <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                          <div key={index} className="p-3 border border-gray-300 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-gray-200 rounded"></div>
                              <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                                <div className="h-3 bg-gray-200 rounded w-32"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Confirmation Skeleton */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                      <div className="h-5 bg-gray-200 rounded w-28 mb-2"></div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="h-3 bg-gray-200 rounded w-16"></div>
                          <div className="h-3 bg-gray-200 rounded w-20"></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="h-3 bg-gray-200 rounded w-28"></div>
                          <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                    </div>

                    {/* Button Skeleton */}
                    <div className="h-12 bg-gray-200 rounded-lg w-full"></div>

                    {/* Disclaimer Skeleton */}
                    <div className="mt-4 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Payment Method Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select Payment Method
                      </label>
                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              paymentMethod === method.id
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <method.icon className="w-6 h-6 text-gray-600" />
                              <div>
                                <p className="font-medium text-gray-900">{method.name}</p>
                                <p className="text-xs text-gray-500">{method.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Confirmation */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Details</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Amount:</span>
                        <span className="font-semibold text-gray-900">₹{amount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Payment Method:</span>
                        <span className="font-semibold text-gray-900">{paymentMethods.find(m => m.id === paymentMethod)?.name}</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      style={{
                        backgroundColor: isDeposit ? '#00D09C' : '#EF4444',
                      }}
                      className="w-full px-4 py-3 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaArrowUp className="w-4 h-4" />
                          {isDeposit ? 'Deposit' : 'Withdraw'}
                        </>
                      )}
                    </button>

                    {/* Disclaimer */}
                    <div className="mt-4 text-xs text-gray-500 text-center">
                      By proceeding, you agree to our{' '}
                      <a href="#" className="text-green-600 underline">Terms of Service</a>{' '}
                      and acknowledge that {isDeposit ? 'depositing' : 'withdrawing'} funds may result in capital gains/losses.
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DepositWithdrawal; 