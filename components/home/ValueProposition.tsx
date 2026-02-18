import { Award, Wrench, TrendingUp, Users } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "40 Years in the Business",
    description:
      "We've been doing this since 1985. When you call us, you get a real person who knows your equipment and wants to get you back up and running.",
  },
  {
    icon: Wrench,
    title: "Red Cape Service",
    description:
      "Your freezer goes down on a Saturday night. We pick up the phone. Our factory-trained technicians are on it.",
  },
  {
    icon: TrendingUp,
    title: "Built to Make You Money",
    description:
      "Menu planning, staff training, profit calculators. We stick around after the install to make sure the numbers work.",
  },
  {
    icon: Award,
    title: "Genuine Taylor Parts & Support",
    description:
      "Factory parts, full warranties, and direct access to the people who know your machine inside and out. No middlemen.",
  },
];

export function ValueProposition() {
  return (
    <section className="section bg-[var(--gray-50)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[var(--orange-500)] font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4">
            Why Taylor Products
          </p>
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-[var(--navy-800)] mb-4">
            Why Taylor Products
          </h2>
          <p className="text-[var(--gray-600)] text-lg">
            We&apos;ve been selling, servicing, and supporting Taylor equipment since 1985.
            Whether you&apos;re running an ice cream shop, a restaurant, or a chain of
            convenience stores, we&apos;ll help you pick the right machine and build a
            program around it that makes real money.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--blue-500)] text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-8 h-8" />
              </div>

              {/* Title */}
              <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--gray-600)] leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-16 border-t border-[var(--gray-200)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-[family-name:var(--font-heading)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                40+
              </p>
              <p className="text-[var(--gray-600)] text-sm">Years in Business</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-heading)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                4
              </p>
              <p className="text-[var(--gray-600)] text-sm">States Covered</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-heading)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                100+
              </p>
              <p className="text-[var(--gray-600)] text-sm">Models Available</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-heading)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                2
              </p>
              <p className="text-[var(--gray-600)] text-sm">Showrooms</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
