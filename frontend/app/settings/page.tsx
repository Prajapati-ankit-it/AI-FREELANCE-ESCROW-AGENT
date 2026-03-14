'use client';

import React, { useState, useEffect } from 'react';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import PaymentSettings from '../components/settings/PaymentSettings';
import DangerZone from '../components/settings/DangerZone';
import { SettingsSection } from '../types/settings';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");

  // Debug: Log when component mounts and when section changes
  useEffect(() => {
    console.log('SettingsPage mounted, activeSection:', activeSection);
  }, [activeSection]);

  const renderActiveSection = () => {
    console.log('Rendering section:', activeSection);
    
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
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your account settings and preferences
            </p>
            <p className="text-sm text-gray-500 mt-1">Debug: Current section = {activeSection}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <SettingsSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-md p-4 mb-4">
              <p className="text-sm text-gray-600">Debug: Rendering {activeSection} section</p>
            </div>
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
}