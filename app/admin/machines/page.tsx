import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Eye } from "lucide-react";
import { getAllMachinesForAdmin, getCategories } from "@/lib/data";
import { getMachineImage } from "@/lib/assets";
import { DeleteMachineButton } from "./DeleteMachineButton";

export default async function MachinesAdminPage() {
  const [machines, categories] = await Promise.all([
    getAllMachinesForAdmin(),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)]">
            Machines
          </h1>
          <p className="text-[var(--gray-600)] mt-1">
            Manage all {machines.length} machines in the catalog
          </p>
        </div>
        <Link href="/admin/machines/new">
          <Button variant="primary">
            <Plus className="w-5 h-5" />
            Add Machine
          </Button>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--gray-200)]">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
            <input
              type="text"
              placeholder="Search machines..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-[var(--gray-300)] focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select className="h-10 px-4 rounded-lg border border-[var(--gray-300)] bg-white focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent">
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select className="h-10 px-4 rounded-lg border border-[var(--gray-300)] bg-white focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent">
            <option value="">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="demo">Demo Units</option>
            <option value="featured">Featured</option>
          </select>
        </div>
      </div>

      {/* Machines Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--gray-600)] uppercase tracking-wider">
                  Machine
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--gray-600)] uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--gray-600)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--gray-600)] uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[var(--gray-600)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--gray-200)]">
              {machines.map((machine) => {
                const imageUrl =
                  machine.imageUrl || getMachineImage(machine.modelNumber);
                return (
                  <tr
                    key={machine.id}
                    className="hover:bg-[var(--gray-50)] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[var(--gray-100)] flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={machine.modelNumber}
                              fill
                              className="object-contain p-1"
                            />
                          ) : (
                            <span className="text-xs font-bold text-[var(--gray-500)]">
                              IMG
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-[family-name:var(--font-outfit)] font-semibold text-[var(--navy-800)]">
                            {machine.modelNumber}
                          </p>
                          <p className="text-sm text-[var(--gray-600)]">
                            {machine.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[var(--gray-900)]">
                        {machine.categoryName || "—"}
                      </p>
                      {machine.subcategoryName && (
                        <p className="text-xs text-[var(--gray-500)]">
                          {machine.subcategoryName}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {machine.isInStock ? (
                          <Badge variant="success">In Stock</Badge>
                        ) : (
                          <Badge variant="error">Out of Stock</Badge>
                        )}
                        {machine.isFeatured && (
                          <Badge variant="primary">Featured</Badge>
                        )}
                        {machine.isDemoUnit && (
                          <Badge variant="secondary">Demo</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--gray-600)]">
                      {machine.updatedAt
                        ? new Date(machine.updatedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/machines/${machine.slug}`}
                          target="_blank"
                          className="p-2 text-[var(--gray-500)] hover:text-[var(--blue-500)] hover:bg-[var(--blue-50)] rounded-lg transition-colors"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/machines/${machine.id}`}
                          className="p-2 text-[var(--gray-500)] hover:text-[var(--blue-500)] hover:bg-[var(--blue-50)] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteMachineButton
                          id={machine.id}
                          modelNumber={machine.modelNumber}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[var(--gray-200)] flex items-center justify-between">
          <p className="text-sm text-[var(--gray-600)]">
            Showing <span className="font-medium">{machines.length}</span>{" "}
            machines
          </p>
        </div>
      </div>
    </div>
  );
}
