import Joi from 'joi';
import { Hoteles } from '../models/Hoteles.js'
import { Habitaciones } from '../models/Habitaciones.js';


const updateHabitacionValidator = async (req, res, next) => {
    const updateHabitacionV = Joi.object({
      refrigerador: Joi.string().valid('true').valid('on').insensitive()
    })
    try {
      await updateHabitacionV.validateAsync(req.body);
      next();
    } catch (error) {
      let errores = []
      errores.push({ mensaje: error.details[0].message })
      res.redirect('/')
    }
  }

export { updateHabitacionValidator};
