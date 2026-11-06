export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 shrink-0"
      >
        <defs>
          <linearGradient id="nahid-logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fb923c" />
            <stop offset="1" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          fill="url(#nahid-logo-gradient)"
        />
        <path
          d="M9 23V9l14 14V9"
          fill="none"
          stroke="#0a0a0b"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-lg font-extrabold tracking-widest">
        NAHID<span className="text-brand">.</span>
      </span>
    </span>
  );
}
