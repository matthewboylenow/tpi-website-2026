"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSlide {
  title: string;
  subtitle?: string;
  description: string;
  cta: {
    text: string;
    href: string;
    external?: boolean;
  };
  secondaryCta?: {
    text: string;
    href: string;
    external?: boolean;
  };
  backgroundGradient?: string;
}

const slides: HeroSlide[] = [
  {
    title: "The Machines Behind Your Favorite Frozen Treats",
    description:
      "Taylor equipment powers ice cream shops, restaurants, and convenience stores across New York City, New Jersey, Pennsylvania and Delaware. Fast recovery, easy cleaning, and built to last—so you can focus on what matters: making customers smile.",
    cta: {
      text: "See Our Machines",
      href: "/soft-serve-frozen-yogurt",
    },
    secondaryCta: {
      text: "Find Your Perfect Fit",
      href: "https://finder.taylorproducts.net/wizard",
      external: true,
    },
    backgroundGradient:
      "from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)]",
  },
  {
    title: "What's New at Taylor Products",
    subtitle: "Latest Updates",
    description:
      "New equipment, promotions, and tips to help your business grow. We're always finding new ways to help our customers succeed.",
    cta: {
      text: "See What's New",
      href: "/new",
    },
    backgroundGradient:
      "from-[var(--blue-900)] via-[var(--blue-800)] to-[var(--navy-700)]",
  },
  {
    title: "Showroom Demo Units Available",
    subtitle: "Great Deals",
    description:
      "Gently used demo units at special pricing. Same great equipment, friendlier price. Full warranty included on select models.",
    cta: {
      text: "View Demo Units",
      href: "/soft-serve-frozen-yogurt#demo",
    },
    backgroundGradient:
      "from-[var(--navy-800)] via-[var(--blue-700)] to-[var(--navy-900)]",
  },
  {
    title: "Need Parts? Order Online 24/7",
    subtitle: "Genuine Taylor Parts",
    description:
      "Shop our online parts store for fast shipping and authentic components. The right part, when you need it.",
    cta: {
      text: "Shop Parts",
      href: "https://parts.taylorproducts.net",
      external: true,
    },
    backgroundGradient:
      "from-[var(--navy-700)] via-[var(--navy-800)] to-[var(--blue-900)]",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // Auto-advance slides
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section
      className={cn(
        "relative min-h-[70vh] flex items-center",
        "bg-gradient-to-br",
        slide.backgroundGradient
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Subtitle */}
          {slide.subtitle && (
            <p className="text-[var(--orange-400)] font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4 animate-fade-in">
              {slide.subtitle}
            </p>
          )}

          {/* Title */}
          <h1
            className="font-[family-name:var(--font-outfit)] font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 tracking-tight"
            style={{ color: 'white' }}
          >
            {slide.title}
          </h1>

          {/* Accent Line */}
          <div className="w-20 h-1 bg-[var(--orange-500)] rounded-full mb-6" />

          {/* Description */}
          <p className="text-lg mb-8 max-w-2xl leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            {slide.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            {slide.cta.external ? (
              <a
                href={slide.cta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="lg">
                  {slide.cta.text}
                </Button>
              </a>
            ) : (
              <Link href={slide.cta.href}>
                <Button variant="primary" size="lg">
                  {slide.cta.text}
                </Button>
              </Link>
            )}

            {slide.secondaryCta &&
              (slide.secondaryCta.external ? (
                <a
                  href={slide.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
                    {slide.secondaryCta.text}
                  </Button>
                </a>
              ) : (
                <Link href={slide.secondaryCta.href}>
                  <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
                    {slide.secondaryCta.text}
                  </Button>
                </Link>
              ))}
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-0 right-0 container flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  currentSlide === index
                    ? "w-8 bg-[var(--orange-500)]"
                    : "w-2 bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
