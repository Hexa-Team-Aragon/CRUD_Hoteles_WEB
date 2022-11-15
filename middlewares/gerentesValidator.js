import Joi from 'joi';

const createGerenteValidator = async (req, res, next) => {
    const createGerenteV = Joi.object({
        nombre: Joi.string().required(),
        ap_paterno: Joi.string().required(),
        ap_materno: Joi.string().required(),
        telefono: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    });
    try {
        await createGerenteV.validateAsync(req.body);
        next();
    } catch (error) {
        let errores = []
        const { nombre, ap_paterno, ap_materno, telefono } = req.body
        console.log(error.details[0].message)
        errores.push({ mensaje: error.details[0].message })
        res.render('formCGerente', {
            pagina: 'Añadir Gerente',
            errores,
            nombre,
            ap_paterno,
            ap_materno,
            telefono
        })
    }
}

export { createGerenteValidator };