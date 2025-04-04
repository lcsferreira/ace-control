import * as yup from "yup";
import { PlayerPosition } from "../types/userTypes";

export const playerConfigSchema = yup.object({
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(
      /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
      "Telefone inválido. Formato: (99) 99999-9999"
    ),
  height: yup
    .number()
    .required("Altura é obrigatória")
    .min(100, "Altura mínima é 100cm")
    .max(250, "Altura máxima é 250cm")
    .typeError("Altura deve ser um número"),
  weight: yup
    .number()
    .required("Peso é obrigatório")
    .min(30, "Peso mínimo é 30kg")
    .max(200, "Peso máximo é 200kg")
    .typeError("Peso deve ser um número"),
  inGameNumber: yup
    .number()
    .required("Número na camisa é obrigatório")
    .min(1, "Número mínimo é 1")
    .max(99, "Número máximo é 99")
    .integer("Número deve ser inteiro")
    .typeError("Número deve ser um número inteiro"),
  position: yup
    .mixed<PlayerPosition>()
    .oneOf(Object.values(PlayerPosition), "Posição inválida")
    .required("Posição é obrigatória"),
  image: yup.mixed(),
});
