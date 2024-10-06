import express from 'express';
import { getBase64ImageAndSave } from '../controllers/controllers.js';

const router = express.Router();

// Ruta para obtener una imagen en base64 de otra API y guardarla
router.get('/get-base64-image', getBase64ImageAndSave); // Cambiado aquí

export default router;
