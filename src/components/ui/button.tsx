import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-[var(--radius)] px-4 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] shadow-sm hover:brightness-105",
        secondary:
          "bg-[rgba(var(--secondary),0.14)] text-[rgb(var(--foreground))] hover:bg-[rgba(var(--secondary),0.22)]",
        outline:
          "border border-[rgba(var(--border),0.9)] bg-[rgba(var(--card),0.62)] text-[rgb(var(--foreground))] hover:bg-[rgba(var(--muted),0.9)]",
        ghost: "text-[rgb(var(--foreground))] hover:bg-[rgba(var(--muted),0.82)]",
        danger:
          "bg-[rgba(var(--danger),0.12)] text-[rgb(var(--danger))] hover:bg-[rgba(var(--danger),0.18)]"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-5 text-base",
        icon: "h-10 w-10 px-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
