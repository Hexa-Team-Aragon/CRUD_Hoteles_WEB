import express from 'express'
import rutas from './routes/index.js'
import db from './config/db.js'
import session from 'express-session'
import { nanoid } from 'nanoid'
import { Users } from './models/Users.js'

const app = express()

// Conexion de la base de datos
db.authenticate()
    .then(() => console.log('Conexion Exitosa a la Base de Datos'))
    .catch(error => console.log(error))

// Definiendo el puerto
const port = process.env.PORT || 1801

// Defininedo pug para plantillas
app.set('view engine', 'pug')

// Agregar parserbody para obtener los datos de un formulario.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Definiendo carpeta publica
app.use(express.static('public'))

//definiendo la session
app.use(session({
    secret: nanoid(),
    resave: true,
    saveUninitialized: true
}));

// Middleware
app.use(async (req, res, next) => {
    const ano = new Date()
    res.locals.tiempo = ' ' + ano.getFullYear()
    console.log(req.url)
    try {
        if (req.url === '/credenciales') {
            const {
                usuario,
                clave
            } = req.body
            const pass = await Users.findAll({
                attributes: ['contrasenia', 'rol'],
                where: {
                    usuario,
                    contrasenia: clave
                }
            })
            if (pass.length === 1) {
                req.session.nombre = usuario
                req.session.rol = pass[0].rol
                res.redirect('/')
            } else {
                throw 'Credenciales invalidas'
            }
        } else {
            if (req.session.rol === undefined) {
                res.render("login", {
                    pagina: "Credenciales"
                })
            } else {
                return next()
            }
        }
    } catch (e) {
        res.render("login", {
            pagina: "Credenciales",
            credenciales: e
        })
    }
})

// Definiendo rutas
app.use('/', rutas)

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto ' + port)
});

export { app };