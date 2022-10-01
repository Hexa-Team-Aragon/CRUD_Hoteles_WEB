import express from 'express'
import { paginaComentarios, paginaCreadores, paginaInicio, paginaMaterias, paginaLista } from '../controller/paginasContralor.js'
import {guardarComentarios, cambiarComentarios, enviarCambios, eliminarComentario} from '../controller/comentariosController.js'

const rutas = express.Router()

rutas.get('/', paginaInicio)

rutas.get('/creadores', paginaCreadores)

rutas.get('/materias', paginaMaterias)

rutas.get('/comentarios', paginaComentarios)

rutas.post('/comentarios', guardarComentarios)

rutas.get('/comentariosMod', cambiarComentarios)

rutas.post('/comentariosMod', enviarCambios)

rutas.get('/lista', paginaLista)

rutas.get('/hola', eliminarComentario)

export default rutas