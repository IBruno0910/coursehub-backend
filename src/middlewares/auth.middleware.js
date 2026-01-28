const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

module.exports = async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return res.status(401).json({ message: "Usuario no válido" });
    }

    req.user = {
      id: user.id,
      role: user.role, // 👈 CLAVE
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
