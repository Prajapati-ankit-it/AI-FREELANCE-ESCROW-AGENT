// components/AuthCard.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

// Define schemas
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password too long"),
});

const registerSchema = z.object({
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

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthCardProps {
  type: "login" | "register";
}

export default function AuthCard({ type }: AuthCardProps) {
  const router = useRouter();
  const isRegister = type === "register";
  const schema = isRegister ? registerSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: isRegister 
      ? { name: "", email: "", password: "" } 
      : { email: "", password: "" },
  });

  const handleFormSubmit = async (formData: LoginFormData | RegisterFormData) => {
    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";

    const payload = isRegister
      ? (formData as RegisterFormData)
      : (formData as LoginFormData);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = (data.message || "").toLowerCase();

        if (msg.includes("not found") || msg.includes("does not exist")) {
          toast.error("User not found", { description: "Please register first." });
        } else if (msg.includes("invalid") || msg.includes("incorrect")) {
          toast.error("Incorrect password");
        } else if (msg.includes("already") || msg.includes("exists") || msg.includes("taken")) {
          toast.error("Email already registered", { description: "Please login instead." });
        } else {
          toast.error(data.message || (isRegister ? "Registration failed" : "Login failed"));
        }
        return;
      }

      if (isRegister) {
        toast.success("Account created! 🎉 Please login.");
        setTimeout(() => {
          router.push("/auth/login");
          router.refresh();
        }, 1000);
      } else {
        toast.success("Logged in successfully!");
        
        const userName = data?.user?.name || (formData as LoginFormData).email.split('@')[0];
        localStorage.setItem('user_name', userName);
        
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      }

    } catch (err) {
      toast.error("Network error – please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5F1EC]">
      {/* LEFT SIDE BRANDING */}
      <div className="hidden md:flex w-1/2 bg-[#0B0B0B] text-white flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4 text-[#C89B6D]">AI ESCROW</h1>
        <p className="text-gray-400 text-center max-w-md">
          Secure AI-powered escrow platform that automates freelance payments,
          milestone verification, and project management.
        </p>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isRegister ? "Create Account" : "Login to Dashboard"}
          </h2>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {isRegister && (
              <div>
                <input
                  placeholder="Full Name"
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B6D]"
                  {...register("name")}
                />
                {isRegister && (errors as any).name && (
                  <p className="text-red-500 text-sm mt-1">{(errors as any).name?.message}</p>
                )}
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B6D]"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B6D]"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#C89B6D] text-white py-3 rounded-lg hover:opacity-90 transition ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Processing..." : isRegister ? "Register" : "Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-5">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <Link
                href={isRegister ? "/auth/login" : "/auth/register"}
                className="ml-1 text-[#C89B6D] font-medium"
                prefetch={false}
>
              {isRegister ? "Login" : "Register"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
