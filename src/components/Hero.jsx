import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme, alpha } from '@mui/material/styles';

export default function Hero() {
  const theme = useTheme();

  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        // Use 100vh for mobile and a fixed 85vh for desktop to keep layout stable
        height: { xs: '100vh', md: '85vh' },
        minHeight: { md: '600px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transform: 'translateZ(0)',
        willChange: 'transform',
        overflow: 'hidden',
        backgroundImage:
          theme.palette.mode === 'light'
            ? `radial-gradient(circle at 50% 50%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 50%), 
               radial-gradient(${alpha(theme.palette.primary.main, 0.1)} 1px, transparent 1px), 
               linear-gradient(180deg, #E3F2FD 0%, #FFFFFF 100%)`
            : `radial-gradient(circle at 50% 20%, ${alpha(theme.palette.primary.main, 0.25)} 0%, transparent 50%), 
               radial-gradient(${alpha(theme.palette.common.white, 0.1)} 1px, transparent 1px), 
               linear-gradient(180deg, #0D1B2A 0%, #15191E 100%)`,
        backgroundSize: '100% 100%, 24px 24px, cover',
        backgroundRepeat: 'no-repeat, repeat, no-repeat',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Animated Floating Glow Orb */}
      <Box 
        sx={{
          position: 'absolute',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          filter: 'blur(100px)',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 70%)`,
          top: '10%',
          left: '30%',
          zIndex: 0,
          animation: 'floatGlow 10s infinite alternate',
          '@keyframes floatGlow': {
            '0%': { transform: 'translate(0, 0)' },
            '100%': { transform: 'translate(10%, 20%)' },
          }
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          pt: { xs: 8, md: 0 },
          // pb adjusted to 10 on mobile to leave room for the indicator
          pb: { xs: 10, md: 0 }, 
        }}
      >
        <Stack
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
          sx={{ 
            width: { xs: '100%', sm: '90%', md: '80%' },
            textAlign: 'center' 
          }}
        >
          <Box>
            <Chip
              label="AI-Powered Traffic Safety System"
              color="primary"
              variant="outlined"
              icon={<AutoAwesomeIcon sx={{ animation: 'pulseIcon 2s infinite' }} />}
              sx={{
                fontWeight: 600,
                fontSize: { xs: '0.75rem', md: '0.8rem' },
                borderWidth: '1.5px',
                py: 0.5,
                bgcolor: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: 'blur(8px)',
                boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                '@keyframes pulseIcon': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 },
                }
              }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              color: 'text.primary',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontSize: {
                xs: '2.5rem',  
                sm: '3.5rem',
                md: '4rem',
              },
              textShadow: theme.palette.mode === 'dark' 
                ? `0 0 40px ${alpha(theme.palette.primary.main, 0.4)}` 
                : 'none',
            }}
          >
            TrafficSense AI
            <Box 
              component="span" 
              sx={{ 
                color: 'primary.main', 
                display: 'block', 
                mt: 1,
                fontSize: { xs: '0.5em', md: '0.45em' },
                fontWeight: 600,
                opacity: 0.9,
                animation: 'breath 4s ease-in-out infinite',
                '@keyframes breath': {
                  '0%, 100%': { opacity: 0.8, filter: 'brightness(1)' },
                  '50%': { opacity: 1, filter: 'brightness(1.3)' },
                }
              }}
            >
              Weather-Adaptive Driving Assistance
            </Box>
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              maxWidth: '650px',
              lineHeight: 1.6,
              mx: 'auto',
              px: { xs: 2, md: 0 },
              opacity: 0.85
            }}
          >
            An intelligent decision support system that enhances driver safety by
            analyzing road visibility and weather conditions such as rain, fog,
            and low-light environments.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2 }}
            alignItems="center"
            justifyContent="center"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: { xs: '0.9rem', md: '0.95rem' },
              mt: 1,
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                transition: '0.3s', 
                '&:hover': { color: 'primary.main', transform: 'translateY(-2px)' } 
              }}
            >
              ✔ Real-time weather detection
            </Box>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'block' }, opacity: 0.5 }}>•</Box>
            <Box 
              component="span" 
              sx={{ 
                transition: '0.3s', 
                '&:hover': { color: 'primary.main', transform: 'translateY(-2px)' } 
              }}
            >
              ✔ AI-based visibility analysis
            </Box>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'block' }, opacity: 0.5 }}>•</Box>
            <Box 
              component="span" 
              sx={{ 
                transition: '0.3s', 
                '&:hover': { color: 'primary.main', transform: 'translateY(-2px)' } 
              }}
            >
              ✔ Smart speed recommendations
            </Box>
          </Stack>
        </Stack>
      </Container>

      {/* DISCOVER Indicator - Adjusted bottom position for Mobile */}
      <Box
        sx={{
            position: 'absolute',
            // Increased bottom margin on mobile to ensure it stays above the edge/navigation bar
            bottom: { xs: '10%', md: '30px' },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: 0.6,
            backfaceVisibility: 'hidden',
            animation: 'bounce 2s infinite',
            zIndex: 2,
            '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': { transform: 'translate(-50%, 0)' },
                '40%': { transform: 'translate(-50%, -8px)' },
                '60%': { transform: 'translate(-50%, -4px)' },
            }
        }}
      >
        <Typography 
            variant="caption" 
            fontWeight="700" 
            color="text.secondary" 
            sx={{ mb: 0, letterSpacing: 2, fontSize: '0.65rem' }}
        >
            DISCOVER
        </Typography>
        <KeyboardArrowDownIcon 
          sx={{ 
            fontSize: 28, 
            color: 'primary.main',
            filter: `drop-shadow(0 0 5px ${theme.palette.primary.main})` 
          }} 
        />
      </Box>
    </Box>
  );
}