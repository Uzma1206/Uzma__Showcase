import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../../context/audiocontext';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
  const { muted, toggleMute } = useAudio();
  return (
    <motion.button
      data-hover
      onClick={toggleMute}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-[80] glass rounded-full p-3 hover:scale-110 transition"
      aria-label="toggle music"
    >
      {muted ? (
        <VolumeX size={20} className="text-bone/70" />
      ) : (
        <Volume2 size={20} className="text-ember" />
      )}
    </motion.button>
  );
}
