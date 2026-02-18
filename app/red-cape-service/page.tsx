import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { HubSpotForm } from "@/components/HubSpotForm";
import {
  Phone,
  Clock,
  Wrench,
  Shield,
  Zap,
  CheckCircle,
  HeadphonesIcon,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Red Cape Service | Taylor Products",
  description: "24/7 emergency service, factory-trained technicians, and genuine Taylor parts. Taylor Products Red Cape Service keeps your equipment running.",
};

const serviceFeatures = [
  {
    icon: Clock,
    title: "24/7 Emergency Service",
    description:
      "Freezer goes down on a Saturday? We pick up. Our dispatch team is available around the clock.",
  },
  {
    icon: Wrench,
    title: "Factory-Trained Technicians",
    description:
      "Our technicians are factory-trained by Taylor. They know these machines inside and out.",
  },
  {
    icon: Zap,
    title: "Fast Response Times",
    description:
      "Every hour your machine is down costs you money. We get there fast.",
  },
  {
    icon: Shield,
    title: "Genuine Parts Only",
    description:
      "We only use genuine Taylor parts. No knockoffs, no shortcuts.",
  },
];

const commitments = [
  "Same-day service for critical breakdowns",
  "Preventive maintenance programs",
  "Direct factory technical support",
  "Staff training and menu planning",
  "Coverage if you relocate",
  "Real people on the phone",
];

const stats = [
  { number: "6,500+", label: "Factory-trained techs in the Taylor network" },
  { number: "40+", label: "Years serving the region" },
  { number: "24/7", label: "Emergency service available" },
];

export default function RedCapeServicePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)]">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="container relative z-10 py-16 md:py-24">
            <div className="max-w-3xl">
              <p className="text-[var(--orange-400)] font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4">
                Our Service Promise
              </p>
              <h1
                className="font-[family-name:var(--font-heading)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ color: "white" }}
              >
                Red Cape Service
              </h1>
              <div className="w-20 h-1 bg-[var(--orange-500)] rounded-full mb-6" />
              <p
                className="text-lg leading-relaxed max-w-2xl"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                Factory-trained technicians, 24/7 emergency support, and a parts
                department that keeps your equipment running. That&apos;s what Red
                Cape means.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="tel:610-268-0500">
                  <Button variant="primary" size="lg">
                    <Phone className="w-5 h-5" />
                    Call 610-268-0500
                  </Button>
                </a>
                <Link href="#contact">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white border-white hover:bg-white/10"
                  >
                    Request Service
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b border-[var(--gray-200)]">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-[family-name:var(--font-heading)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                    {stat.number}
                  </p>
                  <p className="text-[var(--gray-600)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Red Cape Means Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2
                className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl mb-4"
                style={{ color: "var(--navy-800)" }}
              >
                What You Get
              </h2>
              <p className="text-[var(--gray-600)] text-lg">
                Red Cape isn&apos;t a slogan. It&apos;s how we operate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serviceFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 p-6 bg-[var(--gray-50)] rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[var(--blue-500)] flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--gray-600)]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment List Section */}
        <section className="section bg-[var(--gray-50)]">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[var(--orange-500)] font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4">
                  The Red Cape Commitment
                </p>
                <h2
                  className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl mb-6"
                  style={{ color: "var(--navy-800)" }}
                >
                  The Red Cape Commitment
                </h2>
                <p className="text-[var(--gray-600)] text-lg mb-8">
                  The Red Cape® Commitment means superior equipment backed by real
                  support. If your business relocates, the Taylor network of more
                  than 6,500 factory-trained service technicians means you&apos;ll have
                  coverage wherever you go.
                </p>
                <ul className="space-y-4">
                  {commitments.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--gray-700)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[var(--gray-200)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[var(--orange-500)] flex items-center justify-center">
                    <HeadphonesIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[var(--navy-800)]">
                      Need Service Now?
                    </h3>
                    <p className="text-[var(--gray-500)]">
                      We&apos;re ready
                    </p>
                  </div>
                </div>
                <p className="text-[var(--gray-600)] mb-6">
                  Emergency or routine, we&apos;re ready. Call us or fill out
                  the form and we&apos;ll get back to you.
                </p>
                <a href="tel:610-268-0500">
                  <Button variant="primary" size="lg" className="w-full">
                    <Phone className="w-5 h-5" />
                    Call 610-268-0500
                  </Button>
                </a>
                <p className="text-center text-sm text-[var(--gray-500)] mt-4">
                  24/7 emergency service available
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Area Section */}
        <section className="section">
          <div className="container">
            <div className="bg-gradient-to-r from-[var(--blue-600)] to-[var(--navy-700)] rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2
                    className="font-[family-name:var(--font-heading)] font-bold text-2xl md:text-3xl mb-4"
                    style={{ color: "white" }}
                  >
                    Our Service Area
                  </h2>
                  <p className="text-blue-100 mb-6">
                    We cover the following states with full sales and service.
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-white">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--orange-400)]" />
                      New Jersey
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--orange-400)]" />
                      Pennsylvania
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--orange-400)]" />
                      New York City
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--orange-400)]" />
                      Long Island
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--orange-400)]" />
                      Delaware
                    </li>
                  </ul>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-blue-100 mb-4">
                    Outside our area? No problem.
                  </p>
                  <a
                    href="https://www.taylor-company.com/en/find-distributor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-white text-[var(--blue-600)] hover:bg-gray-100"
                    >
                      Find Your Local Distributor
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Request Form */}
        <section className="section bg-[var(--gray-50)]" id="contact">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2
                className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl mb-4 text-center"
                style={{ color: "var(--navy-800)" }}
              >
                Request Service
              </h2>
              <p className="text-[var(--gray-600)] text-lg mb-8 text-center">
                Need service on your equipment? Fill out the form below and our team will be in touch.
              </p>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)]">
                <HubSpotForm formId="dc04266b-2c9e-479a-bb86-92226be9eefc" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
