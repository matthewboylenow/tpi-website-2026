"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/home/ContactSection";
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

const serviceFeatures = [
  {
    icon: Clock,
    title: "24/7 Emergency Service",
    description:
      "When your freezer goes down on a Saturday night, we answer. Our dispatch team is available around the clock for emergencies.",
  },
  {
    icon: Wrench,
    title: "Factory-Trained Technicians",
    description:
      "Our techs aren't just certified—they're factory-trained by Taylor. They know these machines inside and out.",
  },
  {
    icon: Zap,
    title: "Fast Response Times",
    description:
      "We know every hour of downtime costs you money. That's why we prioritize getting you back up and running fast.",
  },
  {
    icon: Shield,
    title: "Genuine Parts Only",
    description:
      "We only use authentic Taylor parts. No knockoffs, no shortcuts. Your equipment deserves the real thing.",
  },
];

const commitments = [
  "Same-day service for critical equipment failures",
  "Preventive maintenance programs to avoid surprises",
  "Direct access to factory technical support",
  "Ongoing training and business-building advice",
  "Service that follows you if you relocate",
  "Real people who answer the phone",
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
                Taylor Red Cape Service: A Winning Combination
              </h1>
              <div className="w-20 h-1 bg-[var(--orange-500)] rounded-full mb-6" />
              <p
                className="text-lg leading-relaxed max-w-2xl"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                When you partner with Taylor Products, you can rest assured knowing
                that you will receive the finest equipment, plus best-in-class
                customer service, staff training, and support.
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
                What Red Cape Service Actually Means
              </h2>
              <p className="text-[var(--gray-600)] text-lg">
                It&apos;s not just a slogan. It&apos;s how we&apos;ve done
                business for 40 years.
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
                  Our Red Cape® Commitment ensures that you will be provided with
                  superior equipment and heroic support that will send your profits
                  soaring. No matter where your company relocates, the greater Taylor
                  network of more than 6,500 factory-trained service personnel will
                  make sure you receive first-rate service.
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
                      We&apos;re here to help
                    </p>
                  </div>
                </div>
                <p className="text-[var(--gray-600)] mb-6">
                  Whether it&apos;s an emergency repair or routine maintenance,
                  our team is ready. Call us directly or fill out the form below
                  and we&apos;ll get back to you fast.
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
                    We proudly serve businesses throughout our territory with
                    fast, reliable service.
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

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
