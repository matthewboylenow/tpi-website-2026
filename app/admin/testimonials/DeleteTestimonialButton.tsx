"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteTestimonialButtonProps {
  id: number;
  name: string;
}

export function DeleteTestimonialButton({ id, name }: DeleteTestimonialButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Failed to delete testimonial");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--gray-600)]">Delete?</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-600 hover:bg-red-700"
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Confirm"
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setShowConfirm(true)}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
      title={`Delete testimonial from ${name}`}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
