import Link from "next/link";
import { getAllTestimonials } from "@/lib/data";
import { Plus, Quote, Star, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteTestimonialButton } from "./DeleteTestimonialButton";

export default async function TestimonialsAdminPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)]">
            Testimonials
          </h1>
          <p className="text-[var(--gray-600)] mt-1">
            {testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Button>
        </Link>
      </div>

      {/* Testimonials List */}
      {testimonials.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-[var(--gray-200)] text-center">
          <Quote className="w-12 h-12 text-[var(--gray-300)] mx-auto mb-4" />
          <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-2">
            No Testimonials Yet
          </h2>
          <p className="text-[var(--gray-500)] mb-6">
            Add customer testimonials to display on the homepage.
          </p>
          <Link href="/admin/testimonials/new">
            <Button variant="primary">Add Your First Testimonial</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)] hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)]">
                      {testimonial.customerName}
                    </h3>
                    {testimonial.isFeatured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--orange-100)] text-[var(--orange-700)]">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    <span className="text-xs text-[var(--gray-400)]">
                      Order: {testimonial.displayOrder}
                    </span>
                  </div>

                  {testimonial.businessName && (
                    <div className="flex items-center gap-2 text-sm text-[var(--gray-600)] mb-3">
                      <Building2 className="w-4 h-4" />
                      {testimonial.businessName}
                    </div>
                  )}

                  <blockquote className="text-[var(--gray-700)] bg-[var(--gray-50)] rounded-lg p-4 text-sm italic border-l-4 border-[var(--blue-200)]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/admin/testimonials/${testimonial.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <DeleteTestimonialButton
                    id={testimonial.id}
                    name={testimonial.customerName}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
