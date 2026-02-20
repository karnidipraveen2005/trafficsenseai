import React, { useContext, useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, InputBase, Paper, Button, Avatar, Drawer, CircularProgress, useMediaQuery } from '@mui/material';
import { ColorModeContext } from '../App';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import TimelineIcon from '@mui/icons-material/Timeline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TrafficIcon from '@mui/icons-material/Traffic';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const MODELS = [
    { id: 'object-detection', name: 'Object Detection', icon: <CenterFocusStrongIcon fontSize="small" /> },
    { id: 'traffic-flow', name: 'Traffic Flow', icon: <TimelineIcon fontSize="small" /> },
    { id: 'anomaly-alert', name: 'Anomaly Alert', icon: <WarningAmberIcon fontSize="small" /> },
    { id: 'image-enhancement', name: 'Image Enhancement', icon: <AutoFixHighIcon fontSize="small" /> }
];

export default function Chat() {
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    const navigate = useNavigate();
    const { modelId } = useParams();
    const isDark = theme.palette.mode === 'dark';
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [desktopOpen, setDesktopOpen] = useState(true);

    // Chat State
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const newMessages = [...messages, { text: inputValue, sender: 'user' }];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        // Simulate AI Response
        setTimeout(() => {
            let responseText = "I'm processing that request. My simulated backend isn't connected yet, but here's where my analysis would appear!";
            if (modelId === 'object-detection') responseText = "Analyzing image segments. 5 vehicles and 2 pedestrians detected.";
            if (modelId === 'traffic-flow') responseText = "Calculating intersection throughput. Current flow rate: 45 vehicles/min.";
            if (modelId === 'anomaly-alert') responseText = "Scanning feeds... No stopped vehicles or anomalies detected in Sector 4.";
            if (modelId === 'image-enhancement') responseText = "Enhancing pixel density and removing grain from low-light camera feed. Process complete.";

            setMessages(prev => [...prev, { text: responseText, sender: 'ai' }]);
            setIsLoading(false);
        }, 2000);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Layout constraints
    const drawerWidth = 256;
    const collapsedDrawerWidth = 68;
    const isExpanded = isMobile || desktopOpen;

    const drawerContent = (
        <Box
            className="flex flex-col h-full justify-between"
            sx={{
                bgcolor: isDark ? '#1E1F20' : '#F0F4F9',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                opacity: 1,
            }}
        >
            <Box className="flex flex-col gap-2">
                {/* Top of sidebar - Hamburger */}
                <Box sx={{ height: 64, display: 'flex', alignItems: 'center', px: isExpanded ? '14px' : 0, justifyContent: isExpanded ? 'flex-start' : 'center', mb: 1 }}>
                    <IconButton onClick={() => isMobile ? setMobileOpen(false) : setDesktopOpen(!desktopOpen)}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* New Analysis Button */}
                <Box sx={{ px: isExpanded ? '14px' : 0, display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Button
                        variant={isExpanded ? "outlined" : "text"}
                        onClick={() => {
                            navigate('/chat');
                            if (isMobile) setMobileOpen(false);
                        }}
                        sx={{
                            justifyContent: isExpanded ? 'flex-start' : 'center',
                            minWidth: isExpanded ? '100%' : '40px',
                            width: isExpanded ? '100%' : '40px',
                            height: '40px',
                            borderRadius: '20px',
                            textTransform: 'none',
                            borderColor: 'divider',
                            color: 'text.primary',
                            bgcolor: isExpanded ? 'transparent' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                        }}
                    >
                        <AddIcon sx={{ minWidth: '24px', mr: isExpanded ? 1.5 : 0 }} />
                        {isExpanded && <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>New analysis</Typography>}
                    </Button>
                </Box>

                {/* Models area */}
                <Box className="flex-1 overflow-y-auto" sx={{ px: isExpanded ? '14px' : 0, display: 'flex', flexDirection: 'column', alignItems: isExpanded ? 'stretch' : 'center', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                    {isExpanded && (
                        <Typography variant="overline" color="text.secondary" sx={{ pl: 1, mb: 1, display: 'block', fontWeight: 'bold', fontSize: '0.7rem' }}>
                            Models
                        </Typography>
                    )}

                    {MODELS.map((model) => (
                        <Button
                            key={model.id}
                            onClick={() => {
                                navigate(`/chat/${model.id}`);
                                if (isMobile) setMobileOpen(false);
                            }}
                            sx={{
                                justifyContent: isExpanded ? 'flex-start' : 'center',
                                minWidth: isExpanded ? '100%' : '40px',
                                width: isExpanded ? '100%' : '40px',
                                height: '40px',
                                borderRadius: '20px',
                                mb: 1,
                                textTransform: 'none',
                                color: modelId === model.id ? 'primary.main' : 'text.secondary',
                                bgcolor: modelId === model.id ? (isDark ? 'rgba(187,134,252,0.12)' : 'rgba(2,136,209,0.12)') : 'transparent',
                                boxShadow: modelId === model.id && isExpanded ? `inset 3px 0 0 ${theme.palette.primary.main}` : 'none',
                                '&:hover': {
                                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(2,136,209,0.05)',
                                    color: 'text.primary'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '24px', mr: isExpanded ? 1.5 : 0, transition: 'margin 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                                {React.cloneElement(model.icon, { sx: { color: isDark ? '#bb86fc' : '#0288d1' } })}
                            </Box>
                            <Typography sx={{
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                letterSpacing: 0.2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: isExpanded ? '150px' : 0,
                                opacity: isExpanded ? 1 : 0,
                                transition: 'max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}>{model.name}</Typography>
                        </Button>
                    ))}
                </Box>
            </Box>

            {/* Bottom of sidebar - Settings & Profile */}
            <Box className="flex flex-col gap-1" sx={{ px: isExpanded ? '14px' : 0, pb: '14px', alignItems: isExpanded ? 'stretch' : 'center' }}>
                <Button
                    onClick={colorMode.toggleColorMode}
                    sx={{
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        minWidth: isExpanded ? '100%' : '40px',
                        width: isExpanded ? '100%' : '40px',
                        height: '40px',
                        borderRadius: '20px',
                        textTransform: 'none',
                        color: 'text.primary',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '24px', mr: isExpanded ? 1.5 : 0 }}>
                        {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                    </Box>
                    {isExpanded && <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{isDark ? 'Light Mode' : 'Dark Mode'}</Typography>}
                </Button>

                <Button
                    sx={{
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        minWidth: isExpanded ? '100%' : '40px',
                        width: isExpanded ? '100%' : '40px',
                        height: '40px',
                        borderRadius: '20px',
                        textTransform: 'none',
                        color: 'text.primary',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '24px', mr: isExpanded ? 1.5 : 0 }}>
                        <SettingsIcon fontSize="small" />
                    </Box>
                    {isExpanded && <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>Settings</Typography>}
                </Button>

                {/* Profile Box */}
                <Box
                    sx={{
                        mt: 1,
                        width: isExpanded ? '100%' : '40px',
                        height: isExpanded ? 'auto' : '40px',
                        bgcolor: isExpanded
                            ? (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)')
                            : 'transparent',
                        borderRadius: isExpanded ? '16px' : '20px',
                        p: isExpanded ? 2 : 0,
                        display: 'flex',
                        flexDirection: isExpanded ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(2,136,209,0.05)' },
                    }}
                    onClick={() => navigate('/profile')}
                >
                    {isExpanded ? (
                        <>
                            <Box className="flex items-center gap-3 mb-2 w-full">
                                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>K</Avatar>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography variant="body2" fontWeight="bold" noWrap>KarnidiVeera</Typography>
                                </Box>
                            </Box>
                            <Button
                                size="small"
                                color="error"
                                sx={{ textTransform: 'none', alignSelf: 'center', fontWeight: 'bold' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate('/login');
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>K</Avatar>
                    )}
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box className="flex h-screen overflow-hidden w-full max-w-full" sx={{ bgcolor: isDark ? '#131314' : '#FFFFFF', color: 'text.primary' }}>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, overflow: 'hidden' },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Sidebar */}
            <Box
                component="nav"
                sx={{
                    width: desktopOpen ? drawerWidth : collapsedDrawerWidth,
                    flexShrink: { md: 0 },
                    display: { xs: 'none', md: 'block' },
                    transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflowX: 'hidden',
                    borderRight: 0,
                }}
            >
                <Box sx={{ width: '100%', height: '100%' }}>
                    {drawerContent}
                </Box>
            </Box>

            {/* Main Chat Area */}
            <Box className="flex-1 flex flex-col relative h-full w-full max-w-full overflow-hidden">

                {/* Unified Top Header */}
                <Box className="p-4 flex items-center justify-between z-10">
                    <Box className="flex items-center gap-2">
                        {/* Mobile Menu Toggle (Only shown on mobile) */}
                        {isMobile && (
                            <IconButton onClick={() => setMobileOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Button sx={{ textTransform: 'none', fontWeight: 600, color: 'text.primary', fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                            TrafficSenseAI <Box component="span" sx={{ ml: 1, fontSize: '0.8rem', color: 'text.secondary' }}>v1.0  ▼</Box>
                        </Button>
                    </Box>
                    <Box>
                        <Avatar sx={{ bgcolor: 'primary.main', width: { xs: 32, sm: 36 }, height: { xs: 32, sm: 36 }, cursor: 'pointer' }} onClick={() => navigate('/profile')}>K</Avatar>
                    </Box>
                </Box>

                {/* Chat Content / Welcome Message */}
                <Box className="flex-1 flex flex-col items-center p-4 overflow-y-auto relative w-full" sx={{ justifyContent: messages.length === 0 ? 'center' : 'flex-start', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>

                    {messages.length === 0 && (
                        <Box sx={{ zIndex: 1, textAlign: 'center', mt: { xs: 2, md: 0 } }}>
                            <Typography
                                variant="h2"
                                component="h1"
                                fontWeight="bold"
                                sx={{
                                    fontSize: { xs: '1.5rem', sm: '2.25rem', md: '2.75rem' },
                                    background: isDark ? 'linear-gradient(90deg, #bb86fc 0%, #3700b3 100%)' : 'linear-gradient(90deg, #0288d1 0%, #01579b 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 1
                                }}
                            >
                                Hello, KarnidiVeera
                            </Typography>
                            <Typography variant="h4" color="text.secondary" sx={{ mb: 4, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                                {modelId ? `Ready for ${MODELS.find(m => m.id === modelId)?.name}?` : 'Ready for intersection modeling and traffic segmentation?'}
                            </Typography>

                            <Box className="flex gap-4 justify-center flex-wrap max-w-3xl mx-auto">
                                {MODELS.map((item, idx) => (
                                    <Paper key={idx} elevation={isDark ? 0 : 1} sx={{
                                        p: 1.5,
                                        width: '130px',
                                        minHeight: '76px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 0.5,
                                        borderRadius: '16px',
                                        bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
                                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(2,136,209,0.1)',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            bgcolor: isDark ? 'rgba(255,255,255,0.06)' : '#F0F7FF',
                                        }
                                    }} onClick={() => navigate(`/chat/${item.id}`)}>
                                        {React.cloneElement(item.icon, { sx: { fontSize: '1.25rem', color: isDark ? '#bb86fc' : '#0288d1' } })}
                                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>
                                            {item.name}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* Chat Messages */}
                    {messages.length > 0 && (
                        <Box sx={{ width: '100%', maxWidth: 800, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 4, pb: 4 }}>
                            {messages.map((msg, idx) => (
                                <Box key={idx} sx={{ display: 'flex', gap: 2, flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                                    {msg.sender === 'user' ? (
                                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>K</Avatar>
                                    ) : (
                                        <Avatar sx={{ bgcolor: isDark ? '#1E1E1E' : '#FFFFFF', border: '1px solid', borderColor: 'divider', width: 32, height: 32 }}>
                                            <TrafficIcon sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                                        </Avatar>
                                    )}
                                    <Box sx={{
                                        maxWidth: '80%',
                                        p: 2,
                                        borderRadius: 3,
                                        bgcolor: msg.sender === 'user' ? (isDark ? 'rgba(187,134,252,0.15)' : 'rgba(2,136,209,0.1)') : 'transparent',
                                    }}>
                                        <Typography variant="body1">{msg.text}</Typography>
                                    </Box>
                                </Box>
                            ))}
                            {isLoading && (
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: isDark ? '#1E1E1E' : '#FFFFFF', border: '1px solid', borderColor: 'divider', width: 32, height: 32 }}>
                                        <TrafficIcon sx={{
                                            color: 'primary.main',
                                            fontSize: '1.2rem',
                                            animation: 'pulse 1.5s infinite ease-in-out, rainbowHue 3s infinite linear',
                                            '@keyframes pulse': {
                                                '0%': { transform: 'scale(0.8)', opacity: 0.5 },
                                                '50%': { transform: 'scale(1.1)', opacity: 1 },
                                                '100%': { transform: 'scale(0.8)', opacity: 0.5 }
                                            },
                                            '@keyframes rainbowHue': {
                                                '0%': { filter: 'hue-rotate(0deg)' },
                                                '100%': { filter: 'hue-rotate(360deg)' }
                                            }
                                        }} />
                                    </Avatar>
                                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>Analyzing details...</Typography>
                                    </Box>
                                </Box>
                            )}
                            <div ref={messagesEndRef} />
                        </Box>
                    )}
                </Box>

                {/* Input Area */}
                <Box className="p-4 pt-0 flex justify-center w-full z-10">
                    <Paper
                        elevation={0}
                        sx={{
                            p: '12px 16px',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            maxWidth: 800,
                            borderRadius: '24px',
                            bgcolor: isDark ? '#1E1F20' : '#F0F4F9',
                            border: 'none',
                        }}
                    >
                        <InputBase
                            multiline
                            minRows={1}
                            maxRows={6}
                            sx={{ width: '100%', fontSize: '1rem', mb: 1, px: 1, '& textarea': { scrollbarWidth: 'none' } }}
                            placeholder={modelId ? `Send request to ${MODELS.find(m => m.id === modelId)?.name}...` : "Enter your query here..."}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Box className="flex justify-between items-center w-full">
                            <Box className="flex gap-1">
                                <IconButton sx={{ p: '8px' }}>
                                    <AddIcon />
                                </IconButton>
                                <IconButton sx={{ p: '8px' }}>
                                    <AddPhotoAlternateIcon />
                                </IconButton>
                            </Box>
                            <Box className="flex gap-1">
                                {!inputValue.trim() ? (
                                    <IconButton sx={{ p: '8px' }}>
                                        <MicIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        sx={{ p: '8px', bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }}
                                        onClick={handleSend}
                                        disabled={isLoading}
                                    >
                                        <SendIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    </Paper>
                </Box>

                {/* Footnote */}
                <Typography variant="caption" color="text.secondary" align="center" sx={{ pb: 2, pt: 1, zIndex: 10 }}>
                    TrafficSenseAI may produce incorrect analyses. Please double check critical traffic routing decisions.
                </Typography>
            </Box>
        </Box>
    );
}
