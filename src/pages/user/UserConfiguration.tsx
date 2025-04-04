import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export function UserConfiguration() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui implementaríamos a lógica para atualizar os dados do perfil
    console.log("Dados do perfil atualizados:", {
      name: formData.name,
      email: formData.email,
    });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Configuração de Usuário
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Gerencie suas informações pessoais.
      </Typography>

      <Stack spacing={4} sx={{ mt: 3 }}>
        {/* Seção de Perfil */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{ width: 80, height: 80, mr: 3, bgcolor: "primary.main" }}
            >
              {user?.name?.charAt(0) || "U"}
            </Avatar>
            <Box>
              <Typography variant="h6">{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box
            component="form"
            onSubmit={handleProfileUpdate}
            sx={{ mt: 2 }}
            noValidate
          >
            <Typography variant="h6" gutterBottom>
              Informações Pessoais
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              label="Nome Completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1, fontWeight: "medium" }}
            >
              Salvar Alterações
            </Button>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}
