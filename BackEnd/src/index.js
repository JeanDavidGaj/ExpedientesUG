const express = require('express')
const cors = require('cors')
require('dotenv').config()

console.log('EMAIL_USER:', process.env.EMAIL_USER); // Verifica el usuario del correo
console.log('EMAIL_PASS:', process.env.EMAIL_PASS); // Verifica la contraseña de aplicación

const authRoutes = require('./routes/authRoutes')
const app = express()
const PORT = process.env.PORT || 6010

app.use(cors())
app.use(express.json())

app.use('/', authRoutes)


app.listen(PORT, () => {
    console.log(`Server running in: ${PORT}`)
})