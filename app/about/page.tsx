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
              <p className="text-[var(--orange-400)] font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4">
                Our Story
              </p>
              <h1
                className="font-[family-name:var(--font-outfit)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ color: 'white' }}
              >
                Why Taylor Products?
              </h1>
              <div className="w-20 h-1 bg-[var(--orange-500)] rounded-full mb-6" />
              <p className="text-lg text-gray-300 leading-relaxed">
                We&apos;re more than an industry-leading distributor of Taylor and FlavorBurst equipment.
                We&apos;re a family-owned company that partners with small businesses to help them succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-3xl text-[var(--navy-800)] mb-8">
                More Than Equipment—A Partnership
              </h2>
              <div className="prose prose-lg max-w-none text-[var(--gray-700)] space-y-6">
              <p>
                  Not only are we trusted by some of the biggest brands in the food
                  industry, but we also are strong supporters of local businesses.
                  Over the years, our mission has grown into a comprehensive
                  partnership that goes far beyond selling equipment.
                </p>
                <p>
                  As an authorized Taylor Company distributor, we provide access
                  to the industry&apos;s leading soft serve, frozen beverage, and
                  grilling equipment. But what truly sets us apart is our
                  commitment to service. Our factory-trained technicians,
                  experienced sales team, and dedicated parts department work
                  together to ensure your equipment performs at its best—day
                  after day, year after year.
                </p>
                <p>
                  We understand that when your equipment goes down, so does your
                  business. That&apos;s why we&apos;ve built one of the most responsive
                  service networks in the region, with emergency support
                  available 24/7. Our Red Cape Service program delivers
                  industry-leading response times because we know every hour of
                  downtime costs you money.
                </p>
                <p>
                  Today, Taylor Products proudly serves thousands of operators
                  across New Jersey, Pennsylvania, New York, and Delaware. From
                  small ice cream shops to national QSR chains, we bring the
                  same dedication to every customer relationship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section bg-[var(--gray-50)]">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-3xl text-[var(--navy-800)] mb-4">
                What We Stand For
              </h2>
              <p className="text-[var(--gray-600)]">
                These principles guide everything we do, from our first
                conversation to ongoing support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--blue-500)] text-white mb-6">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-3">
                  Profit Solutions
                </h3>
                <p className="text-[var(--gray-600)]">
                  We partner with you on a personal basis to help you realize the full
                  potential of your Taylor or FlavorBurst equipment and drive your business goals.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--blue-500)] text-white mb-6">
                  <Wrench className="w-8 h-8" />
                </div>
                <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-3">
                  Red Cape Service
                </h3>
                <p className="text-[var(--gray-600)]">
                  Our Red Cape customer service continually reinforces our commitment to your success.
                  Our service teams&apos; fully-equipped vans keep you assured that your equipment will be
                  serviced quickly and properly.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--blue-500)] text-white mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-3">
                  Industry Leading Quality
                </h3>
                <p className="text-[var(--gray-600)]">
                  We only use the highest quality machines and parts, assuring you that your
                  highest demands will be met.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Showrooms */}
        <section className="section">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-3xl text-[var(--navy-800)] mb-4">
                Visit Our Showrooms
              </h2>
              <p className="text-[var(--gray-600)]">
                See Taylor equipment in action and talk with our team at one of
                our two convenient locations.
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
                    <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)]">
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
                    <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)]">
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
              className="font-[family-name:var(--font-outfit)] font-bold text-2xl md:text-3xl mb-4"
              style={{ color: 'white' }}
            >
              Ready to Start a Conversation?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re looking for new equipment, exploring program
              options, or need service on existing machines, we&apos;re here to help.
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
