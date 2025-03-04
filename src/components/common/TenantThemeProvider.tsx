"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useThemeStore } from "@/stores/theme.store";
import { baseTheme } from "@/theme/baseTheme";
import { useEffect } from "react";

export const TenantThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { mode, tenantId } = useThemeStore();

  const theme = baseTheme(mode);

  useEffect(() => {
    if (tenantId) {
      //TODO: Logica para cargar configuracion especifica de tenant
    }
  }, [tenantId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
