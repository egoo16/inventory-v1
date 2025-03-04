import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TenantThemeProvider } from "@/components/common/TenantThemeProvider";
import { Box } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Inventarios",
  description: "Sistema para administrar mi negocio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TenantThemeProvider>
          <Box component="main">{children}</Box>
        </TenantThemeProvider>
      </body>
    </html>
  );
}
