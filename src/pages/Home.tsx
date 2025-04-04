import { Typography, Box, Stack } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Bem-vindo ao painel de controle do ACE Control
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ mt: 2 }}
        useFlexGap
        flexWrap="wrap"
      ></Stack>
    </Box>
  );
}
