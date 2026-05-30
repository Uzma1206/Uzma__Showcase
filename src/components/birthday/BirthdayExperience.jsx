import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Particles from '../ui/Particles';

const SLIDES = [
  'Once upon a time…',
  'There was a girl who turned ordinary days into stories.',
  'She laughed in a way that rewrote rooms.',
  'She made silence feel safe, and chaos feel like home.',
  'And tonight, the universe pauses just for her.',
  'Happy Birthday, Uzma.',
  'You made ordinary moments unforgettable.',
];

function Typewriter({ text, speed = 45, onDone }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i < text.length) {
      const t = setTimeout(() => setI(i + 1), speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => onDone?.(), 1600);
      return () => clearTimeout(t);
    }
  }, [i, text, speed, onDone]);
  return (
    <span className="font-cinema">
      {text.slice(0, i)}
      <span className="opacity-60 animate-pulse">|</span>
    </span>
  );
}

export default function BirthdayExperience() {
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);
  const nav = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(229,9,20,0.18), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(255,46,77,0.12), transparent 70%)',
        }}
      />
      <Particles count={80} color="rgba(255,210,180,0.7)" />

      <button
        data-hover
        onClick={() => nav('/home')}
        className="absolute top-6 left-6 z-30 glass rounded-full p-3 text-bone/70 hover:text-ember"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {!done && (
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(15px)' }}
              transition={{ duration: 1 }}
              className="max-w-3xl"
            >
              <p className="text-2xl md:text-5xl text-bone leading-snug">
                <Typewriter
                  text={SLIDES[stage]}
                  onDone={() => {
                    if (stage < SLIDES.length - 1) setStage(stage + 1);
                    else setDone(true);
                  }}
                />
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <motion.h1
              animate={{
                textShadow: [
                  '0 0 20px rgba(229,9,20,0.4)',
                  '0 0 80px rgba(229,9,20,0.8)',
                  '0 0 20px rgba(229,9,20,0.4)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="font-cinema text-6xl md:text-9xl text-ember tracking-wider"
            >
              Happy Birthday
            </motion.h1>
            <motion.h2
              initial={{ letterSpacing: '0.1em', opacity: 0 }}
              animate={{ letterSpacing: '0.4em', opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.6 }}
              className="font-cinema text-4xl md:text-7xl shimmer-text"
            >
              UZMA
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="text-bone/70 italic max-w-xl mx-auto text-lg"
            >
              Some people become home. You became mine.
            </motion.p>

            <motion.button
              data-hover
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              onClick={() => nav('/home')}
              className="btn-cinema bg-ember text-white px-8 py-3 rounded-lg tracking-widest uppercase text-sm mt-6"
            >
              Continue watching
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ y: '110vh', x: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 1, 1, 0],
              x: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute text-ember/70 text-2xl"
          >
            ♥
          </motion.span>
        ))}
      </div>
    </div>
  );
}
