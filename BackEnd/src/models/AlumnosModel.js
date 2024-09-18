const firebase = require('../config/firebase')

  
exports.findAlumnoByNUA = async (name) => {
    console.log('@@ model => ', name);
    try {
        const AlumnoCollection = firebase.firestore().collection('Alumnos');
        const Alumno = await AlumnoCollection.where('nua', '==', name).get(); 
        if (!Alumno.empty) {
            const AlumnoFound = Alumno.docs[0];
            return {
                success: true,
                user: AlumnoFound.data()
            };
        } else {
            return {
                success: false,
                error: 'Alumno no encontrado'
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

exports.getAllAlumnos = async () => {
	try {
		const AlumnoCollection = firebase.firestore().collection('Alumnos')
		const allAlumnos = await AlumnoCollection.get()
		const alumnos = []
		allAlumnos.forEach((doc) => {
			alumnos.push(doc.data())
		})
		return alumnos
	} catch (error) {
		throw new Error('Error getting users: ' + error.message)
	}
}
