import Joi from 'joi';

const createGerenteValidator = async (req, res, next) => {
  const createGerenteV = Joi.object({
    nombre: Joi.string().required(),
    ap_paterno: Joi.string().required(),
    ap_materno: Joi.string().required(),
    telefono: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  });
  try {
    await createGerenteV.validateAsync(req.body)
    next()
  } catch (error) {
    let errores = []
    const { nombre, ap_paterno, ap_materno, telefono } = req.body
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

const updateGerenteValidator = async (req, res, next) => {
  req.body.id = req.query.id
  const updateGerenteV = Joi.object({
    id: Joi.number().greater(0).required(),
    nombre: Joi.string().required(),
    ap_paterno: Joi.string().required(),
    ap_materno: Joi.string().required(),
    telefono: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  });
  try {
    await updateGerenteV.validateAsync(req.body)
    next();
  } catch (error) {
    let errores = []
    const { nombre, ap_paterno, ap_materno, telefono } = req.body
    errores.push({ mensaje: error.details[0].message })
    res.render('formUGerente', {
      pagina: 'Editar Gerente',
      errores,
      gerente: {
        id: req.query.id,
        name: nombre,
        aPaterno: ap_paterno,
        aMaterno: ap_materno,
        tel: telefono
      }
    })
  }
}

export { createGerenteValidator, updateGerenteValidator };
