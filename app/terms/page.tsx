import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Taylor Products",
  description:
    "Terms and conditions for using the Taylor Products website and services.",
};

export default function TermsOfServicePage() {
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
                Terms of Service
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
                Welcome to Taylor Products Inc. By accessing or using our
                website and services, you agree to be bound by these Terms of
                Service. Please read them carefully.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Use of Our Website
              </h2>
              <p className="text-[var(--gray-600)]">
                You may use our website for lawful purposes only. You agree not
                to:
              </p>
              <ul className="text-[var(--gray-600)] space-y-2 list-disc pl-6">
                <li>
                  Use the site in any way that violates applicable laws or
                  regulations
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the website
                  or its systems
                </li>
                <li>
                  Interfere with or disrupt the website or servers connected to
                  it
                </li>
                <li>
                  Collect or harvest any information from the site without our
                  consent
                </li>
                <li>
                  Use the site to transmit any malicious code or harmful content
                </li>
              </ul>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Products and Services
              </h2>
              <p className="text-[var(--gray-600)]">
                Taylor Products Inc. is an authorized distributor of Taylor
                Company equipment. We sell and service foodservice equipment
                including soft serve machines, frozen beverage machines, grills,
                and related products.
              </p>
              <p className="text-[var(--gray-600)] mt-4">
                Product descriptions, specifications, and pricing on our website
                are subject to change without notice. While we strive to provide
                accurate information, we do not warrant that product
                descriptions or other content is accurate, complete, or
                error-free.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Orders and Purchases
              </h2>
              <p className="text-[var(--gray-600)]">
                By placing an order through our website or with our sales team,
                you represent that:
              </p>
              <ul className="text-[var(--gray-600)] space-y-2 list-disc pl-6">
                <li>
                  You are legally capable of entering into binding contracts
                </li>
                <li>All information you provide is accurate and complete</li>
                <li>
                  You are authorized to use the payment method provided
                </li>
              </ul>
              <p className="text-[var(--gray-600)] mt-4">
                We reserve the right to refuse or cancel any order for any
                reason, including pricing errors, product availability, or
                suspected fraud.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Service Territory
              </h2>
              <p className="text-[var(--gray-600)]">
                Taylor Products Inc. provides sales and service in our
                authorized territory, which includes New Jersey, Pennsylvania,
                New York City, Long Island, and Delaware. Customers outside this
                territory should contact Taylor Company directly to find their
                local authorized distributor.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Warranties
              </h2>
              <p className="text-[var(--gray-600)]">
                Equipment warranties are provided by Taylor Company and are
                subject to their terms and conditions. Warranty coverage may
                vary by product. Please contact us or refer to your equipment
                documentation for specific warranty information.
              </p>
              <p className="text-[var(--gray-600)] mt-4">
                Parts purchased through our parts store may have different
                warranty terms. Using non-genuine parts may void equipment
                warranties.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Limitation of Liability
              </h2>
              <p className="text-[var(--gray-600)]">
                To the fullest extent permitted by law, Taylor Products Inc.
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from your use of our
                website or services, including but not limited to loss of
                profits, business interruption, or loss of data.
              </p>
              <p className="text-[var(--gray-600)] mt-4">
                Our total liability for any claim arising from these Terms or
                your use of our services shall not exceed the amount you paid us
                in the twelve months preceding the claim.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Intellectual Property
              </h2>
              <p className="text-[var(--gray-600)]">
                All content on this website, including text, graphics, logos,
                images, and software, is the property of Taylor Products Inc. or
                its content suppliers and is protected by intellectual property
                laws. You may not reproduce, distribute, or create derivative
                works from this content without our written permission.
              </p>
              <p className="text-[var(--gray-600)] mt-4">
                Taylor® is a registered trademark of Taylor Company. All Taylor
                product names and logos are trademarks or registered trademarks
                of Taylor Company.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Third-Party Links
              </h2>
              <p className="text-[var(--gray-600)]">
                Our website may contain links to third-party websites. These
                links are provided for your convenience only. We do not control
                or endorse these websites and are not responsible for their
                content or privacy practices.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Indemnification
              </h2>
              <p className="text-[var(--gray-600)]">
                You agree to indemnify and hold harmless Taylor Products Inc.,
                its officers, directors, employees, and agents from any claims,
                damages, losses, or expenses arising from your violation of
                these Terms or your use of our website and services.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Changes to These Terms
              </h2>
              <p className="text-[var(--gray-600)]">
                We may update these Terms of Service from time to time. We will
                notify you of any changes by posting the new Terms on this page
                and updating the &quot;Last updated&quot; date. Your continued
                use of our website after any changes constitutes acceptance of
                the new Terms.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Governing Law
              </h2>
              <p className="text-[var(--gray-600)]">
                These Terms shall be governed by and construed in accordance
                with the laws of the Commonwealth of Pennsylvania, without
                regard to its conflict of law provisions. Any disputes arising
                from these Terms shall be resolved in the courts of Chester
                County, Pennsylvania.
              </p>

              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mt-10 mb-4">
                Contact Us
              </h2>
              <p className="text-[var(--gray-600)]">
                If you have questions about these Terms of Service, please
                contact us:
              </p>
              <div className="bg-[var(--gray-50)] rounded-lg p-6 mt-4">
                <p className="text-[var(--gray-700)] font-semibold">
                  Taylor Products Inc.
                </p>
                <p className="text-[var(--gray-600)]">
                  2851 Limestone Rd
                  <br />
                  Cochranville, PA 19330
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
