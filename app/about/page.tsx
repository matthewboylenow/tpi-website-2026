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
    "Taylor Products is a family-owned foodservice equipment distributor serving NJ, PA, NY, and DE since 1985. Learn about our commitment to service and customer success.",
};

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <WebPageSchema
        title="About Taylor Products"
        description="Taylor Products is a family-owned foodservice equipment distributor serving NJ, PA, NY, and DE since 1985."
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
                We&apos;re an authorized Taylor Company distributor covering New Jersey,
                Pennsylvania, New York, and Delaware. We sell the equipment, service the
                equipment, and help you build a program around it that makes money.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl text-[var(--navy-800)] mb-8">
                What We Do
              </h2>
              <div className="prose prose-lg max-w-none text-[var(--gray-700)] space-y-6">
                <p>
                  We sell Taylor soft serve, frozen beverage, and grilling equipment
                  to operators of all sizes, from single-location ice cream shops to
                  national QSR chains. We also carry FlavorBurst, Icetro, Emery
                  Thompson, Frigomat, and ISA products.
                </p>
                <p>
                  Our factory-trained technicians, sales team, and parts department
                  all work out of our two locations in Exton, PA and Edison, NJ.
                  When your equipment goes down, we have 24/7 emergency support and
                  one of the fastest response times in the region through our Red
                  Cape Service program.
                </p>
                <p>
                  We currently serve thousands of operators across New Jersey,
                  Pennsylvania, New York, and Delaware.
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--blue-500)] text-white mb-6">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-3">
                  We Help You Make Money
                </h3>
                <p className="text-[var(--gray-600)]">
                  We don&apos;t just drop off a machine. We help you plan your menu,
                  train your staff, and figure out pricing that actually works for
                  your operation.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--blue-500)] text-white mb-6">
                  <Wrench className="w-8 h-8" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-3">
                  Red Cape Service
                </h3>
                <p className="text-[var(--gray-600)]">
                  Fully-equipped service vans, factory-trained technicians, and a
                  team that picks up the phone when your equipment is down.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--blue-500)] text-white mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-3">
                  Factory Equipment and Parts Only
                </h3>
                <p className="text-[var(--gray-600)]">
                  We sell Taylor machines and genuine Taylor parts. No off-brand substitutes.
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
              Talk to Us
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Looking for equipment, need service, or want to see what a program
              could look like for your operation? Give us a call.
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
