const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Clave secreta para JWT
const JWT_SECRET = 'tu_clave_secreta_segura'; // ¡Guárdala bien!

// Registro
router.post('/register', async (req, res) => {
  const { email, password, nombre } = req.body;

  try {
    // Verifica si el usuario ya existe
    const [existing] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Correo ya registrado' });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO usuarios (email, password, nombre) VALUES (?, ?, ?)', [email, hashedPassword, nombre]);

    res.status(201).json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (users.length === 0) return res.status(400).json({ success: false, message: 'Usuario no encontrado' });

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });

    // Crea el token
    const token = jwt.sign({ id: user.id, email: user.email, nombre: user.nombre }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: true, token, user: { id: user.id, email: user.email, nombre: user.nombre } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
  }
});

module.exports = router;
