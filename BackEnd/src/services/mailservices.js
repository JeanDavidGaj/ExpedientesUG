const nodemailer = require('nodemailer');

async function enviarCorreoConArchivos(to, subject, text, files) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Cambiar si usas otro proveedor
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            attachments: files
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        return { success: true, message: 'Correo enviado con éxito' };
    } catch (error) {
        console.error('Error enviando correo:', error.message);
        return { success: false, message: error.message };
    }
}

module.exports = enviarCorreoConArchivos;
