const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();
const port = 3002;

const uri = 'mongodb+srv://admin:admin@cluster0.acc1is2.mongodb.net/users_db?retryWrites=true&w=majority&appName=Cluster0';;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((error) => console.error('Error al conectar a MongoDB Atlas:', error.message));
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
}));

// Middleware para JSON
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes); // Asegúrate de usar el prefijo correcto

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
