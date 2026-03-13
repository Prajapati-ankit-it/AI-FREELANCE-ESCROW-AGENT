import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = registerSchema.parse(body);

    console.log('Attempting to register user:', { name, email });

    // Call backend API to store user in database
    const backendUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/auth/signup`;
    console.log('Calling backend:', backendUrl);
    
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        password, 
        role: 'freelancer' // Default role, you might want to add role selection
      }),
    });

    console.log('Backend response status:', backendResponse.status);

    const backendData = await backendResponse.json();
    console.log('Backend response data:', backendData);

    if (!backendResponse.ok) {
      return NextResponse.json({ message: backendData.error || "Registration failed" }, { status: backendResponse.status });
    }

    return NextResponse.json({ 
      success: true, 
      user: { name, email, ...backendData.user },
      token: backendData.token 
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}