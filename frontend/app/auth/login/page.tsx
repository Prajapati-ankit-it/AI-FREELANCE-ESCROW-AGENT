// app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthCard from '../../components/AuthCard';
import { z } from 'zod';
import { loginSchema } from '../../lib/schemas/auth';

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: LoginData) => {
    // data is now { email: string, password: string }
    const { email, password } = data;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const result = await res.json();

      if (!res.ok) {
        // Show error (you can also use toast here later)
        setError(result.message || 'Login failed');
        return;
      }

      // Success: backend set httpOnly cookies
      router.push('/');
      router.refresh(); // refresh server-side data
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <AuthCard 
    key="login"          // ← add this
    type="login" 
    onSubmit={handleLogin} 
  />
  );
}