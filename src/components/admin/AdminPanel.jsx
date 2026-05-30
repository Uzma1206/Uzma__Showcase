import { useEffect, useState } from 'react';
import { fetchMemories, deleteMemory } from '../../firebase/services';
import MemoryForm from './MemoryForm';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPanel() {
  const [memories, setMemories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const data = await fetchMemories();
    setMemories(data);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm('Delete this memory?')) return;
    await deleteMemory(id);
    load();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-cinema text-3xl text-bone">Memory Library</h2>
          <p className="text-bone/50 text-sm">
            {memories.length} memories archived
          </p>
        </div>
        <button
          data-hover
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-cinema bg-ember text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm tracking-widest uppercase"
        >
          <Plus size={16} /> New Memory
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass rounded-2xl p-6 md:p-10"
          >
            <div className="flex justify-between mb-6">
              <h3 className="font-cinema text-2xl text-bone">
                {editing ? 'Edit memory' : 'New memory'}
              </h3>
              <button
                data-hover
                onClick={() => setShowForm(false)}
                className="text-bone/60 hover:text-ember"
              >
                Close
              </button>
            </div>
            <MemoryForm
              existing={editing}
              onDone={() => {
                setShowForm(false);
                load();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {memories.map((m) => (
          <div
            key={m.id}
            className="glass rounded-2xl overflow-hidden group hover:ring-1 hover:ring-ember/40 transition"
          >
            <div className="aspect-video bg-coal overflow-hidden">
              {m.cover && (
                <img
                  src={m.cover}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              )}
            </div>
            <div className="p-4">
              <p className="text-xs text-ember tracking-widest uppercase">
                {m.category}
              </p>
              <h4 className="font-cinema text-xl text-bone mt-1">{m.title}</h4>
              <p className="text-bone/50 text-sm line-clamp-2 mt-1">
                {m.caption}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  data-hover
                  onClick={() => {
                    setEditing(m);
                    setShowForm(true);
                  }}
                  className="flex-1 glass rounded-lg py-2 text-sm flex items-center justify-center gap-1 hover:text-ember"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  data-hover
                  onClick={() => remove(m.id)}
                  className="flex-1 glass rounded-lg py-2 text-sm flex items-center justify-center gap-1 hover:text-rose"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {!memories.length && (
          <p className="text-bone/40 col-span-full text-center py-16">
            No memories yet. Create your first one above.
          </p>
        )}
      </div>
    </div>
  );
}
