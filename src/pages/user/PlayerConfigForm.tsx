import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  Avatar,
  Stack,
  Alert,
  InputAdornment,
  useTheme,
  Divider,
} from "@mui/material";
import {
  PhotoCamera,
  Info as InfoIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { playerConfigSchema } from "../../schemas/userSchema";
import type { PlayerConfigForm } from "../../types/formTypes";
import { PlayerPosition } from "../../types/userTypes";
import { useAuth } from "../../contexts/AuthContext";

// Imagem padrão - URL para avatar placeholder
const DEFAULT_PROFILE_IMAGE = "https://via.placeholder.com/150";

export default function PlayerConfigForm() {
  const { user, updateUserInfo } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerConfigForm>({
    resolver: yupResolver(playerConfigSchema) as any,
    defaultValues: {
      phone: "",
      height: 180,
      weight: 70,
      inGameNumber: 1,
      position: PlayerPosition.Ponteiro,
      image: null,
    },
  });

  const onSubmit = async (data: PlayerConfigForm) => {
    setIsSubmitting(true);
    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Na vida real, aqui você faria um upload da imagem e obteria a URL
      const imageUrl = previewImage || DEFAULT_PROFILE_IMAGE;

      // Atualizar o perfil do usuário
      if (updateUserInfo) {
        await updateUserInfo({
          ...data,
          image: imageUrl,
          hasConfigured: true,
        });
      }

      setSubmitSuccess(true);

      // Redirecionar após um breve atraso
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (submitSuccess) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          sx={{ mb: 3, p: 2 }}
        >
          <Typography variant="h6">Configuração Concluída!</Typography>
          <Typography variant="body1">
            Suas informações foram salvas com sucesso. Redirecionando...
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Complete seu Perfil
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Precisamos de algumas informações para completar seu perfil de
          jogador.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Seção da Foto */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <input
                ref={fileInputRef}
                accept="image/*"
                type="file"
                hidden
                onChange={handleImageChange}
              />
              <Avatar
                src={previewImage || undefined}
                alt="Foto de Perfil"
                sx={{
                  width: 150,
                  height: 150,
                  mx: "auto",
                  border: `4px solid ${theme.palette.primary.main}`,
                }}
              />
              <Button
                variant="outlined"
                color="primary"
                startIcon={<PhotoCamera />}
                onClick={triggerFileInput}
                sx={{ mt: 2 }}
              >
                Escolher Foto
              </Button>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                A foto é opcional. Se não escolher uma, usaremos um avatar
                padrão.
              </Typography>
            </Box>

            {/* Número e Posição */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="inGameNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número na Camisa"
                    type="number"
                    fullWidth
                    required
                    error={!!errors.inGameNumber}
                    helperText={errors.inGameNumber?.message}
                    inputProps={{ min: 1, max: 99 }}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />

              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.position}>
                    <InputLabel id="position-label">Posição</InputLabel>
                    <Select
                      {...field}
                      labelId="position-label"
                      label="Posição"
                      required
                    >
                      {Object.values(PlayerPosition).map((position) => (
                        <MenuItem key={position} value={position}>
                          {position}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.position?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Stack>

            {/* Dados Físicos */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="height"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Altura (cm)"
                    type="number"
                    fullWidth
                    required
                    error={!!errors.height}
                    helperText={errors.height?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">cm</InputAdornment>
                      ),
                    }}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />

              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Peso (kg)"
                    type="number"
                    fullWidth
                    required
                    error={!!errors.weight}
                    helperText={errors.weight?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
                    }}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Stack>

            {/* Contato */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Telefone"
                  fullWidth
                  required
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  placeholder="(99) 99999-9999"
                />
              )}
            />

            {/* Mensagem informativa */}
            <Alert severity="info" icon={<InfoIcon />} sx={{ mt: 2 }}>
              Estas informações poderão ser alteradas posteriormente nas
              configurações da sua conta.
            </Alert>

            {/* Botão de submissão */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{ minWidth: 200, py: 1.5 }}
              >
                {isSubmitting ? "Salvando..." : "Salvar e Continuar"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
