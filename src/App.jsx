import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppAppBar from './components/AppAppBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import { isAuthenticated } from './utils/auth';

// Context for Dark/Light mode
export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

// Route Components
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return children;
};

const AuthRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/chat" replace />;
  }
  return children;
};

export default function App() {
  const [mode, setMode] = React.useState('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            // specific tech-blue for "Intelligent Systems" feel
            main: mode === 'light' ? '#0288d1' : '#29b6f6',
          },
          background: {
            // Slight cool-grey tint for "Engineering" look in light mode
            default: mode === 'light' ? '#F4F6F8' : '#0B0E11',
            paper: mode === 'light' ? '#FFFFFF' : '#15191E',
          },
          text: {
            primary: mode === 'light' ? '#1c2025' : '#e0e0e0',
            secondary: mode === 'light' ? '#46505A' : '#9da8b3',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.2,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 8,
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme={mode} />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AppAppBar />
                  <Home />
                </>
              }
            />
            <Route path="/login" element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            } />
            <Route path="/signup" element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/chat/:modelId" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
