import { LoginForm } from "@/components/auth/LoginForm";
import { Card, Container, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h4" align="center" mb={3}>
          Inventory System
        </Typography>
        <LoginForm />
      </Card>
    </Container>
  );
}
