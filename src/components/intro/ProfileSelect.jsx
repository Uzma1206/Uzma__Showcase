import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authcontext';

const profiles = [
  {
    id: 'User1',
    name: 'User1',
    color: 'from-rose-500/40 via-ember/50 to-rose-700/30',
  },
  {
    id: 'guest',
    name: 'Guest',
    color: 'from-zinc-500/40 via-zinc-600/30 to-zinc-800/30',
  },
];

export default function ProfileSelect() {
  const nav = useNavigate();
  const { selectProfile } = useAuth();

  const choose = (id) => {
    selectProfile(id);
    setTimeout(() => nav('/home'), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <motion.h2
        className="font-cinema text-4xl md:text-6xl text-bone mb-3 tracking-wide"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Who's watching?
      </motion.h2>
      <p className="text-bone/40 mb-16 tracking-widest text-sm uppercase">
        Choose your profile
      </p>

      <div className="flex gap-10 md:gap-16 flex-wrap justify-center">
        {profiles.map((p, i) => (
          <motion.button
            data-hover
            key={p.id}
            onClick={() => choose(p.id)}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.06 }}
            className="group flex flex-col items-center"
          >
            <div
              className={`relative w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden bg-gradient-to-br ${p.color} ring-1 ring-white/10 group-hover:ring-ember/60 transition-all duration-500`}
            >
              <div className="absolute inset-0 flex items-center justify-center font-cinema text-5xl md:text-7xl text-bone/90">
                {p.name.charAt(0)}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <span className="mt-5 text-bone/70 group-hover:text-bone tracking-widest uppercase text-sm transition">
              {p.name}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
