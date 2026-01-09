"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Testimonial } from "@/lib/schema";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // Auto-advance testimonials
  React.useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const nextTestimonial = () => {
    goToTestimonial((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    goToTestimonial(
      (currentIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  if (testimonials.length === 0) {
    return null;
  }

  const testimonial = testimonials[currentIndex];

  return (
    <section className="section bg-gradient-to-b from-[var(--navy-800)] to-[var(--navy-900)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[var(--orange-400)] font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4">
            Customer Stories
          </p>
          <h2
            className="font-[family-name:var(--font-outfit)] font-bold text-3xl sm:text-4xl mb-4"
            style={{ color: 'white' }}
          >
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12">
              <Quote className="w-12 h-12 text-[var(--orange-500)] opacity-50" />
            </div>

            {/* Content */}
            <div className="pt-8 md:pt-4 md:pl-16">
              <blockquote className="text-lg md:text-xl text-white leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-outfit)] font-semibold text-white">
                    {testimonial.customerName}
                  </p>
                  {testimonial.businessName && (
                    <p className="text-[var(--gray-400)] text-sm">
                      {testimonial.businessName}
                    </p>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "w-8 bg-[var(--orange-500)]"
                    : "w-2 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
