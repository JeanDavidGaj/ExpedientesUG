const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload');
const enviarCorreoConArchivos = require('../services/mailservices');
const AlumnoController= require('../controllers/AlumnoController')



//Alumno
router.get('/get-allAlumnos', AlumnoController.getAllAlumnos)
router.get('/get-AlumnoByNUA/:nua', AlumnoController.getAlumnoByNUA); // Esta ruta ahora buscará por nombre

router.post('/create-prestamo/:nua', AlumnoController.createPrestamo);

router.post('/enviar-correo', upload.fields([{ name: 'solicitud' }, { name: 'inventario' }]), async (req, res) => {
    try {
        const archivos = [];
        if (req.files.solicitud) {
            archivos.push({
                filename: req.files.solicitud[0].originalname,
                content: req.files.solicitud[0].buffer
            });
        }
        if (req.files.inventario) {
            archivos.push({
                filename: req.files.inventario[0].originalname,
                content: req.files.inventario[0].buffer
            });
        }

        const result = await enviarCorreoConArchivos(
            'expedientesug@gmail.com',
            'Solicitud de Transferencia',
            'Adjunto encontrarás los archivos de la solicitud de transferencia.',
            archivos
        );

        res.status(result.success ? 200 : 500).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al enviar el correo', error: error.message });
    }
});



module.exports = router

