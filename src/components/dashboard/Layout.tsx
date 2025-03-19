'use client';

import { Box, CssBaseline, styled } from '@mui/material';
import { AppBarComponent } from './AppBar';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '@/stores/auth.store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  const [open, setOpen] = useState(true);

  const drawerWidth = 240;

  const changeStatusClose = () => {
    setOpen(!open);
  }



  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: open ? 0 : `-${drawerWidth}px`,
        },
      },
    ],
  }));


  return (
    <Box sx={{ display: 'flex' }}>

      <CssBaseline />
      <AppBarComponent statusOpen={open} changeStatus={changeStatusClose} />
      <Sidebar statusOpen={open} changeStatus={changeStatusClose} />


      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px', // Altura del AppBar
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      > */}
      <Main open={open}>
        {children}
      </Main>
      {/* </Box> */}
    </Box>
  );
};