import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "28ht";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-[var(--gray-100)] text-[var(--gray-700)]",
      primary: "bg-[var(--blue-50)] text-[var(--blue-700)]",
      secondary: "bg-[var(--orange-100)] text-[var(--orange-700)]",
      success: "bg-green-100 text-green-800",
      warning: "bg-amber-100 text-amber-800",
      error: "bg-red-100 text-red-800",
      "28ht": `
        bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100
        border border-blue-300/30
        text-blue-700
        bg-[length:200%_200%]
        animate-shimmer
      `,
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1",
          "font-[family-name:var(--font-heading)] font-semibold text-xs",
          "tracking-wide rounded-full",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

// Special badge for "In Stock" status
const InStockBadge = React.forwardRef<
  HTMLSpanElement,
  Omit<BadgeProps, "variant">
>(({ className, children, ...props }, ref) => (
  <Badge ref={ref} variant="success" className={className} {...props}>
    <span className="w-1.5 h-1.5 rounded-full bg-current" />
    {children || "In Stock"}
  </Badge>
));

InStockBadge.displayName = "InStockBadge";

// Special badge for "New" items
const NewBadge = React.forwardRef<
  HTMLSpanElement,
  Omit<BadgeProps, "variant">
>(({ className, children, ...props }, ref) => (
  <Badge ref={ref} variant="secondary" className={className} {...props}>
    {children || "New"}
  </Badge>
));

NewBadge.displayName = "NewBadge";

// Special badge for 28HT heat treatment machines
const HeatTreatmentBadge = React.forwardRef<
  HTMLSpanElement,
  Omit<BadgeProps, "variant">
>(({ className, children, ...props }, ref) => (
  <Badge ref={ref} variant="28ht" className={className} {...props}>
    <svg
      className="w-3 h-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
    {children || "28HT"}
  </Badge>
));

HeatTreatmentBadge.displayName = "HeatTreatmentBadge";

// ADA Compliant badge
const AdaBadge = React.forwardRef<HTMLSpanElement, Omit<BadgeProps, "variant">>(
  ({ className, children, ...props }, ref) => (
    <Badge ref={ref} variant="primary" className={className} {...props}>
      <svg
        className="w-3 h-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {children || "ADA"}
    </Badge>
  )
);

AdaBadge.displayName = "AdaBadge";

export { Badge, InStockBadge, NewBadge, HeatTreatmentBadge, AdaBadge };
