"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  COUNTY_PATHS,
  STATE_BOUNDARIES,
  MAP_VIEWBOX,
  type CountyPath,
} from "@/lib/county-map-data";
import type { CountyMapEntry, SalespersonMapEntry } from "@/lib/data";

// Salesperson color palette (brand colors)
const COLOR_PALETTE = ["#0066B2", "#FF7B00", "#2E7D32", "#7B1FA2"];
const UNASSIGNED_COLOR = "#E9ECEF";

interface TerritoryMapProps {
  counties: CountyMapEntry[];
  salespeople: SalespersonMapEntry[];
}

type TooltipData = {
  name: string;
  state: string;
  salesperson: SalespersonMapEntry | null;
  x: number;
  y: number;
};

function buildColorMap(salespeople: SalespersonMapEntry[]) {
  const map: Record<number, string> = {};
  salespeople.forEach((sp, i) => {
    map[sp.id] = COLOR_PALETTE[i % COLOR_PALETTE.length];
  });
  return map;
}

function buildCountyLookup(counties: CountyMapEntry[]) {
  const map = new Map<string, CountyMapEntry>();
  for (const c of counties) {
    map.set(`${c.name}|${c.state}`, c);
  }
  return map;
}

export function TerritoryMap({ counties, salespeople }: TerritoryMapProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [spotlightId, setSpotlightId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const colorMap = buildColorMap(salespeople);
  const countyLookup = buildCountyLookup(counties);
  const spLookup = new Map(salespeople.map((sp) => [sp.id, sp]));

  // Intersection observer for entry animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getCountyColor = useCallback(
    (countyPath: CountyPath) => {
      const entry = countyLookup.get(`${countyPath.name}|${countyPath.state}`);
      if (!entry?.salespersonId) return UNASSIGNED_COLOR;
      return colorMap[entry.salespersonId] || UNASSIGNED_COLOR;
    },
    [countyLookup, colorMap]
  );

  const getCountyOpacity = useCallback(
    (countyPath: CountyPath) => {
      if (spotlightId === null) return 1;
      const entry = countyLookup.get(`${countyPath.name}|${countyPath.state}`);
      return entry?.salespersonId === spotlightId ? 1 : 0.2;
    },
    [spotlightId, countyLookup]
  );

  const handleCountyHover = useCallback(
    (countyPath: CountyPath, event: React.MouseEvent) => {
      const entry = countyLookup.get(`${countyPath.name}|${countyPath.state}`);
      const sp = entry?.salespersonId ? spLookup.get(entry.salespersonId) ?? null : null;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTooltip({
        name: countyPath.name,
        state: countyPath.state,
        salesperson: sp,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    },
    [countyLookup, spLookup]
  );

  const handleCountyClick = useCallback(
    (countyPath: CountyPath) => {
      const entry = countyLookup.get(`${countyPath.name}|${countyPath.state}`);
      if (!entry?.salespersonId) return;
      const sp = spLookup.get(entry.salespersonId);
      if (!sp) return;
      const card = document.getElementById(`salesperson-${sp.slug}`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.classList.add("ring-2", "ring-[var(--orange-500)]");
        setTimeout(() => {
          card.classList.remove("ring-2", "ring-[var(--orange-500)]");
        }, 2000);
      }
    },
    [countyLookup, spLookup]
  );

  const handleLegendClick = useCallback((spId: number) => {
    setSpotlightId((prev) => (prev === spId ? null : spId));
  }, []);

  const handleKeyDown = useCallback(
    (countyPath: CountyPath, event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleCountyClick(countyPath);
      }
    },
    [handleCountyClick]
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4 justify-center">
        {salespeople.map((sp) => {
          const isActive = spotlightId === sp.id;
          return (
            <button
              key={sp.id}
              onClick={() => handleLegendClick(sp.id)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                isActive
                  ? "ring-2 ring-offset-1 ring-[var(--navy-800)] border-[var(--navy-800)]"
                  : spotlightId !== null
                    ? "opacity-50 border-[var(--gray-300)]"
                    : "border-[var(--gray-300)] hover:border-[var(--gray-500)]"
              }`}
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: colorMap[sp.id] }}
              />
              {sp.firstName} {sp.lastName}
            </button>
          );
        })}
        {spotlightId !== null && (
          <button
            onClick={() => setSpotlightId(null)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm text-[var(--gray-600)] border border-[var(--gray-300)] hover:border-[var(--gray-500)] transition-all"
          >
            Show All
          </button>
        )}
      </div>

      {/* SVG Map */}
      <svg
        ref={svgRef}
        viewBox={MAP_VIEWBOX}
        className="w-full h-auto"
        role="img"
        aria-label="Interactive territory map showing county assignments across NJ, PA, NY, and DE"
        onMouseLeave={() => setTooltip(null)}
      >
        {/* County fills */}
        {COUNTY_PATHS.map((cp, i) => (
          <path
            key={cp.fips}
            d={cp.d}
            fill={getCountyColor(cp)}
            stroke="#fff"
            strokeWidth="0.5"
            opacity={isVisible ? getCountyOpacity(cp) : 0}
            className="cursor-pointer transition-all duration-200 hover:brightness-80"
            style={{
              transitionDelay: isVisible ? `${i * 8}ms` : "0ms",
              transitionProperty: "opacity, filter",
            }}
            role="button"
            tabIndex={0}
            aria-label={`${cp.name} County, ${cp.state}`}
            onMouseMove={(e) => handleCountyHover(cp, e)}
            onMouseLeave={() => setTooltip(null)}
            onClick={() => handleCountyClick(cp)}
            onKeyDown={(e) => handleKeyDown(cp, e)}
          />
        ))}

        {/* State boundary outlines */}
        {STATE_BOUNDARIES.map((sb) => (
          <path
            key={sb.state}
            d={sb.d}
            fill="none"
            stroke="var(--navy-800)"
            strokeWidth="1.5"
            pointerEvents="none"
          />
        ))}

        {/* State labels */}
        {[
          { state: "PA", x: 220, y: 220 },
          { state: "NJ", x: 490, y: 340 },
          { state: "NY", x: 550, y: 130 },
          { state: "DE", x: 385, y: 445 },
        ].map(({ state, x, y }) => (
          <text
            key={state}
            x={x}
            y={y}
            textAnchor="middle"
            className="fill-[var(--navy-800)] text-[14px] font-bold pointer-events-none select-none"
            style={{ fontFamily: "var(--font-heading)" }}
            opacity={isVisible ? 0.4 : 0}
          >
            {state}
          </text>
        ))}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-10 pointer-events-none bg-white rounded-lg shadow-lg border border-[var(--gray-200)] px-3 py-2 text-sm"
          style={{
            left: Math.min(tooltip.x + 12, (containerRef.current?.clientWidth ?? 800) - 200),
            top: tooltip.y - 60,
          }}
        >
          <p className="font-semibold text-[var(--navy-800)]">
            {tooltip.name} County, {tooltip.state}
          </p>
          {tooltip.salesperson ? (
            <div className="text-[var(--gray-600)]">
              <p>
                {tooltip.salesperson.firstName} {tooltip.salesperson.lastName}
              </p>
              {tooltip.salesperson.phone && (
                <p className="text-xs">{tooltip.salesperson.phone}</p>
              )}
            </div>
          ) : (
            <p className="text-[var(--gray-400)] text-xs italic">Unassigned</p>
          )}
        </div>
      )}
    </div>
  );
}
