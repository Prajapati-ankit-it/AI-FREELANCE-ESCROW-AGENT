// lib/schemas/auth.ts
import { z } from "zod";

// -----------------
// Login schema
// -----------------
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password too long"),
});

// -----------------
// Register schema
// -----------------
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Full name is required")
    .max(50, "Name too long"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password too long"),
});