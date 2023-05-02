const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const { Pet } = require("./pet");
const { Servico } = require("./servico");
const Joi = require('joi');

const Agendamento = connection.define("agendamento", {
    dataAgendada: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    realizada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});

Pet.hasMany(Agendamento);
Servico.hasMany(Agendamento);

const schemaAgendamento = Joi.object({
    dataAgendada: Joi.date().required(),
    realizada: Joi.boolean().required(),
    petId: Joi.number().integer().required(),
    servicoId: Joi.number().integer().required()
})

module.exports = { Agendamento, schemaAgendamento };