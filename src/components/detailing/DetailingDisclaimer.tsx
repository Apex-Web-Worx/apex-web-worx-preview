import { DETAILING_DISCLAIMER, DETAILING_DISCLAIMER_SUB, DETAILING_BUILD } from "@/lib/detailing-demo";

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
        <p className="text-[11px] sm:text-xs text-[#E6007A] font-semibold tracking-wide">
          {DETAILING_DISCLAIMER}
        </p>
        <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1 max-w-xl mx-auto leading-snug">
          {DETAILING_DISCLAIMER_SUB}
        </p>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-xs text-[#E6007A]/90 font-semibold tracking-wide">{DETAILING_DISCLAIMER}</p>
        <p className="text-[11px] text-gray-500 mt-1.5 max-w-lg mx-auto leading-relaxed">
          {DETAILING_DISCLAIMER_SUB}
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-black/95 border-b border-[#E6007A]/20 px-3 sm:px-4 py-2 text-center backdrop-blur-sm ${className}`}>
      <p className="text-[10px] sm:text-xs text-[#E6007A] font-semibold tracking-wide">
        {DETAILING_DISCLAIMER}
      </p>
      <p className="text-[10px] text-gray-500 mt-0.5 max-w-2xl mx-auto leading-snug hidden sm:block">
        {DETAILING_DISCLAIMER_SUB} · Build {DETAILING_BUILD}
      </p>
    </div>
  );
}
