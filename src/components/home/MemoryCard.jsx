import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function MemoryCard({ memory, index }) {
  const nav = useNavigate();
  return (
    <motion.div
      data-hover
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.7 }}
      whileHover={{ scale: 1.08, y: -8, zIndex: 10 }}
      onClick={() => nav(`/memory/${memory.id}`)}
      className="group relative shrink-0 w-[260px] md:w-[320px] aspect-[16/10] rounded-xl overflow-hidden cursor-pointer ring-1 ring-white/5 hover:ring-ember/40 transition-all duration-500"
      style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
    >
      <img
        src={memory.cover}
        alt={memory.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {memory.video && (
        <video
          src={memory.videos?.[0]}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => e.currentTarget.pause()}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100" />

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <h4 className="font-cinema text-xl md:text-2xl text-bone leading-tight">
          {memory.title}
        </h4>
        <p className="text-bone/60 text-xs mt-1 line-clamp-1">
          {memory.caption}
        </p>
        <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          <div className="w-9 h-9 rounded-full bg-bone text-ink flex items-center justify-center">
            <Play size={14} fill="currentColor" />
          </div>
          <span className="text-bone/70 text-xs uppercase tracking-widest">
            Play
          </span>
        </div>
      </div>

      <div className="absolute inset-0 ring-0 group-hover:ring-1 ring-ember/30 rounded-xl pointer-events-none" />
    </motion.div>
  );
}
