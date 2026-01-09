import { Award, Wrench, TrendingUp, Users } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Family-Owned Since 1985",
    description:
      "40 years. Same commitment. When you call, you talk to people who actually care whether your machine is working.",
  },
  {
    icon: Wrench,
    title: "Red Cape Service",
    description:
      "When your freezer goes down on a Saturday night, we answer the phone. Our factory-trained techs get you back up fast.",
  },
  {
    icon: TrendingUp,
    title: "We Help You Make Money",
    description:
      "Menu ideas, staff training, profit calculators—we're invested in your success long after the machine is installed.",
  },
  {
    icon: Award,
    title: "Genuine Taylor Parts & Support",
    description:
      "Direct access to factory parts, warranties, and the people who built your machine. No third-party runaround.",
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
            We&apos;re a family business that&apos;s been helping local operators succeed since 1985.
            From ice cream shops to convenience stores, we don&apos;t just sell equipment—we
            help you build a program that actually makes money.
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
              <p className="text-[var(--gray-600)] text-sm">Years in Business</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-outfit)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                4
              </p>
              <p className="text-[var(--gray-600)] text-sm">States We Call Home</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-outfit)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                100+
              </p>
              <p className="text-[var(--gray-600)] text-sm">Models to Choose From</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-outfit)] font-bold text-4xl text-[var(--blue-500)] mb-2">
                2
              </p>
              <p className="text-[var(--gray-600)] text-sm">Showrooms — Come Visit!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
