import { Gerentes } from "../models/Gerentes.js"

let gerenteUpdateId = ''

// Renderizar Formulario para crear un Gerente
const paginaCreateGerentes = (req, res) => {
  res.render('formCGerente', {
    pagina: 'Añadir Gerente'
  })
}

// Enviar el nuevo gerente a la Base de Datos
const createGerente = async (req, res) => {
  const { nombre, ap_paterno, ap_materno, telefono } = req.body
  const errores = []

  if (nombre.trim() === '') {
    errores.push({ mensaje: 'El nombre no debe estar vacio' })
  }
  if (ap_paterno.trim() === '') {
    errores.push({ mensaje: 'El apellido paterno no puede estar vacio' })
  }
  if (ap_materno.trim() === '') {
    errores.push({ mensaje: 'El apellido meterno no puede estar vacio' })
  }
  if (telefono.trim() === '') {
    errores.push({ mensaje: 'El telefono no puede estar vacio' })
  }
  if (isNaN(telefono) || telefono.length !== 10) {
    errores.push({ mensaje: 'Numero telefonico invalido' })
  }

  if (errores.length > 0) {
    res.render('formCGerente', {
      pagina: 'Añadir Gerente',
      errores,
      nombre,
      ap_paterno,
      ap_materno,
      telefono
    })
  } else {
    // Almacenar en la base de datos
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
}

// Renderizar pagina de los Gerentes
const paginaReadGerentes = async (req, res) => {
  let gerentesModificados = []
  const gerentes = await Gerentes.findAll({
    attributes: ['id_grt' ,'nombre', 'ap_paterno', 'ap_materno', 'telefono']
  })
  const gerentes1 = JSON.parse(JSON.stringify(gerentes))
  gerentes1.map(g => {
    let obj = {
      id: g.id_grt,
      name: g.nombre,
      aPaterno: g.ap_paterno,
      aMaterno: g.ap_materno,
      tel: g.telefono
    }
    gerentesModificados.push(obj)
  })
  res.render('gerentes', {
    gerentes: gerentesModificados
  })
}

// Renderizar formulario para modificar gerente
const paginaUpdateGerentes = async (req, res) => {
  try {
    const gerente = await Gerentes.findAll({
      attributes: ['id_grt' ,'nombre', 'ap_paterno', 'ap_materno', 'telefono'],
      where: {
        id_grt: req.query.id
      }
    })
    gerenteUpdateId = req.query.id
    console.log(gerenteUpdateId, 'Aqui guardo el valor')
    const gerente1 = JSON.parse(JSON.stringify(gerente))
    let gerenteMOd = {
      id: gerente1[0].id_grt,
      name: gerente1[0].nombre,
      aMaterno: gerente1[0].ap_materno,
      aPaterno: gerente1[0].ap_paterno,
      tel: gerente1[0].telefono
    }
    res.render('formUGerente', {
      gerente: gerenteMOd
    })
  } catch (error) {
    console.log(error);
  }
}

// Enviar el gerente actualizado a la base de datos
const updateGerente = async (req, res) => {
  const { nombre, ap_paterno, ap_materno, telefono } = req.body
  const errores = []

  if (nombre.trim() === '') {
    errores.push({ mensaje: 'El nombre no debe estar vacio' })
  }
  if (ap_paterno.trim() === '') {
    errores.push({ mensaje: 'El apellido paterno no puede estar vacio' })
  }
  if (ap_materno.trim() === '') {
    errores.push({ mensaje: 'El apellido meterno no puede estar vacio' })
  }
  if (telefono.trim() === '') {
    errores.push({ mensaje: 'El telefono no puede estar vacio' })
  }
  if (isNaN(telefono) || telefono.length !== 10) {
    errores.push({ mensaje: 'Numero telefonico invalido' })
  }

  if (errores.length > 0) {
    res.render('formUGerente', {
      pagina: 'Editar Gerente',
      errores,
      nombre,
      ap_paterno,
      ap_materno,
      telefono
    })
  } else {
    // Almacenar en la base de datos
    try {
      await Gerentes.update({
        nombre,
        ap_paterno,
        ap_materno,
        telefono
      }, {
        where: {
          id_grt: gerenteUpdateId
        }
      })
      res.redirect('/gerentes')
    } catch (error) {
      console.log(error)
    }
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

export {
  paginaCreateGerentes,
  createGerente,
  paginaReadGerentes,
  paginaUpdateGerentes,
  updateGerente,
  paginaDeleteGerentes
}