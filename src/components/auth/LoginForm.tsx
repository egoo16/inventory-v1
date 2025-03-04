"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Stack, Alert } from "@mui/material";
import { useAuthStore } from "@/stores/auth.store";

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().required("Requerido"),
});

export const LoginForm = () => {
  const { login, error, loading } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          name="password"
          label="Contraseña"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Ingresar"}
        </Button>
      </Stack>
    </form>
  );
};
