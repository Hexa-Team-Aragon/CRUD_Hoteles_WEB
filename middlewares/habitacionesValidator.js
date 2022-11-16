import Joi from 'joi';
import { Hoteles } from '../models/Hoteles.js'


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
        console.log('arriba')
        console.log(req.body.refrigerador)
        if (req.body?.refrigerador) {
            refrigerador = true
            console.log(req.body.refrigerador)
            console.log('dentro if')
        }
        console.log('fuera if')
        console.log(req.body.refrigerador)
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

export { createHabitacionValidator };
