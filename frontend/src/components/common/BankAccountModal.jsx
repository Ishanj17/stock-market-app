import React, { useState } from 'react';
import { FaCreditCard, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { successToast, failureToast } from '../common/toast';

const BankAccountModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();   
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Bank account number is required';
    } else if (formData.accountNumber.length < 8) {
      newErrors.accountNumber = 'Bank account number must be at least 8 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const {data : {code, message, data}} = await axios.post(`${apiUrl}/api/transactions/add-bank-account`, {
          user_id: user.user_id,
          account_number: formData.accountNumber.trim()
        });
        setLoading(false);
        if(code === 200) {
          successToast('Bank account added successfully');
          onClose();
        } else {
          failureToast('Please try again later.');
          onClose();
        }
      } catch (error) {
        failureToast('Please try again later.');
        setLoading(false);
        onClose();
      }
    }
  };

  const handleClose = () => {
    setFormData({ accountNumber: '', amount: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
              <FaCreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add Bank Account</h2>
              <p className="text-sm text-gray-600">Link your bank account to start investing</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Account Number */}
          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Bank Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="Enter your bank account number"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.accountNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.accountNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Add (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={1000}
              // onChange={handleInputChange}
              disabled={true}
              placeholder="1000 added for new account"
              className={`w-full px-3 py-2 border rounded-md border-teal-300`}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white py-2 px-4 rounded-md font-medium hover:from-teal-600 hover:to-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Bank Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankAccountModal;
