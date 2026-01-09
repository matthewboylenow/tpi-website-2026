"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-[family-name:var(--font-outfit)] font-semibold
      tracking-wide uppercase
      rounded-lg
      transition-all duration-200 ease-out
      disabled:opacity-50 disabled:cursor-not-allowed
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    `;

    const variants = {
      primary: `
        bg-gradient-to-b from-[var(--orange-500)] to-[var(--orange-600)]
        text-white border-none
        shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(255,123,0,0.3)]
        hover:from-[var(--orange-400)] hover:to-[var(--orange-500)]
        hover:-translate-y-0.5
        hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_8px_rgba(255,123,0,0.4)]
        active:translate-y-0
        active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]
        focus-visible:ring-[var(--orange-500)]
      `,
      secondary: `
        bg-gradient-to-b from-[var(--blue-500)] to-[var(--blue-600)]
        text-white border-none
        shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_4px_rgba(0,102,178,0.3)]
        hover:from-[var(--blue-400)] hover:to-[var(--blue-500)]
        hover:-translate-y-0.5
        hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_8px_rgba(0,102,178,0.4)]
        active:translate-y-0
        focus-visible:ring-[var(--blue-500)]
      `,
      ghost: `
        bg-transparent
        text-[var(--blue-600)]
        border-2 border-[var(--blue-500)]
        hover:bg-[var(--blue-50)]
        hover:border-[var(--blue-600)]
        focus-visible:ring-[var(--blue-500)]
      `,
      outline: `
        bg-white
        text-[var(--gray-700)]
        border border-[var(--gray-300)]
        hover:bg-[var(--gray-50)]
        hover:border-[var(--gray-400)]
        focus-visible:ring-[var(--gray-500)]
      `,
      link: `
        bg-transparent
        text-[var(--blue-500)]
        underline-offset-4
        hover:underline
        hover:text-[var(--blue-700)]
        p-0
        focus-visible:ring-[var(--blue-500)]
      `,
    };

    const sizes = {
      sm: "text-xs px-3 py-2",
      md: "text-sm px-5 py-2.5",
      lg: "text-base px-8 py-3",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
