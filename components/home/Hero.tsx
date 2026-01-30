"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
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
  backgroundImage: string;
  overlayColor?: string;
}

const slides: HeroSlide[] = [
  {
    title: "The Machines Behind Your Favorite Frozen Treats",
    description:
      "Taylor equipment powers ice cream shops, restaurants, and convenience stores across New York City, New Jersey, Pennsylvania and Delaware.",
    cta: {
      text: "Explore Machines",
      href: "/soft-serve-frozen-yogurt",
    },
    secondaryCta: {
      text: "Find Your Perfect Fit",
      href: "https://finder.taylorproducts.net/wizard",
      external: true,
    },
    backgroundImage: "https://www.taylor-company.com/wp-content/uploads/2023/05/SoftServe_Header_2560x1418.jpg",
    overlayColor: "from-black/70 via-black/50 to-transparent",
  },
  {
    title: "Frozen Custard & Batch Ice Cream",
    subtitle: "Premium Quality",
    description:
      "From small batch artisan gelato to high-volume custard production, we have the equipment to match your vision.",
    cta: {
      text: "See Batch Freezers",
      href: "/frozen-custard",
    },
    backgroundImage: "https://www.taylor-company.com/wp-content/uploads/2023/05/CustardBatch_Header_2560x1418.jpg",
    overlayColor: "from-black/70 via-black/50 to-transparent",
  },
  {
    title: "Slushies, Shakes & Frozen Drinks",
    subtitle: "Cool Profits",
    description:
      "High-margin frozen beverages that keep customers coming back. Fast recovery, consistent quality, every pour.",
    cta: {
      text: "View Beverage Equipment",
      href: "/premium-slush",
    },
    backgroundImage: "https://www.taylor-company.com/wp-content/uploads/2023/05/Slushie_Header_2560x1418.jpg",
    overlayColor: "from-black/70 via-black/50 to-transparent",
  },
  {
    title: "Need Parts? Order Online 24/7",
    subtitle: "Genuine Taylor Parts",
    description:
      "Shop our online parts store for fast shipping and authentic components. The right part, when you need it.",
    cta: {
      text: "Shop Parts Store",
      href: "https://parts.taylorproducts.net",
      external: true,
    },
    backgroundImage: "https://www.taylor-company.com/wp-content/uploads/2023/05/Acessories_Header_2560x1418.jpg",
    overlayColor: "from-black/70 via-black/50 to-transparent",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  // Auto-advance slides
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Images - Preload all for smooth transitions */}
      {slides.map((s, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={s.backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          {/* Gradient Overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r",
            s.overlayColor || "from-black/60 via-black/40 to-transparent"
          )} />
        </div>
      ))}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-[var(--orange-500)]/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--blue-500)]/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          {/* Subtitle Badge */}
          {slide.subtitle && (
            <div
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 transition-all duration-500",
                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              )}
            >
              <Play className="w-3 h-3 text-[var(--orange-400)] fill-current" />
              <span className="text-sm font-medium text-white">{slide.subtitle}</span>
            </div>
          )}

          {/* Title */}
          <h1
            className={cn(
              "font-[family-name:var(--font-heading)] font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6 transition-all duration-500",
              isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            )}
            style={{
              color: 'white',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              letterSpacing: '-0.02em'
            }}
          >
            {slide.title}
          </h1>

          {/* Description */}
          <p
            className={cn(
              "text-lg sm:text-xl text-white/90 mb-8 max-w-xl leading-relaxed transition-all duration-500 delay-100",
              isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            )}
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.2)' }}
          >
            {slide.description}
          </p>

          {/* CTAs */}
          <div
            className={cn(
              "flex flex-wrap gap-4 transition-all duration-500 delay-200",
              isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            )}
          >
            {slide.cta.external ? (
              <a
                href={slide.cta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="lg" className="shadow-lg shadow-orange-500/30">
                  {slide.cta.text}
                </Button>
              </a>
            ) : (
              <Link href={slide.cta.href}>
                <Button variant="primary" size="lg" className="shadow-lg shadow-orange-500/30">
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
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:border-white/50"
                  >
                    {slide.secondaryCta.text}
                  </Button>
                </a>
              ) : (
                <Link href={slide.secondaryCta.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:border-white/50"
                  >
                    {slide.secondaryCta.text}
                  </Button>
                </Link>
              ))}
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-0 right-0 container flex items-center justify-between">
          {/* Progress Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  currentSlide === index
                    ? "w-12 bg-[var(--orange-500)]"
                    : "w-6 bg-white/40 group-hover:bg-white/60"
                )} />
              </button>
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all border border-white/10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all border border-white/10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
