"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { ArrowLeft, Save, Eye, MapPin } from "lucide-react";
import type { Salesperson, County } from "@/lib/schema";

interface SalespersonFormProps {
  salesperson?: Salesperson;
  assignedCounties?: County[];
}

export function SalespersonForm({ salesperson, assignedCounties = [] }: SalespersonFormProps) {
  const router = useRouter();
  const isEditing = !!salesperson;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: salesperson?.firstName || "",
    lastName: salesperson?.lastName || "",
    slug: salesperson?.slug || "",
    email: salesperson?.email || "",
    phone: salesperson?.phone || "",
    headshotUrl: salesperson?.headshotUrl || "",
    bio: salesperson?.bio || "",
    bookingLink: salesperson?.bookingLink || "",
    displayOrder: salesperson?.displayOrder?.toString() || "0",
    isActive: salesperson?.isActive ?? true,
  });

  const generateSlug = (firstName: string, lastName: string) => {
    return `${firstName}-${lastName}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (field: "firstName" | "lastName", value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      // Auto-generate slug if not editing or slug is empty
      if (!prev.slug || !isEditing) {
        const firstName = field === "firstName" ? value : prev.firstName;
        const lastName = field === "lastName" ? value : prev.lastName;
        if (firstName && lastName) {
          newData.slug = generateSlug(firstName, lastName);
        }
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditing
        ? `/api/admin/salespeople/${salesperson.id}`
        : "/api/admin/salespeople";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          displayOrder: parseInt(formData.displayOrder) || 0,
        }),
      });

      if (response.ok) {
        router.push("/admin/salespeople");
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to save salesperson");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save salesperson");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/salespeople"
            className="p-2 text-[var(--gray-500)] hover:text-[var(--navy-800)] hover:bg-[var(--gray-100)] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)]">
              {isEditing ? "Edit Salesperson" : "New Salesperson"}
            </h1>
            <p className="text-[var(--gray-600)] mt-1">
              {isEditing
                ? `Editing: ${salesperson.firstName} ${salesperson.lastName}`
                : "Add a new team member"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditing && (
            <Link href={`/salespeople/${salesperson.slug}`} target="_blank">
              <Button type="button" variant="secondary">
                <Eye className="w-4 h-4" />
                View
              </Button>
            </Link>
          )}
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            <Save className="w-4 h-4" />
            {isSubmitting ? "Saving..." : "Save Salesperson"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleNameChange("firstName", e.target.value)}
                required
                placeholder="John"
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleNameChange("lastName", e.target.value)}
                required
                placeholder="Smith"
              />
              <Input
                label="Slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                required
                placeholder="john-smith"
              />
              <Input
                label="Display Order"
                type="number"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    displayOrder: e.target.value,
                  }))
                }
                placeholder="0"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                placeholder="john@taylorproductsinc.com"
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="(555) 123-4567"
              />
              <div className="md:col-span-2">
                <Input
                  label="Booking Link"
                  value={formData.bookingLink}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bookingLink: e.target.value,
                    }))
                  }
                  placeholder="https://calendly.com/..."
                  hint="Link for scheduling meetings"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Biography
            </h2>
            <Textarea
              label="Bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="A brief description of this team member..."
              className="min-h-[150px]"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Photo Preview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Photo
            </h2>
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 rounded-full bg-[var(--gray-100)] flex items-center justify-center overflow-hidden relative">
                {formData.headshotUrl ? (
                  <Image
                    src={formData.headshotUrl}
                    alt={`${formData.firstName} ${formData.lastName}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-[var(--gray-400)]">
                    {formData.firstName?.[0] || "?"}
                    {formData.lastName?.[0] || "?"}
                  </span>
                )}
              </div>
            </div>
            <Input
              label="Headshot URL"
              value={formData.headshotUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, headshotUrl: e.target.value }))
              }
              placeholder="https://..."
            />
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Status
            </h2>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
              />
              <label htmlFor="isActive" className="text-sm">
                Active (visible on website)
              </label>
            </div>
          </div>

          {/* Assigned Territories */}
          {isEditing && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)]">
                  Territories
                </h2>
                <Link
                  href="/admin/counties"
                  className="text-sm text-[var(--blue-500)] hover:text-[var(--blue-700)]"
                >
                  Manage
                </Link>
              </div>
              {assignedCounties.length === 0 ? (
                <p className="text-sm text-[var(--gray-500)]">
                  No territories assigned. Go to{" "}
                  <Link
                    href="/admin/counties"
                    className="text-[var(--blue-500)] hover:underline"
                  >
                    Territory Management
                  </Link>{" "}
                  to assign counties.
                </p>
              ) : (
                <div className="space-y-2">
                  {/* Group by state */}
                  {Object.entries(
                    assignedCounties.reduce(
                      (acc, county) => {
                        const state = county.state;
                        if (!acc[state]) acc[state] = [];
                        acc[state].push(county);
                        return acc;
                      },
                      {} as Record<string, typeof assignedCounties>
                    )
                  ).map(([state, stateCounties]) => (
                    <div key={state}>
                      <p className="text-xs font-medium text-[var(--gray-500)] uppercase tracking-wider mb-1">
                        {state}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {stateCounties.map((county) => (
                          <span
                            key={county.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--blue-50)] text-[var(--blue-700)] text-xs rounded-full"
                          >
                            <MapPin className="w-3 h-3" />
                            {county.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
