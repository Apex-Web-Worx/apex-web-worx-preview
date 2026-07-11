import { DEMO_DISCLAIMER } from "@/lib/demo";

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
        className={`text-xs sm:text-sm text-[#C8A45D]/90 font-medium tracking-wide ${className}`}
      >
        {DEMO_DISCLAIMER}
      </p>
    );
  }

  return (
    <div
      className={`bg-[#C8A45D]/10 border border-[#C8A45D]/25 px-4 py-3 text-center ${className}`}
    >
      <p className="text-xs sm:text-sm text-[#C8A45D] font-medium tracking-wide">
        {DEMO_DISCLAIMER}
      </p>
    </div>
  );
}
