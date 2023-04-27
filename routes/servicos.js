const { Router } = require("express");
const Servico = require("../database/servico")

const router = Router();

router.post("/servicos", async(req, res) => {
  const { nome, preco } = req.body;
  if (!nome) return res.status(400).json({ message: "O nome é obrigatório"});
  if (!preco) return res.status(400).json({ message: "O preço é obrigatório"});
  try {
    const servico = await Servico.create({ nome, preco });
    res.status(201).json(servico)
  }
  catch (e) {
    res.status(500).json({ message: "Um erro aconteceu!" })
  }
})

module.exports = router;
