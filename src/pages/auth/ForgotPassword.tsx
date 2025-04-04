import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Link,
  Alert,
  AlertTitle,
} from "@mui/material";

// Schema de validação
const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Digite um email válido")
    .required("Email é obrigatório"),
});

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);

    try {
      // Simulação de envio de email de recuperação
      setTimeout(() => {
        console.log("Email enviado com sucesso");
        console.log(data);
        setSuccess(true);
      }, 1500);
    } catch (err) {
      setError("root", {
        type: "manual",
        message: "Ocorreu um erro ao enviar o email de recuperação",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4527a0 0%, #7b1fa2 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Grid container>
          <Grid>
            <Card
              elevation={8}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 4,
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                  >
                    Recuperação de Senha
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                  >
                    Digite seu email para receber as instruções de recuperação
                  </Typography>
                </Box>

                {success ? (
                  <Box>
                    <Alert severity="success" sx={{ mb: 3 }}>
                      <AlertTitle>Email enviado!</AlertTitle>
                      Enviamos um email com instruções para recuperar sua senha.
                      Verifique sua caixa de entrada.
                    </Alert>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate("/login")}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        fontWeight: "bold",
                        borderRadius: "8px",
                      }}
                    >
                      Voltar para o login
                    </Button>
                  </Box>
                ) : (
                  <>
                    {errors.root && (
                      <Box
                        sx={{
                          p: 2,
                          mb: 3,
                          backgroundColor: "error.light",
                          borderRadius: 1,
                        }}
                      >
                        <Typography color="error" align="center">
                          {errors.root.message}
                        </Typography>
                      </Box>
                    )}

                    <Box
                      component="form"
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                    >
                      <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        autoComplete="email"
                        autoFocus
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{ mb: 3 }}
                        {...register("email")}
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        sx={{
                          mt: 2,
                          mb: 3,
                          py: 1.5,
                          fontWeight: "bold",
                          borderRadius: "8px",
                          boxShadow: 3,
                        }}
                      >
                        {isLoading ? "Enviando..." : "Enviar instruções"}
                      </Button>

                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          <Link
                            onClick={() => navigate("/login")}
                            sx={{ cursor: "pointer", fontWeight: "bold" }}
                          >
                            Voltar para o login
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
