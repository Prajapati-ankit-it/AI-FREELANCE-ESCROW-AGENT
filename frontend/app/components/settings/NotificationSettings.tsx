'use client';

import React, { useState } from 'react';

interface NotificationSettings {
  projectUpdates: boolean;
  paymentAlerts: boolean;
  marketingEmails: boolean;
}

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    projectUpdates: true,
    paymentAlerts: true,
    marketingEmails: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (setting: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Notification settings:', notifications);
      alert('Notification preferences saved successfully!');
    } catch (error) {
      console.error('Error saving notification settings:', error);
      alert('Error saving preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Notification Settings</h2>
      
      <div className="space-y-6 w-full">
        {/* Project Updates */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">Project Updates</h3>
            <p className="text-sm text-gray-600 mt-1">
              Get notified about project milestones, status changes, and important updates.
            </p>
          </div>
          <button
            onClick={() => handleToggle('projectUpdates')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.projectUpdates ? 'bg-[#C89B6D]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.projectUpdates ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Payment Alerts */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">Payment Alerts</h3>
            <p className="text-sm text-gray-600 mt-1">
              Receive notifications about payments received, pending transactions, and escrow releases.
            </p>
          </div>
          <button
            onClick={() => handleToggle('paymentAlerts')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.paymentAlerts ? 'bg-[#C89B6D]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.paymentAlerts ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Marketing Emails */}
        <div className="flex items-center justify-between py-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">Marketing Emails</h3>
            <p className="text-sm text-gray-600 mt-1">
              Receive emails about new features, tips, and platform updates.
            </p>
          </div>
          <button
            onClick={() => handleToggle('marketingEmails')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.marketingEmails ? 'bg-[#C89B6D]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.marketingEmails ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Additional Settings */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Email Frequency</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="frequency"
                defaultChecked
                className="mr-2 text-[#C89B6D] focus:ring-[#C89B6D]"
              />
              <span className="text-sm text-gray-700">Real-time notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="frequency"
                className="mr-2 text-[#C89B6D] focus:ring-[#C89B6D]"
              />
              <span className="text-sm text-gray-700">Daily digest</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="frequency"
                className="mr-2 text-[#C89B6D] focus:ring-[#C89B6D]"
              />
              <span className="text-sm text-gray-700">Weekly summary</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-[#C89B6D] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
}
