const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const { Cliente } = require("./cliente");
const Joi = require('joi');

const Pet = connection.define("pet", {
  nome: {
    type: DataTypes.STRING(130),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  porte: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dataNasc: {
    type: DataTypes.DATEONLY,
  },
  imagemUrl: {
    type: DataTypes.STRING,
  },
});

// Relacionamento 1:N (Um cliente pode ter N pets)
Cliente.hasMany(Pet, { onDelete: "CASCADE" });
// CASCADE = quando o cliente for deletado, TODOS os pets serão deletados
Pet.belongsTo(Cliente); // Um pet pertece a um cliente

const schemaPet = Joi.object({
  nome: Joi.string().required(),
  tipo: Joi.string().required(),
  porte: Joi.string().required(),
  dataNasc: Joi.date(),
  imagemUrl: Joi.string(),
  clienteId: Joi.number().integer().required()
})

module.exports = { Pet, schemaPet };
