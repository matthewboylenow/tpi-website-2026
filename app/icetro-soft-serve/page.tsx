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
  title: "Icetro Soft Serve Machines",
  description:
    "Icetro soft serve machines offer budget-friendly alternatives with premium quality. Countertop and floor models with heat treatment options available.",
};

export default async function IcetroPage() {
  const category = await getCategoryWithMachines("icetro-soft-serve");

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
    { name: "Icetro Soft Serve", url: "https://taylorproducts.net/icetro-soft-serve" },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <WebPageSchema
        title="Icetro Soft Serve Machines"
        description="Icetro soft serve machines offer budget-friendly alternatives with premium quality."
        url="https://taylorproducts.net/icetro-soft-serve"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />
      <main id="main-content" className="pt-[120px]">
        <CategoryHero
          title="Icetro Soft Serve Machines"
          description="Icetro offers budget-friendly soft serve solutions without compromising on quality. From compact countertop units to high-capacity floor models, find the perfect machine for your operation."
          backgroundImage={HEROES.icetro}
        />

        <MachineGrid subcategories={subcategories} />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
