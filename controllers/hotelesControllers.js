import { Hoteles } from '../models/Hoteles.js'
import { Gerentes } from '../models/Gerentes.js'
import { Habitaciones } from '../models/Habitaciones.js'
import { ImgHoteles } from '../models/ImgHoteles.js'
import { ImgGerentes } from '../models/ImgGerentes.js'
import { ImgHabitaciones } from '../models/imgHabitaciones.js'
import fs from 'fs'

const paginaReadHotelesTarjeta = async (req, res) => {
  let imagenesHTotales = []
  const imagenes = await ImgHoteles.findAll({
    attributes: ['id_hotel1','nombre','img_tipo']
  })
  const imagenesHTotales1 = JSON.parse(JSON.stringify(imagenes))
  imagenesHTotales1.map(htli => {
    let obj = {
      idHotel: htli.id_hotel1,
      nameH: htli.nombre,
      type: htli.img_tipo,
    }
    imagenesHTotales.push(obj)
  })
  let hotelesTotales = []
  const hoteles = await Hoteles.findAll({
    attributes: ['id_htl', 'id_gerente', 'nombre', 'direccion', 'telefono', 'correo']
  })
  const hotelesTotales1 = await JSON.parse(JSON.stringify(hoteles))
  hotelesTotales1.map(htls => {
    let imagenObj = {}
    imagenesHTotales.map(imgh => {
      if (imgh.idHotel === htls.id_htl) {
        imagenObj = imgh
      }
    })
    let obj = {
      id: htls.id_htl,
      nombre: htls.nombre,
      direccion: htls.direccion,
      telefono: htls.telefono,
      correo: htls.correo,
      idImg: imagenObj.idHotel,
      nombreI: imagenObj.nameH
    }
    hotelesTotales.push(obj)
    
  })

  let habitacionesTotales = []
  const habitaciones = await Habitaciones.findAll({
    attributes: ['id_hbt', 'id_hotel', 'tipo', 'refrigerador']
  })
  const habitacionesTotales1 = JSON.parse(JSON.stringify(habitaciones))
  habitacionesTotales1.map(ht1 => {
    let obj = {
      idH: ht1.id_hotel,
      idHabi: ht1.id_hbt,
      tipo: ht1.tipo
    }
    habitacionesTotales.push(obj)
  })
  let hotelesTotales2 = []
  hotelesTotales.forEach(ht => {
    let objt = []
    habitacionesTotales.forEach(hbtt => {
      if (ht.id === hbtt.idH) {
        objt.push(hbtt)
      }
    })
    hotelesTotales2.push({
      id: ht.id,
      nombre: ht.nombre,
      direccion: ht.direccion,
      telefono: ht.telefono,
      correo: ht.correo,
      idImg: ht.idImg,
      nombreI: ht.nombreI,
      tipos: objt
    })
  })
  console.log(hotelesTotales2[0])
  res.render('listaHoteles', {
    pagina: 'Lista Hoteles',
    hoteles2: hotelesTotales2
  })
}

// REnderizar formulario para crear hoteles
const paginaCreateHoteles = async (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  let gerentesModificados = []
  let gerentesConHotel = []
  const hoteles = await Hoteles.findAll({
    attributes: ['id_gerente']
  })
  const gerentesConHotel1 = JSON.parse(JSON.stringify(hoteles))
  gerentesConHotel1.map(gch => {
    gerentesConHotel.push(gch.id_gerente)
  })
  const gerentes = await Gerentes.findAll({
    attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno']
  })
  const gerentes1 = JSON.parse(JSON.stringify(gerentes))
  gerentes1.map(g => {
    let enabledGRT = false
    if (gerentesConHotel.includes(g.id_grt)) {
      enabledGRT = true
    }
    let obj = {
      id: g.id_grt,
      name: g.nombre,
      aPaterno: g.ap_paterno,
      aMaterno: g.ap_materno,
      asignado: enabledGRT
    }
    gerentesModificados.push(obj)
  })
  res.render('formCHotel', {
    pagina: 'A??adir Hotel',
    gerentes: gerentesModificados,
    user: req.session.nombre,
    admin
  })
}

// Enviar el nuevo hotel a la Base de Datos
const createHotel = async (req, res) => {
  const { nombre, id_gerente, direccion, telefono, correo } = req.body
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  // Almacenar en la base de datos
  try {
    const hotelCreado = await Hoteles.create({
      id_gerente,
      nombre,
      direccion,
      telefono,
      correo
    }, { fields: ['id_gerente', 'nombre', 'direccion', 'telefono', 'correo'] })
    res.render('formCUHotel', {
      pagina: 'A??adir Imagenes',
      hotel: hotelCreado.dataValues.id,
      user: req.session.nombre,
      admin
    })
  } catch (error) {
    console.log(error)
  }
}

// Renderizar pagina de los Hoteles
const paginaReadHoteles = async (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  let gerentesTotales = []
  const gerentes = await Gerentes.findAll({
    attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono']
  })
  const gerentesTotales1 = JSON.parse(JSON.stringify(gerentes))
  gerentesTotales1.map(grtt => {
    let obj = {
      id: grtt.id_grt,
      name: grtt.nombre,
      aPaterno: grtt.ap_paterno,
      aMaterno: grtt.ap_materno,
    }
    gerentesTotales.push(obj)
  })
  let hotelesTotales = []
  const hoteles = await Hoteles.findAll({
    attributes: ['id_htl', 'id_gerente', 'nombre', 'direccion', 'telefono', 'correo']
  })
  const hotelesTotales1 = await JSON.parse(JSON.stringify(hoteles))
  hotelesTotales1.map(htls => {
    let gerenteObj = {}
    gerentesTotales.map(grt => {
      if (grt.id === htls.id_gerente) {
        gerenteObj = grt
      }
    })
    const nombreGerente = gerenteObj.name + ' ' + gerenteObj.aPaterno + ' ' + gerenteObj.aMaterno
    let obj = {
      id: htls.id_htl,
      gerente: nombreGerente,
      nombre: htls.nombre,
      direccion: htls.direccion,
      telefono: htls.telefono,
      correo: htls.correo,
      idGrt: gerenteObj.id
    }
    hotelesTotales.push(obj)
  })
  res.render('hoteles', {
    pagina: 'Hoteles',
    hoteles: hotelesTotales,
    user: req.session.nombre,
    admin
  })
}

// Renderizar formulario para modificar hotel
const paginaUpdateHoteles = async (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  const hotel = await Hoteles.findAll({
    attributes: ['id_htl', 'id_gerente', 'nombre', 'direccion', 'telefono', 'correo'],
    where: {
      id_htl: req.query.id
    }
  })
  const hotel1 = JSON.parse(JSON.stringify(hotel))
  let hotelMOD = {
    id: hotel1[0].id_htl,
    gerenteId: hotel1[0].id_gerente,
    nombre: hotel1[0].nombre,
    direccion: hotel1[0].direccion,
    telefono: hotel1[0].telefono,
    correo: hotel1[0].correo
  }

  var idPrueba = hotelMOD.gerenteId

  let gerentesModificados = []
  let gerentesConHotel = []
  const hoteles = await Hoteles.findAll({
    attributes: ['id_gerente']
  })
  const gerentesConHotel1 = JSON.parse(JSON.stringify(hoteles))
  gerentesConHotel1.map(gch => {
    gerentesConHotel.push(gch.id_gerente)
  })
  const gerentes = await Gerentes.findAll({
    attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno']
  })
  const gerentes1 = JSON.parse(JSON.stringify(gerentes))
  gerentes1.map(g => {
    let enabledGRT = false
    let selectedGRT = false
    if (gerentesConHotel.includes(g.id_grt)) {
      enabledGRT = true
    }
    if (g.id_grt === idPrueba) {
      selectedGRT = 'selected'
    }
    let obj = {
      id: g.id_grt,
      name: g.nombre,
      aPaterno: g.ap_paterno,
      aMaterno: g.ap_materno,
      asignado: enabledGRT,
      opcion: selectedGRT
    }
    gerentesModificados.push(obj)
  })
  const imagenes = await ImgHoteles.findAll({
    attributes: ['nombre'],
    where: {
      id_hotel1: req.query.id
    }
  })

  res.render('formUHoteles', {
    pagina: 'Editar Hotel',
    gerentes: gerentesModificados,
    hotel: hotelMOD,
    imagenes,
    hotel1: req.query.id,
    user: req.session.nombre,
    admin
  })
}

// Enviar el hotel actualizado a la base de datos
const updateHotel = async (req, res) => {
  const { nombre, id_gerente, direccion, telefono, correo } = req.body
  try {
    await Hoteles.update({
      id_gerente,
      nombre,
      direccion,
      telefono,
      correo
    }, {
      where: {
        id_htl: req.query.id
      }
    })
    res.redirect('/hoteles')
  } catch (error) {
    console.log(error)
  }
}

// Eliminar Hoteles
const paginaDeleteHoteles = async (req, res) => {
  const habit = await Habitaciones.findAll({
    attributes: ['id_hbt'],
    where: {
      id_hotel: req.query.id
    }
  })
  let ids = []
  habit.forEach(hbt =>{
    ids.push(hbt.dataValues.id_hbt)
  })
  const imagenesHbt = await ImgHabitaciones.findAll({
    attributes: ['nombre'],
    where: {
      id_habitacion1: ids
    }
  })
  imagenesHbt.forEach(img => {
    fs.unlinkSync('./public/uploads/habitaciones/'+img.dataValues.nombre)
  })

  const imagenesHtl = await ImgHoteles.findAll({
    attributes: ['nombre'],
    where: {
      id_hotel1: req.query.id
    }
  })
  imagenesHtl.forEach(img => {
    fs.unlinkSync('./public/uploads/hotels/'+img.dataValues.nombre)
  })

  const imagenesGrt = await ImgGerentes.findAll({
    attributes: ['nombre'],
    where: {
      id_gerente1 : req.query.idGrt
    }
  })
  imagenesGrt.forEach(img => {
    fs.unlinkSync('./public/uploads/gerentes/'+img.dataValues.nombre)
  })

  try {
    await ImgHabitaciones.destroy({
      where: {
        id_habitacion1: ids,
      }
    })
    await Habitaciones.destroy({
      where: {
        id_hotel: req.query.id
      }
    })
    await ImgHoteles.destroy({
      where: {
        id_hotel1: req.query.id,
      }
    })
    await Hoteles.destroy({
      where: {
        id_htl: req.query.id
      }
    })
    await ImgGerentes.destroy({
      where: {
        id_gerente1: req.query.idGrt,
      }
    })
    await Gerentes.destroy({
      where: {
        id_grt: req.query.idGrt
      }
    })
    console.log(req.query);
    res.redirect('/hoteles')
  } catch (error) {
    console.log(error)
  }
}

const paginaCreateHabitacionHotel = (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  res.render('formCHabitacionH', {
    pagina: 'Crear Habitacion',
    id: req.query.id,
    user: req.session.nombre,
    admin
  })
}

const createHabitacionHotel = async (req, res) => {
  const { piso, nombre } = req.body
  let id_hotel = req.query.id
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
    res.render('formCHabitacionH', {
      pagina: 'Crear Habitacion',
      errores,
      id: req.query.id,
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
      let direccion = '/lista/hoteles/hotel?id=' + id_hotel
      console.log(direccion)
      res.redirect(direccion)
    } catch (error) {
      console.log(error)
    }
  }
}

//REnderisar pagina para a??adir imagenes al crear un hotel
const createUploadHotel = async (req, res) => {
  const imagenes = req.files
  const id_hotel1 = req.query.htl
  try {
    let images = []
    imagenes.forEach(img => {
      let obj = {
        id_hotel1,
        nombre: img.filename,
        img_tipo: img.mimetype,
      }
      images.push(obj)
    })
    await ImgHoteles.bulkCreate(images, { fields: ['id_hotel1', 'nombre', 'img_tipo'] })
  } catch (error) {
    console.log(error)
  }
  if (req.query.edit) {
    res.redirect('/hoteles/update?id='+req.query.htl)
  } else {
    res.redirect('/hoteles')
  }
}

const paginaDeleteHotelesImage = async (req, res) => {
  try {
    await ImgHoteles.destroy({
      where: {
        id_hotel1: req.query.id,
        nombre: req.query.nombre
      }
    })
    fs.unlinkSync('./public/uploads/hotels/'+req.query.nombre)
    res.redirect('/hoteles/update?id='+req.query.id)
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
  paginaDeleteHoteles,
  paginaCreateHabitacionHotel,
  createHabitacionHotel,
  createUploadHotel,
  paginaDeleteHotelesImage,
  paginaReadHotelesTarjeta
}