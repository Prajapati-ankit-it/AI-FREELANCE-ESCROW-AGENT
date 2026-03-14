'use client'

import React, { useState } from 'react'
import ProfileSettings from '../../components/settings/ProfileSettings'
import SecuritySettings from '../../components/settings/SecuritySettings'
import NotificationSettings from '../../components/settings/NotificationSettings'
import PaymentSettings from '../../components/settings/PaymentSettings'
import DangerZone from '../../components/settings/DangerZone'
import { SettingsSection } from '../../types/settings'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");

  const settingsItems = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'danger', label: 'Danger Zone', icon: '⚠️' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings />;
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationSettings />;
      case "payment":
        return <PaymentSettings />;
      case "danger":
        return <DangerZone />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Settings Navigation and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#111111] rounded-xl shadow-sm p-5">
            <h2 className="text-base font-semibold text-[#F5F1EC] mb-5">Navigation</h2>
            <nav className="space-y-3">
              {settingsItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as SettingsSection);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                    activeSection === item.id
                      ? 'bg-[#AD7D56] text-white shadow-sm'
                      : item.id === 'danger'
                      ? 'text-red-500 hover:bg-red-900/20'
                      : 'text-[#F5F1EC] hover:bg-gray-800'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="font-medium text-base">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}