const { Router } = require("express");
const { Cliente } = require("../database/cliente");
const {Pet} = require("../database/pet");
const {Produto} = require("../database/produto");
const {Servico} = require("../database/servico");
const {Agendamento} = require("../database/agendamento");

const router = Router();

router.get("/dashboard", async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao obter dados do dashboard.");
  }
});


// router.get("/dashboard", async (req, res) => {
//     const totalClientes = await Cliente.findAll();
//     res.status(200).json(totalClientes);
//   });


module.exports = router;
