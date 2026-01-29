"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import type { Testimonial } from "@/lib/schema";

interface TestimonialFormProps {
  testimonial?: Testimonial;
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customerName: testimonial?.customerName || "",
    businessName: testimonial?.businessName || "",
    quote: testimonial?.quote || "",
    isFeatured: testimonial?.isFeatured || false,
    displayOrder: testimonial?.displayOrder || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = testimonial
        ? `/api/admin/testimonials/${testimonial.id}`
        : "/api/admin/testimonials";
      const method = testimonial ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/testimonials");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save testimonial");
      }
    } catch (err) {
      console.error("Error saving testimonial:", err);
      setError("Failed to save testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Customer Name */}
      <div>
        <label
          htmlFor="customerName"
          className="block text-sm font-medium text-[var(--gray-700)] mb-2"
        >
          Customer Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="customerName"
          type="text"
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          placeholder="John Smith"
          required
        />
      </div>

      {/* Business Name */}
      <div>
        <label
          htmlFor="businessName"
          className="block text-sm font-medium text-[var(--gray-700)] mb-2"
        >
          Business Name
        </label>
        <Input
          id="businessName"
          type="text"
          value={formData.businessName}
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
          placeholder="Joe's Ice Cream Shop"
        />
        <p className="text-xs text-[var(--gray-500)] mt-1">
          Optional. Will be displayed alongside the customer name.
        </p>
      </div>

      {/* Quote */}
      <div>
        <label
          htmlFor="quote"
          className="block text-sm font-medium text-[var(--gray-700)] mb-2"
        >
          Quote <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="quote"
          value={formData.quote}
          onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
          placeholder="We've been working with Taylor Products for years and couldn't be happier..."
          rows={5}
          required
        />
        <p className="text-xs text-[var(--gray-500)] mt-1">
          The customer&apos;s testimonial text. Quotation marks will be added automatically.
        </p>
      </div>

      {/* Display Order */}
      <div>
        <label
          htmlFor="displayOrder"
          className="block text-sm font-medium text-[var(--gray-700)] mb-2"
        >
          Display Order
        </label>
        <Input
          id="displayOrder"
          type="number"
          value={formData.displayOrder}
          onChange={(e) =>
            setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })
          }
          min={0}
          className="w-32"
        />
        <p className="text-xs text-[var(--gray-500)] mt-1">
          Lower numbers appear first. Use 0 for default ordering.
        </p>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          id="isFeatured"
          type="checkbox"
          checked={formData.isFeatured}
          onChange={(e) =>
            setFormData({ ...formData, isFeatured: e.target.checked })
          }
          className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-600)] focus:ring-[var(--blue-500)]"
        />
        <label
          htmlFor="isFeatured"
          className="text-sm font-medium text-[var(--gray-700)]"
        >
          Featured testimonial
        </label>
      </div>
      <p className="text-xs text-[var(--gray-500)] -mt-4 ml-7">
        Featured testimonials are displayed on the homepage carousel.
      </p>

      {/* Submit Buttons */}
      <div className="flex items-center gap-4 pt-4 border-t border-[var(--gray-200)]">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : testimonial ? (
            "Update Testimonial"
          ) : (
            "Create Testimonial"
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/admin/testimonials")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
