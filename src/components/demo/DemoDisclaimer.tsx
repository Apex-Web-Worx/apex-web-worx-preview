import { DEMO_DISCLAIMER, DEMO_BUILD } from "@/lib/demo";

interface DemoDisclaimerProps {
  className?: string;
  variant?: "banner" | "inline";
}

export default function DemoDisclaimer({
  className = "",
  variant = "banner",
}: DemoDisclaimerProps) {
  if (variant === "inline") {
    return (
      <p
        className={`text-[11px] sm:text-sm text-[#C8A45D]/90 font-medium tracking-wide leading-snug ${className}`}
      >
        {DEMO_DISCLAIMER}
      </p>
    );
  }

  return (
    <div
      className={`bg-[#0F0F0D] px-3 sm:px-4 py-2.5 sm:py-3 text-center ${className}`}
    >
      <p className="text-[11px] leading-snug sm:text-sm text-[#C8A45D] font-medium tracking-wide px-1">
        {DEMO_DISCLAIMER}
        <span className="hidden sm:inline text-[#C8A45D]/50"> · Build {DEMO_BUILD}</span>
      </p>
    </div>
  );
}
