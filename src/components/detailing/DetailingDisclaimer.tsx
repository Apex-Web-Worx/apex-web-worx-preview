import { DETAILING_DISCLAIMER, DETAILING_DISCLAIMER_SUB } from "@/lib/detailing-demo";

interface DetailingDisclaimerProps {
  className?: string;
  variant?: "banner" | "inline" | "footer";
}

export default function DetailingDisclaimer({
  className = "",
  variant = "banner",
}: DetailingDisclaimerProps) {
  if (variant === "inline") {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-[11px] sm:text-xs text-[#00e5ff]/90 font-medium tracking-wide">
          {DETAILING_DISCLAIMER}
        </p>
        <p className="text-[10px] sm:text-[11px] text-[#94a3b8]/80 mt-1 max-w-xl mx-auto leading-snug">
          {DETAILING_DISCLAIMER_SUB}
        </p>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-xs text-[#00e5ff]/80 font-medium tracking-wide">{DETAILING_DISCLAIMER}</p>
        <p className="text-[11px] text-[#94a3b8]/70 mt-1.5 max-w-lg mx-auto leading-relaxed">
          {DETAILING_DISCLAIMER_SUB}
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-[#0d0d12] border-b border-white/5 px-3 sm:px-4 py-2 sm:py-2.5 text-center ${className}`}>
      <p className="text-[11px] sm:text-xs text-[#00e5ff]/90 font-medium tracking-wide">
        {DETAILING_DISCLAIMER}
      </p>
      <p className="text-[10px] sm:text-[11px] text-[#94a3b8]/70 mt-0.5 max-w-2xl mx-auto leading-snug hidden sm:block">
        {DETAILING_DISCLAIMER_SUB}
      </p>
    </div>
  );
}
