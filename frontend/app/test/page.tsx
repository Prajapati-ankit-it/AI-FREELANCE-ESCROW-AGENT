'use client';

import React from 'react';

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-[#F5F1EC] p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Settings Test Page</h1>
      <p className="text-lg text-gray-700 mb-4">If you can see this page, routing is working!</p>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Navigation Test</h2>
        <div className="space-y-2">
          <a href="/settings" className="block text-blue-600 hover:text-blue-800 underline">
            → Go to Settings Page
          </a>
          <a href="/test" className="block text-blue-600 hover:text-blue-800 underline">
            → Back to Test Page
          </a>
          <a href="/" className="block text-blue-600 hover:text-blue-800 underline">
            → Go to Home
          </a>
        </div>
      </div>
      
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">Debug Instructions:</h3>
        <ol className="list-decimal list-inside text-yellow-800 space-y-1">
          <li>First, visit this test page: http://localhost:3001/test</li>
          <li>If this page loads, basic routing works</li>
          <li>Click the "Go to Settings Page" link</li>
          <li>If settings doesn't load, there's a settings-specific issue</li>
          <li>Open browser console (F12) to check for errors</li>
        </ol>
      </div>
    </div>
  );
}
