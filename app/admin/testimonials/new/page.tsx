import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TestimonialForm } from "../TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/testimonials"
          className="p-2 rounded-lg hover:bg-[var(--gray-100)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--gray-600)]" />
        </Link>
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)]">
            Add New Testimonial
          </h1>
          <p className="text-[var(--gray-600)] mt-1">
            Create a new customer testimonial
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
        <TestimonialForm />
      </div>
    </div>
  );
}
