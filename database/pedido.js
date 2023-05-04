const { DataTypes, Sequelize } = require("sequelize");
const { connection } = require("./database");
const { Cliente } = require("./cliente");
const { Produto } = require("./produto");
const Joi = require('joi')

const Pedido = connection.define("pedido", {
    codigo: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

Cliente.hasMany(Pedido, { onDelete: "CASCADE" });
Pedido.belongsTo(Cliente);

Produto.hasMany(Pedido, { onDelete: "CASCADE" });
Pedido.belongsTo(Produto);

const schemaPedido = Joi.object({
    codigo: Joi.string().uuid().optional(),
    quantidade: Joi.number().integer().required(),
    clienteId: Joi.number().integer().required(),
    produtoId: Joi.number().integer().required()
})

const schemaPedidos = Joi.array().items(schemaPedido);

module.exports = { Pedido, schemaPedidos, schemaPedido };
