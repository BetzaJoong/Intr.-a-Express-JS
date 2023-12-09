const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const router = express.Router();

const repertorioFilePath = path.join(__dirname, 'repertorio.json');

// GET /canciones
router.get('/canciones', async (req, res) => {
    try {
        const repertorioData = await fs.readFile(repertorioFilePath, 'utf-8');
        const canciones = JSON.parse(repertorioData);
        res.json(canciones);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// POST /canciones
router.post('/canciones', async (req, res) => {
    try {
        const repertorioData = await fs.readFile(repertorioFilePath, 'utf-8');
        const canciones = JSON.parse(repertorioData);

        // Validación de campos no vacíos
        if (!req.body.titulo || !req.body.artista || !req.body.tono) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        const nuevaCancion = {
            id: req.body.id,
            titulo: req.body.titulo,
            artista: req.body.artista,
            tono: req.body.tono,
        };

        canciones.push(nuevaCancion);
        await fs.writeFile(repertorioFilePath, JSON.stringify(canciones, null, 2), 'utf-8');

        res.status(201).send('Canción agregada correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// PUT /canciones/:id
router.put('/canciones/:id', async (req, res) => {
    try {
        const repertorioData = await fs.readFile(repertorioFilePath, 'utf-8');
        let canciones = JSON.parse(repertorioData);

        const cancionId = req.params.id;
        const cancionIndex = canciones.findIndex(c => c.id == cancionId);

        if (cancionIndex !== -1) {
            canciones[cancionIndex] = {
                id: req.body.id,
                titulo: req.body.titulo,
                artista: req.body.artista,
                tono: req.body.tono,
            };

            await fs.writeFile(repertorioFilePath, JSON.stringify(canciones, null, 2), 'utf-8');
            res.send('Canción editada correctamente');
        } else {
            res.status(404).send('Canción no encontrada');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE /canciones/:id
router.delete('/canciones/:id', async (req, res) => {
    try {
        const repertorioData = await fs.readFile(repertorioFilePath, 'utf-8');
        let canciones = JSON.parse(repertorioData);

        const cancionId = req.params.id;
        const updatedCanciones = canciones.filter(c => c.id != cancionId);

        if (canciones.length !== updatedCanciones.length) {
            await fs.writeFile(repertorioFilePath, JSON.stringify(updatedCanciones, null, 2), 'utf-8');
            res.send('Canción eliminada correctamente');
        } else {
            res.status(404).send('Canción no encontrada');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;

