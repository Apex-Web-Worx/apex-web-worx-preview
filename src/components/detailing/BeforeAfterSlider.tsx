import { useState, useRef, useCallback } from "react";
import { GripVertical } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeGradient: string;
  afterGradient: string;
  beforeLabel: string;
  afterLabel: string;
  title: string;
}

export default function BeforeAfterSlider({
  beforeGradient,
  afterGradient,
  beforeLabel,
  afterLabel,
  title,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="detail-card overflow-hidden">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] cursor-col-resize select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        role="slider"
        aria-label={`Before and after comparison: ${title}`}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: beforeGradient }}
        >
          <span className="absolute top-3 left-3 text-xs uppercase tracking-widest font-medium text-white/60 bg-black/40 px-2 py-1 rounded">
            {beforeLabel}
          </span>
          <div className="w-3/4 h-1/2 rounded-lg bg-black/20 border border-white/10" />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="absolute inset-0" style={{ background: afterGradient }} />
          <span className="absolute top-3 left-3 text-xs uppercase tracking-widest font-medium text-white/80 bg-black/40 px-2 py-1 rounded">
            {afterLabel}
          </span>
          <div className="w-3/4 h-1/2 rounded-lg bg-white/10 border border-white/20 shadow-[0_0_40px_rgba(0,229,255,0.2)]" />
        </div>

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#00e5ff] shadow-[0_0_12px_#00e5ff]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#00e5ff] flex items-center justify-center shadow-[0_0_16px_rgba(0,229,255,0.5)]">
            <GripVertical className="w-4 h-4 text-[#0a0a0c]" />
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-white/5">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}
