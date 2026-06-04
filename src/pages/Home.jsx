import { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import MemoryRow from '../components/home/MemoryRow';
import Loader from '../components/ui/Loader';
import useMemories from '../hooks/useMemories';
import { useAuth } from '../context/authcontext';
import { ROW_TITLES } from '../data/seedMemories';
import { Gift } from 'lucide-react';

export default function Home() {
  const { memories, loading } = useMemories();
  const { profile } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!profile) nav('/');
  }, [profile, nav]);

  const hero =
  memories.find((m) => m.title === 'In Every Lifetime') ||
  memories[0];

  const grouped = useMemo(() => {
    const map = {};
    ROW_TITLES.forEach((t) => (map[t] = []));
    map['Memories'] = memories;
    map['Continue Watching'] = memories.slice(0, 4);
    memories.forEach((m) => {
      if (m.category && map[m.category] !== undefined) map[m.category].push(m);
    });
    return map;
  }, [memories]);

  if (loading) return <Loader label="Preparing your memories" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-ink"
    >
      <Navbar />
      <Hero memory={hero} />

      <div className="relative -mt-16 md:-mt-32 z-20 pb-24">
        {ROW_TITLES.map((t) => (
          <MemoryRow key={t} title={t} items={grouped[t]} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-6 md:mx-12 my-16 glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-radial-fade opacity-60" />
          <div className="relative">
            <Gift className="mx-auto text-ember mb-5" size={36} />
            <h3 className="font-cinema text-3xl md:text-5xl text-bone mb-4">
              Something special waits for you.
            </h3>
            <p className="text-bone/60 max-w-xl mx-auto mb-8">
              A cinematic moment crafted only for you.
            </p>
            <button
              data-hover
              onClick={() => nav('/birthday')}
              className="btn-cinema bg-ember text-white px-8 py-3 rounded-lg tracking-widest uppercase text-sm"
            >
              Open the gift
            </button>
          </div>
        </motion.div>

        <footer className="text-center text-bone/30 text-xs tracking-widest uppercase pt-8">
          © UZMA — Made with love, in cinematic silence.
        </footer>
      </div>
    </motion.div>
  );
}
