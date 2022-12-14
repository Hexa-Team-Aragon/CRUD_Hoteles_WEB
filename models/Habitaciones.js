import Sequelize from "sequelize"
import db from "../config/db.js"

export const Habitaciones = db.define('habitaciones', {
  id_hotel: {
    type: Sequelize.INTEGER
  },
  tipo: {
    type: Sequelize.STRING
  },
  refrigerador: {
    type: Sequelize.BOOLEAN
  }
},{ timestamps: false })