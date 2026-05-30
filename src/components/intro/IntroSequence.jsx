import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroSequence({ onDone }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 2400);
    const t3 = setTimeout(() => onDone?.(), 4200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 1 ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,9,20,0.25), transparent 60%)',
        }}
      />
      <div className="relative text-center">
        <motion.h1
          className="font-cinema text-7xl md:text-9xl text-ember tracking-[0.3em]"
          initial={{ opacity: 0, scale: 1.2, letterSpacing: '0.1em' }}
          animate={{
            opacity: stage >= 1 ? 1 : 0,
            scale: stage >= 1 ? 1 : 1.2,
            letterSpacing: '0.3em',
          }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textShadow: '0 0 60px rgba(229,9,20,0.6)' }}
        >
          UZMA
        </motion.h1>
        <motion.div
          className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-bone/60 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: stage >= 2 ? '70%' : 0 }}
          transition={{ duration: 1.2 }}
        />
        <motion.p
          className="mt-5 text-bone/60 tracking-[0.4em] uppercase text-xs md:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 2 ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          A cinematic memory experience
        </motion.p>
      </div>
    </motion.div>
  );
}
