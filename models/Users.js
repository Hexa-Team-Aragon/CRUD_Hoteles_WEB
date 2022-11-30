import Sequelize from "sequelize"
import db from "../config/db.js"

export const Users = db.define('users', {
  usuario: {
    type: Sequelize.STRING
  },
  contrasenia: {
    type: Sequelize.STRING
  },
  rol: {
    type: Sequelize.STRING
  }
},{ timestamps: false })