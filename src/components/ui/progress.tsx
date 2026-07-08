import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  className?: string;
  tone?: "blue" | "green" | "amber" | "rose";
};

const toneMap = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500"
};

export function Progress({ value, className, tone = "blue" }: ProgressProps) {
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-[var(--radius)] bg-[rgba(var(--muted),0.9)]", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
    >
      <div
        className={cn("h-full rounded-[var(--radius)] transition-all duration-500", toneMap[tone])}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
