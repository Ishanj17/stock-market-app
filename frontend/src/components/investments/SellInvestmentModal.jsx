import React from "react";
import { FaTimes, FaChartLine } from "react-icons/fa";
import Modal from "../common/Modal";

export default function SellInvestmentModal({
  isOpen,
  onClose,
  investment,
  sellQuantity,
  setSellQuantity,
  onConfirm,
  loading,
}) {
  if (!isOpen || !investment) return null;

  const estimatedProceeds = sellQuantity * investment.currentPrice;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-[500px] max-h-[90vh] rounded-xl overflow-hidden relative">
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <FaTimes className="w-3 h-3 text-gray-400" />
        </button>

        {/* Left Panel - Red/Orange Background for Selling */}
        <div className="w-1/2 relative overflow-hidden"
            style={{
              backgroundColor: '#FF6B6B',
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
            <div className="text-6xl mb-4">📉</div>
            <h1 className="text-3xl font-bold mb-4 text-center">
              Sell {investment.name}
            </h1>
            <div className="w-16 h-0.5 bg-white mb-4"></div>
            <p className="text-lg text-center">
              Realize your gains and manage your portfolio
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-1/2 bg-white p-6 flex items-center">
          <div className="max-w-sm mx-auto w-full">
            {/* Title */}
            <h2 className="hero-heading font-bold text-center mt-6">
              Confirm Sale
            </h2>

            {loading ? (
              <div className="space-y-6 animate-pulse">
                {/* Investment Details Skeleton */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between mb-2 last:mb-0">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  ))}
                </div>

                {/* Quantity Input Skeleton */}
                <div className="mb-6">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>

                {/* Estimated Proceeds Skeleton */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
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
                {/* Investment Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-500">Stock:</span>
                    <span className="font-semibold text-gray-600">{investment.name}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-500">Symbol:</span>
                    <span className="font-semibold text-gray-600">{investment.symbol}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-500">Current Price:</span>
                    <span className="font-semibold text-gray-600">₹{investment.currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-500">Available:</span>
                    <span className="font-semibold text-gray-600">{investment.quantity} units</span>
                  </div>
                </div>

                {/* Sell Quantity Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ color: '#FF6B6B' }}
                  >
                    Quantity to Sell
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSellQuantity(Math.max(1, sellQuantity - 1))}
                      className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={sellQuantity}
                      onChange={(e) =>
                        setSellQuantity(
                          Math.min(
                            parseInt(e.target.value) || 1,
                            investment.quantity
                          )
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300"
                      min="1"
                      max={investment.quantity}
                    />
                    <button
                      onClick={() => setSellQuantity(Math.min(sellQuantity + 1, investment.quantity))}
                      className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Max: {investment.quantity} units
                  </p>
                </div>

                {/* Estimated Proceeds */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">Estimated Proceeds</span>
                    <span className="text-lg font-bold text-red-600">₹{estimatedProceeds.toFixed(2)}</span>
                  </div>
                </div>

                {/* Sell Button */}
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  style={{
                    backgroundColor: '#FF6B6B',
                  }}
                  className="w-full px-4 py-3 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Sale...
                    </>
                  ) : (
                    <>
                      <FaChartLine className="w-4 h-4" />
                      Sell {sellQuantity} Unit{sellQuantity > 1 ? 's' : ''}
                    </>
                  )}
                </button>

                {/* Disclaimer */}
                <div className="mt-1 mb-4 text-gray-500 text-center" style={{fontSize: '8px'}}>
                  By proceeding, you agree to our{' '}
                  <a href="#" className="text-red-600 underline">Terms of Service</a>{' '}
                  and acknowledge that selling investments may have tax implications.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
