import { cn } from '@/lib/utils';
import React from 'react';


export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-lg border bg-white text-card-foreground shadow-sm", className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-4", className)}
        {...props}
      />
    );
  }
);

CardContent.displayName = "CardContent";
