import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-xl overflow-hidden",
          "border border-[var(--gray-100)]",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.04),0_12px_24px_rgba(0,0,0,0.06)]",
          hover && [
            "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            "hover:-translate-y-1",
            "hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.1)]",
            "hover:border-[var(--blue-200)]",
          ],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-[family-name:var(--font-outfit)] font-semibold text-xl tracking-tight text-[var(--navy-800)]",
      className
    )}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--gray-600)]", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

// Special card for machine display
const MachineCard = React.forwardRef<
  HTMLDivElement,
  CardProps & {
    imageUrl?: string;
    modelNumber: string;
    name: string;
    shortDescription?: string;
    tags?: string[];
    inStock?: boolean;
  }
>(
  (
    {
      className,
      imageUrl,
      modelNumber,
      name,
      shortDescription,
      tags = [],
      inStock = true,
      ...props
    },
    ref
  ) => {
    return (
      <Card ref={ref} className={cn("group", className)} {...props}>
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-[var(--gray-50)] to-[var(--gray-100)]">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={`${modelNumber} - ${name}`}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--gray-400)]">
              <svg
                className="w-16 h-16"
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

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />

          {/* In Stock Badge */}
          {inStock && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--success)] text-white">
                In Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Model Number */}
          <p className="font-[family-name:var(--font-outfit)] font-bold text-lg tracking-wider text-[var(--navy-800)]">
            {modelNumber}
          </p>

          {/* Name */}
          <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-base text-[var(--gray-700)] mt-1">
            {name}
          </h3>

          {/* Short Description */}
          {shortDescription && (
            <p className="text-sm text-[var(--gray-600)] mt-2 line-clamp-2">
              {shortDescription}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex px-2.5 py-1 bg-[var(--blue-50)] text-[var(--blue-700)] text-xs font-semibold rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    );
  }
);

MachineCard.displayName = "MachineCard";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  MachineCard,
};
