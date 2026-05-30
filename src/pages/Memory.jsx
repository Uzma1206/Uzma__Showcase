import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemoryDetail from '../components/memory/MemoryDetail';
import Loader from '../components/ui/Loader';
import { fetchMemory } from '../firebase/services';
import { seedMemories } from '../data/seedMemories';

export default function Memory() {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const seed = seedMemories.find((m) => m.id === id);
        if (seed) {
          if (mounted) setMemory(seed);
        } else {
          const data = await fetchMemory(id);
          if (mounted) setMemory(data);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <Loader />;
  if (!memory)
    return (
      <div className="min-h-screen flex items-center justify-center text-bone/50">
        Memory not found.
      </div>
    );
  return <MemoryDetail memory={memory} />;
}
