import express from 'express'
import rutas from './rutas/index.js'
import db from './config/db.js'

const app = express()

// Conexion de la base de datos
db.authenticate()
    .then(() => console.log('Conexion Exitosa'))
    .catch(error => console.log(error))

// Definiendo el puerto
const port = process.env.PORT || 1800

// Defininedo pug para plantillas
app.set('view engine', 'pug')

// Middleware
app.use((req, res, next) => {
    const ano = new Date()
    res.locals.tiempo = ' ' + ano.getFullYear()
    return next()
})

// Agregar parserbody para obtener los datos de un formulario.
app.use(express.urlencoded({extended: true}))

// Definiendo carpeta publica
app.use(express.static('public'))

// Definiendo rutas
app.use('/', rutas)

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto ' + port)
})