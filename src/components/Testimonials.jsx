import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { useTheme, alpha } from '@mui/material/styles';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Fleet Manager',
    quote: 'TrafficSense AI has completely transformed our fleet safety operations. The weather detection system provides accurate real-time insights that help our drivers navigate challenging conditions safely.',
    avatar: 'RK',
  },
  {
    name: 'Priya Sharma',
    role: 'Transportation Engineer',
    quote: 'The AI-powered traffic analysis is incredibly accurate. It helps us understand road conditions better and make data-driven decisions for traffic management.',
    avatar: 'PS',
  },
  {
    name: 'Amit Patel',
    role: 'Commercial Driver',
    quote: 'As someone who drives long distances, TrafficSense AI gives me confidence in adverse weather. The visibility analysis and recommendations are spot-on.',
    avatar: 'AP',
  },
];

export default function Testimonials() {
  const theme = useTheme();

  return (
    <Box id="testimonials" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
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
            What Our Users Say
          </Typography>
        </Box>

        {/* Testimonials Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                borderRadius: 3,
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.1)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Quote */}
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    fontStyle: 'italic',
                    color: 'text.secondary',
                    lineHeight: 1.7,
                  }}
                >
                  "{testimonial.quote}"
                </Typography>

                {/* Author */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 56,
                      height: 56,
                      fontSize: '1.25rem',
                      fontWeight: 700,
                    }}
                  >
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
