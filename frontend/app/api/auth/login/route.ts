import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const backendRes = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    console.log(backendRes.body);
    

    let data: any;
    try {
      data = await backendRes.json();  // Try parsing JSON
    } catch (err) {
      // Backend did not return JSON
      console.error('Failed to parse backend JSON:', err);
      return NextResponse.json({ message: 'Backend error' }, { status: 502 });
    }

    if (!backendRes.ok) {
      return NextResponse.json({ message: data?.message || 'Invalid credentials' }, { status: 401 });
    }

    // Set cookies
    const response = NextResponse.json({ success: true, user: data.user });

    response.cookies.set('access_token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60,
      path: '/',
    });

    response.cookies.set('refresh_token', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('API /login error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}