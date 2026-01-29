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
  title: "FlavorBurst Programs | Add Flavors to Soft Serve",
  description:
    "FlavorBurst systems add 8+ flavors to your soft serve or shake program. Turn one machine into a multi-flavor profit center.",
};

export default async function FlavorBurstPage() {
  const category = await getCategoryWithMachines("flavorburst-programs");

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
    { name: "FlavorBurst Programs", url: "https://taylorproducts.net/flavorburst-programs" },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <WebPageSchema
        title="FlavorBurst Programs"
        description="FlavorBurst systems add 8+ flavors to your soft serve or shake program. Turn one machine into a multi-flavor profit center."
        url="https://taylorproducts.net/flavorburst-programs"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />
      <main id="main-content" className="pt-[120px]">
        <CategoryHero
          title="FlavorBurst Programs"
          description="Transform a single soft serve or shake machine into a multi-flavor profit center. FlavorBurst adds 8+ flavors with the push of a button, increasing menu variety without additional equipment."
          backgroundImage={HEROES.flavorburst}
          gradient="from-[var(--green-800)] via-[var(--teal-700)] to-[var(--teal-900)]"
        />

        <MachineGrid subcategories={subcategories} />

        {/* Additional Info Section */}
        <section className="py-16 bg-[var(--gray-50)]">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mb-4">
                How FlavorBurst Works
              </h2>
              <p className="text-[var(--gray-600)] mb-6">
                FlavorBurst systems inject concentrated flavor into your vanilla soft serve
                or shake base as it&apos;s dispensed. With up to 8 flavors per unit, you can
                offer chocolate, strawberry, caramel, and more - all from a single machine.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-[var(--green-600)] mb-2">8+</div>
                  <div className="text-[var(--gray-600)]">Flavors per unit</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-[var(--green-600)] mb-2">1</div>
                  <div className="text-[var(--gray-600)]">Base mix required</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-[var(--green-600)] mb-2">$$$</div>
                  <div className="text-[var(--gray-600)]">Increased margins</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
