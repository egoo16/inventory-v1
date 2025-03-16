'use client';

import { Box, Toolbar } from '@mui/material';
import { AppBar } from './AppBar';
import { useAuthStore } from '@/stores/auth.store';
import { Sidebar } from './Sidebar';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, logout } = useAuthStore();

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar onLogout={logout} />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar /> {/* Para espacio del AppBar */}
                {children}
            </Box>
        </Box>
    );
};