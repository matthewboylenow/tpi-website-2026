import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTestimonialById } from "@/lib/data";
import { TestimonialForm } from "../TestimonialForm";

interface EditTestimonialPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({
  params,
}: EditTestimonialPageProps) {
  const { id } = await params;
  const testimonial = await getTestimonialById(parseInt(id));

  if (!testimonial) {
    notFound();
  }

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
          <h1 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)]">
            Edit Testimonial
          </h1>
          <p className="text-[var(--gray-600)] mt-1">
            Update testimonial from {testimonial.customerName}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </div>
  );
}
