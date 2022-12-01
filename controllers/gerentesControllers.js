import { Gerentes } from "../models/Gerentes.js"
import { Hoteles } from '../models/Hoteles.js'
import { ImgGerentes } from "../models/ImgGerentes.js"
import fs from 'fs'

// Renderizar Formulario para crear un Gerente
const paginaCreateGerentes = (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  res.render('formCGerente', {
    pagina: 'Añadir Gerente',
    user: req.session.nombre,
    admin
  })
}

// Enviar el nuevo gerente a la Base de Datos
const createGerente = async (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  const { nombre, ap_paterno, ap_materno, telefono } = req.body
  try {
    const gerenteCreado = await Gerentes.create({
      nombre,
      ap_paterno,
      ap_materno,
      telefono
    }, { fields: ['nombre', 'ap_paterno', 'ap_materno', 'telefono'] })
    res.render('formUIGerente', {
      pagina: 'Añadir Imagen',
      gerente: gerenteCreado.dataValues.id,
      user: req.session.nombre,
      admin
    })
  } catch (error) {
    console.log(error)
  }
}

// Renderizar pagina de los Gerentes
const paginaReadGerentes = async (req, res) => {
  let admin = false
  if (req.session.rol === 'ADMIN') {
    admin = true
  }
  let gerentesConHotel = []
  let gerentesConHotel2 = []
  const hoteles = await Hoteles.findAll({
    attributes: ['id_gerente', 'nombre']
  })
  const gerentesConHotel1 = JSON.parse(JSON.stringify(hoteles))
  gerentesConHotel1.map(gch => {
    let obj = {
      id: gch.id_gerente,
      nombreHotel: gch.nombre
    }
    gerentesConHotel2.push(obj)
    gerentesConHotel.push(gch.id_gerente)
  })

  let gerentesModificados = []
  const gerentes = await Gerentes.findAll({
    attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono']
  })
  const gerentes1 = JSON.parse(JSON.stringify(gerentes))
  gerentes1.map(g => {
    let gerenteOcupado = ''
    let nombre_Hotel = ''
    gerentesConHotel2.map(geren => {
      if (g.id_grt === geren.id) {
        nombre_Hotel = '*Hotel ' + geren.nombreHotel
      }
    })
    if (gerentesConHotel.includes(g.id_grt)) {
      gerenteOcupado = 'disabled'
    }
    let obj = {
      id: g.id_grt,
      name: g.nombre,
      aPaterno: g.ap_paterno,
      aMaterno: g.ap_materno,
      tel: g.telefono,
      hotel: nombre_Hotel,
      ocupado: gerenteOcupado
    }
    gerentesModificados.push(obj)
  })
  res.render('gerentes', {
    pagina: 'Gerentes',
    gerentes: gerentesModificados,
    user: req.session.nombre,
    admin
  })
}

// Renderizar formulario para modificar gerente
const paginaUpdateGerentes = async (req, res) => {
  try {
    let admin = false
    if (req.session.rol === 'ADMIN') {
      admin = true
    }
    const gerente = await Gerentes.findAll({
      attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono'],
      where: {
        id_grt: req.query.id
      }
    })
    const gerente1 = JSON.parse(JSON.stringify(gerente))
    let gerenteMOd = {
      id: gerente1[0].id_grt,
      name: gerente1[0].nombre,
      aMaterno: gerente1[0].ap_materno,
      aPaterno: gerente1[0].ap_paterno,
      tel: gerente1[0].telefono
    }

    const imagenes = await ImgGerentes.findAll({
      attributes: ['nombre'],
      where: {
        id_gerente1: req.query.id
      }
    })

    res.render('formUGerente', {
      pagina: 'Editar Gerente',
      gerente: gerenteMOd,
      imagenes,
      gerente1: req.query.id,
      user: req.session.nombre,
      admin
    })
  } catch (error) {
    console.log(error);
  }
}

// Enviar el gerente actualizado a la base de datos
const updateGerente = async (req, res) => {
  const { nombre, ap_paterno, ap_materno, telefono } = req.body
  try {
    await Gerentes.update({
      nombre,
      ap_paterno,
      ap_materno,
      telefono
    }, {
      where: {
        id_grt: req.query.id
      }
    })
    res.redirect('/gerentes')
  } catch (error) {
    console.log(error)
  }
}

// Eliminar gerente
const paginaDeleteGerentes = async (req, res) => {
  const imagenes = await ImgGerentes.findAll({
    attributes: ['nombre'],
    where: {
      id_gerente1 : req.query.id
    }
  })
  imagenes.forEach(img => {
    fs.unlinkSync('./public/uploads/gerentes/'+img.dataValues.nombre)
  })
  try {
    await ImgGerentes.destroy({
      where: {
        id_gerente1: req.query.id,
      }
    })
    await Gerentes.destroy({
      where: {
        id_grt: req.query.id
      }
    })
    res.redirect('/gerentes')
  } catch (error) {
    console.log(error)
  }
}

const createUploadGerente = async (req, res) => {
  const imagenes = req.files
  const id_gerente1 = req.query.grt
  let images = []
  imagenes.forEach(img => {
    let obj = {
      nombre: img.filename,
      id_gerente1,
      img_tipo: img.mimetype,
    }
    images.push(obj)
  })
  try {
    await ImgGerentes.bulkCreate(images, { fields: ['nombre', 'id_gerente1','img_tipo'] })
  } catch (error) {
    console.log(error.original.errno)
    if (error.original.errno === 1062) {
      fs.unlinkSync('./public/uploads/gerentes/'+images[0].nombre)
    }
  }
  if (req.query.edit) {
    res.redirect('/gerentes/update?id='+req.query.grt)
  } else {
    res.redirect('/gerentes')
  }
}

const paginaDeleteGerentesImage = async (req, res) => {
  try {
    await ImgGerentes.destroy({
      where: {
        id_gerente1: req.query.id,
        nombre: req.query.nombre
      }
    })
    fs.unlinkSync('./public/uploads/gerentes/'+req.query.nombre)
    res.redirect('/gerentes/update?id='+req.query.id)
  } catch (error) {
    console.log(error)
  }
}

export {
  paginaCreateGerentes,
  createGerente,
  paginaReadGerentes,
  paginaUpdateGerentes,
  updateGerente,
  paginaDeleteGerentes,
  createUploadGerente,
  paginaDeleteGerentesImage
}