import { Award, Wrench, TrendingUp, Users } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Family-Owned, Backed by Middleby",
    description:
      "Still family-owned, still the same people answering the phone — now part of the Middleby family. That means more brands under one roof: Taylor, Icetro, Flavor Burst, Emery Thompson, plus TurboChef, Blodgett, and Pitco.",
  },
  {
    icon: TrendingUp,
    title: "Equipment That Pays You Back",
    description:
      "Most machines we sell earn back their cost in 4–7 months. We help you pick the right one and make it profitable — with flexible financing on new and pre-owned equipment so the numbers work from day one.",
  },
  {
    icon: Wrench,
    title: "Red Cape Service",
    description:
      "Factory-certified techs, fully stocked service trucks, and honest 15-minute billing — rare in this business. Direct phone support, a growing knowledge base, and a real person on the other end when your machine goes down.",
  },
  {
    icon: Award,
    title: "Built in Rockton. Built Right.",
    description:
      "Taylor machines are made in Rockton, Illinois with nearly 90% American-sourced parts. Every unit is tested and inspected before it ships. The crown on the side stands for something.",
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
            Since 1985, we&apos;ve been helping local operators pick the right equipment
            and build programs that actually make money. Now part of the Middleby family,
            we carry more brands than ever — with the same family-owned service that got
            us here.
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
