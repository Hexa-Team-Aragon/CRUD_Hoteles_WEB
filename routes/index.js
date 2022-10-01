import express from 'express'
import { paginaInicio } from '../controllers/indexControllers.js'
import { paginaCreateGerentes, createGerente, paginaReadGerentes,paginaUpdateGerentes, updateGerente, paginaDeleteGerentes } from '../controllers/gerentesControllers.js'
import { paginaCreateHoteles, createHotel, paginaReadHoteles,paginaUpdateHoteles, updateHotel, paginaDeleteHoteles } from '../controllers/hotelesControllers.js'
import { paginaCreateHabitacion, createHabitacion, paginaReadHabitaciones,paginaUpdateHabitacion, updateHabitacion, paginaDeleteHabitaciones } from '../controllers/habitacionesControllers.js'


const rutas = express.Router()

// Gerentes

rutas.get('/', paginaInicio)

rutas.get('/gerentes', paginaReadGerentes)

rutas.get('/gerentes/create', paginaCreateGerentes)

rutas.get('/gerentes/update', paginaUpdateGerentes)

rutas.get('/gerentes/delete', paginaDeleteGerentes)

rutas.post('/gerentes/create', createGerente)

rutas.post('/gerentes/update', updateGerente)

// Hoteles 

rutas.get('/hoteles', paginaReadHoteles)

rutas.get('/hoteles/create', paginaCreateHoteles)

rutas.get('/hoteles/update', paginaUpdateHoteles)

rutas.get('/hoteles/delete', paginaDeleteHoteles)

rutas.post('/hoteles/create', createHotel)

rutas.post('/hoteles/update', updateHotel)

// Habitaciones

rutas.get('/habitaciones', paginaReadHabitaciones)

rutas.get('/habitaciones/create', paginaCreateHabitacion)

rutas.get('/habitaciones/update', paginaUpdateHabitacion)

rutas.get('/habitaciones/delete', paginaDeleteHabitaciones)

rutas.post('/habitaciones/create', createHabitacion)

rutas.post('/habitaciones/update', updateHabitacion)

export default rutas