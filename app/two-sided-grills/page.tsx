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
  title: "Two Sided Grills | Taylor Commercial Grills",
  description:
    "Taylor two-sided grills including the new Crown Series. Electric and gas clamshell grills for high-volume foodservice operations.",
};

export default async function GrillsPage() {
  const category = await getCategoryWithMachines("two-sided-grills");

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
    { name: "Two Sided Grills", url: "https://taylorproducts.net/two-sided-grills" },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <WebPageSchema
        title="Two Sided Grills"
        description="Taylor two-sided grills including the new Crown Series. Electric and gas clamshell grills for high-volume foodservice operations."
        url="https://taylorproducts.net/two-sided-grills"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />
      <main id="main-content" className="pt-[120px]">
        <CategoryHero
          title="Two Sided Grills"
          description="A Taylor two sided grill will offer your customers a complete cook-to-order menu concept. Taylor's two-sided cooking process assures food safety by programming the proper time and temperatures for up to 99 menu items. Cooking both sides simultaneously reduces cook time by up to two-thirds."
          backgroundImage={HEROES.grills}
          gradient="from-[var(--orange-800)] via-[var(--orange-700)] to-[var(--red-800)]"
        />

        <MachineGrid subcategories={subcategories} />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
