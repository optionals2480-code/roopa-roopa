export function Duck({ className = "", size = 80 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden>
      <ellipse cx="50" cy="68" rx="34" ry="24" fill="#FFE94A" stroke="#1a1a1a" strokeWidth="2.5" />
      <circle cx="68" cy="40" r="20" fill="#FFE94A" stroke="#1a1a1a" strokeWidth="2.5" />
      <circle cx="74" cy="36" r="3.2" fill="#1a1a1a" />
      <circle cx="75" cy="35" r="1" fill="#fff" />
      <path d="M82 42 Q94 44 92 50 Q88 54 80 50 Z" fill="#FF8C00" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M30 70 Q22 76 30 80 Q38 78 38 72 Z" fill="#FFD700" stroke="#1a1a1a" strokeWidth="2" />
    </svg>
  );
}

export function Sparkle({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
    </svg>
  );
}