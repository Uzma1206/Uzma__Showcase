import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Particles({ count = 30, color = 'rgba(255,255,255,0.5)' }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 3 + 1,
        d: Math.random() * 8 + 6,
        delay: Math.random() * 5,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: color,
            boxShadow: `0 0 ${p.s * 3}px ${color}`,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
