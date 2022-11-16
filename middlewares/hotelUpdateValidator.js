import Joi from 'joi';
import { Hoteles } from '../models/Hoteles.js'
import { Gerentes } from '../models/Gerentes.js'

const updateHotelValidator = async (req, res, next) => {
  if (!req.body.id_gerente) {
    const hotel = await Hoteles.findAll({
      attributes: ['id_gerente'],
      where: {
        id_htl: req.query.id
      }
    })
    const hotel1 = JSON.parse(JSON.stringify(hotel))
    req.body.id_gerente = hotel1[0].id_gerente
  }
  const updateHotelV = Joi.object({
    nombre: Joi.string().required(),
    id_gerente: Joi.number().positive().required(),
    direccion: Joi.string().required(),
    telefono: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    correo: Joi.string().email().required(),
  });
  try {
    await updateHotelV.validateAsync(req.body);
    next();
  } catch (error) {
    const { nombre, id_gerente, direccion, telefono, correo } = req.body
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
      console.log(g.id_grt, idPrueba)
      if (g.id_grt == idPrueba) {
        selectedGRT = 'selected'
        enabledGRT = false
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
    let errores = []
    console.log(error.details[0].message)
    errores.push({ mensaje: error.details[0].message })
    res.render('formUHoteles', {
      pagina: 'Editar Hotel',
      errores,
      hotel: hotelMOD,
      gerentes: gerentesModificados,
    })
  }
}

export { updateHotelValidator };