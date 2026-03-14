'use client';

import React from 'react';
import { SettingsSection } from '../../types/settings';

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  setActiveSection: (section: SettingsSection) => void;
}

const sidebarItems = [
  { id: 'profile' as SettingsSection, label: 'Profile', icon: '👤' },
  { id: 'security' as SettingsSection, label: 'Security', icon: '🔒' },
  { id: 'notifications' as SettingsSection, label: 'Notifications', icon: '🔔' },
  { id: 'payment' as SettingsSection, label: 'Payment', icon: '💳' },
  { id: 'danger' as SettingsSection, label: 'Danger Zone', icon: '⚠️' },
];

export default function SettingsSidebar({ activeSection, setActiveSection }: SettingsSidebarProps) {
  return (
    <div className="w-64 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Settings</h2>
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              activeSection === item.id
                ? 'bg-[#C89B6D] text-white shadow-sm'
                : item.id === 'danger'
                ? 'text-red-600 hover:bg-red-50'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
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
