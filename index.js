import express from 'express'
import rutas from './routes/index.js'
import db from './config/db.js'

const app = express()

// Conexion de la base de datos
db.authenticate()
    .then(() => console.log('Conexion Exitosa a la Base de Datos'))
    .catch(error => console.log(error))

// Definiendo el puerto
const port = process.env.PORT || 1801

// Defininedo pug para plantillas
app.set('view engine', 'pug')

// Middleware
app.use((req, res, next) => {
    const ano = new Date()
    res.locals.tiempo = ' ' + ano.getFullYear()
    return next()
})

// Agregar parserbody para obtener los datos de un formulario.
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Definiendo carpeta publica
app.use(express.static('public'))

// Definiendo rutas
app.use('/', rutas)

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto ' + port)
})