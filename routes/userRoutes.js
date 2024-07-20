const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, password } = req.body;

    
    if (!username || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    
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
