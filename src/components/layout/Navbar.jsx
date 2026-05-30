import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../../context/authcontext';
import { Gift, LogOut, User, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, isAdmin, logout, profile } = useAuth();
  const nav = useNavigate();

  const { scrollY } = useScroll();

  const bg = useTransform(
    scrollY,
    [0, 200],
    ['rgba(8,8,11,0)', 'rgba(8,8,11,0.85)']
  );

  const blur = useTransform(
    scrollY,
    [0, 200],
    ['blur(0px)', 'blur(14px)']
  );

  return (
    <motion.nav
      style={{
        background: bg,
        backdropFilter: blur,
      }}
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-4 flex items-center justify-between"
    >
      <Link
        to="/home"
        className="font-cinema text-2xl tracking-[0.3em] text-ember"
      >
        UZMA
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm tracking-wider text-bone/70">
        <Link to="/home" className="hover:text-bone transition">
          Home
        </Link>

        <Link
          to="/birthday"
          className="hover:text-ember transition flex items-center gap-1"
        >
          <Gift size={14} />
          Birthday
        </Link>

        {isAdmin && (
          <Link
            to="/admin"
            className="hover:text-ember transition flex items-center gap-1"
          >
            <Shield size={14} />
            Admin
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden md:flex items-center gap-2 text-bone/50 text-sm">
          <User size={14} />
          {profile || 'Guest'}
        </span>

        {user ? (
          <button
            data-hover
            onClick={async () => {
              await logout();
              nav('/');
            }}
            className="glass px-3 py-2 rounded-lg text-bone/70 hover:text-ember transition"
          >
            <LogOut size={16} />
          </button>
        ) : (
          <Link
            to="/login"
            className="glass px-4 py-2 rounded-lg text-bone/80 hover:text-ember transition text-sm"
          >
            Sign in
          </Link>
        )}
      </div>
    </motion.nav>
  );
}