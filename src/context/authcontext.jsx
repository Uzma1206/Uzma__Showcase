import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider, ADMIN_EMAIL } from '../firebase/config';

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(
    localStorage.getItem('uzma_profile') || null
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const selectProfile = (p) => {
    localStorage.setItem('uzma_profile', p);
    setProfile(p);
  };

  const value = {
    user,
    loading,
    profile,
    selectProfile,
    isAdmin: user?.email === ADMIN_EMAIL,
    login: (email, pw) => signInWithEmailAndPassword(auth, email, pw),
    register: (email, pw) => createUserWithEmailAndPassword(auth, email, pw),
    google: () => signInWithPopup(auth, googleProvider),
    logout: () => {
      localStorage.removeItem('uzma_profile');
      setProfile(null);
      return signOut(auth);
    },
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
