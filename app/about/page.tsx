import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LocalBusinessSchema, WebPageSchema } from "@/components/Schema";
import Link from "next/link";
import {
  Award,
  Wrench,
  TrendingUp,
  MapPin,
  Phone,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Taylor Products",
  description:
    "Taylor Products has partnered with foodservice operators across NJ, PA, NY, and DE since 1985. Part of the Middleby family — carrying Taylor, Icetro, Emery Thompson, Flavor Burst, TurboChef, Blodgett, Pitco and more.",
};

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <WebPageSchema
        title="About Taylor Products"
        description="Taylor Products has partnered with foodservice operators across NJ, PA, NY, and DE since 1985. Part of the Middleby family."
        url="https://taylorproducts.net/about"
      />
      <LocalBusinessSchema location="exton" />
      <LocalBusinessSchema location="edison" />

      <Header />
      <main id="main-content" className="pt-[120px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)] py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-[var(--orange-400)] font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4">
                Our Story
              </p>
              <h1
                className="font-[family-name:var(--font-heading)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ color: 'white' }}
              >
                About Taylor Products
              </h1>
              <div className="w-20 h-1 bg-[var(--orange-500)] rounded-full mb-6" />
              <p className="text-lg text-gray-300 leading-relaxed">
                We do more than distribute equipment — we help businesses grow and
                stay running. For decades, we&apos;ve partnered with operators across
                our territory to deliver industry-leading foodservice solutions,
                specializing in soft serve, frozen beverages, and high-performance
                cooking equipment. As part of the Middleby family, we&apos;ve
                expanded our capabilities while staying hands-on and easy to work with.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl text-[var(--navy-800)] mb-8">
                What We&apos;ve Always Supported
              </h2>
              <div className="prose prose-lg max-w-none text-[var(--gray-700)] space-y-6">
                <p>
                  We provide sales and service for <strong>Taylor</strong>,{" "}
                  <strong>Icetro</strong>, <strong>Emery Thompson</strong>, and{" "}
                  <strong>Flavor Burst</strong> — brands trusted by operators who
                  demand performance, consistency, and reliability.
                </p>
                <p>
                  As part of the Middleby family, we now proudly support a broader
                  range of industry-leading kitchen equipment, including{" "}
                  <strong>TurboChef</strong>, <strong>Blodgett</strong>,{" "}
                  <strong>Follett</strong>, <strong>Star</strong>,{" "}
                  <strong>Joe Tap</strong>, <strong>Pitco</strong>, and{" "}
                  <strong>Middleby Marshall</strong> — strengthening our ability to
                  support full kitchen operations.
                </p>
                <p>
                  Beyond equipment, we offer complete support — from consultation
                  and installation to training and ongoing service — out of our
                  two locations in Exton, PA and Edison, NJ, covering operators
                  across New Jersey, Pennsylvania, New York, and Delaware.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section bg-[var(--gray-50)]">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl text-[var(--navy-800)] mb-4">
                How We Work
              </h2>
              <p className="text-[var(--gray-600)] text-lg">
                Support the customer and support the machine. That&apos;s the whole job.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--blue-500)] text-white mb-6">
                  <Wrench className="w-8 h-8" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-3">
                  Fast, Reliable Service
                </h3>
                <p className="text-[var(--gray-600)]">
                  Factory-trained technicians, fully stocked service vans, and a deep
                  knowledge base. Parts and repairs that keep downtime short and your
                  operation running at full capacity.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--blue-500)] text-white mb-6">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-3">
                  Family Values, Forward Thinking
                </h3>
                <p className="text-[var(--gray-600)]">
                  We still operate with the mindset of a family business — responsive,
                  accountable, and invested in your success — while embracing digital
                  tools and a growing knowledge base to serve today&apos;s operators.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--blue-500)] text-white mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-3">
                  End-to-End Support
                </h3>
                <p className="text-[var(--gray-600)]">
                  Consultation, installation, training, ongoing service. One partner
                  across sales, parts, and repair — so you&apos;re not stitching
                  together help from three different places.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Showrooms */}
        <section className="section">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl text-[var(--navy-800)] mb-4">
                Showrooms
              </h2>
              <p className="text-[var(--gray-600)]">
                Come see the equipment in person. We have two locations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* PA Showroom */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-[var(--gray-200)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--orange-500)] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)]">
                      Pennsylvania Showroom
                    </h3>
                    <p className="text-sm text-[var(--gray-500)]">
                      Headquarters
                    </p>
                  </div>
                </div>
                <address className="not-italic text-[var(--gray-600)] mb-4">
                  264 Welsh Pool Rd
                  <br />
                  Exton, PA 19341
                </address>
                <div className="flex items-center gap-2 text-[var(--gray-600)] mb-6">
                  <Phone className="w-4 h-4" />
                  <a
                    href="tel:610-268-0500"
                    className="hover:text-[var(--blue-500)]"
                  >
                    610-268-0500
                  </a>
                </div>
                <a
                  href="https://maps.google.com/?q=264+Welsh+Pool+Rd+Exton+PA+19341"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--blue-500)] hover:text-[var(--blue-700)]"
                >
                  Get Directions
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              {/* NJ Showroom */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-[var(--gray-200)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--orange-500)] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)]">
                      New Jersey Showroom
                    </h3>
                    <p className="text-sm text-[var(--gray-500)]">
                      Central Jersey
                    </p>
                  </div>
                </div>
                <address className="not-italic text-[var(--gray-600)] mb-4">
                  255 Raritan Center Pkwy
                  <br />
                  Edison, NJ 08837
                </address>
                <div className="flex items-center gap-2 text-[var(--gray-600)] mb-6">
                  <Phone className="w-4 h-4" />
                  <a
                    href="tel:610-268-0500"
                    className="hover:text-[var(--blue-500)]"
                  >
                    610-268-0500
                  </a>
                </div>
                <a
                  href="https://maps.google.com/?q=255+Raritan+Center+Pkwy+Edison+NJ+08837"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--blue-500)] hover:text-[var(--blue-700)]"
                >
                  Get Directions
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-gradient-to-r from-[var(--blue-600)] to-[var(--navy-700)]">
          <div className="container text-center">
            <h2
              className="font-[family-name:var(--font-heading)] font-bold text-2xl md:text-3xl mb-4"
              style={{ color: 'white' }}
            >
              Let&apos;s Build Something Together
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              We&apos;re proud to support the businesses that serve our communities
              every day. Partner with a team that&apos;s responsive, reliable, and
              easy to do business with.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/meet-your-salesperson">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-[var(--blue-600)] hover:bg-gray-100"
                >
                  <Calendar className="w-5 h-5" />
                  Meet Your Salesperson
                </Button>
              </Link>
              <a href="tel:610-268-0500">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white hover:bg-white/10"
                >
                  <Phone className="w-5 h-5" />
                  Call 610-268-0500
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
