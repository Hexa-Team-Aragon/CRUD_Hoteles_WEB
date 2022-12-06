import express from 'express'
import { paginaInicio, paginaListaHoteles, paginaVistaHotel } from '../controllers/indexControllers.js'
import { paginaCreateGerentes, createGerente, paginaReadGerentes,paginaUpdateGerentes, updateGerente, paginaDeleteGerentes, createUploadGerente, paginaDeleteGerentesImage } from '../controllers/gerentesControllers.js'
import { paginaCreateHoteles, createHotel, paginaReadHoteles,paginaUpdateHoteles, updateHotel, paginaDeleteHoteles, paginaCreateHabitacionHotel, createHabitacionHotel, createUploadHotel, paginaDeleteHotelesImage } from '../controllers/hotelesControllers.js'
import { paginaCreateHabitacion, createHabitacion, paginaReadHabitaciones,paginaUpdateHabitacion, updateHabitacion, paginaDeleteHabitaciones, paginaUpdateHotelHabitacion, updateHotelHabitacion, paginaDeleteHotelHabitacion, paginaCreateHabitacionImagen, createUploadHabitacionDB, paginaDeleteHabitacionesImage, createHabitacion1 } from '../controllers/habitacionesControllers.js'
import {habitacionesIMageValidator} from '../controllers/habitacionesImageController.js'
import { createGerenteValidator, updateGerenteValidator } from '../middlewares/gerentesValidator.js'
import { createHotelValidator } from '../middlewares/hotelValidator.js'
import { createHabitacionValidator, createHabitacionValidator1} from '../middlewares/habitacionesValidator.js'
import {updateHabitacionValidator } from '../middlewares/habitacionesUpdateValidator.js'
import {uploadHabitacionImage } from '../middlewares/habitacionesImageConfig.js'
import {updateHotelValidator } from '../middlewares/hotelUpdateValidator.js'
import { uploadHotelImage } from '../middlewares/hotelImageConfig.js'
import { hotelIMageValidator } from '../controllers/hotelesImageValidator.js'
import { uploadGerenteImage } from '../middlewares/gerenteImageConfig.js'
import { gerenteImageValidator } from '../controllers/gerentesImageValidator.js'
import { cerrarSesion, credenciales } from '../controllers/indexControllers.js'
const rutas = express.Router()

rutas.get('/lista/hoteles/hotel', paginaVistaHotel)

rutas.get('/lista/hoteles', paginaListaHoteles)

rutas.get('/lista/hoteles/hotel/habitacion/update', paginaUpdateHotelHabitacion)

rutas.post('/lista/hoteles/hotel/habitacion/update' ,updateHotelHabitacion)

rutas.get('/lista/hoteles/hotel/habitacion/delete', paginaDeleteHotelHabitacion)

// Gerentes

rutas.get('/', paginaInicio)

rutas.post("/credenciales", credenciales);

rutas.get("/cerrarsesion", cerrarSesion);

rutas.get('/gerentes', paginaReadGerentes)

rutas.get('/gerentes/create', paginaCreateGerentes)

rutas.get('/gerentes/create/upload', createUploadGerente)

rutas.get('/gerentes/update', paginaUpdateGerentes)

rutas.get('/gerentes/delete', paginaDeleteGerentes)

rutas.get('/gerentes/delete/img', paginaDeleteGerentesImage)

rutas.post('/gerentes/create', createGerenteValidator, createGerente)

rutas.post('/gerentes/update', updateGerenteValidator ,updateGerente)

rutas.post('/gerentes/create/upload', uploadGerenteImage, gerenteImageValidator, createUploadGerente)

// Hoteles 

rutas.get('/hoteles', paginaReadHoteles)

rutas.get('/hoteles/create', paginaCreateHoteles)

rutas.get('/hoteles/update', paginaUpdateHoteles)

rutas.get('/hoteles/delete', paginaDeleteHoteles)

rutas.post('/hoteles/create', createHotelValidator,createHotel)

rutas.post('/hoteles/update', updateHotelValidator,updateHotel)

rutas.get('/hoteles/habitaciones/create', paginaCreateHabitacionHotel)

rutas.post('/hoteles/habitaciones/create', createHabitacionHotel)

rutas.post('/hoteles/create/upload', uploadHotelImage, hotelIMageValidator, createUploadHotel)

rutas.get('/hoteles/delete/img', paginaDeleteHotelesImage)
// Habitaciones

rutas.get('/habitaciones', paginaReadHabitaciones)

rutas.get('/habitaciones/create', paginaCreateHabitacion)

rutas.get('/habitaciones/update', paginaUpdateHabitacion)

rutas.get('/habitaciones/delete', paginaDeleteHabitaciones)

rutas.post('/habitaciones/create', createHabitacionValidator, createHabitacion)

rutas.post('/habitaciones/createf', createHabitacionValidator1, createHabitacion1)

rutas.post('/habitaciones/update', updateHabitacionValidator, updateHabitacion)

rutas.post('/habitacion/create/upload', uploadHabitacionImage, habitacionesIMageValidator, createUploadHabitacionDB)

rutas.get('/habitaciones/delete/img', paginaDeleteHabitacionesImage)

export default rutas