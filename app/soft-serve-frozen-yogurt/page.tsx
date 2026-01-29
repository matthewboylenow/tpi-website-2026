import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero, MachineGrid } from "@/components/category";
import { ContactSection } from "@/components/home/ContactSection";
import { BreadcrumbSchema, WebPageSchema } from "@/components/Schema";
import { getCategoryWithMachines } from "@/lib/data";
import { HEROES } from "@/lib/assets";

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

export default async function SoftServePage() {
  const category = await getCategoryWithMachines("soft-serve-frozen-yogurt");

  if (!category) {
    notFound();
  }

  // Transform database data to match MachineGrid expected format
  const subcategories = category.subcategories.map((sub) => ({
    id: sub.id,
    name: sub.name,
    machines: sub.machines.map((machine) => ({
      id: machine.id,
      modelNumber: machine.modelNumber,
      name: machine.name,
      slug: machine.slug,
      shortDescription: machine.shortDescription || undefined,
      imageUrl: machine.imageUrl || undefined,
      specSheetUrl: machine.specSheetUrl || undefined,
      flavorCount: machine.flavorCount || undefined,
      machineType: machine.machineType || undefined,
      isAdaCompliant: machine.isAdaCompliant || false,
      isFeatured: machine.isFeatured || false,
      isInStock: machine.isInStock || true,
      isDemoUnit: machine.isDemoUnit || false,
      demoDiscountPercent: machine.demoDiscountPercent || undefined,
    })),
  }));

  const breadcrumbItems = [
    { name: "Home", url: "https://taylorproducts.net" },
    { name: "Soft Serve & Frozen Yogurt", url: "https://taylorproducts.net/soft-serve-frozen-yogurt" },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <WebPageSchema
        title="Soft Serve & Frozen Yogurt Machines"
        description="Taylor soft serve machines deliver the industry's fastest recovery time, simplest cleaning process, and lowest lifetime maintenance costs."
        url="https://taylorproducts.net/soft-serve-frozen-yogurt"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />
      <main id="main-content" className="pt-[120px]">
        <CategoryHero
          title="Soft Serve & Frozen Yogurt Machines"
          description="Taylor soft serve machines deliver the industry's fastest recovery time, simplest cleaning process, and lowest lifetime maintenance costs. Choose from 23+ models including revolutionary 28HT heat treatment technology that eliminates nightly breakdown and reduces labor costs."
          backgroundImage={HEROES.softServe}
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
