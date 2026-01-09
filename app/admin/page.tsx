import Link from "next/link";
import {
  Package,
  Users,
  FolderTree,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Dashboard stats - in production these would come from the database
const stats = [
  {
    name: "Total Machines",
    value: "127",
    change: "+3",
    changeType: "increase",
    icon: Package,
    href: "/admin/machines",
  },
  {
    name: "Categories",
    value: "11",
    change: "0",
    changeType: "neutral",
    icon: FolderTree,
    href: "/admin/categories",
  },
  {
    name: "Salespeople",
    value: "4",
    change: "0",
    changeType: "neutral",
    icon: Users,
    href: "/admin/salespeople",
  },
  {
    name: "Blog Posts",
    value: "24",
    change: "+2",
    changeType: "increase",
    icon: FileText,
    href: "/admin/blog",
  },
];

const quickActions = [
  {
    name: "Add Machine",
    href: "/admin/machines/new",
    icon: Package,
    description: "Add a new machine to the catalog",
  },
  {
    name: "New Blog Post",
    href: "/admin/blog/new",
    icon: FileText,
    description: "Write and publish a blog post",
  },
  {
    name: "Add Salesperson",
    href: "/admin/salespeople/new",
    icon: Users,
    description: "Add a new team member",
  },
  {
    name: "View Contacts",
    href: "/admin/contacts",
    icon: MessageSquare,
    description: "Review form submissions",
  },
];

const recentActivity = [
  {
    type: "machine",
    action: "added",
    item: "C708 Soft Serve Freezer",
    time: "2 hours ago",
  },
  {
    type: "blog",
    action: "published",
    item: "New Crown Series Grills Available",
    time: "Yesterday",
  },
  {
    type: "contact",
    action: "received",
    item: "Quote request from ABC Restaurant",
    time: "Yesterday",
  },
  {
    type: "machine",
    action: "updated",
    item: "ISI-271 Icetro Soft Serve",
    time: "3 days ago",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)]">
          Dashboard
        </h1>
        <p className="text-[var(--gray-600)] mt-1">
          Welcome back! Here&apos;s an overview of your site.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)] hover:shadow-md hover:border-[var(--blue-200)] transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--blue-50)] flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-[var(--blue-500)]" />
              </div>
              {stat.change !== "0" && (
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : stat.changeType === "decrease"
                      ? "text-red-600"
                      : "text-[var(--gray-500)]"
                  }`}
                >
                  {stat.change}
                </span>
              )}
            </div>
            <p className="font-[family-name:var(--font-outfit)] font-bold text-3xl text-[var(--navy-800)]">
              {stat.value}
            </p>
            <p className="text-sm text-[var(--gray-600)] mt-1">{stat.name}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--gray-200)]">
              <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)]">
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-start gap-4 p-4 rounded-lg border border-[var(--gray-200)] hover:border-[var(--blue-300)] hover:bg-[var(--blue-50)] transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--orange-100)] flex items-center justify-center flex-shrink-0">
                    <action.icon className="w-5 h-5 text-[var(--orange-600)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--navy-800)]">
                      {action.name}
                    </p>
                    <p className="text-sm text-[var(--gray-500)]">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--gray-200)]">
              <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)]">
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-[var(--gray-200)]">
              {recentActivity.map((activity, index) => (
                <div key={index} className="px-6 py-4">
                  <p className="text-sm text-[var(--gray-900)]">
                    <span className="capitalize font-medium">
                      {activity.type}
                    </span>{" "}
                    {activity.action}:{" "}
                    <span className="text-[var(--blue-600)]">
                      {activity.item}
                    </span>
                  </p>
                  <p className="text-xs text-[var(--gray-500)] mt-1">
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-[var(--blue-600)] to-[var(--navy-700)] rounded-xl p-8 text-white">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h2 className="font-[family-name:var(--font-outfit)] font-bold text-xl mb-2">
              Need Help?
            </h2>
            <p className="text-blue-100 max-w-xl">
              The admin panel lets you manage all content on the Taylor Products
              website. Add machines, edit salespeople, publish blog posts, and
              more.
            </p>
          </div>
          <Button
            variant="primary"
            className="bg-white text-[var(--blue-600)] hover:bg-gray-100"
          >
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}
