// lib/auth.ts
// This file should only be imported in SERVER contexts (Server Components, Actions, Route Handlers, middleware)

import { cookies } from 'next/headers';

export async function getAccessToken() {
  const cookieStore = await cookies();           // ← await here!
  const access = cookieStore.get('access_token')?.value;

  if (!access) return null;

  // Optional: Add JWT decode + expiry check here if you want to auto-refresh on expiry
  // Example: const decoded = jwtDecode(access);
  // if (decoded.exp * 1000 < Date.now()) { await refresh... }

  return access;
}

export async function refreshAccessToken() {
  const cookieStore = await cookies();           // ← await here too!
  const refresh = cookieStore.get('refresh_token')?.value;

  if (!refresh) throw new Error('No refresh token');

  const res = await fetch('https://your-backend.com/api/auth/refresh', {  // or your real endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: refresh }),
  });

  if (!res.ok) {
    throw new Error('Refresh failed');
  }

  const data = await res.json();

  // Update cookies (only works in Route Handlers or Server Actions — not plain Server Components!)
  // If calling this from a Server Component, better to do refresh in a Route Handler or Action
  // For simplicity, assume this is called from a context where set is allowed
  cookieStore.set('access_token', data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60, // 15 min example
    path: '/',
  });

  if (data.newRefreshToken) {
    cookieStore.set('refresh_token', data.newRefreshToken, { /* same options */ });
  }

  return data.accessToken;
}