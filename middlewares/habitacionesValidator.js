import Joi from 'joi';
import { Hoteles } from '../models/Hoteles.js'
import { Habitaciones } from '../models/Habitaciones.js';


const createHabitacionValidator = async (req, res, next) => {
    const createHabitacionV = Joi.object({
        id_hotel: Joi.number().greater(0).required(),
        piso: Joi.number().min(0).max(5).required(),
        nombre: Joi.string().required(),
        refrigerador: Joi.string().valid('true').valid('on').insensitive()
    });
    try {
        await createHabitacionV.validateAsync(req.body);
        next();
    } catch (error) {
        let errores = []
        const { id_hotel, piso, nombre } = req.body
        let refrigerador = false
        if (req.body?.refrigerador) {
            refrigerador = true
        }
        let hotelesModificados = []
        const hoteles = await Hoteles.findAll({
            attributes: ['id_htl', 'nombre']
        })
        const hotelesModificados1 = JSON.parse(JSON.stringify(hoteles))
        hotelesModificados1.map(hm1 => {
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
            piso,
            nombre,
            refrigerador
        })
    }
}

const updateHabitacionValidator = async (req, res, next) => {
    if(!req.body.id_hotel){
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
        piso: Joi.number().greater(0).required(),
        nombre: Joi.string().required(),
        refrigerador: Joi.string().valid('true').valid('on').insensitive()
    });
    try {
        await updateHabitacionV.validateAsync(req.body);
        next();
    } catch (error) {
        let errores = []
        const { id_hotel, piso, nombre } = req.body
        let refrigerador = false
        if (req.body?.refrigerador) {
            refrigerador = true
        }
        const habitaciones = await Habitaciones.findAll({
            attributes: ['id_hbt', 'id_hotel', 'nombre', 'piso', 'refrigerador'],
            where: {
              id_hbt: req.query.id
            }
          })
          const habitacion1 = JSON.parse(JSON.stringify(habitaciones))
          let habitacionMOD = {
            id: habitacion1[0].id_hbt,
            hotelId: id_hotel,
            nombre: nombre,
            piso: piso,
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
export { createHabitacionValidator, updateHabitacionValidator };
