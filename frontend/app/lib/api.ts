// lib/api.ts  (server-only — do NOT import in 'use client' files)

import { cookies } from 'next/headers';
import { refreshAccessToken } from './auth';

export async function apiFetch(url: string, options: RequestInit = {}) {
  let access = (await cookies()).get('access_token')?.value;  // ← await + await cookies()

  if (!access) {
    // Handle no token → maybe throw or return unauthorized
    throw new Error('No access token');
  }

  let headers = {
    ...options.headers,
    Authorization: `Bearer ${access}`,
  };

  let res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    try {
      access = await refreshAccessToken();
      headers = {
        ...options.headers,
        Authorization: `Bearer ${access}`,
      };
      res = await fetch(url, { ...options, headers }); // retry once
    } catch (err) {
      console.error('Refresh failed:', err);
      // Logout logic or redirect — e.g. throw new Error('Session expired')
    }
  }

  return res;
}