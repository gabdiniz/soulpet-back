

const { Router } = require("express");
const { Op } = require("sequelize");
const Produto = require("../database/produto");

const router = Router();

router.get("/produtos", async (req, res) => {

    const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.query;
    const where = {};

    if (nome) where.nome = { [Op.like]: `%${nome}` };
    if (preco) where.preco = preco;
    if (descricao) where.descricao = descricao;
    if (desconto) where.desconto = desconto;
    if (dataDesconto) where.dataDesconto = dataDesconto;
    if (categoria) where.categoria = categoria;

    try {
        const listaProdutos = await Produto.findAll({ where });
        res.json(listaProdutos);
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu!" })
    }
});

router.get("/produtos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({ message: "Produto não encontrado" })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.post("/produtos", async (req, res) => {

    const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.body;
    try {
        const novo = await Produto.create(
            { nome, preco, descricao, desconto, dataDesconto, categoria },
        );
        res.status(201).json(novo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;