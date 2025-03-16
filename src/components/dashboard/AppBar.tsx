'use client';

import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { useAuthStore } from '@/stores/auth.store';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';

export const AppBar = ({ onLogout }: { onLogout: () => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAuthStore();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Inventory System
        </Typography>
        
        <ThemeToggle />
        
        <IconButton color="inherit" sx={{ mx: 1 }}>
          <NotificationsIcon />
        </IconButton>

        <IconButton onClick={handleMenu} color="inherit">
          <Avatar src={user?.avatar} sx={{ bgcolor: 'secondary.main' }}>
            {user?.name[0]}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Perfil</MenuItem>
          <MenuItem onClick={onLogout}>Cerrar sesión</MenuItem>
        </Menu>
      </Toolbar>
    </MuiAppBar>
  );
};