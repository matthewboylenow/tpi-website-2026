"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { getMachineImage } from "@/lib/assets";
import type { Machine, Category, Subcategory } from "@/lib/schema";

interface MachineFormProps {
  machine?: Machine;
  categories: Category[];
  subcategories: (Subcategory & { category: Category | null })[];
}

export function MachineForm({
  machine,
  categories,
  subcategories,
}: MachineFormProps) {
  const router = useRouter();
  const isEditing = !!machine;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    modelNumber: machine?.modelNumber || "",
    name: machine?.name || "",
    slug: machine?.slug || "",
    shortDescription: machine?.shortDescription || "",
    description: machine?.description || "",
    longDescription: machine?.longDescription || "",
    imageUrl: machine?.imageUrl || "",
    specSheetUrl: machine?.specSheetUrl || "",
    categoryId: machine?.categoryId?.toString() || "",
    subcategoryId: machine?.subcategoryId?.toString() || "",
    flavorCount: machine?.flavorCount || "",
    machineType: machine?.machineType || "",
    isAdaCompliant: machine?.isAdaCompliant ?? false,
    isFeatured: machine?.isFeatured ?? false,
    isInStock: machine?.isInStock ?? true,
    isDemoUnit: machine?.isDemoUnit ?? false,
    demoDiscountPercent: machine?.demoDiscountPercent?.toString() || "",
    metaTitle: machine?.metaTitle || "",
    metaDescription: machine?.metaDescription || "",
    focusKeyword: machine?.focusKeyword || "",
    displayOrder: machine?.displayOrder?.toString() || "0",
  });

  const generateSlug = (modelNumber: string) => {
    return modelNumber
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleModelNumberChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      modelNumber: value,
      slug: prev.slug || generateSlug(value),
    }));
  };

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.categoryId?.toString() === formData.categoryId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditing
        ? `/api/admin/machines/${machine.id}`
        : "/api/admin/machines";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
          subcategoryId: formData.subcategoryId
            ? parseInt(formData.subcategoryId)
            : null,
          demoDiscountPercent: formData.demoDiscountPercent
            ? parseInt(formData.demoDiscountPercent)
            : null,
          displayOrder: parseInt(formData.displayOrder) || 0,
        }),
      });

      if (response.ok) {
        router.push("/admin/machines");
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to save machine");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save machine");
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageUrl = formData.imageUrl || getMachineImage(formData.modelNumber);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/machines"
            className="p-2 text-[var(--gray-500)] hover:text-[var(--navy-800)] hover:bg-[var(--gray-100)] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)]">
              {isEditing ? "Edit Machine" : "New Machine"}
            </h1>
            <p className="text-[var(--gray-600)] mt-1">
              {isEditing
                ? `Editing: ${machine.modelNumber}`
                : "Add a new machine to the catalog"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditing && (
            <Link href={`/machines/${machine.slug}`} target="_blank">
              <Button type="button" variant="secondary">
                <Eye className="w-4 h-4" />
                View
              </Button>
            </Link>
          )}
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            <Save className="w-4 h-4" />
            {isSubmitting ? "Saving..." : "Save Machine"}
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
                label="Model Number"
                value={formData.modelNumber}
                onChange={(e) => handleModelNumberChange(e.target.value)}
                required
                placeholder="C707"
              />
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                placeholder="Single Flavor Floor Model"
              />
              <Input
                label="Slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                required
                placeholder="c707-single-flavor"
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

          {/* Descriptions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Descriptions
            </h2>
            <div className="space-y-4">
              <Input
                label="Short Description"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    shortDescription: e.target.value,
                  }))
                }
                placeholder="Brief description for listings"
              />
              <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Main description"
              />
              <Textarea
                label="Long Description (HTML)"
                value={formData.longDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    longDescription: e.target.value,
                  }))
                }
                placeholder="Detailed description with HTML formatting"
                className="min-h-[150px] font-mono text-sm"
              />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              SEO
            </h2>
            <div className="space-y-4">
              <Input
                label="Meta Title"
                value={formData.metaTitle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))
                }
                placeholder="Custom page title"
              />
              <Textarea
                label="Meta Description"
                value={formData.metaDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    metaDescription: e.target.value,
                  }))
                }
                placeholder="Description for search engines"
              />
              <Input
                label="Focus Keyword"
                value={formData.focusKeyword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    focusKeyword: e.target.value,
                  }))
                }
                placeholder="Primary keyword"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image Preview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Image
            </h2>
            {imageUrl && (
              <div className="relative aspect-square mb-4 bg-[var(--gray-50)] rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={formData.modelNumber || "Machine"}
                  fill
                  className="object-contain p-4"
                />
              </div>
            )}
            <Input
              label="Image URL"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              placeholder="https://..."
              hint="Leave empty to use default image"
            />
            <Input
              label="Spec Sheet URL"
              value={formData.specSheetUrl}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  specSheetUrl: e.target.value,
                }))
              }
              placeholder="https://..."
              className="mt-4"
            />
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Category
            </h2>
            <div className="space-y-4">
              <Select
                label="Category"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                    subcategoryId: "",
                  }))
                }
                options={[
                  { value: "", label: "Select category..." },
                  ...categories.map((cat) => ({
                    value: cat.id.toString(),
                    label: cat.name,
                  })),
                ]}
              />
              {filteredSubcategories.length > 0 && (
                <Select
                  label="Subcategory"
                  value={formData.subcategoryId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subcategoryId: e.target.value,
                    }))
                  }
                  options={[
                    { value: "", label: "Select subcategory..." },
                    ...filteredSubcategories.map((sub) => ({
                      value: sub.id.toString(),
                      label: sub.name,
                    })),
                  ]}
                />
              )}
            </div>
          </div>

          {/* Attributes */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Attributes
            </h2>
            <div className="space-y-4">
              <Input
                label="Flavor Count"
                value={formData.flavorCount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    flavorCount: e.target.value,
                  }))
                }
                placeholder="1, 2, 1+Twist, etc."
              />
              <Input
                label="Machine Type"
                value={formData.machineType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    machineType: e.target.value,
                  }))
                }
                placeholder="Floor, Countertop, etc."
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isAdaCompliant"
                  checked={formData.isAdaCompliant}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isAdaCompliant: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
                />
                <label htmlFor="isAdaCompliant" className="text-sm">
                  ADA Compliant
                </label>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isInStock"
                  checked={formData.isInStock}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isInStock: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
                />
                <label htmlFor="isInStock" className="text-sm">
                  In Stock
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isFeatured: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
                />
                <label htmlFor="isFeatured" className="text-sm">
                  Featured
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isDemoUnit"
                  checked={formData.isDemoUnit}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isDemoUnit: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
                />
                <label htmlFor="isDemoUnit" className="text-sm">
                  Demo Unit
                </label>
              </div>
              {formData.isDemoUnit && (
                <Input
                  label="Demo Discount %"
                  type="number"
                  value={formData.demoDiscountPercent}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      demoDiscountPercent: e.target.value,
                    }))
                  }
                  placeholder="10"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
