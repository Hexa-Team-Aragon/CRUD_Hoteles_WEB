const gerenteImageValidator = (req, res, next) => {
    if (req.files.length === 0) {
      res.render('formUIGerente', {
        pagina: 'Añadir Imagen',
        gerente: req.query.grt
      })
    } else {
      //Validar tamaño
      next()
    }
  }
  
  export { gerenteImageValidator }