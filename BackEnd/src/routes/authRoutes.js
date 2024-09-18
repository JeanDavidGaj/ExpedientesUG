const express = require('express')
const router = express.Router()
const AlumnoController= require('../controllers/AlumnoController')



//Alumno
router.get('/get-allAlumnos', AlumnoController.getAllAlumnos)
router.get('/get-AlumnoByNUA/:nua', AlumnoController.getAlumnoByNUA); // Esta ruta ahora buscará por nombre


module.exports = router

