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

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password requeridos' });
  }

  const user = await userService.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
}

module.exports = { register, login };
