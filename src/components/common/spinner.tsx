import { cn } from "@/lib/utils";

export default function Spinner({ className }: { className?: string }) {
  const circles = Array.from({ length: 12 });

  return (
    <div className={cn("text-primary relative mx-auto h-10 w-10", className)}>
      {circles.map((_, i) => {
        const rotate = i * 30; // 360 / 12
        const delay = -(1.2 - i * 0.1).toFixed(1) + "s";

        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{ transform: `rotate(${rotate}deg)` }}
          >
            <div
              className="animate-circle-fade mx-auto h-[15%] w-[15%] rounded-full bg-current"
              style={{ animationDelay: delay }}
            />
          </div>
        );
      })}
    </div>
  );
}
