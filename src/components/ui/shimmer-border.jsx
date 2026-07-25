import { cn } from "@/lib/utils";

export const ShimmerBorder = ({
  shimmerColor = "#ffffff",
  spread = "90deg",
  duration = "3s",
  borderWidth = "1px",
  className,
}) => {
  return (
    <span
      aria-hidden
      style={{
        "--spread": spread,
        "--shimmer-color": shimmerColor,
        "--speed": duration,
        "--border-width": borderWidth,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:var(--border-width)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        className,
      )}
    >
      <span className="absolute inset-0 overflow-visible blur-[2px] [container-type:size]">
        <span className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:2] [border-radius:0] [mask:none]">
          <span className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </span>
      </span>
    </span>
  );
};
