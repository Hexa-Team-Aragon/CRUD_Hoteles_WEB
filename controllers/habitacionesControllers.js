import { Habitaciones } from '../models/Habitaciones.js'
import { Hoteles } from '../models/Hoteles.js'

let habitacionUpdateId = ''

// Renderizar Formulario para crear una Habitacion
const paginaCreateHabitacion = async (req, res) => {
  const hoteles = await Hoteles.findAll({
    attributes: ['id_htl', 'nombre']
  })
  const habitaciones = await Habitaciones.findAll({
    attributes: ['id_hotel', 'piso', 'nombre', 'refrigerador']
  })
  res.render('formCHabitacion', {
    pagina: 'Añadir Habitacion',
    hoteles: hoteles,
    habitaciones: habitaciones
  })
}

// Enviar la nueva habitacion a la Base de Datos
const createHabitacion = async (req, res) => {
  const { id_hotel, piso, nombre, refrigerador } = req.body
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
  if (refrigerador.trim() === '') {
    errores.push({ mensaje: 'Selecciona un valor de refrigerador' })
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
      await Hoteles.create({
        id_hotel,
        piso,
        nombre,
        refrigerador
      })
      res.redirect('/habitaciones')
    } catch (error) {
      console.log(error)
    }
  }
}

// Renderizar pagina de los Habitaciones
const paginaReadHabitaciones = async (req, res) => {
  const hoteles = await Hoteles.findAll({
    attributes: ['nombre']
  })
  const habitaciones = await Habitaciones.findAll({
    attributes: ['id_hotel', 'piso', 'nombre', 'refrigerador']
  })
  res.render('habitaciones', {
    pagina: 'Habitaciones',
    habitaciones: habitaciones,
    hoteles: hoteles
  })
}

// Renderizar formulario para modificar habitacion
const paginaUpdateHabitacion = async (req, res) => {
  try {
    const habitaciones = await Habitaciones.findByPk(req.query.id)
    const hoteles = await Hoteles.findAll({
      attributes: ['id_htl', 'nombre']
    })
    habitacionUpdateId = req.query.id
    res.render('formUHabitaciones', {
      pagina: 'Editar Habitacion',
      hotel: hoteles,
      habitaciones: habitaciones
    })
  } catch (error) {
    console.log(error);
  }
}

// Enviar el habitacion actualizado a la base de datos
const updateHabitacion = async (req, res) => {
  const { id_hotel, piso, nombre, refrigerador } = req.body
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
  if (refrigerador.trim() === '') {
    errores.push({ mensaje: 'Selecciona un valor de refrigerador' })
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
      await Hoteles.update({
        id_hotel,
        piso,
        nombre,
        refrigerador
      }, {
        where: {
          id: habitacionUpdateId
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
        id: req.query.id
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