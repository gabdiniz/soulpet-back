const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Joi = require('joi');

const Servico = connection.define("servico", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
});

const schemaServico = Joi.object({
    nome: Joi.string().required(),
    preco: Joi.number().required()
})

module.exports = { Servico, schemaServico };