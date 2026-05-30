import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-bone/60">
        Loading…
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin)
    return <Navigate to="/home" replace />;

  return children;
}