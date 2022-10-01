import Sequelize from "sequelize"
import db from "../config/db"

export const Hoteles = db.define('hoteles', {
  id_gerente: {
    type: Sequelize.INTEGER
  },
  nombre: {
    type: Sequelize.STRING
  },
  direccion: {
    type: Sequelize.STRING
  },
  telefono: {
    type: Sequelize.STRING
  },
  correo: {
    type: Sequelize.STRING
  }
})