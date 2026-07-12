import type { CSSProperties, ReactNode } from "react";

export function CardCornerAccents() {
  return (
    <>
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#C8A45D]/35 pointer-events-none transition-colors duration-500 group-hover:border-[#C8A45D]/60" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#C8A45D]/35 pointer-events-none transition-colors duration-500 group-hover:border-[#C8A45D]/60" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#C8A45D]/35 pointer-events-none transition-colors duration-500 group-hover:border-[#C8A45D]/60" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#C8A45D]/35 pointer-events-none transition-colors duration-500 group-hover:border-[#C8A45D]/60" />
    </>
  );
}

export function CardAmbientDecor({ seed = 0 }: { seed?: number }) {
  const dots = [
    { top: "22%", left: "12%", size: 2, opacity: 0.35 },
    { top: "55%", left: "8%", size: 1.5, opacity: 0.25 },
    { top: "70%", right: "18%", size: 2, opacity: 0.3 },
    { top: "35%", right: "10%", size: 1.5, opacity: 0.2 },
  ];
  const dot = dots[seed % dots.length];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-36"
        style={{ background: "radial-gradient(ellipse at center bottom, rgba(200, 164, 93, 0.07) 0%, transparent 72%)" }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: "radial-gradient(ellipse at center top, rgba(200, 164, 93, 0.05) 0%, transparent 70%)" }}
      />
      <div className="absolute right-4 top-[38%] bottom-5 w-px bg-gradient-to-b from-transparent via-[#C8A45D]/12 to-[#C8A45D]/28" />
      <div className="absolute left-4 top-[45%] bottom-8 w-px bg-gradient-to-b from-transparent via-[#C8A45D]/8 to-[#C8A45D]/18" />
      <div className="absolute left-4 bottom-5 w-px h-14 bg-gradient-to-t from-[#C8A45D]/22 to-transparent" />
      <div
        className="absolute top-[30%] right-6 w-16 h-px rotate-[25deg] opacity-20 group-hover:opacity-35 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200, 164, 93, 0.5), transparent)" }}
      />
      <div
        className="absolute bottom-[28%] left-6 w-12 h-px -rotate-[18deg] opacity-15 group-hover:opacity-28 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200, 164, 93, 0.4), transparent)" }}
      />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full border border-[#C8A45D]/[0.07]" />
      <div className="absolute -bottom-14 -right-14 w-28 h-28 rounded-full border border-[#C8A45D]/[0.05]" />
      <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full border border-[#C8A45D]/[0.04]" />
      <div
        className="absolute rounded-full bg-[#C8A45D]"
        style={{
          top: dot.top,
          left: "left" in dot ? dot.left : undefined,
          right: "right" in dot ? dot.right : undefined,
          width: dot.size,
          height: dot.size,
          opacity: dot.opacity,
        }}
      />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 opacity-35 group-hover:opacity-55 transition-opacity duration-500">
        <div
          className="h-px w-10"
          style={{ background: "linear-gradient(90deg, transparent, rgba(200, 164, 93, 0.45))" }}
        />
        <div className="w-1 h-1 rotate-45 border border-[#C8A45D]/45" />
        <div
          className="h-px w-10"
          style={{ background: "linear-gradient(270deg, transparent, rgba(200, 164, 93, 0.45))" }}
        />
      </div>
    </div>
  );
}

export function CardSpacerDecor({ itemCount }: { itemCount: number }) {
  const intensity =
    itemCount <= 2 ? "full" : itemCount <= 4 ? "medium" : itemCount <= 6 ? "light" : "minimal";

  if (intensity === "minimal") {
    return (
      <div className="flex-1 flex flex-col justify-end pt-6 pb-1 pointer-events-none" aria-hidden="true">
        <div
          className="h-px w-2/5 opacity-20"
          style={{ background: "linear-gradient(90deg, rgba(200, 164, 93, 0.15) 0%, transparent 100%)" }}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-end pt-10 pb-2 pointer-events-none" aria-hidden="true">
      <div
        className={`space-y-2.5 transition-opacity duration-500 ${
          intensity === "full"
            ? "opacity-[0.32] group-hover:opacity-[0.48]"
            : intensity === "medium"
              ? "opacity-[0.28] group-hover:opacity-[0.4]"
              : "opacity-[0.2] group-hover:opacity-[0.32]"
        }`}
      >
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, rgba(200, 164, 93, 0.22) 0%, rgba(200, 164, 93, 0.06) 55%, transparent 100%)" }}
        />
        <div
          className={`h-px bg-gradient-to-r from-[#C8A45D]/14 to-transparent ${intensity === "light" ? "w-3/5" : "w-4/5"}`}
        />
        {intensity !== "light" && (
          <div
            className="h-px w-3/5"
            style={{ background: "linear-gradient(90deg, rgba(200, 164, 93, 0.08) 0%, transparent 100%)" }}
          />
        )}
      </div>
      <div
        className={`flex justify-center mt-5 transition-opacity duration-500 ${
          intensity === "full" ? "opacity-30 group-hover:opacity-45" : "opacity-22 group-hover:opacity-35"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-0.5 rounded-full bg-[#C8A45D]/70" />
          <div className="w-1 h-1 rotate-45 bg-[#C8A45D]/30" />
          {intensity === "full" && <div className="w-0.5 h-0.5 rounded-full bg-[#C8A45D]/50" />}
          <div className="w-0.5 h-0.5 rounded-full bg-[#C8A45D]/70" />
        </div>
      </div>
    </div>
  );
}

export function CardContentTopRule({ inset = "left-6 right-6" }: { inset?: string }) {
  return (
    <div className={`absolute top-0 ${inset} flex items-center gap-3 pointer-events-none`} aria-hidden="true">
      <div
        className="h-px flex-1"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200, 164, 93, 0.18) 50%, transparent)" }}
      />
      <div className="w-1 h-1 rotate-45 border border-[#C8A45D]/25" />
      <div
        className="h-px flex-1"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200, 164, 93, 0.18) 50%, transparent)" }}
      />
    </div>
  );
}

export function MenuItemDivider() {
  return (
    <div className="mt-5 flex items-center gap-2.5" aria-hidden="true">
      <div
        className="h-px flex-1"
        style={{ background: "linear-gradient(90deg, rgba(200, 164, 93, 0.14) 0%, transparent 100%)" }}
      />
      <div className="flex items-center gap-1 opacity-40">
        <div className="w-0.5 h-0.5 rounded-full bg-[#C8A45D]" />
        <div className="w-1 h-1 rotate-45 border border-[#C8A45D]/30" />
        <div className="w-0.5 h-0.5 rounded-full bg-[#C8A45D]" />
      </div>
      <div
        className="h-px flex-1 max-w-[30%]"
        style={{ background: "linear-gradient(270deg, rgba(200, 164, 93, 0.08) 0%, transparent 100%)" }}
      />
    </div>
  );
}

export function SectionHeaderAccent() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,90vw)] h-32"
        style={{ background: "radial-gradient(ellipse at center, rgba(200, 164, 93, 0.06) 0%, transparent 70%)" }}
      />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A45D]/10 to-transparent" />
    </div>
  );
}

export function TitleAccentLines() {
  return (
    <div className="mt-3 flex flex-col gap-[5px]">
      <div className="flex items-center gap-2">
        <div
          className="h-[2px] w-10 rounded-full"
          style={{ background: "linear-gradient(90deg, #C8A45D 0%, rgba(200, 164, 93, 0.6) 100%)" }}
        />
        <div className="h-px w-5 bg-[#C8A45D]/35" />
        <div className="w-1 h-1 rotate-45 bg-[#C8A45D]/50" />
      </div>
      <div
        className="h-px w-full max-w-[130px]"
        style={{ background: "linear-gradient(90deg, rgba(200, 164, 93, 0.55) 0%, rgba(200, 164, 93, 0.12) 70%, transparent 100%)" }}
      />
      <div
        className="h-px w-full max-w-[200px]"
        style={{ background: "linear-gradient(90deg, rgba(200, 164, 93, 0.2) 0%, transparent 100%)" }}
      />
    </div>
  );
}

export function SectionSideRails() {
  return (
    <>
      <div className="hidden lg:block absolute left-0 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-[#C8A45D]/12 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="hidden lg:block absolute right-0 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-[#C8A45D]/12 to-transparent pointer-events-none" aria-hidden="true" />
    </>
  );
}

export function SectionBadgeOrnament() {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#C8A45D]/50" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#C8A45D]/55" />
      <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#C8A45D]/50" />
    </div>
  );
}

export function StepConnector() {
  return (
    <div className="flex items-center gap-1 w-12 sm:w-16" aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-[#C8A45D]/35 to-[#C8A45D]/12" />
      <div className="w-1 h-1 rotate-45 border border-[#C8A45D]/35" />
      <div className="h-px flex-1 bg-gradient-to-l from-[#C8A45D]/12 to-transparent" />
    </div>
  );
}

export function MenuPageAtmosphere() {
  return (
    <>
      <div className="menu-section-glow-left" aria-hidden="true" />
      <div className="menu-section-glow-right" aria-hidden="true" />
      <div className="menu-section-embers" aria-hidden="true" />
    </>
  );
}


export function LuxuryPanel({
  children,
  className = "",
  seed = 0,
  topRuleInset = "left-5 right-5",
  shimmer = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  seed?: number;
  topRuleInset?: string | false;
  shimmer?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-sm ${shimmer ? "menu-card-luxury" : ""} ${className}`}
      style={{
        background: "#171714",
        border: "1px solid rgba(200, 164, 93, 0.18)",
        ...style,
      }}
    >
      <CardCornerAccents />
      <CardAmbientDecor seed={seed} />
      <div className="relative z-[1]">
        {topRuleInset !== false && <CardContentTopRule inset={topRuleInset} />}
        {children}
      </div>
    </div>
  );
}
