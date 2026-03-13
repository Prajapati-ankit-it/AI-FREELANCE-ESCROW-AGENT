import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Fake DB example
const users = [
  { name: "Surbhi", email: "test@example.com", password: "$2b$10$examplehashedpassword" },
];

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = users.find(u => u.email === email);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return NextResponse.json({ message: "Incorrect password" }, { status: 401 });

    // Return user + dummy tokens
    return NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email },
      accessToken: "abc123",
      refreshToken: "def456",
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}