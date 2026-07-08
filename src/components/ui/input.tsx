import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-10 w-full rounded-[var(--radius)] border border-[rgba(var(--border),0.9)] bg-[rgba(var(--card),0.72)] px-3 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
