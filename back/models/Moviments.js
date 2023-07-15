const Sequelize = require('sequelize');
const db = require('./Db');
const sequelize = require("./Db");


const Moviments = db.define('Moviments', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    idUser:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    label:{
        type:Sequelize.STRING,
        allowNull:false, 
    },
    value:{
        type:Sequelize.FLOAT,
        allowNull:false,
    },
    type: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    data: {
        type:Sequelize.STRING,
        allowNull:false
    }
});

// Criar a tabela 
Moviments.sync() 

module.exports = Moviments