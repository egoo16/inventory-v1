'use client';

import { Switch, FormGroup, FormControlLabel, useTheme } from '@mui/material';
import { useThemeStore } from '@/stores/theme.store';
import { LightMode, DarkMode } from '@mui/icons-material';

export const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeStore();
  const theme = useTheme();

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={mode === 'dark'}
            onChange={toggleMode}
            color="default"
            icon={<LightMode sx={{ color: theme.palette.text.primary }} />}
            checkedIcon={<DarkMode sx={{ color: theme.palette.text.primary }} />}
          />
        }
        label={mode === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
        labelPlacement="start"
      />
    </FormGroup>
  );
};