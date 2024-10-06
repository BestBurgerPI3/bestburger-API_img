import express from 'express';
import bodyParser from 'body-parser';
import imageRoutes from './routes/routes.js';
import path from 'path';

const app = express();
const port = 3520;

// Middleware para analizar las solicitudes con JSON
app.use(bodyParser.json({ limit: '10mb' })); // Limite de 10MB para evitar problemas con imágenes grandes
app.use(bodyParser.urlencoded({ extended: true }));

// Carpeta estática para servir las imágenes
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Configurar las rutas
app.use('/api', imageRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor API corriendo en http://localhost:${port}`);
});
