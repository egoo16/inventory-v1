
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuthStore } from '../../../stores/auth.store';
import { Avatar, IconButton } from '@mui/material';

export const MenuProfile = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const { user, logout } = useAuthStore();



    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>


            <IconButton onClick={handleClick} color="inherit">
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {user?.name?.[0]?.toUpperCase()}
                </Avatar>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={user}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

