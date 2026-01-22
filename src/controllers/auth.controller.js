const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password requeridos' });
  }

  const existingUser = await userService.findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'Usuario ya existe' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userService.createUser(email, hashedPassword);

  res.status(201).json({
    id: user.id,
    email: user.email,
  });
}

module.exports = { register };
