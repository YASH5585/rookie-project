import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "blue" | "green" | "amber" | "rose" | "neutral";
};

const toneMap = {
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-200",
  green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-200",
  rose: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-200",
  neutral:
    "border-[rgba(var(--border),0.85)] bg-[rgba(var(--muted),0.7)] text-[rgb(var(--muted-foreground))]"
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-[var(--radius)] border px-2.5 text-xs font-semibold",
        toneMap[tone],
        className
      )}
      {...props}
    />
  );
}
