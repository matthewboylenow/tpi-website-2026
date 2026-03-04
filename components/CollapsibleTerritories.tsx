"use client";

import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";

type Props = {
  territories: Record<string, string[]>;
};

export function CollapsibleTerritories({ territories }: Props) {
  const states = Object.keys(territories);
  if (states.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-[var(--orange-500)]" />
        <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm text-[var(--gray-700)]">
          Territories
        </h3>
      </div>
      <div className="space-y-1">
        {states.map((state) => (
          <StateGroup
            key={state}
            state={state}
            counties={territories[state]}
          />
        ))}
      </div>
    </div>
  );
}

function StateGroup({ state, counties }: { state: string; counties: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-[var(--blue-700)] hover:text-[var(--blue-500)] transition-colors cursor-pointer"
      >
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-0" : "-rotate-90"}`}
        />
        <span className="font-medium">
          {state} ({counties.length} {counties.length === 1 ? "county" : "counties"})
        </span>
      </button>
      {open && (
        <div className="flex flex-wrap gap-1.5 pl-6 pt-1.5 pb-2">
          {counties.map((county) => (
            <span
              key={county}
              className="inline-flex px-2.5 py-0.5 bg-[var(--blue-50)] text-[var(--blue-700)] text-xs font-medium rounded-full"
            >
              {county}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
