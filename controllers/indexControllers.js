const paginaInicio = (req, res) => {
  res.render('inicio', {
    pagina: 'Inicio'
  })
}

const paginaListaHoteles = (req, res) => {
  res.render('listaHoteles', {
    pagina: 'Lista Hoteles'
  })
}

const paginaVistaHotel = (req, res) => {
  res.render('vistaHotel', {
    pagina: 'Lista Hoteles'
  })
}

export {
  paginaInicio,
  paginaListaHoteles,
  paginaVistaHotel
}