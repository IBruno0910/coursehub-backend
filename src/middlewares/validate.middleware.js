function validate(schema) {
  return async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.issues?.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })) || [],
      });
    }
  };
}

module.exports = validate;