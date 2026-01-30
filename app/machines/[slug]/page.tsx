import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge, HeatTreatmentBadge, AdaBadge } from "@/components/ui/badge";
import { ContactSection } from "@/components/home/ContactSection";
import { ProductSchema, BreadcrumbSchema } from "@/components/Schema";
import {
  getMachineWithCategory,
  getAllMachineSlugs,
  getRelatedMachines,
} from "@/lib/data";
import { getMachineImage, getSpecSheet } from "@/lib/assets";
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

// Generate static paths for all machines
export async function generateStaticParams() {
  const slugs = await getAllMachineSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const machine = await getMachineWithCategory(slug);

  if (!machine) {
    return {
      title: "Machine Not Found",
    };
  }

  return {
    title: machine.metaTitle || `${machine.modelNumber} - ${machine.name}`,
    description: machine.metaDescription || machine.shortDescription || machine.description,
    openGraph: {
      title: `${machine.modelNumber} - ${machine.name} | Taylor Products`,
      description: machine.metaDescription || machine.shortDescription || undefined,
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
  "Hotels & Resorts": Building,
  "Amusement Parks": Building,
  "Schools & Universities": Building,
  "Healthcare Facilities": Building,
  "Bars & Nightclubs": Building,
};

export default async function MachinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const machine = await getMachineWithCategory(slug);

  if (!machine) {
    notFound();
  }

  // Get related machines from same category
  const relatedMachines = machine.categoryId
    ? await getRelatedMachines(machine.categoryId, slug)
    : [];

  // Get image and spec URLs from assets if not in database
  const imageUrl = machine.imageUrl || getMachineImage(machine.modelNumber);
  const specSheetUrl = machine.specSheetUrl || getSpecSheet(machine.modelNumber);

  // Parse features and idealFor (stored as arrays in DB)
  const features = machine.features || [];
  const idealFor = machine.idealFor || [];

  // Parse specifications (stored as JSONB in DB)
  const specifications = (machine.specifications as Record<string, string>) || {};

  // Default long description if none in database
  const longDescription =
    machine.longDescription ||
    machine.description ||
    `The Taylor ${machine.modelNumber} ${machine.name} is a reliable commercial machine designed for high-volume foodservice operations. Contact us to learn more about this model and how it can benefit your business.`;

  // Build breadcrumb items for schema
  const breadcrumbItems = [
    { name: "Home", url: "https://taylorproducts.net" },
    ...(machine.category
      ? [{ name: machine.category.name, url: `https://taylorproducts.net/${machine.category.slug}` }]
      : []),
    { name: `${machine.modelNumber} - ${machine.name}`, url: `https://taylorproducts.net/machines/${slug}` },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ProductSchema
        name={machine.name}
        model={machine.modelNumber}
        description={machine.shortDescription || machine.description || `Commercial ${machine.name} from Taylor Products`}
        image={imageUrl}
        url={`https://taylorproducts.net/machines/${slug}`}
        category={machine.category?.name}
        sku={machine.modelNumber}
        brand="Taylor"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

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
                {machine.category && (
                  <>
                    <li>
                      <Link
                        href={`/${machine.category.slug}`}
                        className="hover:text-[var(--blue-500)] transition-colors"
                      >
                        {machine.category.name}
                      </Link>
                    </li>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
                <li className="text-[var(--gray-900)]">{machine.modelNumber}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image */}
              <div className="relative">
                <div className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden border border-[var(--gray-200)]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${machine.modelNumber} - ${machine.name}`}
                      width={600}
                      height={600}
                      className="object-contain p-6 w-full h-full"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
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
                {machine.shortDescription && (
                  <p className="text-xl text-[var(--gray-600)] mb-6">
                    {machine.shortDescription}
                  </p>
                )}

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
                  {specSheetUrl && (
                    <a
                      href={specSheetUrl}
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
                {features.length > 0 && (
                  <div className="bg-[var(--gray-50)] rounded-lg p-6">
                    <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {features.slice(0, 4).map((feature) => (
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
                )}
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
                {longDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features & Specifications - Unified Section */}
        {(features.length > 0 || Object.keys(specifications).length > 0 || idealFor.length > 0) && (
          <section className="section bg-[var(--gray-50)]">
            <div className="container">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Features */}
                  {features.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
                      <h2 className="font-[family-name:var(--font-outfit)] font-bold text-xl text-[var(--navy-800)] mb-4 pb-3 border-b border-[var(--gray-200)]">
                        Features & Benefits
                      </h2>
                      <ul className="space-y-2">
                        {features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-[var(--gray-700)] text-sm"
                          >
                            <Check className="w-4 h-4 text-[var(--success)] flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Right Column - Specs */}
                  {Object.keys(specifications).length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
                      <h2 className="font-[family-name:var(--font-outfit)] font-bold text-xl text-[var(--navy-800)] mb-4 pb-3 border-b border-[var(--gray-200)]">
                        Specifications
                      </h2>
                      <dl className="space-y-2 text-sm">
                        {Object.entries(specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between gap-4 py-1.5 border-b border-[var(--gray-100)] last:border-0">
                            <dt className="font-medium text-[var(--gray-600)] capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </dt>
                            <dd className="text-[var(--gray-900)] text-right">
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      {specSheetUrl && (
                        <div className="mt-4 pt-3 border-t border-[var(--gray-200)]">
                          <a
                            href={specSheetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-[var(--blue-600)] hover:text-[var(--blue-700)]"
                          >
                            <FileText className="w-4 h-4" />
                            Download Full Spec Sheet (PDF)
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Ideal For - Below in single row if exists */}
                {idealFor.length > 0 && (
                  <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
                    <h2 className="font-[family-name:var(--font-outfit)] font-bold text-xl text-[var(--navy-800)] mb-4 pb-3 border-b border-[var(--gray-200)]">
                      Ideal For
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {idealFor.map((use) => {
                        const Icon = idealForIcons[use] || Building;
                        return (
                          <div
                            key={use}
                            className="inline-flex items-center gap-2 bg-[var(--gray-50)] px-4 py-2 rounded-full text-sm"
                          >
                            <Icon className="w-4 h-4 text-[var(--orange-600)]" />
                            <span className="text-[var(--gray-700)]">{use}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Related Machines */}
        {relatedMachines.length > 0 && (
          <section className="section bg-[var(--gray-50)]">
            <div className="container">
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)] mb-8 text-center">
                You Might Also Consider
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {relatedMachines.map((related) => {
                  const relatedImage =
                    related.imageUrl || getMachineImage(related.modelNumber);
                  return (
                    <Link
                      key={related.slug}
                      href={`/machines/${related.slug}`}
                      className="group"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[var(--gray-200)] hover:shadow-md hover:-translate-y-1 transition-all">
                        <div className="aspect-square bg-[var(--gray-100)] relative">
                          {relatedImage ? (
                            <Image
                              src={relatedImage}
                              alt={related.modelNumber}
                              fill
                              className="object-contain p-4"
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
                  );
                })}
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
