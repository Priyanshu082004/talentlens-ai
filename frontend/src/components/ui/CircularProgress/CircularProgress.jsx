import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CircularProgress({
  score = 0,
  size = 160,
  strokeWidth = 10,
  label = 'Score',
  animate = true,
}) {
  const countRef = useRef(null);
  const pathRef  = useRef(null);

  const radius        = (size - strokeWidth) / 2;
  const circumference  = 2 * Math.PI * radius;
  const targetDash     = (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 80) return '#10B981';
    if (s >= 60) return '#F59E0B';
    return '#EF4444';
  };
  const ringColor = getColor(score);

  useEffect(() => {
    if (!animate) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: score,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = Math.round(obj.val);
      },
    });

    if (pathRef.current) {
      gsap.fromTo(
        pathRef.current,
        { strokeDashoffset: circumference },
        { strokeDashoffset: circumference - targetDash, duration: 1.5, ease: 'power2.out' }
      );
    }
  }, [score, animate, circumference, targetDash]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth}
          />
          <circle
            ref={pathRef}
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={ringColor} strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - targetDash}
            style={{ filter: `drop-shadow(0 0 8px ${ringColor}80)` }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            ref={countRef}
            className="text-4xl font-bold"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: ringColor }}
          >
            {animate ? 0 : score}
          </span>
          <span className="text-xs text-gray-500 mt-0.5">/100</span>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-400">{label}</span>
    </div>
  );
}
