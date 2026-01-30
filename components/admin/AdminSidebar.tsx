"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Users,
  FolderTree,
  FileText,
  Navigation,
  Settings,
  MessageSquare,
  Star,
  Menu,
  X,
  MapPin,
  Upload,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Machines",
    href: "/admin/machines",
    icon: Package,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    name: "Salespeople",
    href: "/admin/salespeople",
    icon: Users,
  },
  {
    name: "Territories",
    href: "/admin/counties",
    icon: MapPin,
  },
  {
    name: "Blog Posts",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: Star,
  },
  {
    name: "Navigation",
    href: "/admin/navigation",
    icon: Navigation,
  },
  {
    name: "Contact Forms",
    href: "/admin/contacts",
    icon: MessageSquare,
  },
  {
    name: "Import",
    href: "/admin/import",
    icon: Upload,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        <Menu className="w-6 h-6 text-[var(--gray-700)]" />
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white border-r border-[var(--gray-200)] z-50",
          "transform transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-[var(--gray-200)]">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--blue-500)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-[family-name:var(--font-heading)]">
                TP
              </span>
            </div>
            <span className="font-[family-name:var(--font-heading)] font-semibold text-[var(--navy-800)]">
              Admin
            </span>
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-[var(--gray-100)]"
          >
            <X className="w-5 h-5 text-[var(--gray-500)]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--blue-50)] text-[var(--blue-600)]"
                    : "text-[var(--gray-600)] hover:bg-[var(--gray-100)] hover:text-[var(--gray-900)]"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--gray-200)]">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-sm text-[var(--gray-500)] hover:text-[var(--gray-700)] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View Website
          </a>
        </div>
      </aside>
    </>
  );
}
