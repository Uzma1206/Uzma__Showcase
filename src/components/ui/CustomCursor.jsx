import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      const t = e.target;
      setHover(
        t.closest('a, button, [data-hover]') !== null
      );
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches)
    return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[100] rounded-full mix-blend-difference"
        animate={{
          x: pos.x - 6,
          y: pos.y - 6,
          scale: hover ? 1.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{ width: 12, height: 12, background: '#fff' }}
      />
      <motion.div
        className="pointer-events-none fixed z-[99] rounded-full border border-white/30"
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hover ? 1.4 : 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        style={{ width: 40, height: 40 }}
      />
    </>
  );
}
