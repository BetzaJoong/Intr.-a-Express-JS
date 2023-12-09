const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const repertorioRoutes = require('./repertorioRoutes');

// Utiliza cors para poder definir mis rutas
app.use(cors());
app.use(express.json());
app.use('/', repertorioRoutes);

// Configurar ruta para la raíz
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
