import { createContext, useContext, useEffect, useRef, useState } from 'react';

const AudioCtx = createContext();
export const useAudio = () => useContext(AudioCtx);

const DEFAULT_TRACK =
  import.meta.env.VITE_AMBIENT_MUSIC_URL ||
  'https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3';

export function AudioProvider({ children }) {
  const audioRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const [track, setTrack] = useState(DEFAULT_TRACK);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(track);

    a.loop = true;
    a.volume = 0;

    audioRef.current = a;

    return () => {
      a.pause();
    };
  }, [track]);

  const fadeTo = (target, duration = 1500) => {
    const a = audioRef.current;
    if (!a) return;

    const start = a.volume;
    const startTime = performance.now();

    const step = (t) => {
      const p = Math.min((t - startTime) / duration, 1);

      a.volume = start + (target - start) * p;

      if (p < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const toggleMute = async () => {
    const a = audioRef.current;

    if (!a) return;

    if (muted) {
      try {
        await a.play();

        setPlaying(true);

        fadeTo(0.35);

        setMuted(false);
      } catch (e) {
        console.warn('audio blocked', e);
      }
    } else {
      fadeTo(0, 800);

      setTimeout(() => {
        a.pause();
      }, 850);

      setPlaying(false);
      setMuted(true);
    }
  };

  const changeTrack = async (url) => {
    if (!url || url === track) return;

    const wasPlaying = playing && !muted;

    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      setTrack(url);

      if (wasPlaying) {
        setTimeout(async () => {
          try {
            const a = audioRef.current;

            if (!a) return;

            a.volume = 0;

            await a.play();

            fadeTo(0.35);
          } catch (err) {
            console.warn('Track switch failed', err);
          }
        }, 200);
      }
    } catch (err) {
      console.warn('changeTrack error', err);
    }
  };

  return (
    <AudioCtx.Provider
      value={{
        muted,
        toggleMute,
        playing,
        changeTrack,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}