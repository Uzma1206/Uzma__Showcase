import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import AdminPanel from '../components/admin/AdminPanel';

export default function Admin() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-ink"
    >
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-cinema text-4xl md:text-6xl text-bone mb-2"
        >
          Director's Console
        </motion.h1>
        <p className="text-bone/50 mb-12 tracking-widest uppercase text-xs">
          Curate the cinematic archive
        </p>
        <AdminPanel />
      </div>
    </motion.div>
  );
}
