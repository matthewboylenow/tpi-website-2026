"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Search,
  CreditCard,
} from "lucide-react";

// Types for navigation items
export interface NavItem {
  label: string;
  url: string;
  isExternal?: boolean;
}

interface HeaderClientProps {
  productCategories: NavItem[];
  customerServiceLinks: NavItem[];
  mainNavLinks: NavItem[];
  logoUrl?: string;
}

export function HeaderClient({
  productCategories,
  customerServiceLinks,
  mainNavLinks,
  logoUrl,
}: HeaderClientProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".nav-dropdown-trigger")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const defaultLogoUrl = "https://taylorproducts.net/wp-content/uploads/2022/04/Artboard-2@2x-300x83.png";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "bg-white/95 backdrop-blur-md",
        "border-b border-black/5",
        "transition-all duration-300",
        isScrolled && "shadow-lg shadow-black/5"
      )}
    >
      {/* Top Bar */}
      <div className="bg-[var(--navy-800)] text-white py-2 px-4">
        <div className="container flex items-center justify-between text-sm">
          <a
            href="tel:610-268-0500"
            className="flex items-center gap-2 hover:text-[var(--orange-400)] transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">610-268-0500</span>
          </a>

          <a
            href="https://taylorproducts.securepayments.cardpointe.com/pay"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--orange-400)] transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay An Invoice / Deposit</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={logoUrl || defaultLogoUrl}
              alt="Taylor Products"
              width={200}
              height={55}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Products Dropdown */}
            {productCategories.length > 0 && (
              <div className="relative nav-dropdown-trigger">
                <button
                  onClick={() => toggleDropdown("products")}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg",
                    "font-[family-name:var(--font-heading)] font-medium text-sm",
                    "text-[var(--gray-700)] hover:text-[var(--blue-600)] hover:bg-[var(--blue-50)]",
                    "transition-all duration-200",
                    activeDropdown === "products" && "text-[var(--blue-600)] bg-[var(--blue-50)]"
                  )}
                >
                  Our Products
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      activeDropdown === "products" && "rotate-180"
                    )}
                  />
                </button>

                {/* Products Dropdown Menu */}
                <div
                  className={cn(
                    "absolute top-full left-0 mt-2 w-72",
                    "bg-white rounded-xl border border-[var(--gray-100)]",
                    "shadow-[0_4px_12px_rgba(0,0,0,0.08),0_12px_24px_rgba(0,0,0,0.08)]",
                    "py-2",
                    "transition-all duration-200",
                    activeDropdown === "products"
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  )}
                >
                  {productCategories.map((category) => (
                    <Link
                      key={category.url}
                      href={category.url}
                      className={cn(
                        "block px-4 py-2.5",
                        "text-sm text-[var(--gray-700)]",
                        "hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)]",
                        "transition-colors",
                        pathname === category.url && "bg-[var(--blue-50)] text-[var(--blue-600)]"
                      )}
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Service Dropdown */}
            {customerServiceLinks.length > 0 && (
              <div className="relative nav-dropdown-trigger">
                <button
                  onClick={() => toggleDropdown("service")}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg",
                    "font-[family-name:var(--font-heading)] font-medium text-sm",
                    "text-[var(--gray-700)] hover:text-[var(--blue-600)] hover:bg-[var(--blue-50)]",
                    "transition-all duration-200",
                    activeDropdown === "service" && "text-[var(--blue-600)] bg-[var(--blue-50)]"
                  )}
                >
                  Customer Service
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      activeDropdown === "service" && "rotate-180"
                    )}
                  />
                </button>

                {/* Customer Service Dropdown Menu */}
                <div
                  className={cn(
                    "absolute top-full left-0 mt-2 w-56",
                    "bg-white rounded-xl border border-[var(--gray-100)]",
                    "shadow-[0_4px_12px_rgba(0,0,0,0.08),0_12px_24px_rgba(0,0,0,0.08)]",
                    "py-2",
                    "transition-all duration-200",
                    activeDropdown === "service"
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  )}
                >
                  {customerServiceLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className={cn(
                        "flex items-center justify-between px-4 py-2.5",
                        "text-sm text-[var(--gray-700)]",
                        "hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)]",
                        "transition-colors"
                      )}
                    >
                      {link.label}
                      {link.isExternal && (
                        <svg
                          className="w-4 h-4 opacity-50"
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
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Main Nav Links */}
            {mainNavLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className={cn(
                  "px-4 py-2 rounded-lg",
                  "font-[family-name:var(--font-heading)] font-medium text-sm",
                  "text-[var(--gray-700)] hover:text-[var(--blue-600)] hover:bg-[var(--blue-50)]",
                  "transition-all duration-200",
                  pathname === link.url && "text-[var(--blue-600)] bg-[var(--blue-50)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <Link
              href="/search"
              className={cn(
                "p-2 rounded-lg",
                "text-[var(--gray-600)] hover:text-[var(--blue-600)] hover:bg-[var(--blue-50)]",
                "transition-all duration-200"
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* CTA Button */}
            <Link href="/meet-your-salesperson" className="hidden sm:block">
              <Button variant="primary" size="sm">
                Meet Your Salesperson
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg",
                "text-[var(--gray-600)] hover:text-[var(--blue-600)] hover:bg-[var(--blue-50)]",
                "transition-all duration-200"
              )}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-[80vh] mt-4" : "max-h-0"
          )}
        >
          <div className="border-t border-[var(--gray-200)] pt-4 space-y-2">
            {/* Products Section */}
            {productCategories.length > 0 && (
              <div className="mb-4">
                <p className="px-4 py-2 text-xs font-semibold text-[var(--gray-500)] uppercase tracking-wider">
                  Products
                </p>
                {productCategories.map((category) => (
                  <Link
                    key={category.url}
                    href={category.url}
                    className={cn(
                      "block px-4 py-2.5 text-sm",
                      "text-[var(--gray-700)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)]",
                      pathname === category.url && "bg-[var(--blue-50)] text-[var(--blue-600)]"
                    )}
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Customer Service Section */}
            {customerServiceLinks.length > 0 && (
              <div className="mb-4">
                <p className="px-4 py-2 text-xs font-semibold text-[var(--gray-500)] uppercase tracking-wider">
                  Customer Service
                </p>
                {customerServiceLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className="block px-4 py-2.5 text-sm text-[var(--gray-700)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Other Links */}
            {mainNavLinks.length > 0 && (
              <div className="mb-4">
                <p className="px-4 py-2 text-xs font-semibold text-[var(--gray-500)] uppercase tracking-wider">
                  More
                </p>
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    className={cn(
                      "block px-4 py-2.5 text-sm",
                      "text-[var(--gray-700)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)]",
                      pathname === link.url && "bg-[var(--blue-50)] text-[var(--blue-600)]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile CTA */}
            <div className="px-4 pt-4 border-t border-[var(--gray-200)]">
              <Link href="/meet-your-salesperson" className="block">
                <Button variant="primary" className="w-full">
                  Meet Your Salesperson
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
