import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "focus-ring min-h-28 w-full resize-y rounded-[var(--radius)] border border-[rgba(var(--border),0.9)] bg-[rgba(var(--card),0.72)] px-3 py-2 text-sm leading-6 text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
