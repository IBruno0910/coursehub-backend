function errorHandler(err, req, res, next) {
  console.error(err);

  // Prisma errores conocidos
  if (err.code === "P2002") {
    return res.status(400).json({
      message: "Registro duplicado",
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      message: "Recurso no encontrado",
    });
  }

  // Error por defecto
  return res.status(500).json({
    message: "Error interno del servidor",
  });
}

module.exports = errorHandler;