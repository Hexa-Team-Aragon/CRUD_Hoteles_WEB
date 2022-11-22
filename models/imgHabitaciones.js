import Sequelize from "sequelize"
import db from "../config/db.js"

export const ImgHabitaciones = db.define('imgHabitaciones', {
  id_habitacion1: {
    type: Sequelize.INTEGER
  },
  nombre: {
    type: Sequelize.STRING
  },
  img_tipo: {
    type: Sequelize.STRING
  }
},{ timestamps: false })