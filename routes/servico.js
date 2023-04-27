const { Router } = require('express');
const Servico = require('../database/servico');

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


module.exports = router;
