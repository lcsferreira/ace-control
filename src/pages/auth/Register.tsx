import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Grid,
  Link,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerSchema } from "../../schemas/authSchema";
import { RegisterForm } from "../../types/authTypes";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);

    try {
      // Simulação de registro
      setTimeout(() => {
        // Após o registro bem-sucedido, faz login automático
        login(data.email, data.password).then((success) => {
          if (success) {
            navigate("/");
          }
        });
      }, 1000);
    } catch (err) {
      setError("root", {
        type: "manual",
        message: "Ocorreu um erro ao criar sua conta",
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
              <CardContent sx={{ p: isMobile ? 3 : 5 }}>
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
                    Criar Conta
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Preencha os dados para se cadastrar
                  </Typography>
                </Box>

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
                    id="name"
                    label="Nome completo"
                    autoComplete="name"
                    autoFocus
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{ mb: 3 }}
                    {...register("name")}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    autoComplete="email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ mb: 3 }}
                    {...register("email")}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mb: 3 }}
                    {...register("password")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    label="Confirmar Senha"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    variant="outlined"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    sx={{ mb: 3 }}
                    {...register("confirmPassword")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
                    {isLoading ? "Criando conta..." : "Criar conta"}
                  </Button>

                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Já tem uma conta?{" "}
                      <Link
                        onClick={() => navigate("/login")}
                        sx={{ cursor: "pointer", fontWeight: "bold" }}
                      >
                        Fazer login
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
