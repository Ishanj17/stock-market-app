import React from "react";
import { FaTimes, FaReceipt, FaDownload } from "react-icons/fa";
import Modal from "../common/Modal";

// Custom scrollbar styles
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export default function TransactionReceipt({
  isOpen,
  onClose,
  transaction,
  onDownload
}) {
  if (!isOpen || !transaction) return null;

  const getTransactionDescription = (transaction) => {
    switch (transaction.transaction_type) {
      case 'BUY':
        return 'Stock Purchase Transaction';
      case 'SELL':
        return 'Stock Sale Transaction';
      case 'DEPOSIT':
        return 'Fund Deposit Transaction';
      case 'WITHDRAWAL':
        return 'Fund Withdrawal Transaction';
      default:
        return 'Transaction';
    }
  };

  const getTransactionDetails = (transaction) => {
    const details = [];
    
    if (transaction.transaction_id) {
      details.push({ label: 'Transaction ID', value: transaction.transaction_id });
    }
    if (transaction.transaction_type === 'BUY' || transaction.transaction_type === 'SELL') {
      if (transaction.stock_name) {
        details.push({ label: 'Company Name', value: transaction.stock_name });
      }
      if (transaction.quantity) {
        details.push({ label: 'Quantity', value: transaction.quantity + ' shares' });
      }
      if (transaction.price_per_share) {
        details.push({ label: 'Price per Unit', value: `₹${Number(transaction.price_per_share).toFixed(2)}` });
      }
    }
    if (transaction.price_per_share && transaction.quantity) {
      details.push({ label: 'Amount', value: `₹${(Number(transaction.price_per_share) * Number(transaction.quantity)).toFixed(2)}` });
    }
    if (transaction.transaction_date) {
      details.push({ label: 'Date', value: new Date(transaction.transaction_date).toLocaleDateString('en-IN') });
    }

    return details;
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(transaction);
    }
  };

  return (
    <>
      <style>{customScrollbarStyles}</style>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex h-[450px] max-h-[85vh] rounded-2xl overflow-hidden relative shadow-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50">

        {/* Left Panel - Receipt Header */}
        <div className="w-2/5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex flex-col justify-center rounded-l-2xl relative overflow-hidden">
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          {/* Close Button - Top Right */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-7 h-7 bg-gray-700/80 hover:bg-gray-600 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <FaTimes className="w-3 h-3 text-gray-300" />
          </button>

          <div className="relative z-10 text-center">
            <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <FaReceipt className="text-green-400 w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold tracking-wider mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">STOCK MARKET APP</h1>
            <p className="text-gray-300 text-sm mb-3">Trading Platform</p>
            <div className="w-14 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto mb-3"></div>
            <h2 className="text-base font-semibold text-green-400 mb-2">TRANSACTION RECEIPT</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{getTransactionDescription(transaction)}</p>
          </div>
        </div>

        {/* Right Panel - Receipt Details */}
        <div className="w-3/5 bg-white p-6 flex flex-col justify-between rounded-r-2xl">
          {/* Receipt Details */}
          <div>
            {/* Transaction Type Badge */}
            <div className="text-center mb-5">
              <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${
                transaction.transaction_type === 'BUY' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                transaction.transaction_type === 'SELL' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                transaction.transaction_type === 'ADD' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                'bg-gradient-to-r from-orange-500 to-orange-600'
              }`}>
                {transaction.transaction_type}
              </span> 
            </div>

            {/* Transaction Details */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-5 mb-5 max-h-[220px] overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                {getTransactionDetails(transaction).map((detail, index) => (
                  <div key={index} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 text-sm font-medium">{detail.label}</span>
                    <span className="text-gray-900 text-sm font-semibold text-right">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Amount Section */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-xl text-center mb-5 shadow-lg">
              <p className="text-xs font-medium text-green-100 mb-1.5 uppercase tracking-wide">Total Amount</p>
              <p className="text-xl font-bold">
                ₹{(Number(transaction.price_per_share)*Number(transaction.quantity)).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-2 py-1 text-gray-700 font-medium border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:shadow-md"
            >
              Close
            </button>
            <button 
              onClick={handleDownload}
              className="flex-1 px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FaDownload className="w-3 h-3" />
              Download
            </button>
          </div>
        </div>

        </div>
      </Modal>
    </>
  );
}
