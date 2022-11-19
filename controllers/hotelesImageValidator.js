const hotelIMageValidator = (req, res, next) => {
  if (req.files.length === 0) {
    res.render('formCUHotel', {
      pagina: 'Añadir Imagenes',
      hotel: req.query.htl
    })
  } else {
    //Validar tamaño
  }
}

export { hotelIMageValidator }