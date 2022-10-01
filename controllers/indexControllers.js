const paginaInicio = (req, res) => {
  res.render('inicio', {
      pagina: 'Inicio'
  })
}

export {
  paginaInicio,
}