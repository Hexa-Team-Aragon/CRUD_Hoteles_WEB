import Joi from 'joi';
import { Hoteles } from '../models/Hoteles.js'
import { Habitaciones } from '../models/Habitaciones.js';


const updateHabitacionValidator = async (req, res, next) => {
    if (!req.body.id_hotel) {
      const habitaciones = await Habitaciones.findAll({
        attributes: ['id_hotel'],
        where: {
          id_hbt: req.query.id
        }
      })
      const habitacion1 = JSON.parse(JSON.stringify(habitaciones))
      let habitacionMOD = {
        id: habitacion1[0].id_hbt
      }
    }
    const updateHabitacionV = Joi.object({
      id_hotel: Joi.number().greater(0).required(),
      tipo: Joi.string().valid('SIMPLE').valid('MATRIMONIAL').valid('PREMIUM').insensitive(),
      refrigerador: Joi.string().valid('true').valid('on').insensitive()
    });
    try {
      await updateHabitacionV.validateAsync(req.body);
      next();
    } catch (error) {
      let errores = []
      const { id_hotel, tipo } = req.body
      let refrigerador = false
      if (req.body?.refrigerador) {
        refrigerador = true
      }
      const habitaciones = await Habitaciones.findAll({
        attributes: ['id_hbt', 'tipo', 'refrigerador'],
        where: {
          id_hbt: req.query.id
        }
      })
      const habitacion1 = JSON.parse(JSON.stringify(habitaciones))
      let habitacionMOD = {
        id: habitacion1[0].id_hbt,
        hotelId: id_hotel,
        tipo:tipo,
        refri: refrigerador
      }
  
      var idPrueba = habitacionMOD.hotelId
  
      let hotelesMOd = []
      const hoteles = await Hoteles.findAll({
        attributes: ['id_htl', 'nombre']
      })
      const hoteles1 = JSON.parse(JSON.stringify(hoteles))
      hoteles1.map(ht1 => {
        let selectedHTL = false
        if (ht1.id_htl == id_hotel) {
          selectedHTL = true
        }
        let obj = {
          id: ht1.id_htl,
          nombre: ht1.nombre,
          opcion: selectedHTL
        }
        hotelesMOd.push(obj)
      })
      console.log(habitacionMOD);
      console.log(error.details[0].message)
      errores.push({ mensaje: error.details[0].message })
      res.render('formUHabitaciones', {
        pagina: 'Editar Habitacion',
        errores,
        hoteles: hotelesMOd,
        habitacion: habitacionMOD
      })
    }
  }

export { updateHabitacionValidator};
