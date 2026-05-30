import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './index.css';
import { AuthProvider } from './context/authcontext';
import { AudioProvider } from './context/audiocontext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);