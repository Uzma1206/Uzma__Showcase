import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Heart } from 'lucide-react';
import { useAudio } from '../../context/audiocontext';
import Particles from '../ui/Particles';

export default function MemoryDetail({ memory }) {
  const nav = useNavigate();
  const { changeTrack } = useAudio();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (memory?.soundtrack) changeTrack(memory.soundtrack);
  }, [memory, changeTrack]);

  if (!memory) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-ink"
    >
      <div className="relative h-[85svh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {memory.video ? (
            <video
              src={memory.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={memory.backdrop || memory.cover}
              alt={memory.title}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-cinema-grad" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
        <Particles count={20} />

        <button
          data-hover
          onClick={() => nav(-1)}
          className="absolute top-6 left-6 md:top-10 md:left-10 z-30 glass rounded-full p-3 hover:text-ember transition"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-12 md:pb-20 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-ember tracking-[0.4em] text-xs uppercase mb-3"
          >
            {memory.category || 'Memory'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="font-cinema text-5xl md:text-8xl text-bone text-shadow-cinema leading-tight"
          >
            {memory.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-5 flex items-center gap-5 text-bone/60 text-sm"
          >
            {memory.date && (
              <span className="flex items-center gap-2">
                <Calendar size={14} /> {memory.date}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Heart size={14} className="text-ember" /> Cherished
            </span>
          </motion.div>
        </div>
      </div>

      <div className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
        {memory.quote && (
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-cinema italic text-2xl md:text-4xl text-bone/85 max-w-3xl border-l-2 border-ember pl-6 mb-14"
          >
            "{memory.quote}"
          </motion.blockquote>
        )}

        {memory.caption && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-bone/70 text-lg leading-relaxed max-w-3xl mb-14"
          >
            {memory.caption}
          </motion.p>
        )}

        {memory.note && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass rounded-2xl p-8 mb-14 max-w-3xl"
          >
            <p className="text-xs text-ember tracking-[0.3em] uppercase mb-3">
              A Note for You
            </p>
            <p className="text-bone/80 leading-relaxed italic">{memory.note}</p>
          </motion.div>
        )}

        {memory.photos?.length > 0 && (
          <div className="space-y-12">
            <h2 className="font-cinema text-3xl text-bone">Stills from this scene</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memory.photos.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className="rounded-2xl overflow-hidden ring-1 ring-white/5 group"
                >
                  <img
                    src={p}
                    alt=""
                    onClick={() => setSelectedImage(i)}
                    className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {memory.galleryVideos?.length > 0 && (
  <div className="space-y-12 mt-16">
    <h2 className="font-cinema text-3xl text-bone">
      Moments in Motion
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {memory.galleryVideos.map((video, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl overflow-hidden ring-1 ring-white/5"
        >
          <video
            src={video}
            controls
            className="w-full h-72 md:h-96 object-cover"
          />
        </motion.div>
      ))}
    </div>
  </div>
)}

        {memory.timeline?.length > 0 && (
          <div className="mt-20">
            <h2 className="font-cinema text-3xl text-bone mb-10">Timeline</h2>
            <div className="relative pl-8 border-l border-white/10 space-y-10">
              {memory.timeline.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <span className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-ember shadow-[0_0_20px_rgba(229,9,20,0.6)]" />
                  <p className="text-ember text-xs tracking-widest uppercase">
                    {t.date}
                  </p>
                  <h4 className="text-bone text-xl font-cinema mt-1">{t.title}</h4>
                  <p className="text-bone/60 mt-1">{t.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      {selectedImage !== null && (
  <div
    className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
    onClick={() => setSelectedImage(null)}
  >
    <button
      onClick={(e) => {
        e.stopPropagation();
        setSelectedImage(null);
      }}
      className="absolute top-6 right-6 text-white text-4xl"
    >
      ×
    </button>

    {memory.photos.length > 1 && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedImage(
            (selectedImage - 1 + memory.photos.length) %
              memory.photos.length
          );
        }}
        className="absolute left-6 text-white text-5xl"
      >
        ‹
      </button>
    )}

    <img
      src={memory.photos[selectedImage]}
      alt=""
      className="max-w-[90vw] max-h-[90vh] object-contain"
      onClick={(e) => e.stopPropagation()}
    />

    {memory.photos.length > 1 && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedImage(
            (selectedImage + 1) %
              memory.photos.length
          );
        }}
        className="absolute right-6 text-white text-5xl"
      >
        ›
      </button>
    )}
  </div>
)}
    </motion.div>
  );
}
