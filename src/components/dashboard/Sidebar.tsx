'use client';

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Box, styled, IconButton, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  PointOfSale as SalesIcon,
  People as PeopleIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useAuthStore } from '@/stores/auth.store';
import { useLayoutStore } from '../../stores/layout.store';
import { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Productos', icon: <InventoryIcon />, path: '/dashboard/products' },
  { text: 'Ventas', icon: <SalesIcon />, path: '/dashboard/sales' },
  { text: 'Clientes/Proveedores', icon: <PeopleIcon />, path: '/dashboard/contacts' },
  { text: 'Reportes', icon: <ReportsIcon />, path: '/dashboard/reports' },
  { text: 'Configuración', icon: <SettingsIcon />, path: '/dashboard/settings' },
];

export const Sidebar = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const drawerWidth = 240;
  const theme = useTheme();
  const open = useLayoutStore((state) => state.open);
  const setOpen = useLayoutStore((state) => state.setOpen);
  

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  

  return (
    <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
    variant="persistent"
    anchor="left"
    open={open}
  >

      <DrawerHeader>

      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          {user?.tenantName || 'Mi Empresa'}
        </Typography>
      </Box>
      <Divider />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => router.push(item.path)}>
              <ListItemIcon sx={{ color: 'text.primary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Usuario: {user?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rol: {user?.role}
        </Typography>
      </Box>
    </Drawer>
  );
};