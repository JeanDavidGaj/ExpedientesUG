const { getAllAlumnos,findAlumnoByNUA} = require('../services/alumnoService')



exports.getAllAlumnos = async (req, res) => {
	try {
		const users = await getAllAlumnos()
		res.status(200).json({
			message: 'Success',
			users
		})
	} catch (error) {
		res.status(500).json({
			message: 'Server Error Getting all Users',
			error: error.message
		})
	}
}

exports.getAlumnoByNUA = async (req, res) => {
    const { nua } = req.params;
    try {
        const result = await findAlumnoByNUA(nua);
        if (result.success) {
            res.status(200).json({
                message: 'Alumno encontrado',
                alumno: result.user
            });
        } else {
            res.status(404).json({
                message: 'Alumno No Encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor al buscar el alumno',
            error: error.message
        });
    }
};

const { createPrestamo } = require('../services/alumnoService');

exports.createPrestamo = async (req, res) => {
    const { nua } = req.params;
    const { folio, fechaSolicitud, fechaDevolucion, motivo, comentarios } = req.body;

    if (!folio || !fechaSolicitud || !fechaDevolucion || !motivo) {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios, incluyendo el folio.'
        });
    }

    try {
        const result = await createPrestamo(nua, {
            folio,
            fechaSolicitud,
            fechaDevolucion,
            motivo,
            comentarios
        });

        if (result.success) {
            res.status(201).json({
                message: 'Préstamo creado con éxito',
                folio: result.folio
            });
        } else {
            res.status(500).json({
                message: 'Error al crear el préstamo',
                error: result.message
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor al crear el préstamo',
            error: error.message
        });
    }
};


