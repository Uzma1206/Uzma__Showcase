import { motion } from 'framer-motion';

export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ink">
      <motion.div
        className="font-cinema text-5xl tracking-[0.5em] text-ember"
        initial={{ opacity: 0, letterSpacing: '0.2em' }}
        animate={{ opacity: 1, letterSpacing: '0.5em' }}
        transition={{ duration: 1.2 }}
      >
        UZMA
      </motion.div>
      <motion.div
        className="mt-6 h-px w-40 bg-gradient-to-r from-transparent via-ember to-transparent"
        animate={{ scaleX: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <p className="mt-4 text-bone/40 text-sm tracking-widest uppercase">{label}</p>
    </div>
  );
}
