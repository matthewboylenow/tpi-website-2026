import { getNavigationByLocation, getAllSiteSettings } from "@/lib/data";
import { HeaderClient, NavItem } from "./HeaderClient";

// Default navigation items (fallback if database is empty)
const defaultProductCategories: NavItem[] = [
  { label: "Soft Serve & Frozen Yogurt", url: "/soft-serve-frozen-yogurt" },
  { label: "Icetro Soft Serve", url: "/icetro-soft-serve" },
  { label: "Two Sided Grills", url: "/two-sided-grills" },
  { label: "Milkshakes", url: "/milkshakes" },
  { label: "Ice Cream & Gelato Batch", url: "/ice-cream-gelato-batch" },
  { label: "FlavorBurst Programs", url: "/flavorburst-programs" },
  { label: "Frozen Cocktails", url: "/frozen-cocktails" },
  { label: "Frozen Custard", url: "/frozen-custard" },
  { label: "Premium Slush", url: "/premium-slush" },
  { label: "Cool Chiller / FCB", url: "/frozen-soda-cool-chiller" },
  { label: "Smoothies & Frozen Cappuccino", url: "/smoothies-frozen-cappuccino" },
];

const defaultCustomerServiceLinks: NavItem[] = [
  { label: "Red Cape Service", url: "/red-cape-service" },
  { label: "Genuine Parts", url: "/genuine-parts" },
  { label: "Knowledge Base", url: "https://support.taylorproducts.net", isExternal: true },
  { label: "Parts Store", url: "https://parts.taylorproducts.net", isExternal: true },
];

const defaultMainNavLinks: NavItem[] = [
  { label: "About", url: "/about" },
  { label: "Blog", url: "/blog" },
  { label: "What's New", url: "/new" },
  { label: "Work With Us", url: "/work-with-us" },
];

export async function Header() {
  // Fetch navigation data from database
  const [productsNav, serviceNav, mainNav, settings] = await Promise.all([
    getNavigationByLocation("header_products"),
    getNavigationByLocation("header_service"),
    getNavigationByLocation("header_main"),
    getAllSiteSettings(),
  ]);

  // Transform database navigation items to NavItem format
  // Use database items if available, otherwise fall back to defaults
  const productCategories: NavItem[] = productsNav.length > 0
    ? productsNav.map(item => ({
        label: item.label,
        url: item.url,
        isExternal: item.isExternal || false,
      }))
    : defaultProductCategories;

  const customerServiceLinks: NavItem[] = serviceNav.length > 0
    ? serviceNav.map(item => ({
        label: item.label,
        url: item.url,
        isExternal: item.isExternal || false,
      }))
    : defaultCustomerServiceLinks;

  const mainNavLinks: NavItem[] = mainNav.length > 0
    ? mainNav.map(item => ({
        label: item.label,
        url: item.url,
        isExternal: item.isExternal || false,
      }))
    : defaultMainNavLinks;

  // Get logo from settings
  const logoUrl = settings.site_logo_url || undefined;

  return (
    <HeaderClient
      productCategories={productCategories}
      customerServiceLinks={customerServiceLinks}
      mainNavLinks={mainNavLinks}
      logoUrl={logoUrl}
    />
  );
}
