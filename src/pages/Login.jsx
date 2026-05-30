import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import Particles from '../components/ui/Particles';

export default function Login() {
  const { login, register, google } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      if (mode === 'login') await login(form.email, form.password);
      else await register(form.email, form.password);
      nav('/home');
    } catch (e) {
      setErr(e.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setErr('');
    try {
      await google();
      nav('/home');
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <Particles count={40} />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(229,9,20,0.25), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,46,77,0.15), transparent 60%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative glass w-full max-w-md rounded-3xl p-10"
      >
        <Link
          to="/"
          className="font-cinema text-3xl tracking-[0.3em] text-ember block text-center mb-2"
        >
          UZMA
        </Link>
        <p className="text-center text-bone/50 text-xs tracking-[0.3em] uppercase mb-8">
          {mode === 'login' ? 'Welcome back' : 'Begin your story'}
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-widest text-bone/40">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-2 border-b border-white/10 py-3 focus:border-ember/70 transition text-bone"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-bone/40">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full mt-2 border-b border-white/10 py-3 focus:border-ember/70 transition text-bone"
            />
          </div>

          {err && <p className="text-rose text-sm">{err}</p>}

          <button
            data-hover
            type="submit"
            disabled={loading}
            className="btn-cinema w-full py-3 mt-4 rounded-lg bg-ember text-white font-medium tracking-widest uppercase text-sm disabled:opacity-50"
          >
            {loading ? '…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-bone/30 text-xs">
          <div className="h-px flex-1 bg-white/10" />
          OR
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          data-hover
          onClick={googleLogin}
          className="w-full py-3 rounded-lg border border-white/10 hover:border-white/30 transition text-bone/80 text-sm tracking-wide"
        >
          Continue with Google
        </button>

        <p className="text-center text-bone/50 text-sm mt-6">
          {mode === 'login' ? "New here?" : 'Already a member?'}{' '}
          <button
            data-hover
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-ember hover:underline"
          >
            {mode === 'login' ? 'Create account' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
