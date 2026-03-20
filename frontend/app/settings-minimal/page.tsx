'use client';

import React, { useState } from 'react';

export default function MinimalSettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="min-h-screen bg-[#F5F1EC] p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Minimal Settings Page</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Debug Info</h2>
        <p className="text-gray-700">Active Section: <strong>{activeSection}</strong></p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Test Navigation</h2>
        <div className="space-x-4">
          <button
            onClick={() => setActiveSection('profile')}
            className={`px-4 py-2 rounded ${
              activeSection === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveSection('security')}
            className={`px-4 py-2 rounded ${
              activeSection === 'security' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveSection('danger')}
            className={`px-4 py-2 rounded ${
              activeSection === 'danger' ? 'bg-red-600 text-white' : 'bg-gray-200'
            }`}
          >
            Danger
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold mb-2">
            Current Section: {activeSection}
          </h3>
          {activeSection === 'profile' && <p>Profile section content here</p>}
          {activeSection === 'security' && <p>Security section content here</p>}
          {activeSection === 'danger' && <p>Danger zone content here</p>}
        </div>
      </div>
    </div>
  );
}
