import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const productLinks = [
  { name: "Soft Serve & Frozen Yogurt", href: "/soft-serve-frozen-yogurt" },
  { name: "Icetro Soft Serve", href: "/icetro-soft-serve" },
  { name: "Two Sided Grills", href: "/two-sided-grills" },
  { name: "Milkshakes", href: "/milkshakes" },
  { name: "Ice Cream & Gelato Batch", href: "/ice-cream-gelato-batch" },
  { name: "FlavorBurst Programs", href: "/flavorburst-programs" },
  { name: "Frozen Cocktails", href: "/frozen-cocktails" },
  { name: "All Products", href: "#products" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Meet Your Salesperson", href: "/meet-your-salesperson" },
  { name: "Work With Us", href: "/work-with-us" },
  { name: "Blog", href: "/blog" },
  { name: "What's New", href: "/new" },
];

const supportLinks = [
  { name: "Red Cape Service", href: "/red-cape-service" },
  { name: "Genuine Parts", href: "/genuine-parts" },
  {
    name: "Knowledge Base",
    href: "https://support.taylorproducts.net",
    external: true,
  },
  {
    name: "Parts Store",
    href: "https://parts.taylorproducts.net",
    external: true,
  },
  {
    name: "Machine Finder",
    href: "https://finder.taylorproducts.net/wizard",
    external: true,
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/TaylorProductsInc",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/taylorproductsinc",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/taylor-products-inc",
    icon: Linkedin,
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com/taylorprodinc",
    icon: Twitter,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[var(--navy-800)] to-[var(--navy-900)] text-white">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[var(--blue-500)] font-bold text-xl font-[family-name:var(--font-outfit)]">
                  TP
                </span>
              </div>
              <div>
                <p className="font-[family-name:var(--font-outfit)] font-bold text-lg leading-tight">
                  Taylor Products
                </p>
                <p className="text-sm text-[var(--gray-400)]">
                  Foodservice Equipment
                </p>
              </div>
            </div>

            <p className="text-[var(--gray-300)] mb-6 max-w-sm">
              Family-owned since 1985. Serving NJ, PA, NY &amp; DE with equipment,
              service, and the support to help your business grow.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:610-268-0500"
                className="flex items-center gap-3 text-[var(--gray-300)] hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 text-[var(--orange-500)]" />
                <span>610-268-0500</span>
              </a>
              <a
                href="mailto:info@taylorproducts.net"
                className="flex items-center gap-3 text-[var(--gray-300)] hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 text-[var(--orange-500)]" />
                <span>info@taylorproducts.net</span>
              </a>
            </div>

            {/* Showroom Locations */}
            <div className="mt-6 space-y-4">
              <h4
                className="font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider"
                style={{ color: 'var(--gray-400)' }}
              >
                Showroom Locations
              </h4>
              <div className="flex items-start gap-3 text-[var(--gray-300)]">
                <MapPin className="w-5 h-5 text-[var(--orange-500)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Pennsylvania</p>
                  <p className="text-sm">
                    2851 Limestone Rd, Cochranville, PA 19330
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-[var(--gray-300)]">
                <MapPin className="w-5 h-5 text-[var(--orange-500)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">New Jersey</p>
                  <p className="text-sm">
                    102 Gaither Dr, Suite 3, Mt Laurel, NJ 08054
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h4
              className="font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4"
              style={{ color: 'var(--gray-400)' }}
            >
              Products
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--gray-300)] hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4
              className="font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4"
              style={{ color: 'var(--gray-400)' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--gray-300)] hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4
              className="font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4"
              style={{ color: 'var(--gray-400)' }}
            >
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--gray-300)] hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                      <svg
                        className="w-3 h-3 opacity-50"
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
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[var(--gray-300)] hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--gray-400)]">
              &copy; {currentYear} Taylor Products Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-[var(--gray-400)]">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
