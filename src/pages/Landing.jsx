import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroSequence from '../components/intro/IntroSequence';
import ProfileSelect from '../components/intro/ProfileSelect';
import Particles from '../components/ui/Particles';

export default function Landing() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink">
      <Particles count={50} color="rgba(229,9,20,0.4)" />
      <AnimatePresence>
        {!introDone && <IntroSequence onDone={() => setIntroDone(true)} />}
      </AnimatePresence>
      {introDone && <ProfileSelect />}
    </div>
  );
}
