import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes subidas
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Guardar con nombre único
    }
});

// Crear el middleware de multer
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 10 * 1024 * 1024 } // Límite de 10MB
});

export default upload; // Exportar usando export default
