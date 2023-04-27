const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Cliente = require("./cliente");
const Produto = require("./produto");

const Pedido = connection.define("pedido", {

    codigo: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

Cliente.hasMany(Pedido, {onDelete: "CASCADE"});
Pedido.belongsTo(Cliente);

Produto.hasMany(Pedido, {onDelete: "CASCADE"});
Pedido.belongsTo(Produto);

module.exports = Pedido;