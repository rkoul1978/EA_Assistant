import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { useThemeContext } from '../contexts/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const Header = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar variant="dense" sx={{ minHeight: 48 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <PersonSearchIcon sx={{ mr: 1, fontSize: '1.5rem' }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: '"Roboto Condensed", sans-serif',
              fontWeight: 700,
              letterSpacing: '0.5px',
              fontSize: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Enterprise Architect Assistant
          </Typography>
        </Box>
        <IconButton onClick={toggleDarkMode} color="inherit" size="small" edge="end">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
