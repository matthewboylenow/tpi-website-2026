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
import { CATEGORY_IMAGES } from "@/lib/category-images";
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

  // Lifestyle hero image from category
  const categorySlug = machine.category?.slug;
  const heroImage = categorySlug ? CATEGORY_IMAGES[categorySlug] : undefined;

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
        {/* ── Lifestyle Hero Banner ── */}
        <section className="relative h-[280px] sm:h-[340px] overflow-hidden">
          {/* Background image */}
          {heroImage ? (
            <Image
              src={heroImage}
              alt={machine.category?.name || ""}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)]" />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-900)]/85 via-[var(--navy-900)]/60 to-transparent" />

          {/* Content */}
          <div className="container relative z-10 h-full flex flex-col justify-end pb-8 sm:pb-10">
            {/* Breadcrumb */}
            <nav className="mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-white/70">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <ChevronRight className="w-3.5 h-3.5" />
                {machine.category && (
                  <>
                    <li>
                      <Link
                        href={`/${machine.category.slug}`}
                        className="hover:text-white transition-colors"
                      >
                        {machine.category.name}
                      </Link>
                    </li>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </>
                )}
                <li className="text-white">{machine.modelNumber}</li>
              </ol>
            </nav>

            <p className="text-[var(--orange-400)] font-[family-name:var(--font-heading)] font-bold text-sm sm:text-base tracking-wider mb-1">
              MODEL {machine.modelNumber}
            </p>
            <h1
              className="font-[family-name:var(--font-heading)] font-extrabold text-2xl sm:text-4xl lg:text-5xl leading-tight tracking-tight"
              style={{ color: "white" }}
            >
              {machine.name}
            </h1>
          </div>
        </section>

        {/* ── Product Section ── */}
        <section className="py-10 sm:py-14">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Machine Image — left */}
              <div className="lg:col-span-5 relative">
                <div className="sticky top-[140px]">
                  <div className="aspect-square bg-[var(--gray-50)] rounded-xl overflow-hidden relative">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={`${machine.modelNumber} - ${machine.name}`}
                        fill
                        className="object-contain p-6"
                        sizes="(max-width: 768px) 100vw, 40vw"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--gray-300)]">
                        <svg
                          className="w-24 h-24"
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

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {machine.machineType === "28HT" && <HeatTreatmentBadge />}
                      {machine.isAdaCompliant && <AdaBadge />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info — right */}
              <div className="lg:col-span-7">
                {/* Short Description */}
                {machine.shortDescription && (
                  <p className="text-lg text-[var(--gray-600)] mb-4 leading-relaxed">
                    {machine.shortDescription}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {machine.flavorCount && (
                    <Badge variant="primary">{machine.flavorCount}</Badge>
                  )}
                  {machine.machineType && machine.machineType !== "28HT" && (
                    <Badge variant="default">{machine.machineType}</Badge>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mb-8">
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

                {/* Key Features (top 4) */}
                {features.length > 0 && (
                  <div className="bg-[var(--gray-50)] rounded-lg p-5 mb-8">
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-base text-[var(--navy-800)] mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {features.slice(0, 4).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-[var(--gray-700)] text-sm"
                        >
                          <Check className="w-4 h-4 text-[var(--success)] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Overview */}
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-[var(--navy-800)] mb-4">
                    Overview
                  </h2>
                  <div className="text-[var(--gray-700)] text-[15px] leading-relaxed space-y-3">
                    {longDescription.split("\n\n").map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* ── Combined Details Grid ── */}
                {(features.length > 0 || Object.keys(specifications).length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Full Features */}
                    {features.length > 0 && (
                      <div className="bg-[var(--gray-50)] rounded-lg p-5">
                        <h3 className="font-[family-name:var(--font-heading)] font-bold text-base text-[var(--navy-800)] mb-3 pb-2 border-b border-[var(--gray-200)]">
                          Features & Benefits
                        </h3>
                        <ul className="space-y-1.5">
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

                    {/* Specifications */}
                    {Object.keys(specifications).length > 0 && (
                      <div className="bg-[var(--gray-50)] rounded-lg p-5">
                        <h3 className="font-[family-name:var(--font-heading)] font-bold text-base text-[var(--navy-800)] mb-3 pb-2 border-b border-[var(--gray-200)]">
                          Specifications
                        </h3>
                        <dl className="space-y-1.5 text-sm">
                          {Object.entries(specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between gap-4 py-1 border-b border-[var(--gray-200)] last:border-0">
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
                          <div className="mt-3 pt-2 border-t border-[var(--gray-200)]">
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
                )}

                {/* Ideal For */}
                {idealFor.length > 0 && (
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] font-bold text-base text-[var(--navy-800)] mb-3">
                      Ideal For
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {idealFor.map((use) => {
                        const Icon = idealForIcons[use] || Building;
                        return (
                          <div
                            key={use}
                            className="inline-flex items-center gap-2 bg-[var(--gray-50)] px-3 py-1.5 rounded-full text-sm"
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
          </div>
        </section>

        {/* ── Related Machines ── */}
        {relatedMachines.length > 0 && (
          <section className="py-12 bg-[var(--gray-50)]">
            <div className="container">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)] mb-6 text-center">
                You Might Also Consider
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
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
                        <div className="aspect-[4/3] bg-[var(--gray-100)] relative">
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
                                className="w-12 h-12"
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
                        <div className="p-3">
                          <p className="font-[family-name:var(--font-heading)] font-bold text-base text-[var(--navy-800)]">
                            {related.modelNumber}
                          </p>
                          <p className="text-sm text-[var(--gray-600)]">
                            {related.name}
                          </p>
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
