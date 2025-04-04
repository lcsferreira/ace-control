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
  Divider,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginForm } from "../../types/authTypes";
import { loginSchema } from "../../schemas/authSchema";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Configuração do react-hook-form com validação
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);

    try {
      const success = await login(data.email, data.password);
      if (success) {
        navigate("/");
      } else {
        setError("root", {
          type: "manual",
          message: "Email ou senha inválidos",
        });
      }
    } catch (err) {
      setError("root", {
        type: "manual",
        message: "Ocorreu um erro ao fazer login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
                    ACE Control
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Faça login para acessar o sistema
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

                  <TextField
                    margin="normal"
                    fullWidth
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mb: 2 }}
                    {...register("password")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box sx={{ textAlign: "right", mb: 3 }}>
                    <Link
                      onClick={() => navigate("/esqueci-senha")}
                      sx={{
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Esqueci minha senha
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{
                      mt: 1,
                      mb: 3,
                      py: 1.5,
                      fontWeight: "bold",
                      borderRadius: "8px",
                      boxShadow: 3,
                    }}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>

                  <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      ou
                    </Typography>
                  </Divider>

                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Typography variant="body2">
                      Não tem uma conta?{" "}
                      <Link
                        onClick={() => navigate("/cadastro")}
                        sx={{
                          cursor: "pointer",
                          fontWeight: "bold",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        Cadastre-se
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
