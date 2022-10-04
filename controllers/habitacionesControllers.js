import { Habitaciones } from '../models/Habitaciones.js'
import { Hoteles } from '../models/Hoteles.js'

let habitacionUpdateId = ''

// Renderizar Formulario para crear una Habitacion
const paginaCreateHabitacion = async (req, res) => {
  let hotelesModificados = []
  const hoteles = await Hoteles.findAll({
    attributes: ['id_htl', 'nombre']
  })
  const hotelesModificados1 = JSON.parse(JSON.stringify(hoteles))
  hotelesModificados1.map(hm1 =>{
    let obj = {
      id: hm1.id_htl,
      nombre: hm1.nombre
    }
    hotelesModificados.push(obj)
  })
  res.render('formCHabitacion', {
    pagina: 'Añadir Habitacion',
    hoteles: hotelesModificados
  })
}

// Enviar la nueva habitacion a la Base de Datos
const createHabitacion = async (req, res) => {
  const { id_hotel, piso, nombre } = req.body
  let refrigerador = false
  if (req.body?.refrigerador) {
    refrigerador = true
  }
  const errores = []

  if (id_hotel.trim() === '') {
    errores.push({ mensaje: 'Selecciona un hotel' })
  }
  if (piso.trim() === '') {
    errores.push({ mensaje: 'El piso no puede quedar vacio' })
  }
  if (nombre.trim() === '') {
    errores.push({ mensaje: 'El nombre no puede quedar vacio' })
  }
  if (errores.length > 0) {
    res.render('formCHabitacion', {
      pagina: 'Añadir Habitacion',
      errores,
      id_hotel,
      piso,
      nombre,
      refrigerador
    })
  } else {
    // Almacenar en la base de datos
    try {
      await Habitaciones.create({
        id_hotel,
        piso,
        nombre,
        refrigerador
      }, { fields: ['id_hotel', 'piso', 'nombre', 'refrigerador'] })
      res.redirect('/habitaciones')
    } catch (error) {
      console.log(error)
    }
  }
}

// Renderizar pagina de los Habitaciones
const paginaReadHabitaciones = async (req, res) => {
  let hotelesTotales = []
  const hoteles = await Hoteles.findAll({
    attributes: ['id_htl', 'nombre']
  })
  const hotelesTotales1 = JSON.parse(JSON.stringify(hoteles))
  hotelesTotales1.map(htls => {
    let obj ={
      id: htls.id_htl,
      nombre: htls.nombre
    }
    hotelesTotales.push(obj)
  })
  let habitacionesTotales = []
  const habitaciones = await Habitaciones.findAll({
    attributes: ['id_hbt', 'id_hotel', 'piso', 'nombre', 'refrigerador']
  })
  const habitacionesTotales1 = JSON.parse(JSON.stringify(habitaciones))
  habitacionesTotales1.map(ht1 => {
    let hotelObj = {}
    hotelesTotales.map(ht => {
      if (ht.id === ht1.id_hotel) {
        hotelObj = ht
      }
    })
    const nombreHotel = hotelObj.nombre
    let obj = {
      id: ht1.id_hbt,
      nombreHotel: nombreHotel,
      nombre: ht1.nombre,
      piso: ht1.piso,
      refri: ht1.refrigerador
    }
    habitacionesTotales.push(obj)
  })
  res.render('habitaciones', {
    pagina: 'Habitaciones',
    habitaciones: habitacionesTotales,
  })
}

// Renderizar formulario para modificar habitacion
const paginaUpdateHabitacion = async (req, res) => {
  const habitaciones = await Habitaciones.findAll({
    attributes: ['id_hbt', 'id_hotel', 'nombre', 'piso', 'refrigerador'],
    where: {
      id_hbt: req.query.id
    }
  })
  habitacionUpdateId = req.query.id
  const habitacion1 = JSON.parse(JSON.stringify(habitaciones))
  let habitacionMOD = {
    id: habitacion1[0].id_hbt,
    hotelId: habitacion1[0].id_hotel,
    nombre: habitacion1[0].nombre,
    piso: habitacion1[0].piso,
    refri: habitacion1[0].refrigerador
  }

  var idPrueba = habitacionMOD.hotelId

  let hotelesMOd = []
  const hoteles = await Hoteles.findAll({
    attributes: ['id_htl', 'nombre']
  })
  const hoteles1 = JSON.parse(JSON.stringify(hoteles))
  hoteles1.map(ht1 => {
    let selectedHTL = false
    if (ht1.id_htl === idPrueba) {
      selectedHTL = true
    }
    let obj = {
      id: ht1.id_htl,
      nombre: ht1.nombre,
      opcion: selectedHTL
    }
    hotelesMOd.push(obj)
  })
  res.render('formUHabitaciones', {
    pagina: 'Editar Habitacion',
    hoteles: hotelesMOd,
    habitacion: habitacionMOD
  })
}

// Enviar el habitacion actualizado a la base de datos
const updateHabitacion = async (req, res) => {
  const { id_hotel, piso, nombre } = req.body
  let refrigerador = false
  if (req.body?.refrigerador) {
    refrigerador = true
  }
  const errores = []

  if (id_hotel.trim() === '') {
    errores.push({ mensaje: 'Selecciona un hotel' })
  }
  if (piso.trim() === '') {
    errores.push({ mensaje: 'El piso no puede quedar vacio' })
  }
  if (nombre.trim() === '') {
    errores.push({ mensaje: 'El nombre no puede quedar vacio' })
  }
  if (errores.length > 0) {
    res.render('formCHabitacion', {
      pagina: 'Añadir Habitacion',
      errores,
      id_hotel,
      piso,
      nombre,
      refrigerador
    })
  } else {
    // Almacenar en la base de datos
    try {
      await Habitaciones.update({
        id_hotel,
        piso,
        nombre,
        refrigerador
      }, {
        where: {
          id_hbt: habitacionUpdateId
        }
      })
      res.redirect('/habitaciones')
    } catch (error) {
      console.log(error)
    }
  }
}

// Eliminar gerente
const paginaDeleteHabitaciones = async (req, res) => {
  try {
    await Habitaciones.destroy({
      where: {
        id_hbt: req.query.id
      }
    })
    res.redirect('/habitaciones')
  } catch (error) {
    console.log(error)
  }
}

export {
  paginaCreateHabitacion,
  createHabitacion,
  paginaReadHabitaciones,
  paginaUpdateHabitacion,
  updateHabitacion,
  paginaDeleteHabitaciones
}