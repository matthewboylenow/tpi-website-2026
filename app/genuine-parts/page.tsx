import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { HubSpotForm } from "@/components/HubSpotForm";
import {
  Package,
  Shield,
  Truck,
  CheckCircle,
  Clock,
  Wrench,
  ExternalLink,
  Phone,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Genuine Taylor Parts | Taylor Products",
  description: "Order authentic OEM Taylor parts online 24/7. Same-day shipping on in-stock parts. Keep your equipment running with genuine components.",
};

const partsFeatures = [
  {
    icon: Shield,
    title: "Authentic OEM Parts",
    description:
      "Every part is made specifically for Taylor equipment. No generic substitutes.",
  },
  {
    icon: Truck,
    title: "Order Today, Get Tomorrow",
    description:
      "Most in-stock parts ship same day. You can't wait around when equipment is down.",
  },
  {
    icon: Clock,
    title: "24/7 Online Ordering",
    description:
      "The parts store is always open. Order anytime.",
  },
  {
    icon: Wrench,
    title: "Expert Support",
    description:
      "Not sure which part you need? Our parts team can look it up for you.",
  },
];

const whyGenuine = [
  {
    title: "Built to Spec",
    description:
      "Genuine parts meet exact factory specifications. They fit, they work, and they last.",
  },
  {
    title: "Protect Your Warranty",
    description:
      "Authentic parts keep your warranty intact. Generic parts can void it.",
  },
  {
    title: "Longer Equipment Life",
    description:
      "Quality parts mean less wear on your machine and a longer lifespan.",
  },
  {
    title: "Peace of Mind",
    description:
      "Your equipment runs the way it was designed to. No guesswork.",
  },
];

export default function GenuinePartsPage() {
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
                Genuine Taylor Parts
              </p>
              <h1
                className="font-[family-name:var(--font-heading)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ color: "white" }}
              >
                Genuine Taylor Parts
              </h1>
              <div className="w-20 h-1 bg-[var(--orange-500)] rounded-full mb-6" />
              <p
                className="text-lg leading-relaxed max-w-2xl"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                OEM parts, fast shipping, and a parts team that can help you find
                what you need. Shop online or call us.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="https://parts.taylorproducts.net"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg">
                    <Package className="w-5 h-5" />
                    Shop Parts Online
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </a>
                <a href="tel:610-268-0500">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white border-white hover:bg-white/10"
                  >
                    <Phone className="w-5 h-5" />
                    Call Parts Dept
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {partsFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="text-center p-6 bg-[var(--gray-50)] rounded-xl"
                >
                  <div className="w-14 h-14 rounded-lg bg-[var(--blue-500)] flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--gray-600)] text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Genuine Parts Section */}
        <section className="section bg-[var(--gray-50)]">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[var(--orange-500)] font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4">
                  Why It Matters
                </p>
                <h2
                  className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl mb-6"
                  style={{ color: "var(--navy-800)" }}
                >
                  Why Use Genuine Taylor Parts?
                </h2>
                <p className="text-[var(--gray-600)] text-lg mb-8">
                  Generic parts might cost less up front, but they usually cost
                  more over time. Here&apos;s why we only sell genuine.
                </p>
                <div className="space-y-6">
                  {whyGenuine.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <CheckCircle className="w-6 h-6 text-[var(--success)] flex-shrink-0" />
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[var(--navy-800)] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[var(--gray-600)] text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parts Store CTA Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[var(--gray-200)]">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--orange-500)] flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)] mb-4">
                    Shop Our Parts Store
                  </h3>
                  <p className="text-[var(--gray-600)] mb-6">
                    Browse thousands of genuine Taylor parts. Fast shipping,
                    secure checkout, and the exact components your equipment
                    needs.
                  </p>
                  <a
                    href="https://parts.taylorproducts.net"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" size="lg" className="w-full">
                      Visit Parts Store
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <p className="text-sm text-[var(--gray-500)] mt-4">
                    Open 24/7 for online orders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certified Technicians Section */}
        <section className="section">
          <div className="container">
            <div className="bg-gradient-to-r from-[var(--blue-600)] to-[var(--navy-700)] rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2
                    className="font-[family-name:var(--font-heading)] font-bold text-2xl md:text-3xl mb-4"
                    style={{ color: "white" }}
                  >
                    Need Installation Help?
                  </h2>
                  <p className="text-blue-100 mb-6">
                    Our factory-certified technicians can install parts for you.
                    Right tools, right training, done right.
                  </p>
                  <ul className="space-y-2 text-white mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--orange-400)]" />
                      Taylor-certified technicians
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--orange-400)]" />
                      Factory-direct technical support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--orange-400)]" />
                      Specialized tools and equipment
                    </li>
                  </ul>
                  <Link href="/red-cape-service">
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-white text-[var(--blue-600)] hover:bg-gray-100"
                    >
                      Learn About Our Service
                    </Button>
                  </Link>
                </div>
                <div className="text-center">
                  <div className="inline-block p-8 bg-white/10 rounded-2xl">
                    <Wrench className="w-24 h-24 text-white/80 mx-auto mb-4" />
                    <p className="text-white font-semibold">
                      Professional installation available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact for Parts Help */}
        <section className="section bg-[var(--gray-50)]">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                className="font-[family-name:var(--font-heading)] font-bold text-3xl mb-4"
                style={{ color: "var(--navy-800)" }}
              >
                Not Sure Which Part You Need?
              </h2>
              <p className="text-[var(--gray-600)] text-lg mb-8">
                Give our parts team a call. Have your model number handy and
                we&apos;ll take it from there.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:610-268-0500">
                  <Button variant="primary" size="lg">
                    <Phone className="w-5 h-5" />
                    Call 610-268-0500
                  </Button>
                </a>
                <a href="mailto:parts@taylorproducts.net">
                  <Button variant="secondary" size="lg">
                    Email Parts Department
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Parts Inquiry Form */}
        <section className="section bg-[var(--gray-50)]" id="contact">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2
                className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl mb-4 text-center"
                style={{ color: "var(--navy-800)" }}
              >
                Parts Inquiry
              </h2>
              <p className="text-[var(--gray-600)] text-lg mb-8 text-center">
                Need help finding the right part? Fill out the form below and our parts team will get back to you.
              </p>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--gray-200)]">
                <HubSpotForm formId="533e965b-9811-4825-b197-f4f2b15d867b" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
