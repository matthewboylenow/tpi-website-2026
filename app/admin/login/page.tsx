"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-900)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white mb-4">
            <span className="text-[var(--blue-500)] font-bold text-2xl font-[family-name:var(--font-outfit)]">
              TP
            </span>
          </div>
          <h1
            className="font-[family-name:var(--font-outfit)] font-bold text-2xl"
            style={{ color: 'white' }}
          >
            Admin Login
          </h1>
          <p className="text-[var(--gray-400)] mt-2">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full h-12 pl-12 pr-4 rounded-lg border border-[var(--gray-300)] focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full h-12 pl-12 pr-4 rounded-lg border border-[var(--gray-300)] focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-[var(--gray-500)] hover:text-[var(--blue-500)] transition-colors"
            >
              ← Back to website
            </Link>
          </div>
        </div>

        <p className="text-center text-[var(--gray-500)] text-sm mt-8">
          Taylor Products Admin Panel
        </p>
      </div>
    </div>
  );
}
