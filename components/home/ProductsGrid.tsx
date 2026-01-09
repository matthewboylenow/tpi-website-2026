import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const productCategories = [
  {
    name: "Soft Serve & Frozen Yogurt",
    href: "/soft-serve-frozen-yogurt",
    description: "23+ models from countertop to floor units",
    featured: true,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "Icetro Soft Serve",
    href: "/icetro-soft-serve",
    description: "Budget-friendly alternatives with premium quality",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Two Sided Grills",
    href: "/two-sided-grills",
    description: "Crown Series and classic clamshell grills",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Milkshakes",
    href: "/milkshakes",
    description: "Single to multi-flavor shake freezers",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    name: "Ice Cream & Gelato Batch",
    href: "/ice-cream-gelato-batch",
    description: "Taylor & Emery Thompson batch freezers",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "FlavorBurst Programs",
    href: "/flavorburst-programs",
    description: "Add 8+ flavors to your soft serve",
    gradient: "from-green-500 to-teal-500",
  },
  {
    name: "Frozen Cocktails",
    href: "/frozen-cocktails",
    description: "Commercial frozen beverage machines",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    name: "Frozen Custard",
    href: "/frozen-custard",
    description: "Premium custard freezers",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    name: "Premium Slush",
    href: "/premium-slush",
    description: "High-margin slush programs",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    name: "Cool Chiller / FCB",
    href: "/frozen-soda-cool-chiller",
    description: "Frozen carbonated beverage systems",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    name: "Smoothies & Frozen Cappuccino",
    href: "/smoothies-frozen-cappuccino",
    description: "Versatile frozen beverage solutions",
    gradient: "from-emerald-500 to-green-500",
  },
];

export function ProductsGrid() {
  const featuredCategory = productCategories.find((c) => c.featured);
  const otherCategories = productCategories.filter((c) => !c.featured);

  return (
    <section className="section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[var(--orange-500)] font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4">
            Our Equipment
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] font-bold text-3xl sm:text-4xl text-[var(--navy-800)] mb-4">
            Industry-Leading Equipment Categories
          </h2>
          <p className="text-[var(--gray-600)] text-lg">
            From soft serve machines to two-sided grills, we carry the complete
            range of Taylor Company and partner brand equipment.
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
                  "p-8 flex flex-col justify-end",
                  "transition-all duration-300",
                  "hover:shadow-xl hover:-translate-y-1"
                )}
              >
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <p className="text-white/80 text-sm font-medium mb-2">
                    Most Popular
                  </p>
                  <h3 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-white mb-2">
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
                  "p-6 flex flex-col justify-end",
                  "transition-all duration-300",
                  "hover:shadow-lg hover:-translate-y-1"
                )}
              >
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Machine Finder CTA */}
        <div className="mt-12 text-center">
          <p className="text-[var(--gray-600)] mb-4">
            Not sure which machine is right for you?
          </p>
          <a
            href="https://finder.taylorproducts.net/wizard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--blue-500)] font-semibold hover:text-[var(--blue-700)] transition-colors"
          >
            Try our Machine Finder
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
