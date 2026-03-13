// app/auth/layout.tsx   ← create this file
import React from 'react';
import { ReactNode } from 'react';

 export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#F5F1EC]">
      {/* LEFT SIDE BRANDING - move it here */}
      {/* <div className="hidden md:flex w-1/2 bg-[#0B0B0B] text-white flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4 text-[#C89B6D]">AI ESCROW</h1>
        <p className="text-gray-400 text-center max-w-md">
          Secure AI-powered escrow platform that automates freelance payments,
          milestone verification, and project management.
        </p>
      </div> */}

      {/* RIGHT SIDE - dynamic children (form) */}
      <div className="flex flex-1 items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}