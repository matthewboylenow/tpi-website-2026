import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero, MachineGrid } from "@/components/category";
import { ContactSection } from "@/components/home/ContactSection";
import { getCategoryWithMachines } from "@/lib/data";
import { HEROES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Premium Slush Machines | High-Margin Slush Programs",
  description:
    "Premium slush machines for high-margin frozen beverage programs. Commercial slush and frozen drink equipment.",
};

export default async function PremiumSlushPage() {
  const category = await getCategoryWithMachines("premium-slush");

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

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        <CategoryHero
          title="Premium Slush Programs"
          description="Premium slush programs deliver high margins and customer excitement. Our commercial slush machines produce consistent frozen beverages with excellent texture and flavor."
          backgroundImage={HEROES.slush}
          gradient="from-[var(--blue-600)] via-[var(--cyan-500)] to-[var(--cyan-700)]"
        />

        <MachineGrid subcategories={subcategories} />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
