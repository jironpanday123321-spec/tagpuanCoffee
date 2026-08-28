import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  /** Show the dot grid overlay (default: true) */
  dots?: boolean;
  /** Dot color — any valid CSS color (default: rgba(0,0,0,0.15)) */
  dotColor?: string;
  /** Dot grid spacing in px (default: 24) */
  dotSpacing?: number;
  /** Dot radius in px (default: 1) */
  dotRadius?: number;
}

/** Shared dot-grid overlay */
const DotPattern = ({
  dotColor = "rgba(0,0,0,0.15)",
  dotSpacing = 24,
  dotRadius = 1,
}: Pick<GradientBackgroundProps, "dotColor" | "dotSpacing" | "dotRadius">) => (
  <div
    aria-hidden="true"
    className="absolute inset-0 z-[1] pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(circle, ${dotColor} ${dotRadius}px, transparent ${dotRadius}px)`,
      backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
    }}
  />
);

/** Radial gradient from top (white → indigo) with optional dot grid */
export const GradientTop = ({
  className,
  children,
  dots = true,
  dotColor,
  dotSpacing,
  dotRadius,
}: GradientBackgroundProps) => (
  <div className={cn("min-h-screen w-full relative overflow-hidden", className)}>
    {/* Gradient layer */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
      }}
    />
    {/* Dot overlay */}
    {dots && <DotPattern dotColor={dotColor} dotSpacing={dotSpacing} dotRadius={dotRadius} />}
    {/* Content */}
    <div className="relative z-10">{children}</div>
  </div>
);

/** Radial gradient from bottom (white → slate) with optional dot grid */
export const GradientBottom = ({
  className,
  children,
  dots = true,
  dotColor,
  dotSpacing,
  dotRadius,
}: GradientBackgroundProps) => (
  <div className={cn("min-h-screen w-full relative overflow-hidden", className)}>
    {/* Gradient layer */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
      }}
    />
    {/* Dot overlay */}
    {dots && <DotPattern dotColor={dotColor} dotSpacing={dotSpacing} dotRadius={dotRadius} />}
    {/* Content */}
    <div className="relative z-10">{children}</div>
  </div>
);

/** Generic wrapper — bring your own gradient, get the dot grid free */
export const GradientBackground = ({
  className,
  children,
  dots = false,
  dotColor,
  dotSpacing,
  dotRadius,
}: GradientBackgroundProps) => (
  <div className={cn("w-full relative overflow-hidden", className)}>
    {dots && <DotPattern dotColor={dotColor} dotSpacing={dotSpacing} dotRadius={dotRadius} />}
    <div className="relative z-10">{children}</div>
  </div>
);

