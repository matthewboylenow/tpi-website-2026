import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_CARDS, HEROES } from "@/lib/assets";
import { type Category } from "@/lib/schema";

// Visual config for categories - maps slug to display properties
const categoryConfig: Record<
  string,
  { image?: string; gradient: string; featured?: boolean }
> = {
  "soft-serve-frozen-yogurt": {
    image: CATEGORY_CARDS.softServe,
    gradient: "from-blue-500 to-blue-600",
    featured: true,
  },
  "icetro-soft-serve": {
    image: HEROES.icetro,
    gradient: "from-cyan-500 to-blue-500",
  },
  "two-sided-grills": {
    image: CATEGORY_CARDS.grills,
    gradient: "from-orange-500 to-red-500",
  },
  milkshakes: {
    image: CATEGORY_CARDS.milkshakes,
    gradient: "from-pink-500 to-purple-500",
  },
  "ice-cream-gelato-batch": {
    image: CATEGORY_CARDS.batch,
    gradient: "from-indigo-500 to-purple-500",
  },
  "flavorburst-programs": {
    image: CATEGORY_CARDS.flavorburst,
    gradient: "from-green-500 to-teal-500",
  },
  "frozen-cocktails": {
    image: CATEGORY_CARDS.cocktails,
    gradient: "from-amber-500 to-orange-500",
  },
  "frozen-custard": {
    image: CATEGORY_CARDS.custard,
    gradient: "from-yellow-500 to-amber-500",
  },
  "premium-slush": {
    image: CATEGORY_CARDS.slush,
    gradient: "from-blue-400 to-cyan-400",
  },
  "frozen-soda-cool-chiller": {
    image: CATEGORY_CARDS.coolChiller,
    gradient: "from-sky-500 to-blue-500",
  },
  "smoothies-frozen-cappuccino": {
    image: CATEGORY_CARDS.smoothies,
    gradient: "from-emerald-500 to-green-500",
  },
};

interface ProductsGridProps {
  categories: Category[];
}

export function ProductsGrid({ categories }: ProductsGridProps) {
  // Merge database categories with visual config
  const productCategories = categories.map((cat) => ({
    name: cat.name,
    href: `/${cat.slug}`,
    description: cat.description || "",
    image: categoryConfig[cat.slug]?.image,
    gradient: categoryConfig[cat.slug]?.gradient || "from-gray-500 to-gray-600",
    featured: categoryConfig[cat.slug]?.featured || false,
  }));

  const featuredCategory = productCategories.find((c) => c.featured);
  const otherCategories = productCategories.filter((c) => !c.featured);

  return (
    <section className="section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[var(--orange-500)] font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4">
            Our Equipment
          </p>
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-[var(--navy-800)] mb-4">
            Find Your Perfect Machine
          </h2>
          <p className="text-[var(--gray-600)] text-lg">
            Soft serve, shakes, grills, batch freezers—we&apos;ve got the equipment
            to match your menu and your budget.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Featured Category - Larger Card */}
          {featuredCategory && (
            <Link
              href={featuredCategory.href}
              className="md:col-span-2 lg:col-span-2 xl:col-span-2 group"
            >
              <div
                className={cn(
                  "relative h-full min-h-[280px] rounded-xl overflow-hidden",
                  "bg-gradient-to-br",
                  featuredCategory.gradient,
                  "transition-all duration-300",
                  "hover:shadow-xl hover:-translate-y-1"
                )}
              >
                {/* Background Image */}
                {featuredCategory.image && (
                  <Image
                    src={featuredCategory.image}
                    alt={featuredCategory.name}
                    fill
                    className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                  />
                )}

                {/* Gradient overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t",
                    "from-black/70 via-black/30 to-transparent"
                  )}
                />

                <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                  <p className="text-white/80 text-sm font-medium mb-2">
                    Most Popular
                  </p>
                  <h3
                    className="font-[family-name:var(--font-heading)] font-bold text-2xl mb-2"
                    style={{ color: 'white' }}
                  >
                    {featuredCategory.name}
                  </h3>
                  <p className="text-white/80 mb-4">
                    {featuredCategory.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                    Browse Machines
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Other Categories */}
          {otherCategories.map((category) => (
            <Link key={category.href} href={category.href} className="group">
              <div
                className={cn(
                  "relative h-full min-h-[180px] rounded-xl overflow-hidden",
                  "bg-gradient-to-br",
                  category.gradient,
                  "transition-all duration-300",
                  "hover:shadow-lg hover:-translate-y-1"
                )}
              >
                {/* Background Image */}
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover opacity-25 group-hover:opacity-35 transition-opacity"
                  />
                )}

                {/* Gradient overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t",
                    "from-black/60 via-black/20 to-transparent"
                  )}
                />

                <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                  <h3
                    className="font-[family-name:var(--font-heading)] font-semibold text-lg mb-1"
                    style={{ color: 'white' }}
                  >
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Machine Finder CTA */}
        <div className="mt-12 text-center">
          <p className="text-[var(--gray-600)] mb-4">
            Not sure where to start? Our interactive finder asks a few quick questions
            and recommends the perfect machine for your business.
          </p>
          <a
            href="https://finder.taylorproducts.net/wizard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--blue-500)] font-semibold hover:text-[var(--blue-700)] transition-colors"
          >
            Let&apos;s Find Your Machine
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
