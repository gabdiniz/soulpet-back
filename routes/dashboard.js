const { Router } = require("express");
const { Cliente } = require("../database/cliente");
const { Pet } = require("../database/pet");
const { Produto } = require("../database/produto");
const { Servico } = require("../database/servico");
const { Agendamento } = require("../database/agendamento");

const router = Router();

router.get("/dashboard", async (req, res, next) => {
  try {
    const totalClientes = await Cliente.count();
    const totalPets = await Pet.count();
    const totalProdutos = await Produto.count();
    const totalServicos = await Servico.count();
    const totalAgendamentos = await Agendamento.count();


    res.json({
      totalClientes,
      totalPets,
      totalProdutos,
      totalServicos,
      totalAgendamentos
    });
  }
  catch (err) {
    next(err);
  }
});


// router.get("/dashboard", async (req, res) => {
//     const totalClientes = await Cliente.findAll();
//     res.status(200).json(totalClientes);
//   });


module.exports = router;
