import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import TrafficIcon from '@mui/icons-material/Traffic';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../App';

function LogoIcon() {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
      <TrafficIcon color="primary" sx={{ fontSize: { xs: 24, md: 32 } }} />
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.mode === 'light' ? 'text.primary' : '#fff',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          fontSize: { xs: '1rem', md: '1.25rem' },
        }}
      >
        TrafficSense AI
      </Typography>
    </Box>
  );
}

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '999px',
            bgcolor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(15, 20, 25, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid',
            borderColor:
              theme.palette.mode === 'light'
                ? 'rgba(0,0,0,0.1)'
                : 'rgba(255,255,255,0.15)',
            boxShadow:
              theme.palette.mode === 'light'
                ? '0 4px 12px rgba(0,0,0,0.05)'
                : '0 4px 20px rgba(0,0,0,0.5)',
            px: 2,
            py: 1,
            maxHeight: 40,
          }}
        >
          {/* LEFT: Logo & Navigation */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <LogoIcon />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button variant="text" sx={{ color: theme.palette.mode === 'light' ? 'text.secondary' : '#fff', textTransform: 'none' }} size="small">Objectives</Button>
              <Button variant="text" sx={{ color: theme.palette.mode === 'light' ? 'text.secondary' : '#fff', textTransform: 'none' }} size="small">Architecture</Button>
              <Button variant="text" sx={{ color: theme.palette.mode === 'light' ? 'text.secondary' : '#fff', textTransform: 'none' }} size="small">Tech Stack</Button>
            </Box>
          </Box>

          {/* RIGHT: Actions (Theme Toggle + Auth) */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            
            {/* Theme Toggle */}
            <Button
              onClick={colorMode.toggleColorMode}
              variant="outlined"
              size="small"
              sx={{
                minWidth: '30px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                borderColor: theme.palette.mode === 'light' ? 'divider' : 'rgba(255,255,255,0.3)',
                color: theme.palette.mode === 'light' ? 'text.primary' : '#fff',
                backgroundColor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)',
                p: 0,
              }}
            >
              {theme.palette.mode === 'dark' ? <ModeNightRoundedIcon sx={{ fontSize: 18 }} /> : <WbSunnyRoundedIcon sx={{ fontSize: 18 }} />}
            </Button>

            {/* Desktop Auth Buttons */}
            <Button
              variant="text"
              size="small"
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                color: theme.palette.mode === 'light' ? 'text.primary' : '#fff',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Login
            </Button>

            <Button
              variant="contained"
              size="small"
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none',
              }}
            >
              Get Started for Free
            </Button>

            {/* MOBILE MENU ICON */}
            <Box sx={{ display: { md: 'none' }, ml: 1 }}>
              <Button
                variant="text"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px', color: theme.palette.mode === 'light' ? 'primary.main' : '#fff' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ minWidth: '65vw', p: 2 }}>
                  <MenuItem onClick={toggleDrawer(false)}>Objectives</MenuItem>
                  <MenuItem onClick={toggleDrawer(false)}>Architecture</MenuItem>
                  <MenuItem onClick={toggleDrawer(false)}>Tech Stack</MenuItem>
                  <Divider sx={{ my: 2 }} />
                  <MenuItem onClick={toggleDrawer(false)}>Login</MenuItem>
                  <Box sx={{ p: 1 }}>
                    <Button variant="contained" fullWidth sx={{ borderRadius: 2, textTransform: 'none' }}>
                      Get Started for Free
                    </Button>
                  </Box>
                </Box>
              </Drawer>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}