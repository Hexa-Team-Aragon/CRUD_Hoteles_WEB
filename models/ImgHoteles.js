import Sequelize from "sequelize"
import db from "../config/db.js"

export const ImgHoteles = db.define('imgHoteles', {
  id_hotel1: {
    type: Sequelize.INTEGER
  },
  nombre: {
    type: Sequelize.STRING
  },
  img_tipo: {
    type: Sequelize.STRING
  }
},{ timestamps: false })