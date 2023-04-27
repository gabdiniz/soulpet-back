const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pet = require("./pet");
const Servico = require("./servico");

const Agendamento = connection.define("agendamento", {
    petId: {
        type: DataTypes.INTEGER,
        references: {
            model: Pet,
            key: 'id'
        }
    },
    servicoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Servico,
            key: 'id'
        }
    },
    dataAgendada: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    realizada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

Pet.belongsToMany(Servico, { through: Agendamento});
Servico.belongsToMany(Pet, { through: Agendamento});

module.exports = Agendamento;