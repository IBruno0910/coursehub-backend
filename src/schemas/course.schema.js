const { z } = require("zod");

// CREATE
const createCourseSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "El título debe tener al menos 3 caracteres"),

    description: z
      .string()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .optional(),

    published: z.boolean().optional(),
  }),
});

// UPDATE
const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    published: z.boolean().optional(),
  }),

  params: z.object({
    id: z.string().uuid("ID inválido"),
  }),
});

module.exports = {
  createCourseSchema,
  updateCourseSchema,
};