'use client';

import React, { useState } from 'react';

export default function DangerZone() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleDeleteAccount = async () => {
    if (deleteConfirmation.toLowerCase() !== 'delete my account') {
      alert('Please type "delete my account" exactly as shown to confirm.');
      return;
    }

    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Account deletion requested');
      alert('Account deletion request submitted. You will be logged out.');
      setShowDeleteModal(false);
      setDeleteConfirmation('');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full">
      <h2 className="text-xl font-bold text-red-600 mb-6 pb-4 border-b border-gray-200">Danger Zone</h2>
      
      <div className="space-y-6 w-full">
        {/* Warning Section */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-4">
                Irreversible Action
              </h3>
              <p className="text-red-800 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              
              <div className="space-y-3 text-sm text-red-700">
                <p>• All your personal data will be permanently deleted</p>
                <p>• Active projects will be terminated</p>
                <p>• Payment history will be removed</p>
                <p>• You will lose access to all platform features</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Export Option */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Before You Go
          </h3>
          <p className="text-gray-700 mb-4">
            You can request a copy of your data before deleting your account.
          </p>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Request Data Export
          </button>
        </div>

        {/* Delete Account Button */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-red-600 mb-4">
              Delete Your Account?
            </h3>
            
            <p className="text-gray-700 mb-6">
              This action cannot be undone. To confirm, type <strong>"delete my account"</strong> below:
            </p>

            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="delete my account"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none mb-6"
            />

            <div className="flex gap-4 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting || deleteConfirmation.toLowerCase() !== 'delete my account'}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
