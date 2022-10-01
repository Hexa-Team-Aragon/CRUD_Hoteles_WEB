import Sequelize from "sequelize"
import db from "../config/db.js"

export const Habitaciones = db.define('habitaciones', {
  id_hotel: {
    type: Sequelize.INTEGER
  },
  piso: {
    type: Sequelize.STRING
  },
  nombre: {
    type: Sequelize.STRING
  },
  refrigerador: {
    type: Sequelize.BOOLEAN
  }
})