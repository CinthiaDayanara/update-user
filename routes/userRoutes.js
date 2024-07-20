const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Asegúrate de que la ruta al modelo sea correcta

// Ruta para actualizar un usuario por su ID
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, password } = req.body;

    // Verificar que los campos requeridos estén presentes
    if (!username || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Buscar y actualizar el usuario por su ID
    const user = await User.findByIdAndUpdate(userId, { username, password }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario', details: error.message });
  }
});

module.exports = router;
