import { Sequelize } from 'sequelize'

const db=new Sequelize('beu3mmnp1ands5wm7ixi', 'uap1ykiy0t5fippt', 'VasDTF767HknwgcFibpt',{
    dialect: 'mariadb',
    dialectOptions:{
        host:'beu3mmnp1ands5wm7ixi-mysql.services.clever-cloud.com',
        port:'3306',
        timestamps: false,
        underscore: false,
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        },
        operatorAlies: false
    }
})
export default db