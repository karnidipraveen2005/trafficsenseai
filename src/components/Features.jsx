import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CircleIcon from '@mui/icons-material/Circle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RadarIcon from '@mui/icons-material/Radar';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useTheme, alpha } from '@mui/material/styles';

export default function Features() {
  const theme = useTheme();

  const cardStyle = {
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
    minHeight: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid',
    borderColor:
      theme.palette.mode === 'light'
        ? 'rgba(255, 255, 255, 0.6)'
        : 'rgba(255, 255, 255, 0.1)',
    boxShadow:
      theme.palette.mode === 'light'
        ? '0 10px 30px rgba(0,0,0,0.05)'
        : '0 10px 30px rgba(0,0,0,0.4)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
      borderColor: theme.palette.primary.main,
      '& .overlay': {
        backdropFilter: 'blur(4px)',
      },
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const gradientOverlay = {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)',
    p: 3,
    width: '100%',
    transition: 'backdrop-filter 0.3s',
  };

  const StatusBadge = ({ label, icon }) => (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        borderRadius: '20px',
        px: 1.5,
        py: 0.5,
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      {icon}
      <Typography
        variant="caption"
        color="white"
        fontWeight="bold"
        sx={{ letterSpacing: 0.5 }}
      >
        {label}
      </Typography>
      <CircleIcon
        sx={{ fontSize: 8, color: '#4caf50', animation: 'pulse 2s infinite' }}
      />
    </Box>
  );

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <style>
        {`@keyframes pulse {
          0% { opacity: 1; box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7); }
          70% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(76, 175, 80, 0); }
          100% { opacity: 1; box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
        }`}
      </style>

      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Chip
            label="Core Architecture"
            color="primary"
            variant="outlined"
            size="small"
            sx={{
              mb: 2,
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
            }}
          />
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' }, mb: 1 }}
          >
            System Capabilities
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}
          >
            High-performance perception layers designed for real-time safety.
          </Typography>
        </Box>

        {/* GRID */}
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
            gridTemplateRows: { xs: 'auto', md: '300px 300px' },
          }}
        >
          {/* WEATHER */}
          <Box
            sx={{
              ...cardStyle,
              gridColumn: { xs: '1 / -1', md: '1 / 8' },
              backgroundImage:
                'url("https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2864&auto=format&fit=crop")',
            }}
          >
            <Box sx={{ p: 2 }}>
              <StatusBadge
                label="SENSOR: OPTICAL"
                icon={<RadarIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
              />
            </Box>

            <Box sx={gradientOverlay} className="overlay">
              <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
                Multi-Weather Classification
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                Detects Rain, Fog, and Night conditions using supervised learning,
                enabling real-time system calibration.
              </Typography>
            </Box>
          </Box>

          {/* FEATURE MATRIX */}
          <Box
            sx={{
              ...cardStyle,
              gridColumn: { xs: '1 / -1', md: '8 / 13' },
              backgroundImage:
                'url("https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop")',
            }}
          >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <StatusBadge
                label="COMPUTE: OPTIMIZED"
                icon={<DataObjectIcon sx={{ fontSize: 16, color: '#00e5ff' }} />}
              />
            </Box>

            <Box sx={gradientOverlay} className="overlay">
              <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
                8D Feature Extraction
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                Compresses visual data into a lightweight matrix for real-time
                inference on mobile and embedded systems.
              </Typography>
            </Box>
          </Box>

          {/* AI DECISION SUPPORT */}
          <Box
            sx={{
              ...cardStyle,
              gridColumn: '1 / -1',
              // UPDATED IMAGE: A clear, glowing Abstract Neural Network background
              backgroundImage:
                'url("https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop")',
            }}
          >
            <Box sx={{ p: 3 }}>
              <StatusBadge
                label="AI CORE: ONLINE"
                icon={<AutoAwesomeIcon sx={{ fontSize: 16, color: '#c084fc' }} />}
              />
            </Box>

            <Box sx={gradientOverlay} className="overlay">
              <Typography variant="h4" color="white" fontWeight="bold" gutterBottom>
                AI Decision Support
              </Typography>
              <Typography variant="body1" color="rgba(255,255,255,0.85)" sx={{ maxWidth: 700 }}>
                Processes sensor outputs and translates complex data into
                human-readable safety insights, helping drivers make safer
                decisions in challenging weather conditions.
              </Typography>
            </Box>
          </Box>
        </Box>  
      </Container>
    </Box>
  );
}