const { Router } = require("express");
const { Servico, schemaServico } = require("../database/servico")
const customMessages = require("../joi/customMessages");

const router = Router();

// Rota para listar todos os serviços
router.get('/servicos', async (req, res) => {
  try {
    const { nome, preco } = req.query;
    const where = {};
    if (nome) where.nome = nome;
    if (preco) where.preco = preco;
    const servicos = await Servico.findAll({ where });
    res.json(servicos);
  } catch (error) {
    res.status(500).send({ message: "Um erro aconteceu." });
  }
});

// Rota para mostrar os dados de um serviço específico
router.get('/servicos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const servico = await Servico.findByPk(id);
    if (servico) {
      res.json(servico);
    } else {
      res.status(404).json({ message: "Serviço não encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Um erro aconteceu." });
  }
});

router.post("/servicos", async (req, res) => {
  try {
    const { nome, preco } = req.body;
    const { error } = schemaServico.validate({ nome, preco }, { abortEarly: false, messages: customMessages });
    if (error) return res.status(400).json(error.details.map(detalhe => detalhe.message));
    const servico = await Servico.create({ nome, preco });
    res.status(201).json(servico);
  }
  catch (e) {
    res.status(500).json({ message: "Um erro aconteceu." })
  }
});

router.delete("/servicos/all", async (req, res) => {
  try {
    await Servico.destroy({ where: {} });
    res.json({ message: "Todos os servicos foram deletados." })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." })
  }
});

router.delete("/servicos/:id", async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (servico) {
      await servico.destroy();
      res.json({ message: "Serviço removido com sucesso." })
    } else {
      res.status(404).json({ message: "Serviço não encontrado." })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

//Rota para atualizar servico;
router.put("/servicos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const { error } = schemaServico.validate({ nome, preco }, { abortEarly: false, messages: customMessages });
    if (error) return res.status(400).json(error.details.map(detalhe => detalhe.message));
    const servico = await Servico.findByPk(id);
    if (servico) {
      await servico.update({ nome, preco });
      res.status(200).json("Serviço editado com sucesso!")
    } else {
      res.status(404).json({ message: "O serviço não foi encontrado." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Um erro ocorreu" });
  }
});

module.exports = router;
