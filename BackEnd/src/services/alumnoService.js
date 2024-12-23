const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findAlumnoByNUA, getAllAlumnos } = require('../models/AlumnosModel')
require('dotenv').config()

exports.findAlumnoByNUA = async (NUA) => {
	console.log('@@ email => service => ', NUA)
	try {
		const found = await findAlumnoByNUA(NUA)
		if (found.success) {
			return {
				success: true,
				user: found.user
			}
		}
		return {
			success: false,
			message: 'Alumno No Encontrado'
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}
exports.getAllAlumnos = async () => {
	try {
		const alumnos = await getAllAlumnos()
		return alumnos
	} catch (error) {
		throw new Error('Error Getting Users: ' + error.message)
	}
}

const { createPrestamo } = require('../models/AlumnosModel');

exports.createPrestamo = async (nua, prestamoData) => {
    try {
        const result = await createPrestamo(nua, prestamoData);
        if (result.success) {
            return {
                success: true,
                folio: result.folio
            };
        }
        return {
            success: false,
            message: result.error
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};





