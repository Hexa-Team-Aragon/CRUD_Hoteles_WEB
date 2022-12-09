import Joi from 'joi';
import { Hoteles } from '../models/Hoteles.js'
import { Habitaciones } from '../models/Habitaciones.js';
import { readFile } from 'fs/promises';


const createHabitacionValidator = async (req, res, next) => {
  const createHabitacionV = Joi.object({
    id_hotel: Joi.number().greater(0).required(),
  });
  try {
    await createHabitacionV.validateAsync(req.body);
    next();
  } catch (error) {
    let errores = []
    const { id_hotel } = req.body
    let hotelesModificados = []
    const hoteles = await Hoteles.findAll({
      attributes: ['id_htl', 'nombre']
    })
    const habitaciones = await Habitaciones.findAll({
      attributes: ['id_hotel', 'tipo']
    })
    const habitacionesModificados = JSON.parse(JSON.stringify(habitaciones))
    const habitacionesModificados1 = JSON.parse(JSON.stringify(hoteles))
    habitacionesModificados1.map(hm1 => {
      let selec = false
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
      if (hm1.id_htl == id_hotel) {
        selec = true
      }
      let obj = {
        id: hm1.id_htl,
        nombre: hm1.nombre,
        selected: selec,
        abilitado: hab
      }
      hotelesModificados.push(obj)
    })
    //
    const a = await readFile('./helpers/joiTraductor.json')
    const b = JSON.parse(a)
    errores.push({ mensaje: b[error.details[0].type] })
    res.render('formCHabitacion', {
      pagina: 'Añadir Habitacion',
      errores,
      hoteles: hotelesModificados,
      user: req.session.nombre
    })
  }
}

const createHabitacionValidator1 = async (req, res, next) => {
  const createHabitacionV = Joi.object({
    tipo: Joi.string().valid('SIMPLE').valid('MATRIMONIAL').valid('PREMIUM').insensitive().required(),
    refrigerador: Joi.string().valid('true').valid('on').insensitive(),
  })
  try {
    await createHabitacionV.validateAsync(req.body);
    next();
  } catch (error) {
    let errores = []
    const { tipo } = req.body
    let refrigerador = false
    if (req.body?.refrigerador) {
      refrigerador = true
    }

    const id_hotel = req.query.hotel

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
    const a = await readFile('./helpers/joiTraductor.json')
    const b = JSON.parse(a)
    console.log(error.details[0])
    errores.push({ mensaje: b[error.details[0].type] })
    res.render('formCHabitacion1', {
      pagina: 'Añadir Habitacion',
      errores,
      id_hotel: req.query.hotel,
      tipos,
      refrigerador,
      user: req.session.nombre
    })
  }
}

export { createHabitacionValidator, createHabitacionValidator1 };
