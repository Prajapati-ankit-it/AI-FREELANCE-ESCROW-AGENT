// app/auth/register/page.tsx
'use client';

import AuthCard from "../../components/AuthCard";// your component

export default function RegisterPage() {
  return (
    <AuthCard 
    key="register"          // ← add this
    type="register" 
  />
  );
}
