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
  title: "Ice Cream & Gelato Batch Freezers",
  description:
    "Taylor and Emery Thompson batch freezers for artisan ice cream and gelato production. From small batch to high-volume commercial production.",
};

export default async function BatchPage() {
  const category = await getCategoryWithMachines("ice-cream-gelato-batch");

  if (!category) {
    notFound();
  }

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
    { name: "Ice Cream & Gelato Batch", url: "https://taylorproducts.net/ice-cream-gelato-batch" },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <WebPageSchema
        title="Ice Cream & Gelato Batch Freezers"
        description="Taylor and Emery Thompson batch freezers for artisan ice cream and gelato production."
        url="https://taylorproducts.net/ice-cream-gelato-batch"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />
      <main id="main-content" className="pt-[120px]">
        <CategoryHero
          title="Ice Cream & Gelato Batch Freezers"
          description="From artisan small-batch production to high-volume commercial operations, we offer Taylor, Emery Thompson, and Frigomat batch freezers plus ISA gelato display cases."
          backgroundImage={HEROES.batch}
          gradient="from-[var(--indigo-800)] via-[var(--purple-700)] to-[var(--purple-900)]"
        />

        <MachineGrid subcategories={subcategories} />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
