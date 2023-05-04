const { Router } = require("express");
const { Op } = require("sequelize");
const { Produto, schemaProduto } = require("../database/produto");
const customMessages = require("../joi/customMessages");
const { toDate } = require("date-fns-tz")

const router = Router();

router.get("/produtos", async (req, res, next) => {

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
    }
    catch (err) {
        next(err);
    }
});

router.get("/produtos/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    }
    catch (err) {
        next(err);
    }
});

router.post("/produtos", async (req, res, next) => {
    try {
        const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.body;
        const { error } = schemaProduto.validate({ nome, preco, descricao, desconto, dataDesconto, categoria }, { abortEarly: false, messages: customMessages });
        if (error) return res.status(400).json(error.details.map(detalhe => detalhe.message));
        const data = toDate(dataDesconto, 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
        const dataAtual = toDate(new Date(), { timeZone: 'America/Sao_Paulo' });
        dataAtual.setHours(0, 0, 0, 0);
        if (categoria !== "higiene" && categoria !== "brinquedos" && categoria !== "conforto") {
            return res.status(400).json({ message: "Adicione uma categoria válida: higiene, brinquedos ou conforto." });
        }
        if (data < dataAtual) {
            return res.status(400).json({ message: "A data não pode ser anterior a data atual." });
        }
        if (desconto < 0 || desconto > 100) {
            return res.status(400).json({ message: "Aplique um desconto de 0 a 100%." });
        }
        const novo = await Produto.create(
            { nome, preco, descricao, desconto, dataDesconto, categoria },
        );
        res.status(201).json(novo);
    }
    catch (err) {
        next(err);
    }
});

router.delete("/produtos/all", async (req, res, next) => {
    try {
        await Produto.destroy({ where: {} });
        res.json({ message: "Todos os produtos foram deletados." });
    }
    catch (err) {
        next(err);
    }
});


router.delete("/produtos/:id", async (req, res, next) => {
    const produto = await Produto.findByPk(req.params.id);
    try {
        if (produto) {
            await Produto.destroy({ where: { id: req.params.id } });
            res.json({ message: "Produto removido com sucesso." });
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    }
    catch (err) {
        next(err);
    }
});

router.put("/produtos/:id", async (req, res, next) => {
    try {
        const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.body;
        const { id } = req.params;
        const { error } = schemaProduto.validate({ nome, preco, descricao, desconto, dataDesconto, categoria }, { abortEarly: false, messages: customMessages });
        if (error) return res.status(400).json(error.details.map(detalhe => detalhe.message));
        const produto = await Produto.findOne({ where: { id } });
        const data = toDate(dataDesconto, 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
        const dataAtual = toDate(new Date(), { timeZone: 'America/Sao_Paulo' });
        dataAtual.setHours(0, 0, 0, 0);
        if (produto) {
            if (categoria === "higiene" || categoria === "brinquedos" || categoria === "conforto") {
            } else {
                return res.status(400).json({ message: "Adicione uma categoria válida: higiene, brinquedos ou conforto." });
            }
            if (data < dataAtual || data > dataDesconto) {
                return res.status(400).json({ message: "A data não pode ser anterior a data atual." });
            }
            if (desconto < 0 || desconto > 100) {
                return res.status(400).json({ message: "Aplique um desconto de 0 a 100% ." });
            }
            await Produto.update(
                { nome, preco, descricao, desconto, dataDesconto, categoria },
                { where: { id: req.params.id } }
            );
            res.json({ message: "O produto foi editado." });
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;