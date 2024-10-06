import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

let imageCounter = 0; // Contador para las imágenes

// Obtener la imagen en base64 de la otra API y convertirla a archivo
export const getBase64ImageAndSave = async (req, res) => {
    try {
        const response = await fetch('http://localhost:3510/img/base64-comment');
        if (!response.ok) {
            return res.status(response.status).send('Error al obtener la imagen en base64.');
        }

        const { base64 } = await response.json(); // Cambiar base64Image a base64

        // Convertir base64 a Buffer
        const imageBuffer = Buffer.from(base64, 'base64');

        // Generar un nombre de archivo único
        const filename = `imagen${++imageCounter}.jpg`; // Cambiar la extensión según sea necesario
        const imagePath = path.join(process.cwd(), 'uploads', filename);
        
        fs.writeFile(imagePath, imageBuffer, (err) => {
            if (err) {
                return res.status(500).send('Error al guardar la imagen.');
            }
            res.status(200).send(`Imagen guardada correctamente en ${imagePath}`);
        });
    } catch (error) {
        res.status(500).send('Error al obtener la imagen desde la API externa.');
    }
};
