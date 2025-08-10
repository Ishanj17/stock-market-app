import React from "react";
import { FaTimes, FaReceipt, FaDownload } from "react-icons/fa";
import Modal from "../common/Modal";

export default function TransactionReceipt({
  isOpen,
  onClose,
  transaction,
  onDownload,
}) {
  if (!isOpen || !transaction) return null;

  const getTransactionDescription = (transaction) => {
    switch (transaction.type) {
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
    
    if (transaction.symbol) {
      details.push({ label: 'Stock Symbol', value: transaction.symbol });
    }
    if (transaction.companyName) {
      details.push({ label: 'Company Name', value: transaction.companyName });
    }
    if (transaction.quantity) {
      details.push({ label: 'Quantity', value: transaction.quantity });
    }
    if (transaction.price) {
      details.push({ label: 'Price per Unit', value: `₹${transaction.price.toFixed(2)}` });
    }
    if (transaction.totalAmount) {
      details.push({ label: 'Total Amount', value: `₹${transaction.totalAmount.toFixed(2)}` });
    }
    if (transaction.amount) {
      details.push({ label: 'Amount', value: `₹${transaction.amount.toFixed(2)}` });
    }
    if (transaction.date) {
      details.push({ label: 'Date', value: new Date(transaction.date).toLocaleDateString('en-IN') });
    }
    if (transaction.time) {
      details.push({ label: 'Time', value: transaction.time });
    }
    if (transaction.transactionId) {
      details.push({ label: 'Transaction ID', value: transaction.transactionId });
    }
    if (transaction.status) {
      details.push({ label: 'Status', value: transaction.status });
    }

    return details;
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(transaction);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full max-h-[80vh] overflow-y-auto">
        {/* Receipt Header */}
        <div className="bg-gray-900 text-white p-4 text-center border-b-4 border-green-500 rounded-t-xl">
          <div className="flex justify-between items-start mb-2">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="w-4 h-4" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold tracking-wider">STOCK MARKET APP</h1>
              <p className="text-gray-300 text-xs mt-1">Trading Platform</p>
            </div>
            <div className="w-4"></div>
          </div>
          <div className="text-center">
            <FaReceipt className="w-6 h-6 mx-auto mb-1 text-green-400" />
            <h2 className="text-sm font-semibold text-green-400">TRANSACTION RECEIPT</h2>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-4 bg-gray-50">
          {/* Transaction Type Badge */}
          <div className="text-center mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${
              transaction.type === 'BUY' ? 'bg-green-600' :
              transaction.type === 'SELL' ? 'bg-red-600' :
              transaction.type === 'DEPOSIT' ? 'bg-blue-600' :
              'bg-orange-600'
            }`}>
              {transaction.type}
            </span>
            <p className="text-gray-600 text-xs mt-1">{getTransactionDescription(transaction)}</p>
          </div>

          {/* Receipt Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
            <div className="space-y-2">
              {getTransactionDetails(transaction).map((detail, index) => (
                <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-600 text-xs font-medium">{detail.label}</span>
                  <span className="text-gray-900 text-xs font-semibold text-right">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Amount Section */}
          <div className="bg-green-600 text-white p-3 rounded-lg text-center">
            <p className="text-xs font-medium text-green-100 mb-1">TOTAL AMOUNT</p>
            <p className="text-2xl font-bold">
              ₹{(transaction.totalAmount || transaction.amount).toFixed(2)}
            </p>
          </div>

          {/* Receipt Footer */}
          <div className="text-center mt-3 text-gray-500 text-xs">
            <p>Thank you for using Stock Market App</p>
            <p className="mt-1">Generated on {new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white p-3 border-t border-gray-200 rounded-b-xl">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-3 py-2 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Close
            </button>
            <button 
              onClick={handleDownload}
              className="flex-1 px-3 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <FaDownload className="w-3 h-3" />
              Download
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
