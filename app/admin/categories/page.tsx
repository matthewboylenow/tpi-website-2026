import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, ChevronRight, Layers } from "lucide-react";
import { getCategoriesWithSubcategories } from "@/lib/data";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

export default async function CategoriesAdminPage() {
  const categories = await getCategoriesWithSubcategories();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)]">
            Categories
          </h1>
          <p className="text-[var(--gray-600)] mt-1">
            Manage product categories and subcategories
          </p>
        </div>
        <Link href="/admin/categories/new">
          <Button variant="primary">
            <Plus className="w-5 h-5" />
            Add Category
          </Button>
        </Link>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden"
          >
            {/* Category Header */}
            <div className="p-4 flex items-center gap-4">
              {/* Hero Image */}
              <div className="w-20 h-20 rounded-lg bg-[var(--gray-100)] flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                {category.heroImageUrl ? (
                  <Image
                    src={category.heroImageUrl}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Layers className="w-8 h-8 text-[var(--gray-400)]" />
                )}
              </div>

              {/* Category Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)]">
                    {category.name}
                  </h2>
                  <Badge variant="secondary">
                    {category.machineCount} machines
                  </Badge>
                  {category.profitCalculatorEnabled && (
                    <Badge variant="success">Calculator</Badge>
                  )}
                </div>
                <p className="text-sm text-[var(--gray-500)] mt-1">
                  /{category.slug}
                </p>
                {category.description && (
                  <p className="text-sm text-[var(--gray-600)] mt-1 line-clamp-1">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/${category.slug}`}
                  target="_blank"
                  className="p-2 text-[var(--gray-500)] hover:text-[var(--blue-500)] hover:bg-[var(--blue-50)] rounded-lg transition-colors"
                  title="View on site"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/admin/categories/${category.id}`}
                  className="p-2 text-[var(--gray-500)] hover:text-[var(--blue-500)] hover:bg-[var(--blue-50)] rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <DeleteCategoryButton
                  id={category.id}
                  name={category.name}
                  machineCount={category.machineCount}
                />
              </div>
            </div>

            {/* Subcategories */}
            {category.subcategories.length > 0 && (
              <div className="px-4 pb-4">
                <div className="bg-[var(--gray-50)] rounded-lg p-3">
                  <p className="text-xs font-medium text-[var(--gray-500)] uppercase tracking-wider mb-2">
                    Subcategories ({category.subcategories.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((sub) => (
                      <span
                        key={sub.id}
                        className="px-3 py-1 bg-white rounded-full text-sm text-[var(--gray-700)] border border-[var(--gray-200)]"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-[var(--gray-200)]">
          <Layers className="w-12 h-12 text-[var(--gray-300)] mx-auto mb-4" />
          <p className="text-[var(--gray-500)]">No categories found</p>
          <Link href="/admin/categories/new" className="inline-block mt-4">
            <Button variant="primary">
              <Plus className="w-5 h-5" />
              Add Your First Category
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
