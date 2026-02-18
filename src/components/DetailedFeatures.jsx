import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useTheme, alpha } from '@mui/material/styles';

import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const featureData = [
  {
    id: 0,
    icon: <DeveloperModeIcon />,
    title: 'Full-Stack Implementation',
    description:
      'Web dashboard using Django backend and React.js frontend for real-time traffic monitoring.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600',
  },
  {
    id: 1,
    icon: <SpeedIcon />,
    title: 'Real-time 8D Processing',
    description:
      'Dimensionality reduction pipeline enabling fast inference on mobile ADAS systems.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600',
  },
  {
    id: 2,
    icon: <AutoFixHighIcon />,
    title: 'Adaptive Vision Protocols',
    description:
      'Enhances visibility dynamically in fog, rain, and night conditions.',
    image:
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600',
  },
];

export default function DetailedFeatures() {
  const theme = useTheme();
  const [selectedId, setSelectedId] = React.useState(0);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header Adjusted to match previous designs */}
        <Box textAlign="center" mb={6}>
          <Chip
            label="Core Features"
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
            Product Features
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}
          >
            Core technologies powering TrafficSense AI for real-time safety.
          </Typography>
        </Box>

        {/* SPLIT LAYOUT */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            minHeight: { md: 420 }, // 🔥 fixed height for balance
          }}
        >
          {/* LEFT — IMAGE (60%) */}
          <Box
            sx={{
              flex: { md: '0 0 60%' },
              minHeight: { xs: 280, md: 'auto' },
              backgroundImage: `url(${featureData[selectedId].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'background-image 0.4s ease',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                bgcolor: alpha('#000', 0.6),
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700 }}>
                Dashboard Preview
              </Typography>
            </Box>
          </Box>

          {/* RIGHT — INFO (40%) */}
          <Box
            sx={{
              flex: { md: '0 0 40%' },
              p: { xs: 3, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              bgcolor:
                theme.palette.mode === 'light'
                  ? alpha('#fff', 0.7)
                  : alpha('#fff', 0.03),
            }}
          >
            <Stack spacing={3}>
              {featureData.map((feature) => (
                <Box
                  key={feature.id}
                  onClick={() => setSelectedId(feature.id)}
                  sx={{
                    cursor: 'pointer',
                    p: 2,
                    borderRadius: 2,
                    borderLeft: '4px solid',
                    borderColor:
                      selectedId === feature.id
                        ? theme.palette.primary.main
                        : 'transparent',
                    bgcolor:
                      selectedId === feature.id
                        ? alpha(theme.palette.primary.main, 0.08)
                        : 'transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.action.hover, 0.08),
                    },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        color:
                          selectedId === feature.id
                            ? 'primary.main'
                            : 'text.secondary',
                      }}
                    >
                      {feature.icon}
                    </Box>

                    <Typography
                      fontWeight={700}
                      color={
                        selectedId === feature.id
                          ? 'primary.main'
                          : 'text.primary'
                      }
                    >
                      {feature.title}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}