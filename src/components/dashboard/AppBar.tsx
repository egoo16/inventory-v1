'use client';

import { Toolbar, IconButton, Typography, Badge, styled } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { useAuthStore } from '@/stores/auth.store';
import { ThemeToggle } from './ThemeToggle';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { MenuProfile } from './components/MenuProfile';

interface AppBarProps {
  statusOpen: boolean;
  changeStatus: () => void;
}

export const AppBarComponent: React.FC<AppBarProps> = ({ statusOpen, changeStatus }) => {


  const { user } = useAuthStore();
  const drawerWidth = 240;

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));


  return (
    <AppBar open={statusOpen} position="fixed" sx={{ zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => changeStatus()}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user?.tenantName || 'Inventory System'}
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeToggle />

          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <MenuProfile />
         
        </div>
      </Toolbar>
    </AppBar>
  );
};