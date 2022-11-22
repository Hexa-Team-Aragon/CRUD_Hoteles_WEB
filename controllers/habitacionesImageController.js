const habitacionesIMageValidator = (req, res, next) => {
  if (req.files.length === 0) {
    res.render('formCHabitacionImagen', {
      pagina: 'Añadir Imagenes',
      hotel: req.query.htl
    })
  } else {
    next()
  }
}

export { habitacionesIMageValidator }