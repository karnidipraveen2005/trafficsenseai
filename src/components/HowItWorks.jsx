import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme, alpha } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ChatIcon from '@mui/icons-material/Chat';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const steps = [
  {
    number: '1',
    title: 'Upload Traffic Scene Image',
    description: 'Upload or capture a traffic scene image. Our system analyzes static images for weather conditions, visibility, and road context.',
    icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
  },
  {
    number: '2',
    title: 'AI Analysis & Classification',
    description: 'TrafficSense AI instantly analyzes your image using supervised learning models to detect weather conditions, visibility, and road hazards.',
    icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
  },
  {
    number: '3',
    title: 'Interactive Insights',
    description: 'Refine your analysis through interactive chat to get deeper insights about traffic patterns, safety recommendations, and optimal driving conditions.',
    icon: <ChatIcon sx={{ fontSize: 40 }} />,
  },
  {
    number: '4',
    title: 'View & Share',
    description: 'View analysis results and insights on screen. Share key findings with traffic management systems or other drivers for enhanced road safety.',
    icon: <ConnectWithoutContactIcon sx={{ fontSize: 40 }} />,
  },
];

export default function HowItWorks() {
  const theme = useTheme();

  return (
    <Box id="how-it-works" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
            }}
          >
            How It Works
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            Understanding traffic conditions is faster and easier with TrafficSense AI.
            Get real-time insights to make safer driving decisions.
          </Typography>
        </Box>

        {/* Steps Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {steps.map((step, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                  borderColor: 'primary.main',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Step Number */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.main',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                    }}
                  >
                    {step.number}
                  </Box>
                  <Box sx={{ color: 'primary.main' }}>{step.icon}</Box>
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  gutterBottom
                  sx={{ mb: 1.5 }}
                >
                  {step.title}
                </Typography>

                {/* Description */}
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
