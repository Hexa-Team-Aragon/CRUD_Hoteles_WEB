import express from 'express'
import rutas from './routes/index.js'
import db from './config/db.js'
import session from 'express-session'
import { nanoid } from 'nanoid'


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
app.use(express.urlencoded({extended: true}))

// Definiendo carpeta publica
app.use(express.static('public'))


//definiendo la session
app.use(session({
    secret:nanoid(),
    resave:true,
    saveUninitialized:true
}));


// Middleware
app.use((req, res, next) => {
    const ano = new Date()
    res.locals.tiempo = ' ' + ano.getFullYear()
    console.log(req.url);
    //return next()

    try {
        if(req.url === '/credenciales'){
            const {
                usuario,
                clave
            } = req.body;
            console.log(usuario + " " + clave);
            if(usuario === "arioksillo" && clave === "123"){
                console.log("entrada uno")
                req.session.nombre = "FES";
                req.session.rol = "admin";
                console.log(req.session.nombre + " " + req.session.rol )
                res.render("inicio", {
                    pagina: "inicio",
                    usuario:req.session.nombre
                })
            }else{
                res.render("login",{
                    pagina: "Credenciales"
                });
            }
        }else{
            if(req.session.rol===undefined){
                console.log("no existe......1 "+req.session.rol);
                res.render("login",{
                    pagina:"Credenciales"           
                });   
            }else{
                console.log("si existe......2 "+req.session.rol);
             
                return next();
            }
            
        }
    } catch (e) {
        console.log("no existe C......")
        res.render("login",{
            pagina:"Credenciales"
        });
    }
})



// Definiendo rutas
app.use('/', rutas)

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto ' + port)
});

export{app};