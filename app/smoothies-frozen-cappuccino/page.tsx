import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero, MachineGrid } from "@/components/category";
import { ContactSection } from "@/components/home/ContactSection";
import { getCategoryWithMachines } from "@/lib/data";
import { HEROES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Smoothies & Frozen Cappuccino Machines",
  description:
    "Commercial smoothie and frozen cappuccino machines. Versatile frozen beverage equipment for coffee shops and foodservice.",
};

export default async function SmoothiesPage() {
  const category = await getCategoryWithMachines("smoothies-frozen-cappuccino");

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
          title="Smoothies & Frozen Cappuccino"
          description="Versatile frozen beverage machines perfect for smoothies, frozen cappuccinos, and blended coffee drinks. Ideal for coffee shops, convenience stores, and foodservice operations."
          backgroundImage={HEROES.smoothies}
          gradient="from-[var(--emerald-700)] via-[var(--green-600)] to-[var(--green-800)]"
        />

        <MachineGrid subcategories={subcategories} />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
