'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface PaymentFormData {
  bankAccount: string;
  accountHolder: string;
  ifscCode: string;
  upiId: string;
}

export default function PaymentSettings() {
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'upi'>('bank');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PaymentFormData>();

  const onSubmit = async (data: PaymentFormData) => {
    try {
      // Validate only relevant fields based on payment method
      if (paymentMethod === 'bank') {
        if (!data.accountHolder || !data.bankAccount || !data.ifscCode) {
          alert('Please fill in all bank account details');
          return;
        }
      } else {
        if (!data.upiId) {
          alert('Please enter your UPI ID');
          return;
        }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Payment data:', { ...data, paymentMethod });
      alert('Payment method saved successfully!');
      reset(); // Clear form after successful save
    } catch (error) {
      console.error('Error saving payment method:', error);
      alert('Error saving payment method. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Payment Settings</h2>
      
      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setPaymentMethod('bank')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              paymentMethod === 'bank'
                ? 'bg-[#C89B6D] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Bank Account
          </button>
          <button
            onClick={() => setPaymentMethod('upi')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              paymentMethod === 'upi'
                ? 'bg-[#C89B6D] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            UPI ID
          </button>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        {paymentMethod === 'bank' ? (
          <>
            {/* Account Holder Name */}
            <div>
              <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name
              </label>
              <input
                id="accountHolder"
                type="text"
                {...register('accountHolder', { required: 'Account holder name is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
                placeholder="Enter account holder name"
              />
              {errors.accountHolder && (
                <p className="mt-1 text-sm text-red-600">{errors.accountHolder.message}</p>
              )}
            </div>

            {/* Bank Account Number */}
            <div>
              <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700 mb-2">
                Bank Account Number
              </label>
              <input
                id="bankAccount"
                type="text"
                {...register('bankAccount', { required: 'Bank account number is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
                placeholder="Enter bank account number"
              />
              {errors.bankAccount && (
                <p className="mt-1 text-sm text-red-600">{errors.bankAccount.message}</p>
              )}
            </div>

            {/* IFSC Code */}
            <div>
              <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-2">
                IFSC Code
              </label>
              <input
                id="ifscCode"
                type="text"
                {...register('ifscCode', { 
                  required: 'IFSC code is required',
                  pattern: {
                    value: /^[A-Z]{4}0[A-Z0-9]{6}$/i,
                    message: 'Invalid IFSC code format'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all uppercase"
                placeholder="Enter IFSC code (e.g., HDFC0001234)"
                maxLength={11}
              />
              {errors.ifscCode && (
                <p className="mt-1 text-sm text-red-600">{errors.ifscCode.message}</p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* UPI ID */}
            <div>
              <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                id="upiId"
                type="text"
                {...register('upiId', { 
                  required: 'UPI ID is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/,
                    message: 'Invalid UPI ID format'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
                placeholder="Enter UPI ID (e.g., yourname@upi)"
              />
              {errors.upiId && (
                <p className="mt-1 text-sm text-red-600">{errors.upiId.message}</p>
              )}
            </div>

            {/* UPI Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">UPI Instructions:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Ensure your UPI ID is registered with your bank</li>
                <li>• Payments will be sent to this UPI ID</li>
                <li>• You can change this anytime from settings</li>
              </ul>
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#C89B6D] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Payment Method'}
          </button>
        </div>
      </form>
    </div>
  );
}
