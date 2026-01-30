"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge, HeatTreatmentBadge, AdaBadge } from "@/components/ui/badge";
import { FileText, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMachineImage, getSpecSheet } from "@/lib/assets";

// Machine type - this would come from the database in production
export interface Machine {
  id: number;
  modelNumber: string;
  name: string;
  slug: string;
  shortDescription?: string;
  imageUrl?: string;
  specSheetUrl?: string;
  flavorCount?: string;
  machineType?: string;
  isAdaCompliant?: boolean;
  isFeatured?: boolean;
  isInStock?: boolean;
  isDemoUnit?: boolean;
  demoDiscountPercent?: number;
}

// Subcategory with machines
export interface Subcategory {
  id: number;
  name: string;
  machines: Machine[];
}

interface MachineGridProps {
  subcategories: Subcategory[];
}

export function MachineGrid({ subcategories }: MachineGridProps) {
  return (
    <section className="section">
      <div className="container">
        {subcategories.map((subcategory) => (
          <div key={subcategory.id} className="mb-16 last:mb-0">
            {/* Subcategory Header */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)]">
                {subcategory.name}
              </h2>
              <div className="flex-1 h-px bg-[var(--gray-200)]" />
              <span className="text-sm text-[var(--gray-500)]">
                {subcategory.machines.length} model
                {subcategory.machines.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Machines Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subcategory.machines.map((machine) => (
                <MachineGridCard key={machine.id} machine={machine} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MachineGridCard({ machine }: { machine: Machine }) {
  const tags: string[] = [];
  if (machine.flavorCount) tags.push(machine.flavorCount);
  if (machine.machineType && machine.machineType !== "28HT") {
    tags.push(machine.machineType);
  }

  // Get image and spec URLs from assets, falling back to provided URLs
  const imageUrl = machine.imageUrl || getMachineImage(machine.modelNumber);
  const specSheetUrl = machine.specSheetUrl || getSpecSheet(machine.modelNumber);

  return (
    <div className="group relative">
      <Link href={`/machines/${machine.slug}`}>
        <div
          className={cn(
            "bg-white rounded-xl overflow-hidden",
            "border border-[var(--gray-100)]",
            "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.04),0_12px_24px_rgba(0,0,0,0.06)]",
            "transition-all duration-300",
            "hover:-translate-y-1",
            "hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.1)]",
            "hover:border-[var(--blue-200)]"
          )}
        >
          {/* Image */}
          <div className="relative aspect-square bg-gradient-to-br from-[var(--gray-50)] to-[var(--gray-100)]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${machine.modelNumber} - ${machine.name}`}
                fill
                className="object-contain p-6"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--gray-400)]">
                <svg
                  className="w-20 h-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}

            {/* Badges Overlay */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {machine.isDemoUnit && (
                <Badge variant="secondary">
                  Demo -{machine.demoDiscountPercent}%
                </Badge>
              )}
            </div>

            {/* Special Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {machine.machineType === "28HT" && <HeatTreatmentBadge />}
              {machine.isAdaCompliant && <AdaBadge />}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Model Number */}
            <p className="font-[family-name:var(--font-heading)] font-bold text-lg tracking-wider text-[var(--navy-800)]">
              {machine.modelNumber}
            </p>

            {/* Name */}
            <h3 className="font-[family-name:var(--font-heading)] font-medium text-base text-[var(--gray-700)] mt-1">
              {machine.name}
            </h3>

            {/* Short Description */}
            {machine.shortDescription && (
              <p className="text-sm text-[var(--gray-600)] mt-2 line-clamp-2">
                {machine.shortDescription}
              </p>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons - Appear on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex gap-2">
          {specSheetUrl && (
            <a
              href={specSheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="w-4 h-4" />
                Specs
              </Button>
            </a>
          )}
          <Link
            href="/meet-your-salesperson"
            onClick={(e) => e.stopPropagation()}
            className="flex-1"
          >
            <Button variant="primary" size="sm" className="w-full">
              <MessageSquare className="w-4 h-4" />
              Quote
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
