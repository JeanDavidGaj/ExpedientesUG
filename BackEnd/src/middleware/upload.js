const multer = require('multer');

// Configuración para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;


