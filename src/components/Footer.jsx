import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TrafficIcon from '@mui/icons-material/Traffic';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();
  const [email, setEmail] = React.useState('');

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Newsletter Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TrafficIcon color="primary" sx={{ fontSize: 28 }} />
              <Typography variant="h6" fontWeight={800}>
                TrafficSense AI
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Join the newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Subscribe for weekly updates. No spams ever!
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                sx={{ flex: 1 }}
                variant="outlined"
              />
              <Button variant="contained" sx={{ textTransform: 'none' }}>
                Subscribe
              </Button>
            </Stack>
          </Grid>

          {/* Product Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Product
            </Typography>
            <Stack spacing={1}>
              <Link href="#features" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Features
              </Link>
              <Link href="#testimonials" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Testimonials
              </Link>
              <Link href="#highlights" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Highlights
              </Link>
              <Link href="#pricing" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Pricing
              </Link>
              <Link href="#faq" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                FAQs
              </Link>
            </Stack>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Company
            </Typography>
            <Stack spacing={1}>
              <Link href="#about" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                About us
              </Link>
              <Link href="#careers" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Careers
              </Link>
              <Link href="#press" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Press
              </Link>
            </Stack>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link href="#terms" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Terms
              </Link>
              <Link href="#privacy" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Privacy
              </Link>
              <Link href="#contact" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Contact
              </Link>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Privacy Policy • Terms of Service
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Copyright © TrafficSense AI {new Date().getFullYear()}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
              <GitHubIcon />
            </Link>
            <Link href="#" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
              <TwitterIcon />
            </Link>
            <Link href="#" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
              <LinkedInIcon />
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
