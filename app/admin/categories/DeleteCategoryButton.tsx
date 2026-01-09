"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteCategoryButtonProps {
  id: number;
  name: string;
  machineCount: number;
}

export function DeleteCategoryButton({ id, name, machineCount }: DeleteCategoryButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const warning = machineCount > 0
      ? `Delete "${name}"? This will also delete all subcategories and remove the category from ${machineCount} machine(s). This cannot be undone.`
      : `Delete "${name}"? This will also delete all subcategories. This cannot be undone.`;

    if (!confirm(warning)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to delete category");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-[var(--gray-500)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Delete"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
