const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Joi = require('joi');

const Produto = connection.define("produto", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  desconto: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  dataDesconto: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const schemaProduto = Joi.object({
  nome: Joi.string().required(),
  preco: Joi.number().required(),
  descricao: Joi.string().required(),
  desconto: Joi.number().required(),
  dataDesconto: Joi.date().required(),
  categoria: Joi.string().required()
})

module.exports = { Produto, schemaProduto };
