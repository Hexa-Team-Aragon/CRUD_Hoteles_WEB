import { Habitaciones } from '../models/Habitaciones.js'
import { Hoteles } from '../models/Hoteles.js'
import { ImgHabitaciones } from '../models/imgHabitaciones.js'
import fs from 'fs'


// Renderizar Formulario para crear una Habitacion
const paginaCreateHabitacion = async (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  let hotelesModificados = []
  const hoteles = await Hoteles.findAll({
    attributes: ['id_htl', 'nombre']
  })
  const habitaciones = await Habitaciones.findAll({
    attributes: ['id_hotel', 'tipo']
  })
  const habitacionesModificados = JSON.parse(JSON.stringify(habitaciones))
  const hotelesModificados1 = JSON.parse(JSON.stringify(hoteles))
  hotelesModificados1.map(hm1 => {
    let hab = false
    let cont = 0
    habitacionesModificados.forEach(hab => {
      if (hab.id_hotel === hm1.id_htl) {
        cont++
      }
    })
    if (cont === 3) {
      hab = true
    }
    let obj = {
      id: hm1.id_htl,
      nombre: hm1.nombre,
      abilitado: hab
    }
    hotelesModificados.push(obj)
  })
  res.render('formCHabitacion', {
    pagina: 'Añadir Habitacion',
    hoteles: hotelesModificados,
    user: req.session.nombre,
    admin
  })
}

const paginaCreateHabitacionImagen = async (req, res) => {
  const { id_hotel, tipo } = req.body
  // Almacenar en la base de datos
  try {
    const creacion = await Hoteles.create({
      id_hotel,
      tipo
    }, { fields: ['id_hotel', 'tipo'] })
    res.redirect('/habitaciones/create/upload?id='+creacion.dataValues.id)
  } catch (error) {
    console.log(error)
  }
}

// Enviar la nueva habitacion a la Base de Datos
const createHabitacion1 = async (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  const { tipo } = req.body
  const id_hotel = req.query.hotel
  let refrigerador = false
  if (req.body?.refrigerador) {
    refrigerador = true
  }
  console.log(req.body)
  try {
    const creacion = await Habitaciones.create({
      id_hotel,
      tipo,
      refrigerador
    }, { fields: ['id_hotel', 'tipo', 'refrigerador'] })
    res.render('formCHabitacionImagen', {
      pagina: 'Añadir Imagenes',
      habitacion: creacion.dataValues.id,
      user: req.session.nombre,
      admin
    })
  } catch (error) {
    console.log(error)
  }
}

const createHabitacion = async (req, res) => {
  const { id_hotel } = req.body
  let tipos = []
  const total = ['SIMPLE', 'MATRIMONIAL', 'PREMIUM']
  const hoteles = await Habitaciones.findAll({
    attributes: ['tipo'],
    where: {
      id_hotel
    }
  })
  const tiposH = JSON.parse(JSON.stringify(hoteles))
  let existentes = tiposH.map(tip => {
    return tip.tipo
  })
  total.forEach(tp => {
    if (!existentes.includes(tp)) {
      tipos.push(tp)
    }
  })
  if (tipos.length === 0) {
    let hotelesModificados = []
    const hoteles = await Hoteles.findAll({
      attributes: ['id_htl', 'nombre']
    })
    const hotelesModificados1 = JSON.parse(JSON.stringify(hoteles))
    hotelesModificados1.map(hm1 => {
      let obj = {
        id: hm1.id_htl,
        nombre: hm1.nombre
      }
      hotelesModificados.push(obj)
    })
    res.render('formCHabitacion', {
      pagina: 'Añadir Habitacion',
      hoteles: hotelesModificados,
      user: req.session.nombre,
      errores: [{ mensaje: 'El hotel que seleccionaste ya cuenta con todos los tipos de habitaciones posibles.' }]
    })
  } else {
    res.render('formCHabitacion1', {
      pagina: 'Añadir Habitación',
      tipos,
      id_hotel,
      user: req.session.nombre
    })
  }
}

// Renderizar pagina de los Habitaciones
const paginaReadHabitaciones = async (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  let hotelesTotales = []
  const hoteles = await Hoteles.findAll({
    attributes: ['id_htl', 'nombre']
  })
  const hotelesTotales1 = JSON.parse(JSON.stringify(hoteles))
  hotelesTotales1.map(htls => {
    let obj = {
      id: htls.id_htl,
      nombre: htls.nombre
    }
    hotelesTotales.push(obj)
  })
  let habitacionesTotales = []
  const habitaciones = await Habitaciones.findAll({
    attributes: ['id_hbt', 'id_hotel', 'tipo', 'refrigerador']
  })
  const habitacionesTotales1 = JSON.parse(JSON.stringify(habitaciones))
  console.log(habitacionesTotales1)
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
      tipo: ht1.tipo,
      refri: ht1.refrigerador
    }
    habitacionesTotales.push(obj)
  })
  res.render('habitaciones', {
    pagina: 'Habitaciones',
    habitaciones: habitacionesTotales,
    user: req.session.nombre,
    admin
  })
}

// Renderizar formulario para modificar habitacion
const paginaUpdateHabitacion = async (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  const habitaciones = await Habitaciones.findAll({
    attributes: ['id_hbt', 'id_hotel', 'tipo', 'refrigerador'],
    where: {
      id_hbt: req.query.id
    }
  })
  const habitacion1 = JSON.parse(JSON.stringify(habitaciones))
  console.log('----------------------------');
  console.log(habitacion1);
  let habitacionMOD = {
    id: habitacion1[0].id_hbt,
    hotelId: habitacion1[0].id_hotel,
    piso: habitacion1[0].tipo,
    refri: habitacion1[0].refrigerador
  }
  let sml = false
  let pre = false
  let mat = false
  if (habitacionMOD.piso === 'SIMPLE'){
    sml = 'selected'
  }
  if (habitacionMOD.piso === 'PREMIUM'){
    pre = 'selected'
  }
  if (habitacionMOD.piso === 'MATRIMONIAL'){
    mat = 'selected'
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
  const imagenes = await ImgHabitaciones.findAll({
    attributes: ['nombre'],
    where: {
      id_habitacion1: req.query.id
    }
  })
  res.render('formUHabitaciones', {
    pagina: 'Editar Habitacion',
    sml,
    pre,
    mat,
    hoteles: hotelesMOd,
    habitacion: habitacionMOD,
    imagenes,
    habitacion1: req.query.id,
    user: req.session.nombre,
    admin
  })
}

// Enviar el habitacion actualizado a la base de datos
const updateHabitacion = async (req, res) => {
  const { id_hotel, piso, nombre } = req.body
  let refrigerador = false
  if (req.body?.refrigerador) {
    refrigerador = true
  }
  try {
    await Habitaciones.update({
      id_hotel,
      piso,
      nombre,
      refrigerador
    }, {
      where: {
        id_hbt: req.query.id
      }
    })
    res.redirect('/habitaciones')
  } catch (error) {
    console.log(error)
  }
}


// Eliminar Habitaciones
const paginaDeleteHabitaciones = async (req, res) => {
  const imagenes = await ImgHabitaciones.findAll({
    attributes: ['nombre'],
    where: {
      id_habitacion1 : req.query.id
    }
  })
  imagenes.forEach(img => {
    fs.unlinkSync('./public/uploads/habitaciones/'+img.dataValues.nombre)
  })
  try {
    await ImgHabitaciones.destroy({
      where: {
        id_habitacion1: req.query.id,
      }
    })
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

const paginaUpdateHotelHabitacion = async (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  const habitaciones = await Habitaciones.findAll({
    attributes: ['id_hbt', 'id_hotel', 'tipo', 'refrigerador'],
    where: {
      id_hbt: req.query.id
    }
  })
  const habitacion1 = JSON.parse(JSON.stringify(habitaciones))
  let habitacionMOD = {
    id: habitacion1[0].id_hbt,
    hotelId: habitacion1[0].id_hotel,
    tipo: habitacion1[0].tipo,
    refri: habitacion1[0].refrigerador
  }
  res.render('formUHotelHabitacion', {
    pagina: 'Editar Habitacion',
    habitacion: habitacionMOD,
    user: req.session.nombre,
    admin
  })
}

const updateHotelHabitacion = async (req, res) => {
  const { piso, nombre } = req.body
  const id_hotel = req.query.id
  let refrigerador = false
  if (req.body?.refrigerador) {
    refrigerador = true
  }
  const errores = []

  if (piso.trim() === '') {
    errores.push({ mensaje: 'El piso no puede quedar vacio' })
  }
  if (nombre.trim() === '') {
    errores.push({ mensaje: 'El nombre no puede quedar vacio' })
  }
  if (errores.length > 0) {
    res.render('formUHotelHabitacion', {
      pagina: 'Editar Habitacion',
      errores,
      habitacion: {
        id: req.query.idH,
        hotelId: req.query.id,
        nombre: nombre,
        piso: piso,
        refri: refrigerador
      }
    })
  } else {
    // Almacenar en la base de datos
    try {
      console.log(req.query.idH)
      await Habitaciones.update({
        id_hotel,
        piso,
        nombre,
        refrigerador
      }, {
        where: {
          id_hbt: req.query.idH
        }
      })
      let dir = '/lista/hoteles/hotel?id=' + id_hotel
      res.redirect(dir)
    } catch (error) {
      console.log(error)
    }
  }
}

const paginaDeleteHotelHabitacion = async (req, res) => {
  try {
    await Habitaciones.destroy({
      where: {
        id_hbt: req.query.id
      }
    })
    let dir = '/lista/hoteles/hotel?id=' + req.query.idHotel
    res.redirect(dir)
  } catch (error) {
    console.log(error)
  }
}

//Sube las imagenes a la db
const createUploadHabitacionDB = async (req, res) => {
  const imagenes = req.files
  const id_habitacion1 = req.query.hbt
  try {
    let images = []
    imagenes.forEach(img => {
      let obj = {
        id_habitacion1,
        nombre: img.filename,
        img_tipo: img.mimetype,
      }
      images.push(obj)
    })
    console.log(images);
    await ImgHabitaciones.bulkCreate(images, { fields: ['id_habitacion1', 'nombre', 'img_tipo'] })
  } catch (error) {
    console.log(error)
  }
  if (req.query.edit) {
    res.redirect('/habitaciones/update?id='+req.query.hbt)
  } else {
    res.redirect('/habitaciones')
  }
}

const paginaDeleteHabitacionesImage = async (req, res) => {
  try {
    await ImgHabitaciones.destroy({
      where: {
        id_habitacion1: req.query.id,
        nombre: req.query.nombre
      }
    })
    fs.unlinkSync('./public/uploads/habitaciones/'+req.query.nombre)
    res.redirect('/habitaciones/update?id='+req.query.id)
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
  paginaDeleteHabitaciones,
  paginaUpdateHotelHabitacion,
  updateHotelHabitacion,
  paginaDeleteHotelHabitacion,
  paginaCreateHabitacionImagen,
  createUploadHabitacionDB,
  paginaDeleteHabitacionesImage,
  createHabitacion1
}