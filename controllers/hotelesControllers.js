import { Hoteles } from '../models/Hoteles.js'
import { Gerentes } from '../models/Gerentes.js'

let hotelUpdateId = ''

// Renderizar Formulario para crear un Hotel
const paginaCreateHoteles = async (req, res) => {
  const gerentes = await Gerentes.findAll({
    attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono']
  })
  const hoteles = await Hoteles.findAll({
    attributes: ['id_grt']
  })
  res.render('formCHotel', {
    pagina: 'Añadir Hotel',
    gerentes: gerentes
  })
}

// Enviar el nuevo hotel a la Base de Datos
const createHotel = async (req, res) => {
  const { id_gerente, nombre, direccion, telefono, correo } = req.body
  const errores = []

  if (id_gerente.trim() === '') {
    errores.push({ mensaje: 'Selecciona un gerente' })
  }
  if (nombre.trim() === '') {
    errores.push({ mensaje: 'El nombre no debe estar vacio' })
  }
  if (direccion.trim() === '') {
    errores.push({ mensaje: 'La direccion no puede estar vacia' })
  }
  if (telefono.trim() === '') {
    errores.push({ mensaje: 'El telefono no puede estar vacio' })
  }
  if (isNaN(telefono) || telefono.length !== 10) {
    errores.push({ mensaje: 'Numero telefonico invalido' })
  }
  if (correo.trim() === '') {
    errores.push({ mensaje: 'El correo no puede estar vacio' })
  }

  if (errores.length > 0) {
    res.render('formCHotel', {
      pagina: 'Añadir Hotel',
      errores,
      id_gerente,
      nombre,
      direccion,
      telefono,
      correo
    })
  } else {
    // Almacenar en la base de datos
    try {
      await Hoteles.create({
        id_gerente,
        nombre,
        direccion,
        telefono,
        correo
      })
      res.redirect('/hoteles')
    } catch (error) {
      console.log(error)
    }
  }
}

// Renderizar pagina de los Hoteles
const paginaReadHoteles = async (req, res) => {
  const hoteles = await Hoteles.findAll({
    attributes: ['id_gerente', 'nombre', 'direccion', 'telefono', 'correo']
  })
  const gerentes = await Gerentes.findAll({
    attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono']
  })
  res.render('hoteles', {
    pagina: 'Hoteles',
    gerentes: gerentes,
    hoteles: hoteles
  })
}

// Renderizar formulario para modificar hotel
const paginaUpdateHoteles = async (req, res) => {
  try {
    const hotel = await Hoteles.findByPk(req.query.id)
    const gerentes = await Gerentes.findAll({
      attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono']
    })
    const hoteles = await Hoteles.findAll({
      attributes: ['id_grt']
    })
    hotelUpdateId = req.query.id
    res.render('formUHoteles', {
      pagina: 'Editar Hoteles',
      hotel: hotel,
      gerentes: gerentes
    })
  } catch (error) {
    console.log(error);
  }
}

// Enviar el hotel actualizado a la base de datos
const updateHotel = async (req, res) => {
  const { id_gerente, nombre, direccion, telefono, correo } = req.body
  const errores = []

  if (id_gerente.trim() === '') {
    errores.push({ mensaje: 'Selecciona un gerente' })
  }
  if (nombre.trim() === '') {
    errores.push({ mensaje: 'El nombre no debe estar vacio' })
  }
  if (direccion.trim() === '') {
    errores.push({ mensaje: 'La direccion no puede estar vacia' })
  }
  if (telefono.trim() === '') {
    errores.push({ mensaje: 'El telefono no puede estar vacio' })
  }
  if (isNaN(telefono) || telefono.length !== 10) {
    errores.push({ mensaje: 'Numero telefonico invalido' })
  }
  if (correo.trim() === '') {
    errores.push({ mensaje: 'El correo no puede estar vacio' })
  }

  if (errores.length > 0) {
    res.render('formUHotel', {
      pagina: 'Añadir Hotel',
      errores,
      id_gerente,
      nombre,
      direccion,
      telefono,
      correo
    })
  } else {
    // Almacenar en la base de datos
    try {
      await Hoteles.update({
        id_gerente,
        nombre,
        direccion,
        telefono,
        correo
      }, {
        where: {
          id: hotelUpdateId
        }
      })
      res.redirect('/hoteles')
    } catch (error) {
      console.log(error)
    }
  }
}

// Eliminar gerente
const paginaDeleteHoteles = async (req, res) => {
  try {
    await Hoteles.destroy({
      where: {
        id: req.query.id
      }
    })
    res.redirect('/hoteles')
  } catch (error) {
    console.log(error)
  }
}

export {
  paginaCreateHoteles,
  createHotel,
  paginaReadHoteles,
  paginaUpdateHoteles,
  updateHotel,
  paginaDeleteHoteles
}