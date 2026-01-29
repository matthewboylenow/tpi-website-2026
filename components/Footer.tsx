import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { getNavigationByLocation, getAllSiteSettings } from "@/lib/data";

// Types for navigation items
interface NavItem {
  label: string;
  url: string;
  isExternal?: boolean;
}

// Default navigation items (fallback if database is empty)
const defaultProductLinks: NavItem[] = [
  { label: "Soft Serve & Frozen Yogurt", url: "/soft-serve-frozen-yogurt" },
  { label: "Icetro Soft Serve", url: "/icetro-soft-serve" },
  { label: "Two Sided Grills", url: "/two-sided-grills" },
  { label: "Milkshakes", url: "/milkshakes" },
  { label: "Ice Cream & Gelato Batch", url: "/ice-cream-gelato-batch" },
  { label: "FlavorBurst Programs", url: "/flavorburst-programs" },
  { label: "Frozen Cocktails", url: "/frozen-cocktails" },
  { label: "All Products", url: "#products" },
];

const defaultCompanyLinks: NavItem[] = [
  { label: "About Us", url: "/about" },
  { label: "Meet Your Salesperson", url: "/meet-your-salesperson" },
  { label: "Work With Us", url: "/work-with-us" },
  { label: "Blog", url: "/blog" },
  { label: "What's New", url: "/new" },
];

const defaultSupportLinks: NavItem[] = [
  { label: "Red Cape Service", url: "/red-cape-service" },
  { label: "Genuine Parts", url: "/genuine-parts" },
  { label: "Knowledge Base", url: "https://support.taylorproducts.net", isExternal: true },
  { label: "Parts Store", url: "https://parts.taylorproducts.net", isExternal: true },
  { label: "Machine Finder", url: "https://finder.taylorproducts.net/wizard", isExternal: true },
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

const defaultLogoUrl = "https://taylorproducts.net/wp-content/uploads/2022/04/Artboard-2@2x-300x83.png";

export async function Footer() {
  const currentYear = new Date().getFullYear();

  // Fetch navigation data from database
  const [productsNav, companyNav, supportNav, settings] = await Promise.all([
    getNavigationByLocation("footer_products"),
    getNavigationByLocation("footer_company"),
    getNavigationByLocation("footer_support"),
    getAllSiteSettings(),
  ]);

  // Transform database navigation items to NavItem format
  // Use database items if available, otherwise fall back to defaults
  const productLinks: NavItem[] = productsNav.length > 0
    ? productsNav.map(item => ({
        label: item.label,
        url: item.url,
        isExternal: item.isExternal || false,
      }))
    : defaultProductLinks;

  const companyLinks: NavItem[] = companyNav.length > 0
    ? companyNav.map(item => ({
        label: item.label,
        url: item.url,
        isExternal: item.isExternal || false,
      }))
    : defaultCompanyLinks;

  const supportLinks: NavItem[] = supportNav.length > 0
    ? supportNav.map(item => ({
        label: item.label,
        url: item.url,
        isExternal: item.isExternal || false,
      }))
    : defaultSupportLinks;

  // Get logo from settings
  const logoUrl = settings.site_logo_url || defaultLogoUrl;

  return (
    <footer className="bg-gradient-to-b from-[var(--navy-800)] to-[var(--navy-900)] text-white">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src={logoUrl}
                alt="Taylor Products"
                width={200}
                height={55}
                className="h-12 w-auto brightness-0 invert"
              />
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
                    264 Welsh Pool Rd, Exton, PA 19341
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-[var(--gray-300)]">
                <MapPin className="w-5 h-5 text-[var(--orange-500)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">New Jersey</p>
                  <p className="text-sm">
                    255 Raritan Center Pkwy, Edison, NJ 08837
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
                <li key={link.url}>
                  {link.isExternal ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--gray-300)] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
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
                      href={link.url}
                      className="text-[var(--gray-300)] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
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
                <li key={link.url}>
                  {link.isExternal ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--gray-300)] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
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
                      href={link.url}
                      className="text-[var(--gray-300)] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
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
                <li key={link.url}>
                  {link.isExternal ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--gray-300)] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
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
                      href={link.url}
                      className="text-[var(--gray-300)] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
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
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
