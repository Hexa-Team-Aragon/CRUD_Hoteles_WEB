import { Gerentes } from "../models/Gerentes.js"
import { Hoteles } from '../models/Hoteles.js'


// Renderizar Formulario para crear un Gerente
const paginaCreateGerentes = (req, res) => {
  res.render('formCGerente', {
    pagina: 'Añadir Gerente'
  })
}

// Enviar el nuevo gerente a la Base de Datos
const createGerente = async (req, res) => {
  const { nombre, ap_paterno, ap_materno, telefono } = req.body
  try {
    await Gerentes.create({
      nombre,
      ap_paterno,
      ap_materno,
      telefono
    }, { fields: ['nombre', 'ap_paterno', 'ap_materno', 'telefono'] })
    res.redirect('/gerentes')
  } catch (error) {
    console.log(error)
  }
}

// Renderizar pagina de los Gerentes
const paginaReadGerentes = async (req, res) => {
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
    gerentes: gerentesModificados
  })
}

// Renderizar formulario para modificar gerente
const paginaUpdateGerentes = async (req, res) => {
  try {
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
    res.render('formUGerente', {
      pagina: 'Editar Gerente',
      gerente: gerenteMOd
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
  try {
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

const paginaUploadImagenGerente = async (req, res) => {
  res.render('formUIGerente', {
    pagina: 'Adjuntar Imagen',
  })
}

export {
  paginaCreateGerentes,
  createGerente,
  paginaReadGerentes,
  paginaUpdateGerentes,
  updateGerente,
  paginaDeleteGerentes,
  paginaUploadImagenGerente
}