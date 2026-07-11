export function IchthysIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Top arc from tail intersection to nose */}
      <path d="M 28 28 C 45 5, 85 5, 105 30" />
      {/* Bottom arc from tail intersection to nose */}
      <path d="M 28 32 C 45 55, 85 55, 105 30" />
      {/* Cross bar (tail) — top arc continuation to lower left */}
      <path d="M 28 28 L 12 12" />
      {/* Cross bar (tail) — bottom arc continuation to upper left */}
      <path d="M 28 32 L 12 48" />
    </svg>
  );
}
