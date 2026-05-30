import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Memory from './pages/Memory';
import Birthday from './pages/Birthday';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ProtectedRoute from './routes/ProtectedRoute';
import GrainOverlay from './components/ui/GrainOverlay';
import Vignette from './components/ui/Vignette';
import CustomCursor from './components/ui/CustomCursor';
import MusicPlayer from './components/ui/MusicPlayer';

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen no-cursor">
      <CustomCursor />
      <GrainOverlay />
      <Vignette />
      <MusicPlayer />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/memory/:id" element={<Memory />} />
          <Route path="/birthday" element={<Birthday />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}