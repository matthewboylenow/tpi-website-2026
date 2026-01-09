import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge, HeatTreatmentBadge, AdaBadge, InStockBadge } from "@/components/ui/badge";
import { ContactSection } from "@/components/home/ContactSection";
import {
  FileText,
  MessageSquare,
  ChevronRight,
  Check,
  Building,
  Truck,
  Coffee,
  Store,
  UtensilsCrossed,
} from "lucide-react";

// This would be fetched from the database in production
interface MachineDetails {
  id: number;
  modelNumber: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  imageUrl?: string;
  specSheetUrl?: string;
  categoryName: string;
  categorySlug: string;
  flavorCount?: string;
  machineType?: string;
  isAdaCompliant?: boolean;
  isFeatured?: boolean;
  isInStock?: boolean;
  isDemoUnit?: boolean;
  demoDiscountPercent?: number;
  features: string[];
  idealFor: string[];
  specifications: {
    dimensions?: string;
    weight?: string;
    power?: string;
    capacity?: string;
    cooling?: string;
    refrigerant?: string;
  };
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  relatedMachines: {
    modelNumber: string;
    name: string;
    slug: string;
    imageUrl?: string;
    shortDescription?: string;
  }[];
}

// Sample machine data - in production this would come from database
const sampleMachine: MachineDetails = {
  id: 3,
  modelNumber: "C708",
  name: "Single Flavor Soft Serve Freezer",
  slug: "c708-soft-serve-freezer",
  shortDescription: "Single Flavor, 28HT Heat Treatment",
  longDescription: `The Taylor C708 single-flavor soft serve machine combines 28HT heat treatment technology with a compact footprint—perfect for restaurants, cafes, and convenience stores looking to add profitable frozen desserts with minimal maintenance.

With Taylor's revolutionary 28-day heat treatment system, the C708 eliminates nightly breakdown cleaning. The machine automatically pasteurizes the mix each night, keeping it fresh and safe for up to 28 days. This dramatically reduces labor costs and ensures consistent product quality.

The C708 delivers industry-leading recovery time, meaning you'll never run out of product during rush periods. Its intelligent freezing system maintains perfect consistency from the first serve to the last.`,
  categoryName: "Soft Serve & Frozen Yogurt",
  categorySlug: "soft-serve-frozen-yogurt",
  flavorCount: "Single Flavor",
  machineType: "28HT",
  isInStock: true,
  isFeatured: true,
  features: [
    "28-day heat treatment cycle eliminates nightly breakdown",
    "Industry-leading recovery time for high-volume operations",
    "FlavorBurst compatible for 8+ flavor options",
    "40% fewer parts than competitors—clean in under 15 minutes",
    "Intelligent freezing maintains perfect consistency",
    "Digital controls with diagnostic capabilities",
    "Energy-efficient design reduces operating costs",
    "Stainless steel construction for durability",
  ],
  idealFor: [
    "Quick Service Restaurants",
    "Convenience Stores",
    "Cafes & Coffee Shops",
    "Food Trucks",
    "Ice Cream Shops",
  ],
  specifications: {
    dimensions: '18.5"W x 32.5"D x 60.25"H',
    weight: "410 lbs",
    power: "208-230V, 60Hz, 1 Phase, 20 Amps",
    capacity: "Up to 300 servings/hour",
    cooling: "Air-cooled",
    refrigerant: "R-452A",
  },
  metaTitle: "Taylor C708 Soft Serve Machine | 28HT Heat Treatment",
  metaDescription:
    "The Taylor C708 single-flavor soft serve machine with 28HT heat treatment technology. Eliminates nightly breakdown, perfect for restaurants and c-stores.",
  focusKeyword: "Taylor C708 soft serve machine",
  relatedMachines: [
    {
      modelNumber: "C709",
      name: "Single Flavor Soft Serve",
      slug: "c709-single-flavor",
      shortDescription: "High-capacity single flavor with 28HT",
    },
    {
      modelNumber: "C717",
      name: "Twin Twist Soft Serve",
      slug: "c717-twin-twist",
      shortDescription: "Two flavors plus twist with 28HT",
    },
    {
      modelNumber: "C723",
      name: "Twin Twist",
      slug: "c723-twin-twist",
      shortDescription: "Popular twin twist soft serve freezer",
    },
  ],
};

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // In production, fetch machine data based on slug
  const { slug } = await params;
  // TODO: Use slug to fetch machine from database
  console.log("Generating metadata for:", slug);
  const machine = sampleMachine; // Would be fetched from DB

  return {
    title: machine.metaTitle || `${machine.modelNumber} - ${machine.name}`,
    description: machine.metaDescription || machine.shortDescription,
    openGraph: {
      title: `${machine.modelNumber} - ${machine.name} | Taylor Products`,
      description: machine.metaDescription || machine.shortDescription,
      images: machine.imageUrl ? [{ url: machine.imageUrl }] : undefined,
    },
  };
}

// Ideal For icon mapping
const idealForIcons: Record<string, React.ElementType> = {
  "Quick Service Restaurants": UtensilsCrossed,
  "Convenience Stores": Store,
  "Cafes & Coffee Shops": Coffee,
  "Food Trucks": Truck,
  "Ice Cream Shops": Building,
};

export default async function MachinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // In production, fetch machine data based on slug
  const { slug } = await params;
  // TODO: Use slug to fetch machine from database
  console.log("Rendering machine page for:", slug);
  const machine = sampleMachine; // Would be fetched from DB

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[var(--gray-50)] to-white py-12">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-[var(--gray-500)]">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[var(--blue-500)] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4" />
                <li>
                  <Link
                    href={`/${machine.categorySlug}`}
                    className="hover:text-[var(--blue-500)] transition-colors"
                  >
                    {machine.categoryName}
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4" />
                <li className="text-[var(--gray-900)]">{machine.modelNumber}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image */}
              <div className="relative">
                <div className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden border border-[var(--gray-200)]">
                  {machine.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={machine.imageUrl}
                      alt={`${machine.modelNumber} - ${machine.name}`}
                      className="w-full h-full object-contain p-8"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--gray-300)]">
                      <svg
                        className="w-32 h-32"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {machine.machineType === "28HT" && <HeatTreatmentBadge />}
                  {machine.isAdaCompliant && <AdaBadge />}
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {machine.isInStock && <InStockBadge />}
                </div>
              </div>

              {/* Details */}
              <div>
                {/* Model Number */}
                <p className="text-[var(--orange-500)] font-[family-name:var(--font-outfit)] font-bold text-lg tracking-wider mb-2">
                  MODEL {machine.modelNumber}
                </p>

                {/* Name */}
                <h1 className="font-[family-name:var(--font-outfit)] font-extrabold text-3xl sm:text-4xl text-[var(--navy-800)] mb-4">
                  {machine.name}
                </h1>

                {/* Short Description */}
                <p className="text-xl text-[var(--gray-600)] mb-6">
                  {machine.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {machine.flavorCount && (
                    <Badge variant="primary">{machine.flavorCount}</Badge>
                  )}
                  {machine.machineType && machine.machineType !== "28HT" && (
                    <Badge variant="default">{machine.machineType}</Badge>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <Link href="/meet-your-salesperson">
                    <Button variant="primary" size="lg">
                      <MessageSquare className="w-5 h-5" />
                      Get Your Custom Quote
                    </Button>
                  </Link>
                  {machine.specSheetUrl && (
                    <a
                      href={machine.specSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="lg">
                        <FileText className="w-5 h-5" />
                        View Spec Sheet
                      </Button>
                    </a>
                  )}
                </div>

                {/* Key Features Preview */}
                <div className="bg-[var(--gray-50)] rounded-lg p-6">
                  <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {machine.features.slice(0, 4).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-[var(--gray-700)]"
                      >
                        <Check className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Long Description */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mb-6">
                Overview
              </h2>
              <div className="prose prose-lg max-w-none text-[var(--gray-700)]">
                {machine.longDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features & Ideal For */}
        <section className="section bg-[var(--gray-50)]">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Features */}
              <div>
                <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mb-6">
                  Features & Benefits
                </h2>
                <ul className="space-y-4">
                  {machine.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-[var(--blue-500)] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[var(--gray-700)] pt-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For */}
              <div>
                <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mb-6">
                  Ideal For
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {machine.idealFor.map((use) => {
                    const Icon = idealForIcons[use] || Building;
                    return (
                      <div
                        key={use}
                        className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-[var(--orange-100)] rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[var(--orange-600)]" />
                        </div>
                        <span className="font-medium text-[var(--gray-700)]">
                          {use}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mb-6">
                Specifications
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden">
                <table className="w-full">
                  <tbody className="divide-y divide-[var(--gray-200)]">
                    {machine.specifications.dimensions && (
                      <tr>
                        <td className="px-6 py-4 font-medium text-[var(--gray-700)] bg-[var(--gray-50)]">
                          Dimensions (W x D x H)
                        </td>
                        <td className="px-6 py-4 text-[var(--gray-600)]">
                          {machine.specifications.dimensions}
                        </td>
                      </tr>
                    )}
                    {machine.specifications.weight && (
                      <tr>
                        <td className="px-6 py-4 font-medium text-[var(--gray-700)] bg-[var(--gray-50)]">
                          Weight
                        </td>
                        <td className="px-6 py-4 text-[var(--gray-600)]">
                          {machine.specifications.weight}
                        </td>
                      </tr>
                    )}
                    {machine.specifications.power && (
                      <tr>
                        <td className="px-6 py-4 font-medium text-[var(--gray-700)] bg-[var(--gray-50)]">
                          Electrical
                        </td>
                        <td className="px-6 py-4 text-[var(--gray-600)]">
                          {machine.specifications.power}
                        </td>
                      </tr>
                    )}
                    {machine.specifications.capacity && (
                      <tr>
                        <td className="px-6 py-4 font-medium text-[var(--gray-700)] bg-[var(--gray-50)]">
                          Capacity
                        </td>
                        <td className="px-6 py-4 text-[var(--gray-600)]">
                          {machine.specifications.capacity}
                        </td>
                      </tr>
                    )}
                    {machine.specifications.cooling && (
                      <tr>
                        <td className="px-6 py-4 font-medium text-[var(--gray-700)] bg-[var(--gray-50)]">
                          Cooling
                        </td>
                        <td className="px-6 py-4 text-[var(--gray-600)]">
                          {machine.specifications.cooling}
                        </td>
                      </tr>
                    )}
                    {machine.specifications.refrigerant && (
                      <tr>
                        <td className="px-6 py-4 font-medium text-[var(--gray-700)] bg-[var(--gray-50)]">
                          Refrigerant
                        </td>
                        <td className="px-6 py-4 text-[var(--gray-600)]">
                          {machine.specifications.refrigerant}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {machine.specSheetUrl && (
                <p className="mt-4 text-center text-[var(--gray-500)]">
                  For complete specifications,{" "}
                  <a
                    href={machine.specSheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--blue-500)] hover:underline"
                  >
                    download the spec sheet (PDF)
                  </a>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Related Machines */}
        {machine.relatedMachines.length > 0 && (
          <section className="section bg-[var(--gray-50)]">
            <div className="container">
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mb-8 text-center">
                You Might Also Consider
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {machine.relatedMachines.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/machines/${related.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[var(--gray-200)] hover:shadow-md hover:-translate-y-1 transition-all">
                      <div className="aspect-square bg-[var(--gray-100)]">
                        {related.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={related.imageUrl}
                            alt={related.modelNumber}
                            className="w-full h-full object-contain p-4"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[var(--gray-300)]">
                            <svg
                              className="w-16 h-16"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="font-[family-name:var(--font-outfit)] font-bold text-lg text-[var(--navy-800)]">
                          {related.modelNumber}
                        </p>
                        <p className="text-sm text-[var(--gray-600)]">
                          {related.name}
                        </p>
                        {related.shortDescription && (
                          <p className="text-xs text-[var(--gray-500)] mt-1">
                            {related.shortDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
