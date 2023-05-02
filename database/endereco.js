const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Joi = require('joi');

const Endereco = connection.define("endereco", {
  uf: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const schemaEndereco = Joi.object({
  endereco: {
    uf: Joi.string().required().max(2).min(2).label("uf"),
    cidade: Joi.string().required().label("cidade"),
    cep: Joi.string().required().label("cep"),
    rua: Joi.string().required().label("rua"),
    numero: Joi.string().required().label("número")
  }
})

module.exports = { Endereco, schemaEndereco };
