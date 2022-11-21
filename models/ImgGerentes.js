import Sequelize from "sequelize"
import db from "../config/db.js"

export const ImgGerentes = db.define('imgGerentes', {
  nombre: {
    type: Sequelize.STRING
  },  
  id_gerente1: {
    type: Sequelize.INTEGER
  },
  img_tipo: {
    type: Sequelize.STRING
  }
},{ timestamps: false })