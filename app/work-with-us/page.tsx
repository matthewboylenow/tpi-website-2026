"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Users,
  MapPin,
  Heart,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Family-Owned Culture",
    description:
      "We're not a faceless corporation. You'll know everyone by name, and your work will matter.",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description:
      "Many of our team members have been with us for decades. We promote from within and invest in our people.",
  },
  {
    icon: Shield,
    title: "Stable Industry",
    description:
      "People always want ice cream. Our customers need reliable equipment and service—that means job security.",
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    description:
      "We work hard, but we respect your time. Family comes first—we mean it.",
  },
];

const territories = [
  "Central & Eastern Pennsylvania",
  "New Jersey",
  "New York City",
  "Long Island",
  "Northern Delaware",
];

// HubSpot form configuration
const HUBSPOT_PORTAL_ID = "2780498";
const HUBSPOT_FORM_ID = "52142cec-0cd6-48ca-abef-bf47cbee9671";

export default function WorkWithUsPage() {
  useEffect(() => {
    // Load HubSpot form script
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/v2.js";
    script.async = true;
    script.onload = () => {
      // @ts-expect-error HubSpot global
      if (window.hbspt) {
        // @ts-expect-error HubSpot global
        window.hbspt.forms.create({
          portalId: HUBSPOT_PORTAL_ID,
          formId: HUBSPOT_FORM_ID,
          target: "#hubspot-form",
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector(
        'script[src="https://js.hsforms.net/forms/embed/v2.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

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
              <p className="text-[var(--orange-400)] font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4">
                Join Our Team
              </p>
              <h1
                className="font-[family-name:var(--font-outfit)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ color: "white" }}
              >
                Work at Taylor Products
              </h1>
              <div className="w-20 h-1 bg-[var(--orange-500)] rounded-full mb-6" />
              <p
                className="text-lg leading-relaxed max-w-2xl"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                We&apos;re always looking for good people. If you&apos;re
                hardworking, honest, and want to be part of a team that actually
                cares—we&apos;d love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Why Work Here Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2
                className="font-[family-name:var(--font-outfit)] font-bold text-3xl sm:text-4xl mb-4"
                style={{ color: "var(--navy-800)" }}
              >
                Why Taylor Products?
              </h2>
              <p className="text-[var(--gray-600)] text-lg">
                We&apos;ve been family-owned since 1985. That means something to
                us—and it&apos;ll mean something to you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex gap-4 p-6 bg-[var(--gray-50)] rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[var(--blue-500)] flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-[var(--gray-600)]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Territory Section */}
        <section className="section bg-[var(--gray-50)]">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[var(--orange-500)] font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4">
                  Our Territory
                </p>
                <h2
                  className="font-[family-name:var(--font-outfit)] font-bold text-3xl sm:text-4xl mb-6"
                  style={{ color: "var(--navy-800)" }}
                >
                  Where We Work
                </h2>
                <p className="text-[var(--gray-600)] text-lg mb-6">
                  Our team serves customers throughout the Northeast. Whether
                  you&apos;re in sales, service, or operations—you&apos;ll be
                  part of a territory that keeps us busy and growing.
                </p>
                <ul className="space-y-3">
                  {territories.map((territory) => (
                    <li key={territory} className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[var(--blue-500)]" />
                      <span className="text-[var(--gray-700)]">{territory}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[var(--gray-200)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[var(--blue-500)] flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-xl text-[var(--navy-800)]">
                      Current Openings
                    </h3>
                    <p className="text-[var(--gray-500)]">
                      See what&apos;s available
                    </p>
                  </div>
                </div>
                <p className="text-[var(--gray-600)] mb-4">
                  No current openings at this time. But don&apos;t let that stop
                  you—we&apos;re always interested in meeting talented people.
                  Send us your information and we&apos;ll keep you in mind for
                  future opportunities.
                </p>
                <p className="text-sm text-[var(--gray-500)]">
                  We typically hire for sales, service technician, and
                  administrative positions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2
                  className="font-[family-name:var(--font-outfit)] font-bold text-3xl mb-4"
                  style={{ color: "var(--navy-800)" }}
                >
                  Get In Touch
                </h2>
                <p className="text-[var(--gray-600)]">
                  Interested in joining the team? Fill out the form below and
                  tell us a bit about yourself. We review every submission.
                </p>
              </div>

              {/* HubSpot Form Container */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)]">
                <div id="hubspot-form" className="min-h-[400px]">
                  {/* HubSpot form will be injected here */}
                  <div className="flex items-center justify-center h-[400px] text-[var(--gray-400)]">
                    Loading form...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equal Opportunity Section */}
        <section className="py-12 bg-[var(--gray-50)] border-t border-[var(--gray-200)]">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm text-[var(--gray-500)]">
                Taylor Products is an equal opportunity employer. We consider
                all applicants based on merit and competence without regard to
                race, color, religion, marital status, age, national origin,
                ancestry, disability, medical condition, pregnancy, genetic
                information, gender identity, veteran status, or any other
                legally protected status.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
