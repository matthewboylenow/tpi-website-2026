import { Award, Wrench, TrendingUp, Users } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Family-Owned Since 1985",
    description:
      "Three generations of expertise in foodservice equipment. We're not just vendors—we're partners invested in your success.",
  },
  {
    icon: Wrench,
    title: "Red Cape Service",
    description:
      "Industry-leading service response times. Our factory-trained technicians keep your equipment running at peak performance.",
  },
  {
    icon: TrendingUp,
    title: "Profit Solutions",
    description:
      "We don't just sell machines—we help you build profitable programs with menu development, training, and ongoing support.",
  },
  {
    icon: Award,
    title: "Authorized Distributor",
    description:
      "As an authorized Taylor Company distributor, you get genuine parts, factory warranties, and direct manufacturer support.",
  },
];

export function ValueProposition() {
  return (
    <section className="section bg-[var(--gray-50)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[var(--orange-500)] font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4">
            Why Taylor Products
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] font-bold text-3xl sm:text-4xl text-[var(--navy-800)] mb-4">
            What Makes Us Different
          </h2>
          <p className="text-[var(--gray-600)] text-lg">
            For nearly 40 years, we&apos;ve helped restaurants, convenience stores,
            and foodservice operators across the mid-Atlantic build profitable
            frozen dessert and hot food programs.
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
              <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-3">
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
              <p className="font-[family-name:var(--font-outfit)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                40+
              </p>
              <p className="text-[var(--gray-600)] text-sm">Years Experience</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-outfit)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                4
              </p>
              <p className="text-[var(--gray-600)] text-sm">States Covered</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-outfit)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                100+
              </p>
              <p className="text-[var(--gray-600)] text-sm">Machine Models</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-outfit)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                2
              </p>
              <p className="text-[var(--gray-600)] text-sm">Showroom Locations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
