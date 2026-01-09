"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

// Sample counties - in production this would come from the database
const counties = [
  { value: "", label: "Select your county..." },
  { value: "philadelphia-pa", label: "Philadelphia, PA" },
  { value: "bucks-pa", label: "Bucks, PA" },
  { value: "montgomery-pa", label: "Montgomery, PA" },
  { value: "chester-pa", label: "Chester, PA" },
  { value: "delaware-pa", label: "Delaware, PA" },
  { value: "lancaster-pa", label: "Lancaster, PA" },
  { value: "berks-pa", label: "Berks, PA" },
  { value: "lehigh-pa", label: "Lehigh, PA" },
  { value: "northampton-pa", label: "Northampton, PA" },
  { value: "bergen-nj", label: "Bergen, NJ" },
  { value: "essex-nj", label: "Essex, NJ" },
  { value: "hudson-nj", label: "Hudson, NJ" },
  { value: "middlesex-nj", label: "Middlesex, NJ" },
  { value: "monmouth-nj", label: "Monmouth, NJ" },
  { value: "ocean-nj", label: "Ocean, NJ" },
  { value: "burlington-nj", label: "Burlington, NJ" },
  { value: "camden-nj", label: "Camden, NJ" },
  { value: "atlantic-nj", label: "Atlantic, NJ" },
  { value: "new-york-ny", label: "New York, NY" },
  { value: "kings-ny", label: "Kings (Brooklyn), NY" },
  { value: "queens-ny", label: "Queens, NY" },
  { value: "nassau-ny", label: "Nassau, NY" },
  { value: "suffolk-ny", label: "Suffolk, NY" },
  { value: "westchester-ny", label: "Westchester, NY" },
  { value: "new-castle-de", label: "New Castle, DE" },
  { value: "other", label: "Other / Not Listed" },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - in production this would send to API/HubSpot
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section className="section bg-[var(--gray-50)]" id="contact">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div>
            <p className="text-[var(--orange-500)] font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4">
              Get In Touch
            </p>
            <h2 className="font-[family-name:var(--font-outfit)] font-bold text-3xl sm:text-4xl text-[var(--navy-800)] mb-6">
              Ready to Build Your Profit Program?
            </h2>
            <p className="text-[var(--gray-600)] text-lg mb-8 leading-relaxed">
              Whether you&apos;re looking for new equipment, need service on existing
              machines, or want to explore profit-building opportunities, we&apos;re
              here to help.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--blue-500)] flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-[var(--navy-800)]">
                    Call Us
                  </h3>
                  <a
                    href="tel:610-268-0500"
                    className="text-[var(--blue-500)] hover:text-[var(--blue-700)] transition-colors"
                  >
                    610-268-0500
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--blue-500)] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-[var(--navy-800)]">
                    Email Us
                  </h3>
                  <a
                    href="mailto:info@taylorproducts.net"
                    className="text-[var(--blue-500)] hover:text-[var(--blue-700)] transition-colors"
                  >
                    info@taylorproducts.net
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--blue-500)] flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-[var(--navy-800)]">
                    Business Hours
                  </h3>
                  <p className="text-[var(--gray-600)]">
                    Monday - Friday: 8:00 AM - 5:00 PM EST
                  </p>
                  <p className="text-[var(--gray-500)] text-sm">
                    24/7 Emergency Service Available
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--blue-500)] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-[var(--navy-800)]">
                    Showrooms
                  </h3>
                  <p className="text-[var(--gray-600)] text-sm">
                    2851 Limestone Rd, Cochranville, PA 19330
                  </p>
                  <p className="text-[var(--gray-600)] text-sm">
                    102 Gaither Dr, Suite 3, Mt Laurel, NJ 08054
                  </p>
                </div>
              </div>
            </div>

            {/* Meet Your Salesperson CTA */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-[var(--gray-200)]">
              <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-[var(--navy-800)] mb-2">
                Prefer to schedule a meeting?
              </h3>
              <p className="text-[var(--gray-600)] text-sm mb-4">
                Book a time directly with your territory salesperson.
              </p>
              <Link href="/meet-your-salesperson">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Meet Your Salesperson
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)]">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--success)] text-white mb-6">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-xl text-[var(--navy-800)] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[var(--gray-600)]">
                    Thank you for reaching out. A member of our team will be in
                    touch within 1 business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Your Name"
                    name="name"
                    placeholder="John Smith"
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="john@business.com"
                      required
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <Select
                    label="Business County"
                    name="county"
                    options={counties}
                    required
                    hint="Helps us connect you with the right salesperson"
                  />

                  <Textarea
                    label="Message"
                    name="message"
                    placeholder="Tell us about your equipment needs..."
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  <p className="text-xs text-[var(--gray-500)] text-center">
                    By submitting this form, you agree to be contacted by our
                    sales team.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
