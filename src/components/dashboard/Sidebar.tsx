'use client';

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  PointOfSale as SalesIcon,
  People as PeopleIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useAuthStore } from '../../stores/auth.store';

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


  const filteredMenuItems = menuItems.filter(item => {
    if (user?.role === 'employee') {
      return !['settings', 'reports'].includes(item.path.split('/').pop()!);
    }
    return true;
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => router.push(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
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