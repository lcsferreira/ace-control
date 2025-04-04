import { Button, Typography, Box, Container, Paper } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Bem-vindo ao ACE Control
          </Typography>

          <Typography variant="h6" gutterBottom>
            Olá, {user?.name}!
          </Typography>

          <Typography paragraph>
            Esta é a página inicial do sistema. Aqui você terá acesso a todas as
            funcionalidades disponíveis de acordo com o seu perfil de usuário.
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary">
              Dashboard
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ ml: 2 }}
              onClick={logout}
            >
              Sair
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
