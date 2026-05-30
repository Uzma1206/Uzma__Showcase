import { useEffect, useState } from 'react';
import { fetchMemories } from '../firebase/services';
import { seedMemories } from '../data/seedMemories';

export default function useMemories() {
  const [memories, setMemories] = useState(seedMemories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const firestoreMemories = await fetchMemories();

        if (!mounted) return;

        // Keep original memories and add Firestore memories
        setMemories([
          ...firestoreMemories,
          ...seedMemories,
        ]);
      } catch (e) {
        console.warn('Firestore fetch failed, using seed', e);
        setMemories(seedMemories);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { memories, loading };
}