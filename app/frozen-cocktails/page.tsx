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
  title: "Frozen Cocktail Machines | Commercial Frozen Beverage",
  description:
    "Commercial frozen cocktail and margarita machines. From countertop units to high-volume floor models for bars and restaurants.",
};

export default async function FrozenCocktailsPage() {
  const category = await getCategoryWithMachines("frozen-cocktails");

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
    { name: "Frozen Cocktails", url: "https://taylorproducts.net/frozen-cocktails" },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <WebPageSchema
        title="Frozen Cocktail Machines"
        description="Commercial frozen cocktail and margarita machines. From countertop units to high-volume floor models for bars and restaurants."
        url="https://taylorproducts.net/frozen-cocktails"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />
      <main id="main-content" className="pt-[120px]">
        <CategoryHero
          title="Frozen Cocktail Machines"
          description="Serve perfect frozen cocktails, margaritas, and frozen beverages every time. Our commercial frozen drink machines are built for high-volume bar and restaurant operations."
          backgroundImage={HEROES.cocktails}
          gradient="from-[var(--amber-800)] via-[var(--orange-700)] to-[var(--orange-900)]"
        />

        <MachineGrid subcategories={subcategories} />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
