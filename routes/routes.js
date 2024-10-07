import express from 'express';
import { getBase64ImageAndSave, getImageAndSendBase64 } from '../controllers/controllers.js';

const router = express.Router();


router.get('/get-base64-image', getBase64ImageAndSave);
router.get('/get-image-base64/:id', getImageAndSendBase64); 

export default router;
