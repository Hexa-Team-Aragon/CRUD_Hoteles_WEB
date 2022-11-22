import Joi from 'joi';
import { Hoteles } from '../models/Hoteles.js'
import { Habitaciones } from '../models/Habitaciones.js';


const createHabitacionValidator = async (req, res, next) => {
  const createHabitacionV = Joi.object({
    id_hotel: Joi.number().greater(0).required(),
    tipo: Joi.string().valid('SIMPLE').valid('MATRIMONIAL').valid('PREMIUM').insensitive(),
    refrigerador: Joi.string().valid('true').valid('on').insensitive(),
  });
  try {
    await createHabitacionV.validateAsync(req.body);
    next();
  } catch (error) {
    let errores = []
    const { id_hotel, tipo } = req.body
    let refrigerador = false
    if (req.body?.refrigerador) {
      refrigerador = true
    }
    let hotelesModificados = []
    const hoteles = await Hoteles.findAll({
      attributes: ['id_htl', 'nombre']
    })
    const habitacionesModificados1 = JSON.parse(JSON.stringify(hoteles))
    habitacionesModificados1.map(hm1 => {
      let selec = false
      if (hm1.id_htl == id_hotel) {
        selec = true
      }
      let obj = {
        id: hm1.id_htl,
        nombre: hm1.nombre,
        selected: selec
      }
      hotelesModificados.push(obj)
    })
    //
    console.log(error.details[0].message)
    errores.push({ mensaje: error.details[0].message })
    res.render('formCHabitacion', {
      pagina: 'Añadir Habitacion',
      errores,
      hoteles: hotelesModificados,
      id_hotel,
      tipo,
      refrigerador
    })
  }
}

export { createHabitacionValidator };
