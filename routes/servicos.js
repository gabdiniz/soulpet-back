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
});

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
    res.status(500).send('Erro ao buscar serviços');
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
      res.status(404).send('Serviço não encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar serviço');
  }
});

//Rota para atualizar servico;
router.put("/servicos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  if (!nome) return res.status(400).json({ message: "O nome é obrigatório"});
  if (!preco) return res.status(400).json({ message: "O preço é obrigatório"});
  try{
    const servico = await Servico.findByPk(id);
    if (servico){
      await servico.update({nome, preco});
      res.status(200).json("Serviço editado com sucesso!")
    } else {
      res.status(404).json({ message: "O serviço não foi encontrado." });
    }
  }catch(err){
    console.error(err);
    res.status(500).send({message: "Um erro ocorreu"});
  }
});

module.exports = router;
