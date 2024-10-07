import express from 'express';
import bodyParser from 'body-parser';
import imageRoutes from './routes/routes.js';
import path from 'path';

const app = express();
const port = 3520;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api', imageRoutes);

app.listen(port, () => {
    console.log(`Servidor API corriendo en http://localhost:${port}`);
});
