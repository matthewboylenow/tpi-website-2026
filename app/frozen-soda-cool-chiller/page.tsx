import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero, MachineGrid } from "@/components/category";
import { ContactSection } from "@/components/home/ContactSection";
import { getCategoryWithMachines } from "@/lib/data";
import { HEROES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Cool Chiller & FCB | Frozen Carbonated Beverages",
  description:
    "Taylor Cool Chiller and Frozen Carbonated Beverage (FCB) systems. Premium frozen soda and carbonated slush equipment.",
};

export default async function CoolChillerPage() {
  const category = await getCategoryWithMachines("frozen-soda-cool-chiller");

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
          title="Cool Chiller & FCB"
          description="Frozen Carbonated Beverages (FCB) combine the refreshment of carbonation with the appeal of a frozen treat. Taylor FCB systems deliver consistent frozen soda with the perfect texture."
          backgroundImage={HEROES.coolChiller}
          gradient="from-[var(--sky-700)] via-[var(--blue-600)] to-[var(--blue-800)]"
        />

        <MachineGrid subcategories={subcategories} />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
