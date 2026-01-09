"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteMachineButtonProps {
  id: number;
  modelNumber: string;
}

export function DeleteMachineButton({ id, modelNumber }: DeleteMachineButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Delete machine "${modelNumber}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/machines/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to delete machine");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete machine");
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
