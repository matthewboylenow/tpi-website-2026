import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero, MachineGrid } from "@/components/category";
import { ContactSection } from "@/components/home/ContactSection";
import { getCategoryWithMachines } from "@/lib/data";
import { HEROES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Frozen Custard Machines | Taylor Custard Freezers",
  description:
    "Taylor frozen custard machines for premium custard production. Single and twin twist configurations available.",
};

export default async function FrozenCustardPage() {
  const category = await getCategoryWithMachines("frozen-custard");

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
          title="Frozen Custard Machines"
          description="Premium frozen custard requires precision equipment. Taylor custard freezers deliver the rich, dense texture that custard lovers expect, with consistent quality every serving."
          backgroundImage={HEROES.custard}
          gradient="from-[var(--yellow-700)] via-[var(--amber-600)] to-[var(--amber-800)]"
        />

        <MachineGrid subcategories={subcategories} />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
