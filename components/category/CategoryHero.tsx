import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryHeroProps {
  title: string;
  description: string;
  backgroundImage?: string;
  gradient?: string;
}

export function CategoryHero({
  title,
  description,
  backgroundImage,
  gradient = "from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)]",
}: CategoryHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[40vh] flex items-center",
        "bg-gradient-to-br",
        gradient
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span>/</span>
                <span className="text-white">{title}</span>
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-outfit)] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6 tracking-tight">
            {title}
          </h1>

          {/* Accent Line */}
          <div className="w-20 h-1 bg-[var(--orange-500)] rounded-full mb-6" />

          {/* Description */}
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
