import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Taylor Products",
  description:
    "Learn how Taylor Products collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)] py-16">
          <div className="container">
            <div className="max-w-3xl">
              <h1
                className="font-[family-name:var(--font-outfit)] font-extrabold text-3xl sm:text-4xl leading-tight mb-4"
                style={{ color: "white" }}
              >
                Privacy Policy
              </h1>
              <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                Last updated: January 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-[var(--gray-600)] text-lg leading-relaxed">
                Taylor Products Inc. (&quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) respects your privacy and is committed to
                protecting your personal information. This Privacy Policy
                explains how we collect, use, and safeguard your information
                when you visit our website or do business with us.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Information We Collect
              </h2>
              <p className="text-[var(--gray-600)]">
                We may collect information you provide directly to us,
                including:
              </p>
              <ul className="text-[var(--gray-600)] space-y-2 list-disc pl-6">
                <li>
                  Name, email address, phone number, and business information
                  when you contact us or request a quote
                </li>
                <li>
                  Billing and shipping addresses when you purchase parts or
                  equipment
                </li>
                <li>
                  Information you provide when scheduling service appointments
                </li>
                <li>
                  Communications you send to us, including emails and phone
                  calls
                </li>
              </ul>

              <p className="text-[var(--gray-600)] mt-4">
                We also automatically collect certain information when you visit
                our website:
              </p>
              <ul className="text-[var(--gray-600)] space-y-2 list-disc pl-6">
                <li>IP address and browser type</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website addresses</li>
                <li>Device information</li>
              </ul>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-[var(--gray-600)]">
                We use the information we collect to:
              </p>
              <ul className="text-[var(--gray-600)] space-y-2 list-disc pl-6">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Process orders and deliver products</li>
                <li>Schedule and perform equipment service</li>
                <li>Send you information about products and services you may be interested in</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Information Sharing
              </h2>
              <p className="text-[var(--gray-600)]">
                We do not sell your personal information. We may share your
                information with:
              </p>
              <ul className="text-[var(--gray-600)] space-y-2 list-disc pl-6">
                <li>
                  Service providers who assist us in operating our business
                  (payment processors, shipping companies, etc.)
                </li>
                <li>
                  Taylor Company and other authorized distributors when
                  necessary to fulfill your requests
                </li>
                <li>
                  Law enforcement or government agencies when required by law
                </li>
              </ul>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Cookies and Tracking
              </h2>
              <p className="text-[var(--gray-600)]">
                Our website uses cookies and similar technologies to enhance
                your experience. Cookies are small files stored on your device
                that help us remember your preferences and understand how you
                use our site. You can control cookies through your browser
                settings, though some features of our site may not function
                properly if you disable them.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Data Security
              </h2>
              <p className="text-[var(--gray-600)]">
                We implement reasonable security measures to protect your
                personal information from unauthorized access, alteration, or
                destruction. However, no method of transmission over the
                Internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Your Rights
              </h2>
              <p className="text-[var(--gray-600)]">
                You may request access to, correction of, or deletion of your
                personal information by contacting us. If you no longer wish to
                receive marketing communications from us, you can opt out by
                following the unsubscribe instructions in our emails or by
                contacting us directly.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Children&apos;s Privacy
              </h2>
              <p className="text-[var(--gray-600)]">
                Our website is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Changes to This Policy
              </h2>
              <p className="text-[var(--gray-600)]">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the &quot;Last updated&quot; date.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Contact Us
              </h2>
              <p className="text-[var(--gray-600)]">
                If you have questions about this Privacy Policy or our privacy
                practices, please contact us:
              </p>
              <div className="bg-[var(--gray-50)] rounded-lg p-6 mt-4">
                <p className="text-[var(--gray-700)] font-semibold">
                  Taylor Products Inc.
                </p>
                <p className="text-[var(--gray-600)]">
                  264 Welsh Pool Rd
                  <br />
                  Exton, PA 19341
                </p>
                <p className="text-[var(--gray-600)] mt-2">
                  Phone:{" "}
                  <a
                    href="tel:610-268-0500"
                    className="text-[var(--blue-500)] hover:underline"
                  >
                    610-268-0500
                  </a>
                </p>
                <p className="text-[var(--gray-600)]">
                  Email:{" "}
                  <a
                    href="mailto:info@taylorproducts.net"
                    className="text-[var(--blue-500)] hover:underline"
                  >
                    info@taylorproducts.net
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
