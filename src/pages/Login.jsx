import * as React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import TrafficIcon from '@mui/icons-material/Traffic';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useTheme, alpha } from '@mui/material/styles';
import { ColorModeContext } from '../App';
import { toast } from 'react-toastify';
import api from '../api';
import { setAuthSession } from '../utils/auth';

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const colorMode = React.useContext(ColorModeContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error('Please enter both email and password.');
        return;
      }

      const response = await api.post('/accounts/login/', { email, password });
      const { token, user } = response.data;
      const params = new URLSearchParams(location.search);
      const next = params.get('next');
      const targetRoute = next || '/chat';
      setAuthSession(token, user);

      toast.success('Logged in successfully!');
      navigate(targetRoute, { replace: true });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        toast.error(`Login failed: ${error.response.data.detail}`);
      } else {
        toast.error('Login failed. Please check your credentials and try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        py: 4,
        // Matching landing page background
        backgroundImage:
          theme.palette.mode === 'light'
            ? `radial-gradient(circle at 50% 50%, ${alpha('#0288d1', 0.15)} 0%, transparent 50%), 
               radial-gradient(${alpha('#0288d1', 0.1)} 1px, transparent 1px), 
               linear-gradient(180deg, #E3F2FD 0%, #FFFFFF 100%)`
            : `radial-gradient(circle at 50% 20%, ${alpha('#29b6f6', 0.25)} 0%, transparent 50%), 
               radial-gradient(${alpha(theme.palette.common.white, 0.1)} 1px, transparent 1px), 
               linear-gradient(180deg, #0D1B2A 0%, #15191E 100%)`,
        backgroundSize: '100% 100%, 24px 24px, cover',
        backgroundRepeat: 'no-repeat, repeat, no-repeat',
      }}
    >
      {/* Animated Floating Glow Orbs */}
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
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '35vw',
          height: '35vw',
          borderRadius: '50%',
          filter: 'blur(80px)',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
          bottom: '10%',
          right: '20%',
          zIndex: 0,
          animation: 'floatGlow 15s infinite alternate reverse',
        }}
      />

      {/* Dark/Light Mode Toggle - Top Right */}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          zIndex: 10,
        }}
      >
        <Button
          onClick={colorMode.toggleColorMode}
          variant="outlined"
          size="small"
          sx={{
            minWidth: '40px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            borderColor: theme.palette.mode === 'light' ? 'divider' : 'rgba(255,255,255,0.3)',
            color: theme.palette.mode === 'light' ? 'text.primary' : '#fff',
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            p: 0,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)',
              transform: 'rotate(15deg)',
            },
          }}
        >
          {theme.palette.mode === 'dark' ? (
            <ModeNightRoundedIcon sx={{ fontSize: 20 }} />
          ) : (
            <WbSunnyRoundedIcon sx={{ fontSize: 20 }} />
          )}
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          {/* Left Panel - Login Form */}
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: '500px' },
              mx: 'auto',
            }}
          >
            {/* Clickable Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 4,
                textDecoration: 'none',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateX(-4px)',
                },
              }}
            >
              <TrafficIcon color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h5" fontWeight={800}>
                TrafficSense AI
              </Typography>
            </Box>

            <Typography variant="h4" fontWeight={700} gutterBottom>
              Login to your account
            </Typography>

            {/* Google Login Button */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                mt: 3,
                mb: 2,
                py: 2,
                borderColor: 'divider',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 4,
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Login with Google
            </Button>

            {/* Divider */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                my: 3,
                color: 'text.secondary',
              }}
            >
              <Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} />
              <Typography variant="body2" sx={{ px: 2 }}>
                OR
              </Typography>
              <Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} />
            </Box>

            {/* Email Input */}
            <TextField
              fullWidth
              label="EMAIL ADDRESS"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  bgcolor: theme.palette.mode === 'light'
                    ? alpha('#000', 0.05)
                    : alpha('#fff', 0.08),
                  height: '56px',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'light'
                      ? alpha('#000', 0.08)
                      : alpha('#fff', 0.12),
                  },
                  '&.Mui-focused': {
                    bgcolor: theme.palette.mode === 'light'
                      ? alpha('#000', 0.08)
                      : alpha('#fff', 0.12),
                    '& fieldset': {
                      border: `2px solid ${theme.palette.primary.main}`,
                    },
                  },
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  mb: 1,
                },
                '& .MuiInputBase-input': {
                  py: 2,
                  fontSize: '0.95rem',
                },
              }}
              variant="outlined"
            />

            {/* Password Input */}
            <TextField
              fullWidth
              label="PASSWORD"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  bgcolor: theme.palette.mode === 'light'
                    ? alpha('#000', 0.05)
                    : alpha('#fff', 0.08),
                  height: '56px',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'light'
                      ? alpha('#000', 0.08)
                      : alpha('#fff', 0.12),
                  },
                  '&.Mui-focused': {
                    bgcolor: theme.palette.mode === 'light'
                      ? alpha('#000', 0.08)
                      : alpha('#fff', 0.12),
                    '& fieldset': {
                      border: `2px solid ${theme.palette.primary.main}`,
                    },
                  },
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  mb: 1,
                },
                '& .MuiInputBase-input': {
                  py: 2,
                  fontSize: '0.95rem',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Remember Me & Forgot Password */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
                sx={{ color: 'text.secondary' }}
              />
              <Link
                component="button"
                variant="body2"
                sx={{ textDecoration: 'none', color: 'primary.main' }}
              >
                Forgot your password?
              </Link>
            </Box>

            {/* Login Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{
                py: 2,
                mb: 2,
                textTransform: 'uppercase',
                fontWeight: 700,
                fontSize: '0.95rem',
                letterSpacing: '0.5px',
                borderRadius: 4,
                height: '56px',
                bgcolor: theme.palette.mode === 'light' ? 'primary.main' : '#fff',
                color: theme.palette.mode === 'light' ? '#fff' : '#000',
                boxShadow: theme.palette.mode === 'light'
                  ? `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`
                  : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'light' ? 'primary.dark' : alpha('#fff', 0.9),
                  transform: 'translateY(-2px)',
                  boxShadow: theme.palette.mode === 'light'
                    ? `0 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`
                    : `0 4px 12px ${alpha('#000', 0.15)}`,
                },
              }}
            >
              Login
            </Button>

            {/* Signup Link */}
            <Typography variant="body2" textAlign="center" color="text.secondary">
              Don't have an account?{' '}
              <Link
                component="button"
                onClick={() => navigate('/signup')}
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Create an account
              </Link>
            </Typography>
          </Box>

          {/* Right Panel - Visual Element with Features */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '600px',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.1),
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Animated Gradient Orbs */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  filter: 'blur(80px)',
                  top: '20%',
                  left: '20%',
                  animation: 'pulse 4s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
                    '50%': { transform: 'scale(1.2)', opacity: 0.8 },
                  },
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: '250px',
                  height: '250px',
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  filter: 'blur(60px)',
                  bottom: '20%',
                  right: '20%',
                  animation: 'pulse 5s ease-in-out infinite reverse',
                }}
              />

              {/* Center Content */}
              <Stack spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                <TrafficIcon
                  sx={{
                    fontSize: 100,
                    color: alpha(theme.palette.primary.main, 0.3),
                    animation: 'floatIcon 6s ease-in-out infinite',
                    '@keyframes floatIcon': {
                      '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                      '50%': { transform: 'translateY(-20px) rotate(5deg)' },
                    },
                  }}
                />

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      mb: 2,
                      color: 'text.primary',
                    }}
                  >
                    Secure & Fast Access
                  </Typography>
                </Box>

                {/* Feature Pills */}
                <Stack spacing={2} sx={{ width: '100%', mt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.6),
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  >
                    <SecurityIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Secure Authentication
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Your data is protected
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.6),
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  >
                    <SpeedIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Lightning Fast
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Instant access to your dashboard
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.6),
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  >
                    <VerifiedUserIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Verified Platform
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Trusted by thousands
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
