'use client';

import React, { useState } from 'react';

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'security', label: 'Security', icon: '🔒' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'payment', label: 'Payment', icon: '💳' },
  { id: 'danger', label: 'Danger Zone', icon: '⚠️' },
];

function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-12">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Settings</h2>
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full text-left px-6 py-4 rounded-lg transition-colors duration-200 flex items-center gap-3 ${
              activeSection === item.id
                ? 'bg-[#C89B6D] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function ProfileSettings() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    bio: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Profile data:', formData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Profile Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-2xl">👤</span>
            </div>
            <div>
              <button
                type="button"
                className="bg-[#C89B6D] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Upload Photo
              </button>
              <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max 5MB.</p>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all resize-none"
            placeholder="Tell us about yourself..."
            maxLength={500}
          />
          <p className="mt-1 text-sm text-gray-500">
            {500 - formData.bio.length} characters remaining
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#C89B6D] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

function SecuritySettings() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password update data:', passwords);
      alert('Password updated successfully!');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Security Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={passwords.currentPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
            placeholder="Enter current password"
            required
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={passwords.newPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
            placeholder="Enter new password"
            required
            minLength={6}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={passwords.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
            placeholder="Confirm new password"
            required
            minLength={6}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#C89B6D] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}

function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    projectUpdates: true,
    paymentAlerts: true,
    marketingEmails: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Notification settings:', notifications);
      alert('Notification preferences saved!');
    } catch (error) {
      console.error('Error saving notification settings:', error);
      alert('Error saving preferences');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Notification Settings</h2>
      
      <div className="space-y-6">
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

function PaymentSettings() {
  const [paymentData, setPaymentData] = useState({
    bankAccount: '',
    accountHolder: '',
    ifscCode: '',
    upiId: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'upi'>('bank');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Payment data:', { ...paymentData, paymentMethod });
      alert('Payment method saved successfully!');
    } catch (error) {
      console.error('Error saving payment method:', error);
      alert('Error saving payment method');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Payment Settings</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setPaymentMethod('bank')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              paymentMethod === 'bank'
                ? 'bg-[#C89B6D] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Bank Account
          </button>
          <button
            onClick={() => setPaymentMethod('upi')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              paymentMethod === 'upi'
                ? 'bg-[#C89B6D] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            UPI ID
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {paymentMethod === 'bank' ? (
          <>
            <div>
              <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name
              </label>
              <input
                id="accountHolder"
                name="accountHolder"
                type="text"
                value={paymentData.accountHolder}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
                placeholder="Enter account holder name"
                required
              />
            </div>

            <div>
              <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700 mb-2">
                Bank Account Number
              </label>
              <input
                id="bankAccount"
                name="bankAccount"
                type="text"
                value={paymentData.bankAccount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
                placeholder="Enter bank account number"
                required
              />
            </div>

            <div>
              <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-2">
                IFSC Code
              </label>
              <input
                id="ifscCode"
                name="ifscCode"
                type="text"
                value={paymentData.ifscCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all uppercase"
                placeholder="Enter IFSC code (e.g., HDFC0001234)"
                maxLength={11}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                id="upiId"
                name="upiId"
                type="text"
                value={paymentData.upiId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
                placeholder="Enter UPI ID (e.g., yourname@upi)"
                required
              />
            </div>

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

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#C89B6D] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Payment Method'}
          </button>
        </div>
      </form>
    </div>
  );
}

function DangerZone() {
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6 text-red-600">Danger Zone</h2>
      
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Irreversible Action
              </h3>
              <p className="text-red-800 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              
              <div className="space-y-2 text-sm text-red-700">
                <p>• All your personal data will be permanently deleted</p>
                <p>• Active projects will be terminated</p>
                <p>• Payment history will be removed</p>
                <p>• You will lose access to all platform features</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>

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

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'payment':
        return <PaymentSettings />;
      case 'danger':
        return <DangerZone />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EC]">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <SettingsSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          <div className="flex-1 min-w-0">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
