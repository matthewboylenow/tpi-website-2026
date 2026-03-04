import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Category } from "@/lib/schema";

// Bento grid config — order matters, size controls the layout
const gridItems: { slug: string; image: string; size: "large" | "wide" | "standard" }[] = [
  { slug: "soft-serve-frozen-yogurt", image: "/homepage-img/soft-serve.jpg", size: "large" },
  { slug: "two-sided-grills", image: "/homepage-img/grills.jpg", size: "wide" },
  { slug: "frozen-cocktails", image: "/homepage-img/frozen-cocktails.jpg", size: "wide" },
  { slug: "icetro-soft-serve", image: "/homepage-img/icetro.jpg", size: "standard" },
  { slug: "milkshakes", image: "/homepage-img/milkshakes.jpg", size: "standard" },
  { slug: "ice-cream-gelato-batch", image: "/homepage-img/gelato.jpg", size: "standard" },
  { slug: "flavorburst-programs", image: "/homepage-img/flavorburst.jpg", size: "standard" },
  { slug: "frozen-soda-cool-chiller", image: "/homepage-img/cool-chiller.png", size: "standard" },
  { slug: "frozen-custard", image: "/homepage-img/frozen-custard.jpg", size: "standard" },
  { slug: "premium-slush", image: "/homepage-img/slush.png", size: "standard" },
  { slug: "smoothies-frozen-cappuccino", image: "/homepage-img/java-latte.jpg", size: "standard" },
];

const sizeClasses = {
  large: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  wide: "md:col-span-2 lg:col-span-2",
  standard: "",
};

interface ProductsGridProps {
  categories: Category[];
}

export function ProductsGrid({ categories }: ProductsGridProps) {
  // Build display list: only show items that exist in the database
  const items = gridItems
    .map((item) => {
      const cat = categories.find((c) => c.slug === item.slug);
      if (!cat) return null;
      return { ...item, name: cat.name, href: `/${cat.slug}` };
    })
    .filter(Boolean);

  return (
    <section className="section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[var(--orange-500)] font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4">
            Our Equipment
          </p>
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-[var(--navy-800)] mb-4">
            Our Equipment
          </h2>
          <p className="text-[var(--gray-600)] text-lg">
            Soft serve, shakes, grills, batch freezers. Whatever you&apos;re serving,
            we have a machine for it.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:auto-rows-[210px]">
          {items.map((item) => (
            <Link
              key={item!.slug}
              href={item!.href}
              className={cn(
                "group relative block overflow-hidden rounded-xl bg-[var(--navy-800)] min-h-[200px]",
                sizeClasses[item!.size]
              )}
            >
              <Image
                src={item!.image}
                alt={item!.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={
                  item!.size === "standard"
                    ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    : "(max-width: 768px) 100vw, 50vw"
                }
              />

              {/* Subtle bottom gradient for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

              {/* Category name */}
              <h3 className="absolute bottom-0 left-0 p-4 font-[family-name:var(--font-heading)] font-bold text-lg drop-shadow-lg" style={{ color: "white" }}>
                {item!.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* Machine Finder CTA */}
        <div className="mt-12 text-center">
          <p className="text-[var(--gray-600)] mb-4">
            Not sure which machine you need? Answer a few questions and we&apos;ll
            point you in the right direction.
          </p>
          <a
            href="https://finder.taylorproducts.net/wizard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--blue-500)] font-semibold hover:text-[var(--blue-700)] transition-colors"
          >
            Start Here
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
