import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero, MachineGrid, type Subcategory } from "@/components/category";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Soft Serve & Frozen Yogurt Machines",
  description:
    "Explore Taylor soft serve and frozen yogurt machines. 23+ models from countertop to floor units, including 28HT heat treatment technology. Industry-leading recovery time and easy maintenance.",
  openGraph: {
    title: "Soft Serve & Frozen Yogurt Machines | Taylor Products",
    description:
      "Taylor soft serve machines deliver the industry's fastest recovery time, simplest cleaning process, and lowest lifetime maintenance costs.",
  },
};

// Sample data - in production this would come from the database
const subcategories: Subcategory[] = [
  {
    id: 1,
    name: "28HT Heat Treatment Models",
    machines: [
      {
        id: 1,
        modelNumber: "C606",
        name: "Shake & Soft Serve Freezer",
        slug: "c606-shake-soft-serve",
        shortDescription: "Combination shake and soft serve with 28HT technology",
        flavorCount: "Single Flavor",
        machineType: "28HT",
        isInStock: true,
      },
      {
        id: 2,
        modelNumber: "C709",
        name: "Single Flavor Soft Serve",
        slug: "c709-single-flavor",
        shortDescription: "High-capacity single flavor with heat treatment",
        flavorCount: "Single Flavor",
        machineType: "28HT",
        isInStock: true,
      },
      {
        id: 3,
        modelNumber: "C708",
        name: "Single Flavor Soft Serve",
        slug: "c708-single-flavor",
        shortDescription: "Popular single flavor with 28HT heat treatment",
        flavorCount: "Single Flavor",
        machineType: "28HT",
        isInStock: true,
        isFeatured: true,
      },
      {
        id: 4,
        modelNumber: "C717",
        name: "Twin Twist Soft Serve",
        slug: "c717-twin-twist",
        shortDescription: "Two flavors plus twist with heat treatment",
        flavorCount: "Twin Twist",
        machineType: "28HT",
        isInStock: true,
      },
      {
        id: 5,
        modelNumber: "C716",
        name: "Twin Twist Soft Serve",
        slug: "c716-twin-twist",
        shortDescription: "Compact twin twist with 28HT",
        flavorCount: "Twin Twist",
        machineType: "28HT",
        isInStock: false,
      },
    ],
  },
  {
    id: 2,
    name: "Single Flavor Models",
    machines: [
      {
        id: 6,
        modelNumber: "C707",
        name: "Single Flavor Pump",
        slug: "c707-single-pump",
        shortDescription: "Pump-fed single flavor for high-volume operations",
        flavorCount: "Single Flavor",
        machineType: "Pump",
        isInStock: true,
      },
      {
        id: 7,
        modelNumber: "C706",
        name: "Single Flavor Pump",
        slug: "c706-single-pump",
        shortDescription: "Compact pump-fed single flavor",
        flavorCount: "Single Flavor",
        machineType: "Pump",
        isInStock: true,
      },
      {
        id: 8,
        modelNumber: "8752",
        name: "Single Flavor Pump",
        slug: "8752-single-pump",
        shortDescription: "Traditional single flavor pump freezer",
        flavorCount: "Single Flavor",
        machineType: "Pump",
        isInStock: true,
      },
      {
        id: 9,
        modelNumber: "702",
        name: "Single Flavor",
        slug: "702-single",
        shortDescription: "Entry-level single flavor soft serve",
        flavorCount: "Single Flavor",
        isInStock: true,
      },
      {
        id: 10,
        modelNumber: "C152",
        name: "Taylormate Countertop",
        slug: "c152-taylormate",
        shortDescription: "Compact countertop for small spaces",
        flavorCount: "Single Flavor",
        machineType: "Countertop",
        isInStock: true,
      },
    ],
  },
  {
    id: 3,
    name: "Multi Flavor Models",
    machines: [
      {
        id: 11,
        modelNumber: "C723",
        name: "Twin Twist",
        slug: "c723-twin-twist",
        shortDescription: "Popular twin twist soft serve freezer",
        flavorCount: "Twin Twist",
        isInStock: true,
      },
      {
        id: 12,
        modelNumber: "C723ADA",
        name: "Twin Twist ADA",
        slug: "c723-ada-twin-twist",
        shortDescription: "ADA-compliant twin twist freezer",
        flavorCount: "Twin Twist",
        isAdaCompliant: true,
        isInStock: true,
      },
      {
        id: 13,
        modelNumber: "C161",
        name: "Compact Twin Twist",
        slug: "c161-compact-twin",
        shortDescription: "Space-saving twin twist option",
        flavorCount: "Twin Twist",
        machineType: "Compact",
        isInStock: true,
      },
      {
        id: 14,
        modelNumber: "8756",
        name: "Twin Twist Pump",
        slug: "8756-twin-pump",
        shortDescription: "Pump-fed twin twist for high volume",
        flavorCount: "Twin Twist",
        machineType: "Pump",
        isInStock: true,
      },
      {
        id: 15,
        modelNumber: "C722",
        name: "Twin Twist Pump",
        slug: "c722-twin-pump",
        shortDescription: "Premium twin twist with pump feed",
        flavorCount: "Twin Twist",
        machineType: "Pump",
        isInStock: true,
      },
      {
        id: 16,
        modelNumber: "C722ADA",
        name: "Twin Twist Pump ADA",
        slug: "c722-ada-twin-pump",
        shortDescription: "ADA-compliant twin twist with pump",
        flavorCount: "Twin Twist",
        machineType: "Pump",
        isAdaCompliant: true,
        isInStock: false,
      },
      {
        id: 17,
        modelNumber: "772",
        name: "Two Flavor",
        slug: "772-two-flavor",
        shortDescription: "Classic two flavor soft serve",
        flavorCount: "Two Flavor",
        isInStock: true,
      },
    ],
  },
  {
    id: 4,
    name: "Combination Freezers",
    machines: [
      {
        id: 18,
        modelNumber: "632",
        name: "Single Shake + Single Soft Serve",
        slug: "632-combo",
        shortDescription: "Shake and soft serve combination unit",
        flavorCount: "Combo",
        isInStock: true,
      },
      {
        id: 19,
        modelNumber: "C612",
        name: "Shake & Single Soft Serve",
        slug: "c612-combo",
        shortDescription: "Modern shake and soft serve combo",
        flavorCount: "Combo",
        isInStock: true,
        isDemoUnit: true,
        demoDiscountPercent: 15,
      },
    ],
  },
];

export default function SoftServePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        <CategoryHero
          title="Soft Serve & Frozen Yogurt Machines"
          description="Taylor soft serve machines deliver the industry's fastest recovery time, simplest cleaning process, and lowest lifetime maintenance costs. Choose from 23+ models including revolutionary 28HT heat treatment technology that eliminates nightly breakdown and reduces labor costs."
        />

        <MachineGrid subcategories={subcategories} />

        {/* Machine Finder CTA */}
        <section className="py-16 bg-[var(--gray-50)]">
          <div className="container text-center">
            <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mb-4">
              Not Sure Which Machine Is Right For You?
            </h2>
            <p className="text-[var(--gray-600)] mb-6 max-w-2xl mx-auto">
              Answer a few questions about your business and we&apos;ll recommend
              the perfect soft serve machine for your needs.
            </p>
            <a
              href="https://finder.taylorproducts.net/wizard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--orange-500)] text-white font-semibold rounded-lg hover:bg-[var(--orange-600)] transition-colors"
            >
              Try Our Machine Finder
              <svg
                className="w-4 h-4"
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
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
