import type { Metadata } from "next";
import { Outfit, Source_Serif_4 } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Taylor Products | Foodservice Equipment Distributor | NJ, PA, NY, DE",
    template: "%s | Taylor Products",
  },
  description:
    "Taylor Products is a family-owned foodservice equipment distributor covering NJ, Eastern & Central PA, NYC, Long Island, and Delaware. Taylor soft serve machines, Icetro, grills, and more.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://taylorproducts.net",
    siteName: "Taylor Products",
    title: "Taylor Products | Foodservice Equipment Distributor",
    description:
      "Family-owned foodservice equipment distributor. Taylor soft serve, Icetro, grills, and more. Serving NJ, PA, NY, DE.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taylor Products | Foodservice Equipment Distributor",
    description:
      "Family-owned foodservice equipment distributor. Taylor soft serve, Icetro, grills, and more.",
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
  verification: {
    // Add verification codes when available
    // google: "your-google-verification-code",
  },
};

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
