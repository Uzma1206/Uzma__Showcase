import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MemoryCard from './MemoryCard';

export default function MemoryRow({ title, items }) {
  const scrollRef = useRef(null);

  if (!items?.length) return null;

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className="relative group/row py-6 md:py-8">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-cinema text-2xl md:text-3xl text-bone px-6 md:px-12 mb-5"
      >
        {title}
      </motion.h3>

      <button
        data-hover
        onClick={() => scroll(-1)}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-14 items-center justify-center glass rounded-r-lg opacity-0 group-hover/row:opacity-100 transition"
      >
        <ChevronLeft />
      </button>
      <button
        data-hover
        onClick={() => scroll(1)}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-14 items-center justify-center glass rounded-l-lg opacity-0 group-hover/row:opacity-100 transition"
      >
        <ChevronRight />
      </button>

      <div
        ref={scrollRef}
        className="scroll-row flex gap-4 md:gap-6 px-6 md:px-12 overflow-x-auto pb-6 snap-x"
      >
        {items.map((m, i) => (
          <div key={m.id} className="snap-start">
            <MemoryCard memory={m} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
