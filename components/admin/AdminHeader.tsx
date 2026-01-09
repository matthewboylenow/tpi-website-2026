"use client";

import * as React from "react";
import { signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[var(--gray-200)] flex items-center justify-between px-6">
      <div className="lg:hidden w-8" /> {/* Spacer for mobile menu button */}

      <h1 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] hidden sm:block">
        Taylor Products Admin
      </h1>

      <div className="flex items-center gap-4">
        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--gray-100)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--blue-500)] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-[var(--gray-900)]">
                {user.name || user.email?.split("@")[0]}
              </p>
              <p className="text-xs text-[var(--gray-500)] capitalize">
                {user.role || "Admin"}
              </p>
            </div>
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-[var(--gray-200)] py-2 z-50">
                <div className="px-4 py-2 border-b border-[var(--gray-200)]">
                  <p className="text-sm font-medium text-[var(--gray-900)]">
                    {user.name || "Admin User"}
                  </p>
                  <p className="text-xs text-[var(--gray-500)]">{user.email}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
