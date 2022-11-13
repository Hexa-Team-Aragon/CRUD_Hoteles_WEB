import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config();

const db =  new Sequelize(process.env.SCHEMA_DB, process.env.USER_DB, process.env.PASSWORD_DB, {
    dialect: process.env.DIALECT_DB,
    dialectOPtions: {
        host: process.env.HOST_DB,
        port: process.env.PORT_DB,
        timestamps: false,
        underscore: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        operatorAlies: false
    }
})

export default db