import React, { useContext, useState } from 'react';
import { Box, Typography, Button, Avatar, Paper, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../App';

export default function Profile() {
    const navigate = useNavigate();
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const isDark = theme.palette.mode === 'dark';

    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: 'KarnidiVeera',
        email: 'karnidiveera@example.com',
        phone: '+1 234 567 890',
        password: '' // Only updated if changed
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // Implement save logic here
        setIsEditing(false);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: isDark ? 'background.default' : '#F0F7FF', color: 'text.primary', pb: 8 }}>
            {/* Top Navigation */}
            <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, mx: 'auto', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                    <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(2,136,209,0.08)' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>Profile</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>Manage your account settings and preferences</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                    <IconButton
                        onClick={colorMode.toggleColorMode}
                        sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(2,136,209,0.08)' }}
                    >
                        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={() => navigate('/login')}
                        sx={{
                            borderRadius: '20px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            display: { xs: 'none', sm: 'flex' }
                        }}
                    >
                        Sign Out
                    </Button>
                    {/* Mobile Only Logout Icon */}
                    <IconButton
                        color="error"
                        onClick={() => navigate('/login')}
                        sx={{ display: { xs: 'flex', sm: 'none' }, bgcolor: isDark ? 'rgba(211,47,47,0.1)' : 'rgba(211,47,47,0.05)' }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, mt: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>

                {/* Left Card: User Summary */}
                <Paper
                    elevation={isDark ? 0 : 2}
                    sx={{
                        flex: '1 1 300px',
                        p: 4,
                        borderRadius: '24px',
                        bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(2,136,209,0.1)',
                        boxShadow: isDark ? 'none' : '0 8px 32px rgba(2,136,209,0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                >
                    <Box sx={{ position: 'relative', mb: 3 }}>
                        <Box
                            sx={{
                                width: 120,
                                height: 120,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #bb86fc 0%, #3700b3 100%)',
                                p: '4px'
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    bgcolor: 'background.paper',
                                    color: 'primary.main',
                                    fontSize: '3rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                K
                            </Avatar>
                        </Box>
                    </Box>

                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>KarnidiVeera</Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            borderRadius: '24px',
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            bgcolor: 'text.primary',
                            color: 'background.default',
                            '&:hover': {
                                bgcolor: 'text.secondary',
                            }
                        }}
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Cancel Editing' : 'Edit Account'}
                    </Button>
                </Paper>

                {/* Right Card: Personal Details Form */}
                <Paper
                    elevation={isDark ? 0 : 2}
                    sx={{
                        flex: '2 1 600px',
                        p: 4,
                        borderRadius: '24px',
                        bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(2,136,209,0.1)',
                        boxShadow: isDark ? 'none' : '0 8px 32px rgba(2,136,209,0.08)',
                    }}
                >
                    <Typography variant="overline" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, fontWeight: 'bold', letterSpacing: 1 }}>
                        <VerifiedUserIcon fontSize="small" /> {isEditing ? 'Edit Personal Details' : 'Personal Details'}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
                        <Box sx={{ flex: '1 1 100%' }}>
                            <Typography variant="body2" fontWeight="bold" sx={{ mb: 1, ml: 1 }}>Display Name</Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(2,136,209,0.03)',
                                            '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(2,136,209,0.2)' }
                                        }
                                    }}
                                />
                            ) : (
                                <Box sx={{ p: 2, borderRadius: '16px', bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(2,136,209,0.03)', border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(2,136,209,0.1)' }}>
                                    <Typography variant="body1">{formData.displayName}</Typography>
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ flex: '1 1 calc(50% - 12px)' }}>
                            <Typography variant="body2" fontWeight="bold" sx={{ mb: 1, ml: 1 }}>Email Address</Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(2,136,209,0.03)',
                                            '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(2,136,209,0.2)' }
                                        }
                                    }}
                                />
                            ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: '16px', bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(2,136,209,0.03)', border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(2,136,209,0.1)' }}>
                                    <EmailIcon color="action" sx={{ mr: 2 }} />
                                    <Typography variant="body1">{formData.email}</Typography>
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ flex: '1 1 calc(50% - 12px)' }}>
                            <Typography variant="body2" fontWeight="bold" sx={{ mb: 1, ml: 1 }}>Phone Number</Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(2,136,209,0.03)',
                                            '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(2,136,209,0.2)' }
                                        }
                                    }}
                                />
                            ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: '16px', bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(2,136,209,0.03)', border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(2,136,209,0.1)' }}>
                                    <PhoneIcon color="action" sx={{ mr: 2 }} />
                                    <Typography variant="body1">{formData.phone}</Typography>
                                </Box>
                            )}
                        </Box>

                        {isEditing && (
                            <Box sx={{ flex: '1 1 100%' }}>
                                <Typography variant="body2" fontWeight="bold" sx={{ mb: 1, ml: 1 }}>Change Password (Optional)</Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="password"
                                    type="password"
                                    placeholder="Leave blank to keep current password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(2,136,209,0.03)',
                                            '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(2,136,209,0.2)' }
                                        }
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    {isEditing && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setIsEditing(false)}
                                sx={{
                                    borderRadius: '24px',
                                    py: 1.5,
                                    px: 4,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                sx={{
                                    borderRadius: '24px',
                                    py: 1.5,
                                    px: 4,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    )}
                </Paper>

            </Box>
        </Box>
    );
}
