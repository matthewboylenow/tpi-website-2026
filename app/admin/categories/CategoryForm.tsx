"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react";
import type { Category, Subcategory } from "@/lib/schema";

interface CategoryFormProps {
  category?: Category;
  subcategories?: Subcategory[];
}

export function CategoryForm({ category, subcategories = [] }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = !!category;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    heroImageUrl: category?.heroImageUrl || "",
    profitCalculatorEnabled: category?.profitCalculatorEnabled ?? false,
    displayOrder: category?.displayOrder?.toString() || "0",
  });

  // Subcategory management
  const [subs, setSubs] = useState<{ id?: number; name: string; displayOrder: number }[]>(
    subcategories.map((s) => ({ id: s.id, name: s.name, displayOrder: s.displayOrder ?? 0 }))
  );
  const [newSubName, setNewSubName] = useState("");

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: prev.slug || generateSlug(value),
    }));
  };

  const handleAddSubcategory = () => {
    if (!newSubName.trim()) return;
    setSubs((prev) => [...prev, { name: newSubName.trim(), displayOrder: prev.length }]);
    setNewSubName("");
  };

  const handleRemoveSubcategory = async (index: number) => {
    const sub = subs[index];
    if (sub.id) {
      // Delete from database
      try {
        await fetch(`/api/admin/subcategories/${sub.id}`, { method: "DELETE" });
      } catch (error) {
        console.error("Failed to delete subcategory:", error);
        alert("Failed to delete subcategory");
        return;
      }
    }
    setSubs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditing
        ? `/api/admin/categories/${category.id}`
        : "/api/admin/categories";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          displayOrder: parseInt(formData.displayOrder) || 0,
          subcategories: subs,
        }),
      });

      if (response.ok) {
        router.push("/admin/categories");
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to save category");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save category");
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
            href="/admin/categories"
            className="p-2 text-[var(--gray-500)] hover:text-[var(--navy-800)] hover:bg-[var(--gray-100)] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)]">
              {isEditing ? "Edit Category" : "New Category"}
            </h1>
            <p className="text-[var(--gray-600)] mt-1">
              {isEditing ? `Editing: ${category.name}` : "Create a new product category"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditing && (
            <Link href={`/${category.slug}`} target="_blank">
              <Button type="button" variant="secondary">
                <Eye className="w-4 h-4" />
                View
              </Button>
            </Link>
          )}
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            <Save className="w-4 h-4" />
            {isSubmitting ? "Saving..." : "Save Category"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                placeholder="Soft Serve & Frozen Yogurt"
              />
              <Input
                label="Slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                required
                placeholder="soft-serve-frozen-yogurt"
              />
              <div className="md:col-span-2">
                <Textarea
                  label="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Brief description for this category..."
                />
              </div>
              <Input
                label="Display Order"
                type="number"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, displayOrder: e.target.value }))
                }
                placeholder="0"
              />
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="profitCalculatorEnabled"
                  checked={formData.profitCalculatorEnabled}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profitCalculatorEnabled: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
                />
                <label htmlFor="profitCalculatorEnabled" className="text-sm">
                  Enable Profit Calculator
                </label>
              </div>
            </div>
          </div>

          {/* Subcategories */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Subcategories
            </h2>

            {/* Existing Subcategories */}
            {subs.length > 0 && (
              <div className="space-y-2 mb-4">
                {subs.map((sub, index) => (
                  <div
                    key={sub.id || index}
                    className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg"
                  >
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => {
                        const newSubs = [...subs];
                        newSubs[index].name = e.target.value;
                        setSubs(newSubs);
                      }}
                      className="flex-1 px-3 py-1.5 text-sm border border-[var(--gray-300)] rounded-lg"
                    />
                    <input
                      type="number"
                      value={sub.displayOrder}
                      onChange={(e) => {
                        const newSubs = [...subs];
                        newSubs[index].displayOrder = parseInt(e.target.value) || 0;
                        setSubs(newSubs);
                      }}
                      className="w-16 px-2 py-1.5 text-sm border border-[var(--gray-300)] rounded-lg text-center"
                      title="Display order"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSubcategory(index)}
                      className="p-1.5 text-[var(--gray-500)] hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Subcategory */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                placeholder="New subcategory name..."
                className="flex-1 px-3 py-2 text-sm border border-[var(--gray-300)] rounded-lg"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSubcategory();
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddSubcategory}
                disabled={!newSubName.trim()}
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Hero Image */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Hero Image
            </h2>
            <ImageUpload
              value={formData.heroImageUrl}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, heroImageUrl: url }))
              }
              folder="categories"
              hint="Recommended size: 1920x600"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
