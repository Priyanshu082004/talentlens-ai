import clsx from 'clsx';

/**
 * Ambient glow orb — purely decorative, pointer-events none.
 * The signature design element of ResumeAI. Place inside a
 * `relative overflow-hidden` container.
 */
export default function OrbGlow({
  color = '#6366F1',
  size = 600,
  opacity = 0.15,
  top,
  left,
  right,
  bottom,
  className = '',
}) {
  return (
    <div
      aria-hidden="true"
      className={clsx('orb', className)}
      style={{
        width:  size,
        height: size,
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
        opacity,
        top, left, right, bottom,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}
