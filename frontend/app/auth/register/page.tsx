// app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthCard from "../../components/AuthCard";// your component

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await fetch('/api/auth/register', {  // or use Server Action instead
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        
      });


      const data = await res.json();
      console.log("Registor",data.user);
      

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // If success → backend already set httpOnly cookies
      // → redirect to dashboard
      router.push('/dashboard');
      router.refresh(); // important to update server components
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <AuthCard 
    key="register"          // ← add this
    type="register" 
    onSubmit={handleLogin} 
  />
  );
}