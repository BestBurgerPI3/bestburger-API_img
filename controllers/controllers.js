import db from '../config/db.js'; // Asegúrate de importar tu conexión a la base de datos

// Obtener la imagen en base64 de la otra API y convertirla a archivo
export const getBase64ImageAndSave = async (req, res) => {
    try {
        const response = await fetch('http://localhost:3510/img/base64-comment');
        if (!response.ok) {
            return res.status(response.status).send('Error al obtener la imagen en base64.');
        }

        const { base64 } = await response.json();

        const imageBuffer = Buffer.from(base64, 'base64');
        const filename = `imagen${++imageCounter}.jpg`;
        const imagePath = path.join(process.cwd(), 'uploads', filename);
        
        fs.writeFile(imagePath, imageBuffer, async (err) => {
            if (err) {
                return res.status(500).send('Error al guardar la imagen.');
            }

            const imageUrl = `http://localhost:3520/uploads/${filename}`; 

            const sql = `INSERT INTO Comentario (Descripcion, Calificacion, Imagen, Lugar_idLugar, Usuario_idUsuario, Usuario_Foto_Perfil_idFoto_Perfil, Usuario_TipoUsuario_idTipoUsuario, Hamburguesa_idHamburguesa, Hamburguesa_Restaurante_NIT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [req.body.descripcion, req.body.calificacion, imageUrl, req.body.lugarId, req.body.usuarioId, req.body.fotoPerfilId, req.body.tipoUsuarioId, req.body.hamburguesaId, req.body.restauranteNIT];

            db.query(sql, values, (error, results) => {
                if (error) {
                    return res.status(500).send('Error al guardar el comentario en la base de datos.');
                }
                res.status(201).send('Comentario guardado correctamente.');
            });
        });
    } catch (error) {
        res.status(500).send('Error al obtener la imagen desde la API externa.');
    }
};

export const getImageAndSendBase64 = async (req, res) => {
    const comentarioId = req.params.id; 

    const sql = 'SELECT Imagen FROM Comentario WHERE id = ?';
    
    db.query(sql, [comentarioId], async (error, results) => {
        if (error) {
            return res.status(500).send('Error al consultar la base de datos.');
        }

        if (results.length === 0) {
            return res.status(404).send('Comentario no encontrado.');
        }

        const imageUrl = results[0].Imagen;

        fs.readFile(path.join(process.cwd(), 'uploads', path.basename(imageUrl)), (err, data) => {
            if (err) {
                return res.status(500).send('Error al leer la imagen.');
            }

            const base64Image = data.toString('base64');

            const payload = {
                base64: base64Image,
                imageUrl: imageUrl
            };

            fetch('http://api-gateway-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(apiResponse => {
                if (!apiResponse.ok) {
                    return res.status(500).send('Error al enviar los datos al API Gateway.');
                }
                res.status(200).send('Imagen enviada correctamente al API Gateway.');
            })
            .catch(apiError => {
                res.status(500).send('Error al enviar los datos al API Gateway.');
            });
        });
    });
};