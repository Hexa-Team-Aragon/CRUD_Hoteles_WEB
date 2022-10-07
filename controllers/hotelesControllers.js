import { Hoteles } from '../models/Hoteles.js'
import { Gerentes } from '../models/Gerentes.js'
import { Habitaciones } from '../models/Habitaciones.js'

// REnderizar formulario para crear hoteles
const paginaCreateHoteles = async (req, res) => {
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
    pagina: 'Añadir Hotel',
    gerentes: gerentesModificados
  })
}

// Enviar el nuevo hotel a la Base de Datos
const createHotel = async (req, res) => {
  const { nombre, id_gerente, direccion, telefono, correo } = req.body
  const errores = []
  if (nombre.trim() === '') {
    errores.push({ mensaje: 'El nombre no puede estar vacio' })
  }
  if (id_gerente === '0') {
    errores.push({ mensaje: 'Selecciona un gerente' })
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
      pagina: 'Añadir Hotel',
      errores,
      gerentes: gerentesModificados
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
      }, { fields: ['id_gerente', 'nombre', 'direccion', 'telefono', 'correo'] })
      res.redirect('/hoteles')
    } catch (error) {
      console.log(error)
    }
  }
}

// Renderizar pagina de los Hoteles
const paginaReadHoteles = async (req, res) => {
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
      correo: htls.correo
    }
    hotelesTotales.push(obj)
  })
  res.render('hoteles', {
    pagina: 'Hoteles',
    hoteles: hotelesTotales
  })
}

// Renderizar formulario para modificar hotel
const paginaUpdateHoteles = async (req, res) => {
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
  res.render('formUHoteles', {
    pagina: 'Editar Hotel',
    gerentes: gerentesModificados,
    hotel: hotelMOD
  })
}

// Enviar el hotel actualizado a la base de datos
const updateHotel = async (req, res) => {
  const { nombre, id_gerente, direccion, telefono, correo } = req.body
  const errores = []
  if (nombre.trim() === '') {
    errores.push({ mensaje: 'El nombre no puede estar vacio' })
  }
  if (id_gerente === '0') {
    errores.push({ mensaje: 'Selecciona un gerente' })
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
    const hotel = await Hoteles.findAll({
      attributes: ['id_htl', 'id_gerente', 'nombre', 'direccion', 'telefono', 'correo'],
      where: {
        id_htl: req.query.id
      }
    })
    const hotel1 = JSON.parse(JSON.stringify(hotel))
    let hotelMOD = {
      id: hotel1[0].id_htl,
      gerenteId: id_gerente,
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      correo: correo
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
    console.log(hotelMOD)
    res.render('formUHoteles', {
      pagina: 'Editar Hotel',
      errores,
      gerentes: gerentesModificados,
      hotel: hotelMOD
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
          id_htl: req.query.id
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
    await Habitaciones.destroy({
      where: {
        id_hotel: req.query.id
      }
    })
    await Hoteles.destroy({
      where: {
        id_htl: req.query.id
      }
    })
    res.redirect('/hoteles')
  } catch (error) {
    console.log(error)
  }
}

const paginaCreateHabitacionHotel = (req, res) => {
  res.render('formCHabitacionH', {
    pagina: 'Crear Habitacion',
    id: req.query.id
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


export {
  paginaCreateHoteles,
  createHotel,
  paginaReadHoteles,
  paginaUpdateHoteles,
  updateHotel,
  paginaDeleteHoteles,
  paginaCreateHabitacionHotel,
  createHabitacionHotel
}