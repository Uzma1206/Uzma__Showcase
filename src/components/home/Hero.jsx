import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Particles from '../ui/Particles';

export default function Hero({ memory }) {
  const nav = useNavigate();
  if (!memory) return null;

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        {memory.videos?.length ? (
  <video
    src={memory.videos[0]}
            autoPlay
            muted
            loop
            playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <img
            src={memory.backdrop || memory.cover}
            alt={memory.title}
       className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-cinema-grad" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,8,11,0.95) 0%, rgba(8,8,11,0.4) 60%, transparent 100%)',
        }}
      />
      <Particles count={25} color="rgba(255,255,255,0.4)" />

      <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-6 md:px-16 pb-24 md:pb-0 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-ember tracking-[0.4em] text-xs md:text-sm uppercase mb-4"
        >
          A UZMA Original
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="font-cinema text-5xl md:text-8xl text-bone leading-[1.05] text-shadow-cinema"
        >
          {memory.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-6 text-bone/70 text-lg md:text-xl max-w-xl font-light italic"
        >
          "{memory.quote || memory.caption}"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            data-hover
            onClick={() => nav(`/memory/${memory.id}`)}
            className="btn-cinema flex items-center gap-2 bg-bone text-ink px-7 py-3 rounded-lg font-semibold"
          >
            <Play size={18} fill="currentColor" /> Play Memory
          </button>
          <button
            data-hover
            onClick={() => nav(`/memory/${memory.id}`)}
            className="btn-cinema flex items-center gap-2 glass px-7 py-3 rounded-lg text-bone"
          >
            <Info size={18} /> More Info
          </button>
        </motion.div>
      </div>
    </section>
  );
}
