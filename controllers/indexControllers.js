import { Hoteles } from '../models/Hoteles.js'
import { Gerentes } from '../models/Gerentes.js'
import { Habitaciones } from '../models/Habitaciones.js'

const paginaInicio = async (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  res.render('inicio', {
    pagina: 'Inicio',
    user: req.session.nombre,
    admin
  })
}

const paginaListaHoteles = async (req, res) => {
  let hotelesTotales = []
  const hoteles = await Hoteles.findAll({
    attributes: ['id_htl', 'nombre']
  })
  const hotelesTotales1 = await JSON.parse(JSON.stringify(hoteles))
  hotelesTotales1.map(htls => {
    let obj = {
      id: htls.id_htl,
      nombre: 'Hotel ' + htls.nombre
    }
    hotelesTotales.push(obj)
  })
  res.render('listaHoteles', {
    pagina: 'Lista Hoteles',
    hoteles: hotelesTotales,
    usuario: req.session.nombre
  })
}

const paginaVistaHotel = async (req, res) => {
  const hotel = await Hoteles.findAll({
    attributes: ['id_htl', 'id_gerente', 'nombre', 'direccion', 'telefono', 'correo'],
    where: {
      id_htl: req.query.id
    }
  })
  const hotel1 = JSON.parse(JSON.stringify(hotel))
  let hotelMODN = {
    id: hotel1[0].id_htl,
    gerenteId: hotel1[0].id_gerente,
    nombre: hotel1[0].nombre,
    direccion: hotel1[0].direccion,
    telefono: hotel1[0].telefono,
    correo: hotel1[0].correo
  }
  const gerente = await Gerentes.findAll({
    attributes: ['nombre', 'ap_paterno', 'ap_materno', 'telefono'],
    where: {
      id_grt: hotelMODN.gerenteId
    }
  })
  const gerenete1 = JSON.parse(JSON.stringify(gerente))
  let hotelMOD = {
    id: hotelMODN.id,
    gerente: gerenete1[0].nombre + ' ' + gerenete1[0].ap_paterno + ' ' + gerenete1[0].ap_materno,
    telefonoGerente: gerenete1[0].telefono,
    nombre: hotelMODN.nombre,
    direccion: hotelMODN.direccion,
    telefono: hotelMODN.telefono,
    correo: hotelMODN.correo
  }
  let habitacionesTotales = []
  const habitaciones = await Habitaciones.findAll({
    attributes: ['id_hbt', 'piso', 'nombre', 'refrigerador'],
    where: {
      id_hotel: hotelMODN.id
    }
  })
  const habitacionesTotales1 = JSON.parse(JSON.stringify(habitaciones))
  habitacionesTotales1.map(ht1 => {
    let obj = {
      id: ht1.id_hbt,
      nombre: ht1.nombre,
      piso: ht1.piso,
      refri: ht1.refrigerador
    }
    habitacionesTotales.push(obj)
  })
  res.render('vistaHotel', {
    pagina: 'Hotel ' + hotelMOD.nombre,
    hotel: hotelMOD,
    habitaciones: habitacionesTotales,
    usuario: req.session.nombre
  })
}

const credenciales = (req, res) => {
  const {
    usuario,
    clave
  } = req.body
}

const cerrarSesion = (req,res) => {
  req.session.destroy()
  res.render("login",{
    pagina:"Credenciales",
  })
}

export {
  paginaInicio,
  paginaListaHoteles,
  paginaVistaHotel,
  credenciales,
  cerrarSesion
}