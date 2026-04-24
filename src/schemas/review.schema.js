const { z } = require("zod");

const createReviewSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .int("El rating debe ser un número entero")
      .min(1, "El rating mínimo es 1")
      .max(5, "El rating máximo es 5"),

    comment: z
      .string()
      .min(3, "El comentario debe tener al menos 3 caracteres")
      .optional(),

    courseId: z.string().uuid("ID de curso inválido"),
  }),
});

const courseIdParamSchema = z.object({
  params: z.object({
    courseId: z.string().uuid("ID de curso inválido"),
  }),
});

module.exports = {
  createReviewSchema,
  courseIdParamSchema,
};