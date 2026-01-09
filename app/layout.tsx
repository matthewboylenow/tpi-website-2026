import type { Metadata } from "next";
import { Outfit, Source_Serif_4 } from "next/font/google";
import { getAllSiteSettings } from "@/lib/data";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Default metadata values
const DEFAULT_TITLE = "Taylor Products | Foodservice Equipment Distributor | NJ, PA, NY, DE";
const DEFAULT_DESCRIPTION = "Taylor Products is a family-owned foodservice equipment distributor covering NJ, Eastern & Central PA, NYC, Long Island, and Delaware. Taylor soft serve machines, Icetro, grills, and more.";

export async function generateMetadata(): Promise<Metadata> {
  let settings: Record<string, string> = {};

  try {
    settings = await getAllSiteSettings();
  } catch {
    // Use defaults if database not available
  }

  const title = settings.homepage_meta_title || DEFAULT_TITLE;
  const description = settings.homepage_meta_description || DEFAULT_DESCRIPTION;
  const ogImage = settings.site_og_image_url || undefined;
  const favicon = settings.site_favicon_url || undefined;

  return {
    title: {
      default: title,
      template: "%s | Taylor Products",
    },
    description,
    keywords: [
      "Taylor soft serve",
      "Taylor Company",
      "soft serve machine",
      "frozen yogurt machine",
      "foodservice equipment",
      "commercial ice cream machine",
      "New Jersey",
      "Pennsylvania",
      "New York",
      "Delaware",
    ],
    authors: [{ name: "Taylor Products Inc." }],
    creator: "Taylor Products Inc.",
    publisher: "Taylor Products Inc.",
    metadataBase: new URL("https://taylorproducts.net"),
    icons: favicon ? { icon: favicon } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://taylorproducts.net",
      siteName: "Taylor Products",
      title,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Fathom Analytics - Add site ID when available */}
        {/* <script src="https://cdn.usefathom.com/script.js" data-site="YOUR_FATHOM_SITE_ID" defer /> */}
      </head>
      <body
        className={`${outfit.variable} ${sourceSerif.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
