"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HubSpotForm } from "@/components/HubSpotForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function ContactSection() {
  return (
    <section className="section bg-[var(--gray-50)]" id="contact">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div>
            <p className="text-[var(--orange-500)] font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4">
              Get In Touch
            </p>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-[var(--navy-800)] mb-6">
              Get In Touch
            </h2>
            <p className="text-[var(--gray-600)] text-lg mb-8 leading-relaxed">
              Whether you&apos;re buying your first machine or adding to your lineup,
              give us a call or send us a note. We&apos;re happy to talk through what you need.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--blue-500)] flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[var(--navy-800)]">
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
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[var(--navy-800)]">
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
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[var(--navy-800)]">
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
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[var(--navy-800)]">
                    Showrooms
                  </h3>
                  <p className="text-[var(--gray-600)] text-sm">
                    264 Welsh Pool Rd, Exton, PA 19341
                  </p>
                  <p className="text-[var(--gray-600)] text-sm">
                    255 Raritan Center Pkwy, Edison, NJ 08837
                  </p>
                </div>
              </div>
            </div>

            {/* Meet Your Salesperson CTA */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-[var(--gray-200)]">
              <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[var(--navy-800)] mb-2">
                Want to set up a time to talk?
              </h3>
              <p className="text-[var(--gray-600)] text-sm mb-4">
                Schedule a call with your territory salesperson.
              </p>
              <Link href="/meet-your-salesperson">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Meet Your Salesperson
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - HubSpot Contact Form */}
          <div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)]">
              <HubSpotForm formId="52142cec-0cd6-48ca-abef-bf47cbee9671" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
