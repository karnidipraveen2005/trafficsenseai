import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Features from './components/Features';
import DetailedFeatures from './components/DetailedFeatures';

// Context for Dark/Light mode
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

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
        <AppAppBar />
        <Hero />
        <Features />
        <DetailedFeatures />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}