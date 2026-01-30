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
      font-[family-name:var(--font-heading)] font-semibold
      rounded-xl
      transition-all duration-200 ease-out
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    `;

    const variants = {
      primary: `
        bg-[var(--orange-500)] text-white
        shadow-sm
        hover:bg-[var(--orange-600)]
        hover:shadow-md hover:shadow-orange-500/25
        active:bg-[var(--orange-700)]
        focus-visible:ring-[var(--orange-500)]
      `,
      secondary: `
        bg-[var(--blue-500)] text-white
        shadow-sm
        hover:bg-[var(--blue-600)]
        hover:shadow-md hover:shadow-blue-500/25
        active:bg-[var(--blue-700)]
        focus-visible:ring-[var(--blue-500)]
      `,
      ghost: `
        bg-transparent
        text-[var(--blue-600)]
        border border-[var(--blue-200)]
        hover:bg-[var(--blue-50)]
        hover:border-[var(--blue-300)]
        active:bg-[var(--blue-100)]
        focus-visible:ring-[var(--blue-500)]
      `,
      outline: `
        bg-white
        text-[var(--gray-700)]
        border border-[var(--gray-200)]
        shadow-sm
        hover:bg-[var(--gray-50)]
        hover:border-[var(--gray-300)]
        active:bg-[var(--gray-100)]
        focus-visible:ring-[var(--gray-400)]
      `,
      link: `
        bg-transparent
        text-[var(--blue-600)]
        underline-offset-4
        hover:underline
        hover:text-[var(--blue-700)]
        p-0
        focus-visible:ring-[var(--blue-500)]
      `,
    };

    const sizes = {
      sm: "text-sm px-3.5 py-2 rounded-lg",
      md: "text-sm px-5 py-2.5",
      lg: "text-base px-6 py-3",
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
