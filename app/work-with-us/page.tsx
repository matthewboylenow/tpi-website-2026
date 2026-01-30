"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin } from "lucide-react";

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
              <h1
                className="font-[family-name:var(--font-outfit)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ color: "white" }}
              >
                Work at Taylor Products
              </h1>
              <div className="w-20 h-1 bg-[var(--orange-500)] rounded-full" />
            </div>
          </div>
        </section>

        {/* Current Positions Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2
                className="font-[family-name:var(--font-outfit)] font-bold text-3xl mb-6"
                style={{ color: "var(--navy-800)" }}
              >
                Current Positions Open
              </h2>
              <div className="bg-[var(--gray-50)] rounded-xl p-8 mb-12">
                <p className="text-[var(--gray-600)] text-lg">
                  No current openings. Please feel free to send us your resume
                  and information for consideration for future openings.
                </p>
              </div>

              <h2
                className="font-[family-name:var(--font-outfit)] font-bold text-3xl mb-6"
                style={{ color: "var(--navy-800)" }}
              >
                Our Service Area
              </h2>
              <ul className="space-y-3 mb-8">
                {territories.map((territory) => (
                  <li key={territory} className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[var(--blue-500)]" />
                    <span className="text-[var(--gray-700)]">{territory}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="section bg-[var(--gray-50)]">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2
                  className="font-[family-name:var(--font-outfit)] font-bold text-3xl mb-4"
                  style={{ color: "var(--navy-800)" }}
                >
                  Come Work With Us
                </h2>
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
