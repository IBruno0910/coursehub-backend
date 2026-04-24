const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    email: z.email("Email inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.email("Email inválido"),
    password: z.string().min(1, "La contraseña es obligatoria"),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};