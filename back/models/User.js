const Sequelize = require('sequelize');
const db = require('./Db');
const sequelize = require("./Db");


const User = db.define('users', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,     
        unique:true   
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
});

// Criar a tabela 
User.sync() 

module.exports = User