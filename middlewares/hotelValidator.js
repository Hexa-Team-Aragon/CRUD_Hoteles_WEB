import Joi from 'joi';
import { Hoteles } from '../models/Hoteles.js'
import { Gerentes } from '../models/Gerentes.js'


const createHotelValidator = async (req, res, next) => {
    const createHotelV = Joi.object({
        nombre: Joi.string().required(),
        id_gerente: Joi.number().positive().required(),
        direccion: Joi.string().required(),
        telefono: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        correo: Joi.string().email().required(),

    });
    try {
        await createHotelV.validateAsync(req.body);
        next();
    } catch (error) {
        const { nombre, id_gerente, direccion, telefono, correo } = req.body
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
            let enableSElected = false
            if (gerentesConHotel.includes(g.id_grt)) {
                enabledGRT = true
            }
            if (g.id_grt == id_gerente) {
                enableSElected = true
            }
            let obj = {
                id: g.id_grt,
                name: g.nombre,
                aPaterno: g.ap_paterno,
                aMaterno: g.ap_materno,
                asignado: enabledGRT,
                seleccionado: enableSElected
            }
            gerentesModificados.push(obj)
        })
        let errores = []
        console.log(error.details[0].message)
        errores.push({ mensaje: error.details[0].message })
        res.render('formCHotel', {
            pagina: 'Añadir Hotel',
            errores,
            nombre,
            id_gerente,
            direccion,
            telefono,
            correo,
            gerentes: gerentesModificados
        })
    }
}

export { createHotelValidator };