import { Typography, Box, Paper, Stack } from "@mui/material";

export function TeamCreate() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui implementaríamos a lógica para criar a equipe
    console.log("Equipe criada");
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Criar Nova Equipe
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Crie uma nova equipe e adicione membros para colaboração.
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
            ></Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
